"use client";
import Link from "next/link";
import React, { useState, type FC, useCallback, useEffect } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { type FieldsType, type FormValues } from "./SignIn";
import { validation } from "./validation";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation';
import { EyeIcon } from "./icons/eyeIcon";
import { EyeSlashIcon } from "./icons/eye-slash";
import { checkEmail } from "@/utils/checkEmail";

interface LoginFieldsType extends Omit<FieldsType, "id"> {
  id: "email" | "password";
}

export const Login: FC = () => {
  const router = useRouter();


  const { register, watch, formState, getValues, handleSubmit } =
    useForm<FormValues>({
      defaultValues: {
        email: "",
        password: "",
      },
      mode: "onBlur",
    });

  const { errors } = formState;
  const [showPassword, setShowPassword] = useState(false);
  const [logInError, setLogInError] = useState('');

  const fields: LoginFieldsType[] = [
    {
      id: "email",
      label: "Email",
      name: "email",
      placeholder: "Email address",
      validation: validation.emailValidationRequirements,
      isError: !!errors.email?.type,
      errorMessage: errors.email?.message,
      aria: errors.email ? "true" : "false",
    },
    {
      id: "password",
      placeholder: "Lozinka",
      name: "password",
      label: "Password",
      type: showPassword ? "text" : "password",
      validation: validation.passwordValidationRequirements,
      isError: !!errors.password?.type,
      errorMessage: errors.password?.message,
      aria: errors.password ? "true" : "false",
      children: (
        <button
          className="relative cursor-pointer p-3"
          onClick={(e) => {
            e.preventDefault();
            setShowPassword(!showPassword);
          }}
        >
          {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
        </button>
      ),
    },
  ];

  
  const logIn: SubmitHandler<FormValues> = async (data,e) => {
    
    e?.preventDefault()
    

    const response =  await fetch("http://localhost:4000/users")
    const dbData = await response.json()
    const exists = checkEmail(dbData,data)

    if(exists && exists.email){
      let t = Cookies.set("isLoggedIn", data.email);
      router.refresh()
      return;
    }
    
    setLogInError("User doesnt exists, please Sign in first.")

  };

  return (
    <>
      <div className="relative max-w-[480px] w-full rounded-md border bg-white px-7 pb-14 pt-7">
        <h1 className="mb-4 text-center text-lg font-bold">Log in form</h1>{" "}
        <span className="mb-5 mt-1 inline-block">
          Dont have an account?
          <Link href={"/signin"} className="ml-1  bg-blue-500 text-cyan-50 p-2 rounded-md">
            Sign up!
          </Link>
        </span>
        <form onSubmit={handleSubmit(logIn)}>
          {fields.map((field, i) => {
            return (
              <div
                key={"field" + i}
                className="flex  max-w-[490px] w-full flex-col mb-5"
              >
                <label className="block text-left" htmlFor={field.id}>
                  {field.label}
                </label>
                <div className="relative flex grow items-center">
                  <input
                    type={field.type}
                    id={field.id}
                    {...register(field.id, field.validation)}
                    placeholder={field.placeholder}
                    className={`py-2.5 pr-2.5 mt-1  text-base w-full focus-visible:outline-none h-10  pl-3 rounded-md border border-solid placeholder:text-gGray-600 bg-white  border-black/10 undefined`}
                  ></input>
                  <div
                    className={`absolute flex justify-center h-10 text-center items-center right-0`} //${position}`}
                  >
                    {field.children}
                  </div>
                </div>
                {field.isError ? (
                  <div className="ml-2 mt-1 text-red-600 font-normal">
                    {field.errorMessage}
                  </div>
                ) : (
                  ""
                )}
              </div>
            );
          })}
          <Link href={"/"} className="mb-5 inline-block">
            <span className="!text-blue-600"> Forgot your password?</span>
          </Link>
          <div>
            <button
              type="submit"
              className={`rounded py-1.5 text-cyan-100 px-5 bg-blue-500 border border-slate-300 hover:bg-bgPrimary h-11 w-full`}
            >
              Log in
            </button>
          </div>

        <p className="text-red-500 font-semibold text-base mt-3">{logInError}</p>
        </form>
      </div>
    </>
  );
};
