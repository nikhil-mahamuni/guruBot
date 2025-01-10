import { isValid, z } from "zod";

// Function to validate signup data
export async function validateSignUpData(data) {
  const signUpSchema = z.object({
    email: z.string().email("Please provide a valid email address."),
    password: z.string().min(6, "Password must be at least 6 characters."),
    name: z.string().min(2, "Name must be at least 2 characters long."),
  });

  try {
    signUpSchema.parse(data);
    return { isValid: true, errors: {} };
  } catch (error) {
    console.log(error);

    const errors = {};

    error.errors.forEach((err) => {
      errors[err.path[0]] = err.message;
    });
    return { isValid: false, errors };
  }
}

// Function to validate signup data
export async function validateSignInData(data) {
  const signInSchema = z.object({
    email: z.string().email("Please provide a valid email address."),
    password: z.string().min(6, "Password must be at least 6 characters."),
  });

  try {
    signInSchema.parse(data);
    return { isValid: true, errors: {} };
  } catch (error) {
    const errors = {};
    error.errors.forEach((err) => {
      errors[err.path[0]] = err.message;
    });
    return { isValid: false, errors };
  }
}
