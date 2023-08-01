import Image from "next/image";
import { Login } from "@/components/Login/Login";
export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-evenly mx-5">
      Login Page
      <Login />
    </main>
  );
}
