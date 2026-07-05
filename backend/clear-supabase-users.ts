import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config();

async function clearSupabaseUsers() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing SUPABASE_URL or SUPABASE_SECRET_KEY environment variables');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  console.log('Fetching all users from Supabase...');
  
  const { data: { users }, error } = await supabase.auth.admin.listUsers();
  
  if (error) {
    console.error('Error fetching users:', error);
    process.exit(1);
  }

  console.log(`Found ${users.length} users`);

  if (users.length === 0) {
    console.log('No users to delete');
    return;
  }

  console.log('Deleting users...');
  let deletedCount = 0;

  for (const user of users) {
    try {
      const { error: deleteError } = await supabase.auth.admin.deleteUser(user.id);
      if (deleteError) {
        console.error(`Error deleting user ${user.id}:`, deleteError);
      } else {
        deletedCount++;
        console.log(`✓ Deleted user: ${user.email || user.id}`);
      }
    } catch (err) {
      console.error(`Error deleting user ${user.id}:`, err);
    }
  }

  console.log(`\nSuccessfully deleted ${deletedCount} out of ${users.length} users`);
}

clearSupabaseUsers()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  });
