"use client";

import { useEffect } from "react";

export default ({ id, setSelected }) => {
  useEffect(() => {
    setSelected((selected) => ({ ...selected, [id]: false }));
  }, []);
  const handler = () => {
    if (id === -1) {
      setSelected((selected) => {
        let newSelected = { ...selected };
        for (let key in newSelected) {
          newSelected[key] = true;
        }
        console.log(newSelected);
        return newSelected;
      });
      //   setSelected((selected) => {
      //     console.log(selected);
      //     return selected;
      //   });
      return;
    }
    setSelected((selected) => ({ ...selected, [id]: !selected[id] }));
    // setSelected((selected) => {
    //   console.log(selected);
    //   return selected;
    // });
  };
  return (
    <button
      className="p-2 bg-green-300 w-full active:bg-green-600 hover:bg-green-400 rounded-lg"
      onClick={handler}
    >
      {id === -1 ? "Select All" : "Select/Deselect"}
    </button>
  );
};
