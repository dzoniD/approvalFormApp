import Image from "next/image";
import { Login } from "@/components/Login/Login";
import { Table } from "@/components/Table/table";
interface FormDetailsPageProps {
  params: { id: number };
}

export default function FormDetailsPage({ params }: FormDetailsPageProps) {
  let tableHeader = [
    "ID",
    "Name",
    "Email",
    "Phone",
    "Form name",
    "Form status",
    "Total waiting time",
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-evenly mx-5">
      Form Details Page
      <Table formId={params.id} tableHeaderColums={tableHeader} />
    </main>
  );
}
