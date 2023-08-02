"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const Button = ({ children }: { children: string }) => {
  const router = useRouter();
  return (
    <button
      className="border p-2 rounded-md bg-black text-white"
      onClick={() => {
        Cookies.remove("isLoggedIn");
        router.push("/login");
      }}
    >
      {children}
    </button>
  );
};
