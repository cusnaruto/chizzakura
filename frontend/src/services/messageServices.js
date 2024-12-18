import axios from "axios";
import URL from "../url";
const API_URL = `${URL}/CI`; // Replace with your backend URL

export const markMessagesAsRead = async (senderId, receiverId) => {
  try {
    const response = await axios.put(`${API_URL}/read`, {
      senderId,
      receiverId,
    });
    return response.data;
  } catch (error) {
    console.error("Error marking messages as read:", error);
    throw error;
  }
};
