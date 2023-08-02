import { SignIn } from "@/components/Login/SignIn";
import Image from "next/image";
import Cookies from "js-cookie";
import { Button } from "@/components/Button/button";
import { Table } from "@/components/Table/table";

export default function Home() {
  let tableHeader = [
    "ID",
    "Name",
    "Email",
    "Phone",
    "Form name",
    "Form status",
    "Action",
  ];

  return (
    <main className="flex min-h-screen  flex-col items-center justify-evenly mx-5">
      HOME PAGE
      <Table tableHeaderColums={tableHeader} />
      <Button>Log out</Button>
    </main>
  );
}
