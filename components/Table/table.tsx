'use client'
import Link from "next/link"
import { useEffect, useState } from "react"

interface TableData {
    id: number,
      name: string
      email: string,
      phone: number,
      form_name: string,
      form_status: string,
      total_waiting_time: string
}

export const Table = () => {
    const [formData, setFormData] = useState<TableData[]>([])


    useEffect(() => {
        const fetchTableData = async () => {
            const response =  await fetch("http://localhost:4000/forms")
            const dbData = await response.json()

            setFormData(dbData)
        }

        fetchTableData()

        
    },[])

    const deleteHandler = async (id) => {
      const deleteResponse = await fetch(`http://localhost:4000/forms/${id}`,{
        method: "DELETE",
    });
      await deleteResponse.json()
      let newData = formData.filter(field => field.id !== id)
      setFormData(newData)
    }

    return (
        <section>
            <button className="py-3 px-6 bg-red-500 rounded-md text-white mb-4">Delete</button>
        <div className="border-solid border-b-0 border-2 rounded-md bg-white border-gray-400">
          <div className="flex ">
            <div className="p-3 w-44 flex-1 border-r-2 border-b-2  border-gray-400"></div>
            <div className="p-3 w-44 flex-1 border-r-2 border-b-2  border-gray-400">ID</div>
            <div className="p-3 w-44 flex-1 border-r-2 border-b-2  border-gray-400">Name</div>
            <div className="p-3 w-44 flex-1 border-r-2 border-b-2  border-gray-400">Email</div>
            <div className="p-3 w-44 flex-1 border-r-2 border-b-2  border-gray-400">Phone</div>
            <div className="p-3 w-44 flex-1 border-r-2 border-b-2  border-gray-400">Form name</div>
            <div className="p-3 w-44 flex-1 border-r-2 border-b-2  border-gray-400">Form status</div>
            <div className="p-3 w-[220px] border-b-2 border-gray-400">Action</div>
           
          </div>
          {formData && formData.map((field) => {
            return (
                <div className="flex   ">
                <div className="p-3 w-44 flex-1 border-r-2 border-b-2  border-gray-400 break-normal text-right"><input type="checkbox" name="checkbox" id="" className="h-5 w-5" /></div>
                <div className="p-3 w-44 flex-1 border-r-2 border-b-2 border-gray-400 break-normal">{field.id}</div>
                <div className="p-3 w-44 flex-1 border-r-2 border-b-2 border-gray-400 break-normal">{field.name}</div>
                <div className="p-3 w-44 flex-1 border-r-2 border-b-2 border-gray-400 break-normal">{field.email}</div>
                <div className="p-3 w-44 flex-1 border-r-2 border-b-2 border-gray-400 break-normal">{field.phone}</div>
                <div className="p-3 w-44 flex-1 border-r-2 border-b-2 border-gray-400 break-normal">{field.form_name}</div>
                <div className="p-3 w-44 flex-1 border-r-2 border-b-2 border-gray-400 break-normal">{field.form_status}</div>
                <div className="p-3 w-[220px]  flex border-b-2 first:border-b-0 border-gray-400">
                    <Link href={"/form-details-page"}><button className="py-3 px-6 bg-blue-400 rounded-md text-white  inline-block mr-3">View</button></Link> 
                    <button className="py-3 px-6 bg-red-500 rounded-md text-white  inline-block" onClick={() => deleteHandler(field.id)}>Delete</button>
                </div>
                </div>
            )
          })}
        </div>
      </section>
    )
}