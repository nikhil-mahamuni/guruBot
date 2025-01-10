import { auth, db } from "@/utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import { validateSignInData, validateSignUpData } from "./validate-auth-data";
import { doc, serverTimestamp, updateDoc, getDoc } from "firebase/firestore";

//Create new user account with email and password credentials
export async function createNewUserWithEmailAndPassword(name, email, password) {
  await validateSignUpData({ name, email, password });
  console.log("Users data", [email, password, name]);

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const uid = userCredential.user.uid;
    console.log(userCredential);

    await updateProfile(userCredential.user, { displayName: name });

    const response = await fetch("/api/auth/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, name, uid }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to create user data");
    }

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Login to existing account
export async function login(email, password) {
  await validateSignInData({ password, email });
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in:", error.message);
  }
}

// Create account with google or sign In with Google
export async function handleSignInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw new Error(error.message);
  }
}

// Log out user
export async function logout(uid) {
  try {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, { lastActive: serverTimestamp() });
    await signOut(auth);
  } catch (error) {
    console.error("Error logging out:", error);
    throw new Error(error.message);
  }
}
