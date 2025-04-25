// // Firebase setup (comment out if using Supabase)

// import { getFirestore, collection, addDoc } from "firebase/firestore"; 
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// const db = getFirestore();
// const auth = getAuth();

// async function addInvestment(userId: string, amount: number) {
//   try {
//     const docRef = await addDoc(collection(db, "investments"), {
//       userId,
//       amount,
//       timestamp: new Date(),
//     });
//     console.log("Document written with ID: ", docRef.id);
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// }

// async function signup(email: string, password: string) {
//   try {
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     console.log("User signed up: ", userCredential.user);
//   } catch (e) {
//     console.error("Error signing up: ", e);
//   }
// }

// // Un-comment the next section if you're using Firebase and comment out the Supabase code

// // export { addInvestment, signup };


