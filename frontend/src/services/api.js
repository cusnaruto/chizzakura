export const getProtectedData = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:5000/user", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};
