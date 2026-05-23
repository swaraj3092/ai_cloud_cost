import { Request, Response } from 'express';

export const getDashboard = (req: Request, res: Response) => {
  res.json({
    totalCost: 12450.00,
    potentialSavings: 3200.50,
    activeAnomalies: 2,
    optimizedResources: 145
  });
};

export const getAiActions = (req: Request, res: Response) => {
  res.json([
    {
      id: '1',
      title: 'Downsize RDS Instance',
      description: 'Database prod-db-1 is over-provisioned based on past 30 days CPU utilization.',
      savingsEstimate: 450.00,
      confidence: 0.95
    },
    {
      id: '2',
      title: 'Delete Unattached EBS Volumes',
      description: 'Found 5 unattached volumes in us-east-1.',
      savingsEstimate: 120.00,
      confidence: 0.99
    }
  ]);
};

export const getAnalytics = (req: Request, res: Response) => {
  res.json({
    timeSeries: [
      { date: '2023-10-01', cost: 400 },
      { date: '2023-10-02', cost: 420 },
      { date: '2023-10-03', cost: 390 },
      { date: '2023-10-04', cost: 410 },
      { date: '2023-10-05', cost: 450 }
    ]
  });
};

export const getInfrastructure = (req: Request, res: Response) => {
  res.json([
    { id: 'i-0abcd1234', type: 'EC2 Instance', status: 'Running', cost: 120.50 },
    { id: 'db-1a2b3c', type: 'RDS Instance', status: 'Running', cost: 340.00 }
  ]);
};

export const getCodeToCost = (req: Request, res: Response) => {
  res.json([
    { commit: 'a1b2c3d', author: 'alice@example.com', costDelta: '+15.00' },
    { commit: 'e4f5g6h', author: 'bob@example.com', costDelta: '-5.00' }
  ]);
};

export const chatWithAi = (req: Request, res: Response) => {
  const { message } = req.body;
  res.json({
    reply: `You asked: "${message}". I'm an AI assistant. How can I help you optimize your cloud costs further?`
  });
};
