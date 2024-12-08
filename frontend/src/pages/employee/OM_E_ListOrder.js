import React, { useState, useEffect } from 'react';
import Header from '../../components/E_Header';
import styles from "../../styles/employee/Listorder.module.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OM_E_ListOrder = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const ordersPerPage = 10;
    const maxPageButtons = 5;

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:8080/OM/');
                if (response.data.success) {
                    const formattedOrders = response.data.orders.map(order => ({
                        id: order.id,
                        table: `#${order.tableId}`,
                        status: order.status.toUpperCase(),
                        time: new Date(order.createdAt).toLocaleString(),
                        total: order.total_price
                    }));
                    setOrders(formattedOrders);
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(orders.length / ordersPerPage);

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
                <h1 className={styles.title}>ORDERS</h1>
                <hr className={styles.separator} />
                {loading ? (
                    <div>Loading orders...</div>
                ) : (
                    <>
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
                                {currentOrders.map((order) => (
                                    <tr key={order.id} 
                                        className={styles.row} 
                                        onClick={() => handleRowClick(order.id)}
                                    >
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
                                <button className={styles.pageButton} onClick={() => handlePageChange(currentPage - 1)}>
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
                                <button className={styles.pageButton} onClick={() => handlePageChange(currentPage + 1)}>
                                    &gt;
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default OM_E_ListOrder;