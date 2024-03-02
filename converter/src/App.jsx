import { useState } from "react";
import "./App.css";

function App() {
  const [choice, setChoice] = useState(false);
  const [binaryInput, setBinaryInput] = useState("");
  const [englishInput, setEnglishInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleSwap() {
    setChoice(!choice);
    setErrorMessage("");
  }

  function handleBinaryInputChange(e) {
    setBinaryInput(e.target.value);
    setErrorMessage("");
  }

  function handleEnglishInputChange(e) {
    setEnglishInput(e.target.value);
    setErrorMessage("");
  }

  function handleConvert() {
    if (choice) {
      // English to Binary
      const binaryValue = englishToBinary(englishInput);
      setBinaryInput(binaryValue);
    } else {
      // Binary to English
      if (!isValidBinaryInput(binaryInput)) {
        setErrorMessage("Invalid binary input. Only 0s and 1s are allowed.");
        return;
      }
      const englishValue = binaryToEnglish(binaryInput);
      setEnglishInput(englishValue);
    }
  }

  function isValidBinaryInput(binaryStr) {
    return /^[01 ]+$/.test(binaryStr);
  }

  function binaryToEnglish(binaryStr) {
    return binaryStr
      .split(" ")
      .map((binaryChunk) => String.fromCharCode(parseInt(binaryChunk, 2)))
      .join("");
  }

  function englishToBinary(englishText) {
    return englishText
      .split("")
      .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
      .join(" ");
  }

  function handleClear() {
    setBinaryInput("");
    setEnglishInput("");
    setErrorMessage("");
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-8">
        <div>
          <label htmlFor="binary_field" className="font-medium text-3xl">
            {choice ? "English" : "Binary"}
          </label>
          <textarea
            placeholder={choice ? "English here" : "Binary here"}
            className={`textarea textarea-bordered textarea-lg w-full max-w-full h-80 mt-2 bg-zinc-200 text-stone-950 ${
              errorMessage && "border-red-500"
            }`}
            name="binary_field"
            value={choice ? englishInput : binaryInput}
            onChange={
              choice ? handleEnglishInputChange : handleBinaryInputChange
            }
          ></textarea>
        </div>
        <button
          className="btn btn-info self-center rounded-full"
          onClick={handleSwap}
        >
          Swap
        </button>
        <div>
          <label htmlFor="binary_field" className="font-medium text-3xl">
            {choice ? "Binary" : "English"}
          </label>
          <textarea
            placeholder={choice ? "Binary here" : "English here"}
            className={`textarea textarea-bordered textarea-lg w-full max-w-full h-80 mt-2 bg-zinc-200 text-stone-950 ${
              errorMessage && "border-red-500"
            }`}
            name="binary_field"
            value={choice ? binaryInput : englishInput}
            onChange={
              choice ? handleBinaryInputChange : handleEnglishInputChange
            }
          ></textarea>
        </div>
      </div>
      <div className="self-center ">
        <button
          className="btn btn-success self-center m-3"
          onClick={handleConvert}
        >
          Convert
        </button>
        <button
          className="btn btn-warning self-center m-3"
          onClick={handleClear}
        >
          Clear
        </button>
      </div>
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
    </div>
  );
}

export default App;
