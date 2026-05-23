import { defineConfig } from '@prisma/config'

export default defineConfig({
  migrations: {
    seed: 'npx ts-node prisma/seed.ts',
  },
  datasource: {
    url: 'file:./dev.db',
  },
})
