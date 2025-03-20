import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [numbers, setNumbers] = useState([]);
  const [windowPrevState, setWindowPrevState] = useState([]);
  const [windowCurrState, setWindowCurrState] = useState([]);
  const [average, setAverage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNumbers = async (type) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:5001/numbers/${type}`);

      setNumbers(response.data.numbers);
      setWindowPrevState(response.data.windowPrevState);
      setWindowCurrState(response.data.windowCurrState);
      setAverage(response.data.avg);
    } catch (err) {
      console.error("Error fetching numbers:", err);
      setError("Error fetching numbers. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="app">
      <h1>Number Tracker</h1>
      
      <div>
        <button onClick={() => fetchNumbers("prime")}>Prime</button>
        <button onClick={() => fetchNumbers("fibonacci")}>Fibonacci</button>
        <button onClick={() => fetchNumbers("even")}>Even</button>
        <button onClick={() => fetchNumbers("random")}>Random</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="results">
        <h3>Numbers: {numbers.join(", ") || "No data yet"}</h3>
        <h4>Previous Window: {windowPrevState.join(", ") || "No data"}</h4>
        <h4>Current Window: {windowCurrState.join(", ") || "No data"}</h4>
        <h2>Average: {average || "N/A"}</h2>
      </div>
    </div>
  );
};

export default App;
