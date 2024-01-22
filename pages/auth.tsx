import Input from "@/components/Input";
import Image from "next/image";
import React, { useState, useCallback } from "react";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");
  const toggleVariants = useCallback(() => {
    setVariant((variants) => (variants === "login" ? "register" : "login"));
  }, []);
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
            <button className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
              {variant === "login" ? "Login" : "Register"}
            </button>
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
