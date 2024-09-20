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
      <table>
        <thead>
          <tr>
            <th>
              <Selector id={-1} setSelected={setSelected} />
            </th>
            <th className="p-2 border-solid border-black border-2">Id</th>
            <th className="p-2 border-solid border-black border-2">Name</th>
            <th className="p-2 border-solid border-black border-2">Email</th>
            <th className="p-2 border-solid border-black border-2">
              Created At
            </th>
            <th className="p-2 border-solid border-black border-2">
              Last Login Time
            </th>
            <th className="p-2 border-solid border-black border-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((user) => (
            <tr key={user.id}>
              <td>
                <Selector id={user.id} setSelected={setSelected} />
              </td>
              <td
                className={`${
                  selected[user.id] ? "text-white bg-blue-600" : "text-black"
                } p-2 border-solid border-black border-2`}
              >
                {user.id}
              </td>
              <td
                className={`${
                  selected[user.id] ? "text-white bg-blue-600" : "text-black"
                } p-2 border-solid border-black border-2`}
              >
                {user.name}
              </td>
              <td
                className={`${
                  selected[user.id] ? "text-white bg-blue-600" : "text-black"
                } p-2 border-solid border-black border-2`}
              >
                {user.email}
              </td>
              <td
                className={`${
                  selected[user.id] ? "text-white bg-blue-600" : "text-black"
                } p-2 border-solid border-black border-2`}
              >
                {user.registration_time?.toString().substr(4, 20)}
              </td>
              <td
                className={`${
                  selected[user.id] ? "text-white bg-blue-600" : "text-black"
                } p-2 border-solid border-black border-2`}
              >
                {user.last_login_time?.toString().substr(4, 20)}
              </td>
              <td
                className={`${
                  selected[user.id] ? "text-white bg-blue-600" : "text-black"
                } p-2 border-solid border-black border-2`}
              >
                {user.status ? "Active" : "Blocked"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
