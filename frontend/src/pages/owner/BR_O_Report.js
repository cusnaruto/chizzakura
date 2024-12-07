import React, { useState, useEffect } from 'react';
import Header from '../../components/O_Header';
import styles from '../../styles/owner/report.module.css';
import { FaDollarSign, FaBox, FaConciergeBell } from "react-icons/fa"; // Import the icons

const ReportPage = () => {
    const [activeTab, setActiveTab] = useState('items');
    const [currentTime, setCurrentTime] = useState(new Date());
    const [reports, setReports] = useState([]);

    const API_BASE_URL = 'http://localhost:8080/BR';

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // useEffect(() => {
    //     axios
    //       .get(`${API_BASE_URL}/items-report`)
    //       .then((response) => {
    //         if (response.data.success) {
    //           setReports(response.data.data);
    //         }
    //       })
    //       .catch((error) => {
    //         console.error("Error fetching reports:", error);
    //       });
    //   }, []);

    // Sample data for item reports
    const itemReports = [
        { id: 1, name: 'Burger', category: 'Main Course', price: '5$', sales: 150, rating: 4.2, reviews: 45, total: '750$' },
        { id: 2, name: 'Fries', category: 'Side', price: '2$', sales: 200, rating: 4.5, reviews: 60, total: '400$' },
        // Add more items as needed
    ];

    // Sample data for revenue report
    const revenueData = {
        totalRevenue: '5000$',
        dailyRevenue: '200$',
        monthlyRevenue: '6000$'
    };

    // Sample data for service report
    const serviceData = {
        averageServiceTime: '15 mins',
        numberOfOrders: 300,
        customerSatisfaction: '4.3/5'
    };

    // Function to render the Items Report table
    const renderItemsReport = () => (
        <div className={styles.reportSection}>
            <h2>Items Report</h2>
            <table className={styles.reportTable}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Sales</th>
                        <th>Rating</th>
                        <th>Reviews</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {itemReports.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.category}</td>
                            <td>{item.price}</td>
                            <td>{item.sales}</td>
                            <td>{item.rating}</td>
                            <td>{item.reviews}</td>
                            <td>{item.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    // Function to render the Revenue Report
    const renderRevenueReport = () => (
        <div className={styles.reportSection}>
            <h2>Revenue Report</h2>
            <p>Total Revenue: {revenueData.totalRevenue}</p>
            <p>Daily Revenue: {revenueData.dailyRevenue}</p>
            <p>Monthly Revenue: {revenueData.monthlyRevenue}</p>
        </div>
    );

    // Function to render the Service Report
    const renderServiceReport = () => (
        <div className={styles.reportSection}>
            <h2>Service Report</h2>
            <p>Average Service Time: {serviceData.averageServiceTime}</p>
            <p>Number of Orders: {serviceData.numberOfOrders}</p>
            <p>Customer Satisfaction: {serviceData.customerSatisfaction}</p>
        </div>
    );

    return (
        <div>
            <Header />
            <div className={styles.reportPage}>
                {/* Navigation buttons for each report type */}
                <div className={styles.tabButtons}>
                    <button onClick={() => setActiveTab('items')} className={activeTab === 'items' ? styles.activeTab : ''}>
                        <FaBox />
                    </button>
                    <button onClick={() => setActiveTab('revenue')} className={activeTab === 'revenue' ? styles.activeTab : ''}>
                        <FaDollarSign />
                    </button>
                    <button onClick={() => setActiveTab('service')} className={activeTab === 'service' ? styles.activeTab : ''}>
                        <FaConciergeBell />
                    </button>
                </div>

                <main className={styles.mainContent}>
                    <div className={styles.reportSummary}>
                        <p>Report generated on: {currentTime.toLocaleString()}</p>
                    </div>
                    {activeTab === 'items' && renderItemsReport()}
                    {activeTab === 'revenue' && renderRevenueReport()}
                    {activeTab === 'service' && renderServiceReport()}
                </main>

                {/* Print button at the bottom of the page */}
                <button className={styles.printButton}>Print Report</button>
            </div>
        </div>
    );
};

export default ReportPage;