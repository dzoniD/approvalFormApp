import React from "react";

interface ActionsTableProps {
  actionsData: {
    id: number;
    action: string;
    "action-start-time": string;
    "waiting-time": string;
  }[];
  tableHeaderColums: string[];
}

export const ActionsTable = ({
  actionsData,
  tableHeaderColums,
}: ActionsTableProps) => {
  return (
    <div className="border-solid mt-12 border-b-0 border-2 rounded-md bg-white border-gray-400">
      <div className="flex ">
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
      {actionsData &&
        actionsData.map((field) => {
          return (
            <div className="flex">
              <div className="p-3 w-44 flex-1 border-r-2 border-b-2 border-gray-400 break-normal">
                {field.id}
              </div>
              <div className="p-3 w-44 flex-1 border-r-2 border-b-2 border-gray-400 break-normal">
                {field.action}
              </div>
              <div className="p-3 w-44 flex-1 border-r-2 border-b-2 border-gray-400 break-normal">
                {field["action-start-time"]}
              </div>
              <div className="p-3 w-44 flex-1 border-r-2 border-b-2 border-gray-400 break-normal">
                {field["waiting-time"]}
              </div>
            </div>
          );
        })}
    </div>
  );
};
