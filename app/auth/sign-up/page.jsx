"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SignInWithGoogleButton from "@/components/custom/SignInWithGoogleButton";
import { useRouter } from "next/navigation";
import { createNewUserWithEmailAndPassword } from "@/services/user-auth-services";
import { useAuthContext } from "@/context/AuthContext";
import { validateSignUpData } from "@/services/validate-auth-data";
import { useToast } from "@/hooks/use-toast";

function page() {
  const defaultValues = { name: "", email: "", password: "" };
  const [userData, setUserData] = useState(defaultValues);
  const [formErrors, setFormErrors] = useState({});
  const router = useRouter();
  const { toast } = useToast();
  // Global Context
  const { isLoading, setLoading, globalUserData } = useAuthContext();

  // If global data availbale push it to home page
  useEffect(() => {
    globalUserData && router.push("/auth/sign-in");
  }, [router, globalUserData]);

  function handleInputChange(e) {
    const { value, name } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value.trim() }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  }

  async function handleFormSubmition(e) {
    e.preventDefault();
    const { isValid, errors } = await validateSignUpData(userData);
    if (!isValid) {
      setFormErrors(errors);
      return;
    }
    const { email, password, name } = userData;
    setLoading(true);
    try {
      const user = await createNewUserWithEmailAndPassword(
        name,
        email,
        password
      );
      if (user) {
        toast({ description: "Account created sucessfully" });
        router.push("/auth/sign-in");
      }
    } catch (error) {
      toast({ description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full md:max-w-[400px] flex flex-col gap-6">
      <h1 className="font-semibold text-3xl flex tracking-wide flex-col">
        <span>Create</span>
        <span>your new account</span>
      </h1>

      {/* Login Form */}
      <div className="w-full">
        <form className="">
          <div className="mb-8 flex flex-col gap-2">
            {/* First Name */}
            <div className="flex flex-col items-start gap-1">
              <label htmlFor="password" className="font-semibold tracking-wide">
                Name
              </label>
              <Input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                className="rounded-lg"
              ></Input>
              {formErrors.name && (
                <span className="text-red-500 text-sm">{formErrors.name}</span>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col items-start gap-1">
              <label htmlFor="password" className="font-semibold tracking-wide">
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
                className="rounded-lg "
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
            onClick={handleFormSubmition}
            disabled={isLoading}
            className="bg-mainColur w-full rounded-lg text-lg"
          >
            Register
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
          <Link href="/auth/sign-in">
            Already have an Account? {"  "}
            <span className="text-mainColur">Login to account</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default page;
