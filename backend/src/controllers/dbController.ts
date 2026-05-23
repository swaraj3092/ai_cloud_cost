import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import Groq from 'groq-sdk';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const getDashboard = async (req: Request, res: Response) => {
  try {
    const metric = await prisma.dashboardMetric.findFirst();
    res.json(metric || {
      totalCost: 0,
      potentialSavings: 0,
      activeAnomalies: 0,
      optimizedResources: 0
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch dashboard metrics' });
  }
};

export const getAiActions = async (req: Request, res: Response) => {
  try {
    const actions = await prisma.aiAction.findMany();
    res.json(actions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch AI actions' });
  }
};

export const getAnalytics = async (req: Request, res: Response) => {
  try {
    const analytics = await prisma.analyticsData.findMany({
      orderBy: { date: 'asc' }
    });
    res.json({ timeSeries: analytics });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch analytics data' });
  }
};

export const getInfrastructure = async (req: Request, res: Response) => {
  try {
    const infrastructure = await prisma.infrastructureResource.findMany();
    const mapped = infrastructure.map(r => ({
      id: r.resourceId,
      type: r.type,
      status: r.status,
      cost: r.cost
    }));
    res.json(mapped);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch infrastructure' });
  }
};

export const getCodeToCost = async (req: Request, res: Response) => {
  try {
    const codeData = await prisma.codeDeployment.findMany();
    const mapped = codeData.map(c => ({
      commit: c.commitHash,
      author: c.author,
      costDelta: c.costDelta
    }));
    res.json(mapped);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch code-to-cost data' });
  }
};

export const chatWithAi = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    
    // Fetch context from DB to ground the AI
    const metrics = await prisma.dashboardMetric.findFirst();
    const actions = await prisma.aiAction.findMany();
    
    const systemPrompt = `You are an elite AI Cloud Cost Optimization Agent for a modern SaaS platform.
Your goal is to help the user understand their cloud spend, identify anomalies, and recommend optimizations.
Keep your answers extremely concise, actionable, and formatted cleanly.

CURRENT INFRASTRUCTURE CONTEXT:
- Total Cost: $${metrics?.totalCost || 0}
- Potential Savings: $${metrics?.potentialSavings || 0}
- Active Anomalies: ${metrics?.activeAnomalies || 0}
- Optimized Resources: ${metrics?.optimizedResources || 0}
- Pending Optimizations (Actions): ${actions.length}

Answer the user's query intelligently based on this context.`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      model: 'llama-3.1-8b-instant',
      temperature: 0.5,
      max_tokens: 512,
    });

    res.json({
      reply: chatCompletion.choices[0]?.message?.content || "I couldn't generate a response."
    });
  } catch (err) {
    console.error("Groq Error:", err);
    res.status(500).json({ error: 'Failed to communicate with AI' });
  }
};
