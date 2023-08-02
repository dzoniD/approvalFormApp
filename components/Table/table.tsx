"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { ActionsTable } from "./actionsTable";

interface TableData {
  id: number;
  name: string;
  email: string;
  phone: number;
  form_name: string;
  form_status: string;
  total_waiting_time: string;
  actions?: {
    id: number;
    action: string;
    "action-start-time": string;
    "waiting-time": string;
  }[];
}

interface test {
  [key: number]: boolean;
}

interface TableProps {
  formId?: number;
  tableHeaderColums: string[];
}

export const Table = ({ tableHeaderColums, formId }: TableProps) => {
  const router = useRouter();

  const [tableData, setTableData] = useState<TableData[]>([]);
  const [actionsData, setActionsData] = useState([]);
  const [checkboxSelected, setCheckboxSelected] = useState<test>({});
  const [homePage, setHomePage] = useState(true);

  useEffect(() => {
    const fetchTableData = async () => {
      const response = await fetch("http://localhost:4000/forms");
      const dbData = await response.json();

      let checkBoxes = dbData.forEach((checkbox: TableData) => {
        if (checkboxSelected[checkbox.id]) return;

        checkboxSelected[checkbox.id] = false;
      });

      // setCheckboxSelected(checkBoxes);

      if (window.location.pathname === `/form-details-page/${formId}`) {
        let tableFields =
          formId && dbData.filter((field: TableData) => field.id === +formId);
        setTableData(tableFields);
        setActionsData(tableFields[0].actions);
        setHomePage(false);
        return;
      }
      setTableData(dbData);
    };

    fetchTableData();
  }, []);

  const deleteHandler = async (ids: number | number[]) => {
    let deleteResponse;
    let newData;

    let cookie = Cookies.get("isLoggedIn");
    let { isSuperAdmin } = cookie && JSON.parse(cookie);

    if (Array.isArray(ids)) {
      if (!isSuperAdmin) return;

      ids.forEach(async (id) => {
        deleteResponse = await fetch(`http://localhost:4000/forms/${id}`, {
          method: "DELETE",
        });
        await deleteResponse.json();
      });

      newData = tableData.filter((field) => !ids.includes(field.id));
      return setTableData(newData);
    }
    deleteResponse = await fetch(`http://localhost:4000/forms/${ids}`, {
      method: "DELETE",
    });
    await deleteResponse.json();

    newData = tableData.filter((field) => field.id !== ids);
    setTableData(newData);
  };

  const isAnyCheckboxSelected = Object.keys(checkboxSelected).filter((val) => {
    if (checkboxSelected[val] === true) {
      return checkboxSelected;
    }
  });

  return (
    <section>
      {homePage && (
        <button
          className={`py-3 px-6 ${
            isAnyCheckboxSelected.length ? "bg-red-500 " : "bg-gray-500 "
          }rounded-md text-white mb-4`}
          disabled={isAnyCheckboxSelected.length ? false : true}
          onClick={() => {
            if (isAnyCheckboxSelected.length === 1) {
              deleteHandler(+isAnyCheckboxSelected[0]);
            }

            if (isAnyCheckboxSelected.length > 1) {
              let checkedFieldsNumArr = isAnyCheckboxSelected.map((id) => +id);
              deleteHandler(checkedFieldsNumArr);
            }
          }}
        >
          Delete
        </button>
      )}
      {!homePage && (
        <button
          className={`py-3 px-6 bg-green-500 rounded-md text-white mb-4`}
          onClick={() => {
            router.back();
          }}
        >
          Back
        </button>
      )}
      <div className="border-solid border-b-0 border-2 rounded-md bg-white border-gray-400">
        <div className="flex ">
          {homePage && (
            <div className="p-3 w-44 flex-1 border-r-2 border-b-2  border-gray-400"></div>
          )}
          {tableHeaderColums.map((column) => {
            if (column === "Action") {
              return (
                <div className="p-3 w-[220px] border-b-2 border-gray-400">
                  Action
                </div>
              );
            }
            return (
              <div className="p-3 w-44 flex-1 border-r-2 border-b-2  border-gray-400">
                {column}
              </div>
            );
          })}
        </div>
        {tableData &&
          tableData.map((field) => {
            return (
              <div className="flex   ">
                {homePage && (
                  <div className="p-3 w-44 flex-1 border-r-2 border-b-2  border-gray-400 break-normal text-right">
                    <input
                      type="checkbox"
                      checked={checkboxSelected[field.id]}
                      onChange={() => {
                        setCheckboxSelected({
                          ...checkboxSelected,
                          [field.id]: !checkboxSelected[field.id],
                        });
                      }}
                      name="checkbox"
                      id=""
                      className="h-5 w-5"
                    />
                  </div>
                )}

                <div className="p-3 w-44 flex-1 border-r-2 border-b-2 border-gray-400 break-normal">
                  {field.id}
                </div>
                <div className="p-3 w-44 flex-1 border-r-2 border-b-2 border-gray-400 break-normal">
                  {field.name}
                </div>
                <div className="p-3 w-44 flex-1 border-r-2 border-b-2 border-gray-400 break-normal">
                  {field.email}
                </div>
                <div className="p-3 w-44 flex-1 border-r-2 border-b-2 border-gray-400 break-normal">
                  {field.phone}
                </div>
                <div className="p-3 w-44 flex-1 border-r-2 border-b-2 border-gray-400 break-normal">
                  {field.form_name}
                </div>
                <div className="p-3 w-44 flex-1 border-r-2 border-b-2 border-gray-400 break-normal">
                  {field.form_status}
                </div>
                {homePage ? (
                  ""
                ) : (
                  <div className="p-3 w-44 flex-1 border-r-2 border-b-2 border-gray-400 break-normal">
                    {field.total_waiting_time}
                  </div>
                )}
                {homePage && (
                  <div className="p-3 w-[220px]  flex border-b-2 first:border-b-0 border-gray-400">
                    <Link href={`/form-details-page/${field.id}`}>
                      <button className="py-3 px-6 bg-blue-400 rounded-md text-white  inline-block mr-3">
                        View
                      </button>
                    </Link>
                    {!checkboxSelected[field.id] && (
                      <button
                        className="py-3 px-6 bg-red-500 rounded-md text-white  inline-block"
                        onClick={() => deleteHandler(field.id)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
      </div>
      {!homePage && (
        <ActionsTable
          actionsData={actionsData}
          tableHeaderColums={[
            "ID",
            "Actions",
            "Action start time",
            "Waiting time",
          ]}
        />
      )}
    </section>
  );
};
