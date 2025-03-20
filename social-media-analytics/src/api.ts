const API_BASE_URL = "http://20.244.56.144/test/users"; 
const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQyNDc1OTI0LCJpYXQiOjE3NDI0NzU2MjQsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjY4NWE1MDZkLWQzZjQtNGI0Mi1hMTIxLThjNDA0YmU3MGVlNSIsInN1YiI6InNtNTU1N0Bzcm1pc3QuZWR1LmluIn0sImNvbXBhbnlOYW1lIjoiVGVjaElubm92YXRvcnMiLCJjbGllbnRJRCI6IjY4NWE1MDZkLWQzZjQtNGI0Mi1hMTIxLThjNDA0YmU3MGVlNSIsImNsaWVudFNlY3JldCI6IlpzT3l4S2VXUFhIRllab1oiLCJvd25lck5hbWUiOiJTUkVFVkFSU0FOIE0iLCJvd25lckVtYWlsIjoic201NTU3QHNybWlzdC5lZHUuaW4iLCJyb2xsTm8iOiJSQTIyMTEwMjYwNTAwOTYifQ.1S-Ok97j7Kwpr0U6wYMldDETskPvwjIcRK2anU3YNWg"; 

const getHeaders = () => ({
  "Content-Type": "application/json",
  "Authorization": `Bearer ${ACCESS_TOKEN}`,
});

export const fetchUsers = async () => {
  try {
    console.log("Fetching users...");

    const response = await fetch(API_BASE_URL, {
      method: "GET",
      headers: getHeaders(),
    });

    console.log("Response Status:", response.status);
    console.log("Response Headers:", response.headers);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error Response Body:", errorText);
      throw new Error(`HTTP error! Status: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("Fetched Users:", data);
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const fetchUserPosts = async (userId: number) => {
  try {
    console.log(`Fetching posts for user ${userId}...`);

    const response = await fetch(`${API_BASE_URL}/${userId}/posts`, {
      method: "GET",
      headers: getHeaders(),
    });

    console.log("Response Status:", response.status);
    console.log("Response Headers:", response.headers);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error Response Body:", errorText);
      throw new Error(`HTTP error! Status: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log(`Fetched Posts for User ${userId}:`, data);
    return data;
  } catch (error) {
    console.error(`Error fetching posts for user ${userId}:`, error);
    return [];
  }
};
