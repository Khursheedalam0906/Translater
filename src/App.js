import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [options, setOptions] = useState([]);
  const [from, setFrom] = useState("en");
  const [to, setTo] = useState("en");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const getLanguages = async () => {
    try {
      const response = await axios.get("https://libretranslate.com/languages");
      console.log(response.data);
      setOptions(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getLanguages();
  }, []);

  const params = new URLSearchParams();
  params.append("q", input);
  params.append("source", from);
  params.append("target", to);
  params.append("api_key", "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx");

  const translate = async () => {
    try {
      const response = await axios.post(
        "https://libretranslate.com/translate",
        { params },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      console.log("translate", response.data);
      setOutput(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="App">
      <div style={{ margin: 20 }}>
        From ({from}):
        <select onChange={(e) => setFrom(e.target.value)}>
          {options.map((item, index) => (
            <option key={index} value={item.code}>
              {item.name}
            </option>
          ))}
        </select>
        To ({to}):
        <select onChange={(e) => setTo(e.target.value)}>
          {options.map((item, index) => (
            <option key={index} value={item.code}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <textarea
          cols="70"
          rows="8"
          value={input}
          onInput={(e) => setInput(e.target.value)}
        ></textarea>
      </div>
      <div>
        <textarea cols="70" rows="8" readOnly={output}></textarea>
      </div>
      <div>
        <button onClick={() => translate()}>Translate</button>
      </div>
    </div>
  );
}

export default App;
