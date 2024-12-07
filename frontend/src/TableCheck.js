import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTable } from '../contexts/TableContext';

const TableCheck = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { tableNumber, setTableNumber } = useTable();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const tableNo = params.get('table_number');
        
        if (tableNo) {
            setTableNumber(tableNo);
            localStorage.setItem('tableNumber', tableNo);
        } else {
            const storedTable = localStorage.getItem('tableNumber');
            if (storedTable) {
                setTableNumber(storedTable);
            }
        }
    }, [location, setTableNumber]);

    return children;
};

export default TableCheck;