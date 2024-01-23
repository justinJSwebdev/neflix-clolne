import Input from "@/components/Input";
import axios from "axios";
import Image from "next/image";
import React, { useState, useCallback } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function AuthForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");
  const toggleVariants = useCallback(() => {
    setVariant((variants) => (variants === "login" ? "register" : "login"));
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
        callbackUrl: "/",
      });
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  }, [email, password, router]);

  const register = useCallback(async () => {
    console.log(email);
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });
      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password, login]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={160}
            height={48}
          ></Image>
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Login" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              <Input
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={(e: any) => {
                  setEmail(e.target.value);
                }}
              ></Input>
              {variant === "register" && (
                <Input
                  id="name"
                  label="Name"
                  value={name}
                  onChange={(e: any) => {
                    setName(e.target.value);
                  }}
                ></Input>
              )}
              <Input
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e: any) => {
                  setPassword(e.target.value);
                }}
              ></Input>
            </div>
            <button
              onClick={variant === "login" ? login : register}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {variant === "login" ? "Login" : "Register"}
            </button>
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div
                onClick={() => signIn("google", { callbackUrl: "/" })}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FcGoogle size={32} />
              </div>
              <div
                onClick={() => signIn("github", { callbackUrl: "/" })}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FaGithub size={32} />
              </div>
            </div>
            <p className="text-neutral-500 mt-12 text-md">
              {variant === "login"
                ? "First time using Netflix?"
                : "Already Has An Account?"}
              <span
                className="text-white ml-1 hover:underline cursor-pointer text-sm"
                onClick={toggleVariants}
              >
                {variant === "login" ? "Create an account" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
