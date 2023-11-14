import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import "./App.css";
import { useEffect, useState } from "react";

export default function App() {
  const [from, setFrom] = useState("EUR");
  const [to, setTo] = useState("USD");
  const [text, setText] = useState(0);
  const [output, setOutput] = useState("Converted value 💸");
  const [loading, setLoading] = useState(false);

  useEffect(
    function () {
      async function fetchData() {
        setLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${text}&from=${from}&to=${to}`
        );
        const data = await res.json();
        const result = data.rates[to];
        setLoading(false);
        setOutput(result);
      }
      if (to === from || !text) {
        setOutput(text);
      } else {
        fetchData();
      }
    },
    [from, to, text]
  );

  return (
    <div className="main-container">
      <div className="middle-box">
        <div>
          <TextField value={text} onChange={(e) => setText(e.target.value)} />
          <Select
            className="selectors"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={from}
            label="From"
            onChange={(e) => setFrom(e.target.value)}
          >
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="EUR">EUR</MenuItem>
            <MenuItem value="CAD">CAD</MenuItem>
            <MenuItem value="INR">INR</MenuItem>
          </Select>
          <Select
            className="selectors"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={to}
            label="To"
            onChange={(e) => setTo(e.target.value)}
          >
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="EUR">EUR</MenuItem>
            <MenuItem value="CAD">CAD</MenuItem>
            <MenuItem value="INR">INR</MenuItem>
          </Select>
        </div>
        <h1>
          {output} {to}
        </h1>
      </div>
    </div>
  );
}
