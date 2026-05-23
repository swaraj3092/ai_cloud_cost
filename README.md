# ⚡ AI Cloud Cost Agent

> An intelligent, real-time cloud infrastructure cost optimization dashboard powered by Groq and Llama 3.

![Project Preview](./frontend/src/assets/preview.png) *(Note: Add a screenshot of your dashboard here!)*

## 🏆 Overview
Cloud infrastructure bills are complex, opaque, and often full of hidden waste. This project solves that by combining a **premium SaaS dashboard** with a **context-aware AI Agent**. 

Instead of generic chatbot responses, the AI Agent is securely hooked into your live infrastructure database. It acts as a senior DevOps engineer—identifying anomalies, answering complex billing questions, and providing actionable recommendations in milliseconds.

## ✨ Key Features
- **Context-Aware AI Chat:** Powered by the lightning-fast Groq API (`llama-3.1-8b-instant`), the agent reads live SQLite metrics to answer exact questions about your spend.
- **Premium UI/UX:** A stunning, modern dark-mode aesthetic utilizing glassmorphism, dynamic ambient glows, and fluid animations (Framer Motion).
- **Pro-Level Navigation:** Fully functional Command Palette (Cmd+K) and keyboard-driven navigation (Press 1-4) for power users.
- **Real-Time Analytics:** Interactive charts (Recharts) and progressive disclosure for tracking potential savings and active anomalies.

## 🛠️ Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Framer Motion, Recharts, Lucide Icons.
- **Backend**: Node.js, Express.js, Prisma ORM, SQLite.
- **AI Integration**: Groq SDK (Llama 3.1).

## 🚀 Running Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/ai-cloud-cost-agent.git
   cd ai-cloud-cost-agent
   ```

2. **Start the Backend:**
   ```bash
   cd backend
   npm install
   
   # Add your Groq API key
   echo "GROQ_API_KEY=gsk_your_key_here" > .env
   echo "PORT=5000" >> .env
   
   # Seed the SQLite database
   npx prisma generate
   npx prisma db seed
   
   # Run the server
   npm run dev
   ```

3. **Start the Frontend:**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```
4. Open `http://localhost:5173` in your browser.

## ☁️ Deployment
This project is architected to be easily deployed:
- **Frontend** deployed on Vercel.
- **Backend** (with local SQLite DB) deployed on Render.com.

---
*Built with ❤️ for the AI Builders Hackathon.*
