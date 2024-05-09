"use client";
import React, { useState } from "react";
import ImageComponent from "../../components/ImageComponent";
import { User, fetchUser, useAppDispatch } from "../../redux/store";
import { useRouter } from "next/navigation";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();
  return (
    <>
      <div className="flex bg-BackgroundBlue h-screen w-screen flex-col items-center justify-center p-24">
        <div className="bg-GrayLight  w-1/2 rounded-md p-10 relative">
          <h1 className="text-lg font-bold mb-2">Login</h1>
          <div className="text-sm font-light mb-4">
            Welcome back please login
          </div>

          <div className="mb-4">
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border rounded-md bg-GrayGalaxy  focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border bg-GrayGalaxy rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="bg-ButtonColor w-full text-white px-4 py-2 rounded-md hover:bg-blue-600 mb-4"
            onClick={() =>
              dispatch(fetchUser({ email, password })).then(
                (res: any) => res?.payload?.isLoggedIn && router.push("/"),
              )
            }
          >
            Login
          </button>
          <div className="text-sm text-center font-light text-gray mb-4">
            Create a new account or register
          </div>
          <ImageComponent
            src="/images/login_icon.png"
            alt="login image"
            className="absolute -left-10 -top-10"
          />
        </div>
      </div>
    </>
  );
};

export default LoginComponent;
