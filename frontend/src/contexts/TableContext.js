import React, { createContext, useContext, useState, useReducer } from "react";

const TableContext = createContext();

const tableReducer = (state, action) => {
  switch (action.type) {
    case "SET_TABLE_NUMBER":
      return { ...state, tableNumber: action.payload };
    case "REMOVE_TABLE_NUMBER":
      return { ...state, tableNumber: null };
    default:
      return state;
  }
};

export const TableProvider = ({ children }) => {
  const [tableNumber, setTableNumber] = useState(null);

  const [state, dispatch] = useReducer(tableReducer, { tableNumber: null });

  return (
    <TableContext.Provider value={{ tableNumber, setTableNumber }}>
      {children}
    </TableContext.Provider>
  );
};

export const useTable = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useTable must be used within a TableProvider");
  }
  return context;
};
