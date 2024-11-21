import React, { useState } from 'react';
import Header from '../../components/E_Header';
import styles from "../../styles/employee/Listorder.module.css";
import { useNavigate } from 'react-router-dom';

const UM_O_Profile = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 10; // Increased from 5 to 10 orders per page
    const maxPageButtons = 5; // Maximum number of page buttons to show

    // lots of fake datas
    const fakeOrders = Array.from({ length: 100 }, (_, i) => ({
        id: 1230 - i,
        table: `#${(i % 10) + 1}`,
        status: ['CONFIRM', 'COOKING', 'DONE'][i % 3],
        time: `Jun 10, 2024 9:${41 - i % 60} AM`
    }));

    const [searchTerm, setSearchTerm] = useState('');

    // Filter orders based on search term
    const filteredOrders = fakeOrders.filter(order =>
        order.table.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Get current orders
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

    // Calculate the range of page numbers to display
    const getPageRange = () => {
        let start = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
        let end = start + maxPageButtons - 1;

        if (end > totalPages) {
            end = totalPages;
            start = Math.max(1, end - maxPageButtons + 1);
        }

        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    const handleRowClick = (orderId) => {
        navigate(`/employee/confirmorder/${orderId}`);
    };

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    

    return (
        <div className={styles.pageContainer}>
            <Header />
            <div className={styles.container}>
                <h1 className={styles.title}>ORDER</h1>
                <hr className={styles.separator} />
                {/* <div className={styles.searchContainer}>
                    <input
                        type="text"
                        placeholder="Search by orders..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                    />
                </div> */}
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>TABLE</th>
                            <th>STATUS</th>
                            <th>TIME</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="4"><hr className={styles.tableSeparator} /></td>
                        </tr>
                        {currentOrders.map((order) => (
                            <tr key={order.id} className={styles.row} onClick={() => handleRowClick(order.id)}>
                                <td>{order.id}</td>
                                <td>{order.table}</td>
                                <td className={`${styles.status} ${styles[order.status.toLowerCase()]}`}>
                                    {order.status}
                                </td>
                                <td>{order.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className={styles.pagination}>
                    {currentPage > 1 && (
                        <button
                            className={styles.pageButton}
                            onClick={() => handlePageChange(currentPage - 1)}
                        >
                            &lt;
                        </button>
                    )}
                    
                    {getPageRange().map(pageNum => (
                        <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`${styles.pageButton} ${currentPage === pageNum ? styles.active : ''}`}
                        >
                            {pageNum}
                        </button>
                    ))}

                    {currentPage < totalPages && (
                        <button
                            className={styles.pageButton}
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            &gt;
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UM_O_Profile;