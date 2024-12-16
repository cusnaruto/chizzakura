import React, { createContext, useContext, useReducer } from "react";

const TableContext = createContext();

const tableReducer = (state, action) => {
  switch (action.type) {
    case "SET_TABLE_NUMBER":
      sessionStorage.setItem("tableNumber", action.payload); // Lưu vào sessionStorage
      return { ...state, tableNumber: action.payload };
    case "REMOVE_TABLE_NUMBER":
      sessionStorage.removeItem("tableNumber"); // Xóa khỏi sessionStorage
      return { ...state, tableNumber: null };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

export const TableProvider = ({ children }) => {
  const initialState = { tableNumber: null };
  const [state, dispatch] = useReducer(tableReducer, initialState, () => {
    const storedTableNumber = sessionStorage.getItem("tableNumber");
    return {
      tableNumber: storedTableNumber ? Number(storedTableNumber) : null,
    };
  });

  return (
    <TableContext.Provider value={{ state, dispatch }}>
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
