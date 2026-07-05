import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearDatabase() {
  console.log('Starting database cleanup...');

  // Delete in order to respect foreign key constraints
  await prisma.ticketMessage.deleteMany({});
  console.log('✓ Cleared ticket_messages');

  await prisma.ticket.deleteMany({});
  console.log('✓ Cleared tickets');

  await prisma.kycDocument.deleteMany({});
  console.log('✓ Cleared kyc_documents');

  await prisma.investment.deleteMany({});
  console.log('✓ Cleared investments');

  await prisma.transaction.deleteMany({});
  console.log('✓ Cleared transactions');

  await prisma.wallet.deleteMany({});
  console.log('✓ Cleared wallets');

  await prisma.referral.deleteMany({});
  console.log('✓ Cleared referrals');

  await prisma.copyFollow.deleteMany({});
  console.log('✓ Cleared copy_follows');

  await prisma.profile.deleteMany({});
  console.log('✓ Cleared profiles');

  await prisma.publicLedger.deleteMany({});
  console.log('✓ Cleared public_ledger');

  await prisma.liveSession.deleteMany({});
  console.log('✓ Cleared live_sessions');

  // Note: Plans are typically configuration data, so we keep them
  // If you want to clear plans too, uncomment the line below:
  // await prisma.plan.deleteMany({});
  // console.log('✓ Cleared plans');

  console.log('Database cleanup completed!');
  console.log('Admin credentials are preserved in environment variables (.env file)');
}

clearDatabase()
  .catch((e) => {
    console.error('Error clearing database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
