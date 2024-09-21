"use client";

import { useEffect } from "react";

export default ({ id, setSelected, selected }) => {
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
    setSelected((selected) => ({
      ...selected,
      [id]: !selected[id],
      [-1]: false,
    }));
    // setSelected((selected) => {
    //   console.log(selected);
    //   return selected;
    // });
  };
  return (
    <input type="checkbox" checked={selected[id] || false} onChange={handler} />
  );
};
