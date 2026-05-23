import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. DashboardMetric
  await prisma.dashboardMetric.create({
    data: {
      totalCost: 12450.00,
      potentialSavings: 3200.50,
      activeAnomalies: 2,
      optimizedResources: 145,
    },
  });

  // 2. AiActions
  await prisma.aiAction.createMany({
    data: [
      {
        title: 'Downsize RDS Instance',
        description: 'Database prod-db-1 is over-provisioned based on past 30 days CPU utilization.',
        savingsEstimate: 450.00,
        confidence: 0.95,
      },
      {
        title: 'Delete Unattached EBS Volumes',
        description: 'Found 5 unattached volumes in us-east-1.',
        savingsEstimate: 120.00,
        confidence: 0.99,
      },
    ],
  });

  // 3. AnalyticsData
  await prisma.analyticsData.createMany({
    data: [
      { date: '2023-10-01', cost: 400 },
      { date: '2023-10-02', cost: 420 },
      { date: '2023-10-03', cost: 390 },
      { date: '2023-10-04', cost: 410 },
      { date: '2023-10-05', cost: 450 },
    ],
  });

  // 4. InfrastructureResource
  await prisma.infrastructureResource.createMany({
    data: [
      { resourceId: 'i-0abcd1234', type: 'EC2 Instance', status: 'Running', cost: 120.50 },
      { resourceId: 'db-1a2b3c', type: 'RDS Instance', status: 'Running', cost: 340.00 },
    ],
  });

  // 5. CodeDeployment
  await prisma.codeDeployment.createMany({
    data: [
      { commitHash: 'a1b2c3d', author: 'alice@example.com', costDelta: '+15.00' },
      { commitHash: 'e4f5g6h', author: 'bob@example.com', costDelta: '-5.00' },
    ],
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
