import axios from "axios";

const API_URL = "http://localhost:8080/MM"; // Replace with your backend URL

export const fetchMessages = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
};

export const markMessagesAsRead = async (senderId, receiverId) => {
  try {
    const response = await axios.put(`${API_URL}/read`, { senderId, receiverId });
    return response.data;
  } catch (error) {
    console.error("Error marking messages as read:", error);
    throw error;
  }
};
