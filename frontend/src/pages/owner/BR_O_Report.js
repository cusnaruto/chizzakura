import React, { useState, useEffect } from "react";
import Header from "../../components/O_Header";
import styles from "../../styles/owner/report.module.css";
import axios from "axios";
import { FaDollarSign, FaBox, FaConciergeBell } from "react-icons/fa"; // Import icons

const ReportPage = () => {
  const [timeframe, setTimeframe] = useState(30); // Default to the last 30 days
  const [activeTab, setActiveTab] = useState("items");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [itemReports, setItemReports] = useState([]);

  const API_BASE_URL = "http://localhost:8080/BR";

  // Fetch current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Fetch item reports when timeframe changes
  const fetchItemReports = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/items-report`,
        { params: { days: timeframe } } // Pass the timeframe in days as query parameter
      );
      console.log("Item Reports:", response.data.data); // Debugging log
      setItemReports(response.data.data);
    } catch (error) {
      console.error("Error fetching item reports:", error);
    }
  };

  useEffect(() => {
    if (activeTab === "items") {
      fetchItemReports();
    }
  }, [timeframe, activeTab]);

// Render Items Report
const renderItemsReport = () => {
  // Calculate total revenue
  const totalRevenue = itemReports.reduce((acc, item) => acc + (item.total_sales * item.item_price), 0);

  return (
    <div className={styles.reportSection}>
      <h2>Items Report</h2>
      <div>
        <label>
          Select Timeframe (in days):
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(parseInt(e.target.value))}
          >
            <option value={1}>Last 24 Hours</option>
            <option value={7}>Last 7 Days</option>
            <option value={30}>Last 30 Days</option>
            <option value={90}>Last 90 Days</option>
            <option value={180}>Last 180 Days</option>
            <option value={365}>Last 365 Days</option>
          </select>
        </label>
      </div>
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
          {itemReports.map((item) => (
            <tr key={item.item_id}>
              <td>{item.item_id}</td>
              <td>{item.item_name}</td>
              <td>{item.category_name}</td>
              <td>${item.item_price}</td>
              <td>{item.total_sales}</td>
              <td>
                {!isNaN(parseFloat(item.average_rating))
                  ? parseFloat(item.average_rating).toFixed(1)
                  : "N/A"}
              </td>
              <td>{item.review_count}</td>
              <td>${(item.total_sales * item.item_price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Total Revenue: ${totalRevenue.toFixed(2)}</p>
    </div>
  );
};
  return (
    <div>
      <Header />
      <div className={styles.reportPage}>
        {/* Navigation buttons for each report type */}
        <div className={styles.tabButtons}>
          <button onClick={() => setActiveTab("items")} className={activeTab === "items" ? styles.activeTab : ""}>
            <FaBox />
          </button>
          <button onClick={() => setActiveTab("revenue")} className={activeTab === "revenue" ? styles.activeTab : ""}>
            <FaDollarSign />
          </button>
          <button onClick={() => setActiveTab("service")} className={activeTab === "service" ? styles.activeTab : ""}>
            <FaConciergeBell />
          </button>
        </div>

        <main className={styles.mainContent}>
          <div className={styles.reportSummary}>
            <p>Report generated on: {currentTime.toLocaleString()}</p>
          </div>
          {activeTab === "items" && renderItemsReport()}
        </main>

        {/* Print button */}
        <button
          className={styles.printButton}
          onClick={() => window.print()}
        >
          Print Report
        </button>
      </div>
    </div>
  );
};

export default ReportPage;