import axios from "axios";
import URL from "../url";

export const markMessagesAsRead = async (senderId, receiverId) => {
  try {
    const response = await axios.put(`${URL}/CI/read`, {
      senderId,
      receiverId,
    });
    return response.data;
  } catch (error) {
    console.error("Error marking messages as read:", error);
    throw error;
  }
};
