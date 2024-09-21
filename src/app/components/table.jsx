"use client";

import Selector from "../components/selector";
import { useState } from "react";
import ToolBar from "./tool-bar";

export default ({ children }) => {
  const [selected, setSelected] = useState({});
  const [tableData, setTableData] = useState(children);
  return (
    <div className="flex flex-col gap-4 justify-start">
      <ToolBar selected={selected} setTableData={setTableData} />
      <table className="min-w-[80vw] p-20">
        <thead>
          <tr>
            <th className="bg-white border-[1px] border-gray-300 w-auto p-2">
              <Selector id={-1} setSelected={setSelected} selected={selected} />
            </th>
            <th className="bg-white border-[1px] border-gray-300 w-auto p-2">
              Id
            </th>
            <th className="bg-white border-[1px] border-gray-300 w-auto p-2">
              Name
            </th>
            <th className="bg-white border-[1px] border-gray-300 w-auto p-2">
              Email
            </th>
            <th className="bg-white border-[1px] border-gray-300 w-auto p-2">
              Created At
            </th>
            <th className="bg-white border-[1px] border-gray-300 w-auto p-2">
              Last Login Time
            </th>
            <th className="bg-white border-[1px] border-gray-300 w-auto p-2">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((user, index) => (
            <tr key={user.id}>
              <th className="bg-white border-[1px] border-gray-300 w-auto p-2 text-gray-500">
                <Selector
                  id={user.id}
                  setSelected={setSelected}
                  selected={selected}
                />
              </th>
              <td className="bg-white border-[1px] border-gray-300 w-auto p-2 text-gray-500">
                {index + 1}
              </td>
              <td className="bg-white border-[1px] border-gray-300 w-auto p-2 text-gray-500">
                {user.name}
              </td>
              <td className="bg-white border-[1px] border-gray-300 w-auto p-2 text-gray-500">
                {user.email}
              </td>
              <td className="bg-white border-[1px] border-gray-300 w-auto p-2 text-gray-500">
                {user.registration_time?.toString().substr(4, 20)}
              </td>
              <td className="bg-white border-[1px] border-gray-300 w-auto p-2 text-gray-500">
                {user.last_login_time?.toString().substr(4, 20)}
              </td>
              <td className="bg-white border-[1px] border-gray-300 w-auto p-2 text-gray-500">
                {user.status ? "Active" : "Blocked"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
