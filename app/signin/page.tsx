import { SignIn } from "@/components/Login/SignIn";
import Image from "next/image";

export default function SigninPage() {
  return (
    <main className="flex min-h-screen  flex-col items-center justify-evenly mx-5">
      <SignIn />
    </main>
  );
}
