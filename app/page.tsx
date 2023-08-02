import { SignIn } from "@/components/Login/SignIn";
import Image from "next/image";
import Cookies from "js-cookie";
import { Button } from "@/components/Button/button";

export default function Home() {
  console.log("-==HOME==")
  return (
    <main className="flex min-h-screen  flex-col items-center justify-evenly mx-5">
      HOME PAGE
      <Button>Log out</Button>
    </main>
  );
}
