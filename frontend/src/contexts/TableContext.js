import React, { createContext, useContext, useState } from 'react';

const TableContext = createContext();

export const TableProvider = ({ children }) => {
    const [tableNumber, setTableNumber] = useState(null);

    return (
        <TableContext.Provider value={{ tableNumber, setTableNumber }}>
            {children}
        </TableContext.Provider>
    );
};

export const useTable = () => {
    const context = useContext(TableContext);
    if (!context) {
        throw new Error('useTable must be used within a TableProvider');
    }
    return context;
};