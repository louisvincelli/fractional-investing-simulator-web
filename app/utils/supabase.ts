// // Supabase setup (comment out if using Firebase)

// import { createClient } from '@supabase/supabase-js';

// const supabase = createClient('https://your-project-url.supabase.co', 'public-anon-key');

// async function addInvestment(userId: string, amount: number) {
//   const { data, error } = await supabase
//     .from('investments')
//     .insert([
//       { user_id: userId, amount, timestamp: new Date() }
//     ]);
  
//   if (error) {
//     console.error('Error inserting investment: ', error);
//   } else {
//     console.log('Investment added: ', data);
//   }
// }

// async function signup(email: string, password: string) {
//   const { user, error } = await supabase.auth.signUp({ email, password });
  
//   if (error) {
//     console.error('Error signing up: ', error);
//   } else {
//     console.log('User signed up: ', user);
//   }
// }

// Un-comment the next section if you're using Supabase and comment out the Firebase code

// export { addInvestment, signup };
