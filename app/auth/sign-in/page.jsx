"use client";

import React, { use, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SignInWithGoogleButton from "@/components/custom/SignInWithGoogleButton";
import { login } from "@/services/user-auth-services";
import { validateSignInData } from "@/services/validate-auth-data";

function page() {
  // Form data
  const defaultValues = { email: "", password: "" };
  const [userData, setUserData] = useState(defaultValues);
  const [formErrors, setFormErrors] = useState({});

  const { isLoading, setLoading, globalUserData, setGlobalUserData } =
    useAuthContext();

  //Router
  const router = useRouter();

  // If global data availbale push it to home page
  useEffect(() => {
    globalUserData && router.push("/dashboard/home");
  }, [router, globalUserData]);

  // Form Submission
  function handleInputChange(e) {
    const { value, name } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  }

  async function handleFormSubmission(e) {
    e.preventDefault();

    const { isValid, errors } = await validateSignInData(userData);

    if (!isValid) {
      setFormErrors(errors);
      return;
    }
    console.log(formErrors);

    const { email, password } = userData;

    try {
      const user = await login(email, password);

      if (user) {
        setGlobalUserData(user);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full md:max-w-[400px] flex flex-col gap-6">
      <h1 className="font-semibold text-3xl flex tracking-wide flex-col">
        <span>Log in</span>
        <span>your account</span>
      </h1>

      {/* Login Form */}
      <div className="w-full">
        <form className="">
          <div className="mb-8 flex flex-col gap-2">
            <div className="flex flex-col items-start gap-1">
              <label htmlFor="email" className="font-semibold tracking-wide">
                Email
              </label>
              <Input
                type="text"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                className="rounded-lg"
              ></Input>
              {formErrors.email && (
                <span className="text-red-500 text-sm">{formErrors.email}</span>
              )}
            </div>

            {/* password */}
            <div className="flex flex-col items-start gap-1">
              <label htmlFor="password" className="font-semibold tracking-wide">
                Password
              </label>
              <Input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleInputChange}
                className="rounded-lg"
              ></Input>
              {formErrors.password && (
                <span className="text-red-500 text-sm">
                  {formErrors.password}
                </span>
              )}
            </div>
          </div>

          <Button
            type="submit"
            onClick={handleFormSubmission}
            disabled={isLoading}
            className="bg-mainColur w-full text-lg rounded-lg"
          >
            Sign In
          </Button>
        </form>

        {/* Sign In With Google */}
        <div className="mt-6">
          <div className="flex items-center mb-6">
            <hr className="flex-grow border-white" />

            {/* Text */}
            <span className="px-4  text-sm">Login with</span>

            {/* Right Line */}
            <hr className="flex-grow border-white" />
          </div>

          <div className="flex justify-center">
            <SignInWithGoogleButton></SignInWithGoogleButton>
          </div>
        </div>

        <div className="w-full flex justify-center gap-1 mt-10 text-center">
          <Link href="/auth/sign-up">
            Don't Have an Account? {"  "}
            <span className="text-mainColur">Create new account</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default page;
