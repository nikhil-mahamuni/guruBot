import { NextResponse } from "next/server";
import {
  getDoc,
  serverTimestamp,
  setDoc,
  doc
} from "firebase/firestore";
import { db } from "@/utils/firebase";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, name, uid } = body;

    // Reference to the user document
    const userRef = doc(db, "users", uid); // Use email as the document ID
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return NextResponse.json(
        { message: "User already exists! Please Login" },
        { status: 200 }
      );
    }

    await setDoc(userRef, {
      accountType: "free",
      createdAt: serverTimestamp(),
      displayName: name,
      email: email,
      lastActive: serverTimestamp(),
    });

    // Send a response
    return NextResponse.json(
      { message: "New User created sucessfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to create new User Try again",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
