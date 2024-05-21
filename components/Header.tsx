import { useState } from "react";
import { HeaderProps } from "../types/dataTypes";

const Header: React.FC<HeaderProps> = ({ onToggleForm, onDateRangeChange }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (startDate && endDate) {
      onDateRangeChange([startDate, endDate]);
    } else {
      console.log("Please fill out both fields");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h1>ETC Time Tracker</h1>
        <form onSubmit={handleSubmit}>
          <label>from: </label>
          <input type="date" onChange={handleStartDateChange} />
          <label>to: </label>
          <input type="date" onChange={handleEndDateChange} />
          <button>Submit</button>
        </form>
      </div>
      <button onClick={onToggleForm}>Add Task</button>
    </div>
  );
};

export default Header;
