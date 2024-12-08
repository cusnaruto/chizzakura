import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTable } from './contexts/TableContext';

const TableCheck = ({ children }) => {
    const location = useLocation();
    const { tableNumber, setTableNumber } = useTable();

    useEffect(() => {
        // Check URL first
        const params = new URLSearchParams(location.search);
        const tableNo = params.get('table_number');
        
        if (tableNo) {
            // If table number is in URL, update both context and localStorage
            setTableNumber(tableNo);
            localStorage.setItem('tableNumber', tableNo);
        } else {
            // If not in URL, check localStorage
            const storedTable = localStorage.getItem('tableNumber');
            if (storedTable) {
                setTableNumber(storedTable);
            }
        }
    }, [location, setTableNumber]);

    return children;
};

export default TableCheck;