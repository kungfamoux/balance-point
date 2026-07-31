import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const plans = [
    {
      slug: 'regular',
      name: 'Regular',
      tagline: '2 Weeks',
      minDeposit: 200,
      maxDeposit: 999.99,
      roiPercent: 400, // $200 -> $1,000 = 400% ROI
      referralPercent: 5,
      durationDays: 14,
      sortOrder: 1,
    },
    {
      slug: 'bronze',
      name: 'Bronze',
      tagline: '1 Month',
      minDeposit: 1000,
      maxDeposit: 9999.99,
      roiPercent: 900, // $1,000 -> $10,000 = 900% ROI
      referralPercent: 5,
      durationDays: 30,
      sortOrder: 2,
    },
    {
      slug: 'silver',
      name: 'Silver',
      tagline: '2 Months',
      minDeposit: 10000,
      maxDeposit: 49999.99,
      roiPercent: 400, // $10,000 -> $50,000 = 400% ROI
      referralPercent: 5,
      durationDays: 60,
      sortOrder: 3,
    },
    {
      slug: 'gold',
      name: 'Gold',
      tagline: '3 Months',
      minDeposit: 50000,
      maxDeposit: 149999.99,
      roiPercent: 200, // $50,000 -> $150,000 = 200% ROI
      referralPercent: 5,
      durationDays: 90,
      sortOrder: 4,
    },
    {
      slug: 'diamond',
      name: 'Diamond',
      tagline: '6 Months',
      minDeposit: 150000,
      maxDeposit: 999999999,
      roiPercent: 566.67, // $150,000 -> $1,000,000 = 566.67% ROI
      referralPercent: 5,
      durationDays: 180,
      sortOrder: 5,
    },
  ]

  for (const plan of plans) {
    await prisma.plan.upsert({
      where: { slug: plan.slug },
      update: plan,
      create: plan,
    })
  }

  console.log('✅ Plans seeded successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
