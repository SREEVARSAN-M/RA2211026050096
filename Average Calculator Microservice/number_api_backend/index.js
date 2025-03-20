const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5001;

const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQyNDc1OTI0LCJpYXQiOjE3NDI0NzU2MjQsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjY4NWE1MDZkLWQzZjQtNGI0Mi1hMTIxLThjNDA0YmU3MGVlNSIsInN1YiI6InNtNTU1N0Bzcm1pc3QuZWR1LmluIn0sImNvbXBhbnlOYW1lIjoiVGVjaElubm92YXRvcnMiLCJjbGllbnRJRCI6IjY4NWE1MDZkLWQzZjQtNGI0Mi1hMTIxLThjNDA0YmU3MGVlNSIsImNsaWVudFNlY3JldCI6IlpzT3l4S2VXUFhIRllab1oiLCJvd25lck5hbWUiOiJTUkVFVkFSU0FOIE0iLCJvd25lckVtYWlsIjoic201NTU3QHNybWlzdC5lZHUuaW4iLCJyb2xsTm8iOiJSQTIyMTEwMjYwNTAwOTYifQ.1S-Ok97j7Kwpr0U6wYMldDETskPvwjIcRK2anU3YNWg";

app.use(cors({
  origin: "http://localhost:3000",
  methods: "GET",
  allowedHeaders: ["Content-Type", "Authorization"]
}));

const API_URLS = {
  prime: "http://20.244.56.144/test/primes",
  fibonacci: "http://20.244.56.144/test/fibo",
  even: "http://20.244.56.144/test/even",
  random: "http://20.244.56.144/test/rand"
};

app.get("/numbers/:type", async (req, res) => {
  const type = req.params.type;

  if (!API_URLS[type]) {
    return res.status(400).json({ error: "Invalid number type" });
  }

  try {
    console.log(`Fetching from: ${API_URLS[type]}`);

    const response = await axios.get(API_URLS[type], {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`
      },
      timeout: 10000  
    });

    console.log("API Response:", response.data);
    res.json(response.data);

  } catch (error) {
    console.error("API Error:", error.message);

    if (error.response) {
      console.error("API Response:", error.response.data);
    } else if (error.request) {
      console.error("No response from API");
    }

    res.status(500).json({ error: "Failed to fetch numbers from API" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
