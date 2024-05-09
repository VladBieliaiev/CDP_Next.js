import { FormEvent, useState } from "react";
import { ETCTask, HeaderProps } from "../types/dataTypes";

const projectOptions = ["Project Alpha", "Project Beta", "Project Gamma"];
const taskTypeOptions = ["Documentation", "Meeting", "Testing", "Development"];
const taskTimeOptions = ["0.5", "1", "1.5", "2"];

const EtcTaskForm: React.FC<HeaderProps> = ({ onToggleForm }) => {
  const [etcFormData, setEtcFormData] = useState<ETCTask>({
    project: "",
    taskType: "",
    time: "",
    description: "",
    date: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedFormData = Object.fromEntries(
      Object.entries(etcFormData).filter(([key, value]) => value.trim() !== "")
    );

    try {
      const response = await fetch("/api/addTask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(trimmedFormData),
      });
      const data = await response.json();

      if (data.message === "ETCTask created successfully") {
        console.log("ETCTask created successfully");
        setEtcFormData({
          project: "",
          taskType: "",
          time: "",
          description: "",
          date: "",
        });
      } else {
        console.error("Error submitting form:", data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    console.log(etcFormData);
    onToggleForm();
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setEtcFormData({ ...etcFormData, [event.target.name]: event.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
        value={etcFormData.project}
        onChange={handleChange}
        name="project"
        placeholder="Select project"
      >
        <option value="" disabled selected>
          Select Project
        </option>
        {projectOptions.map((project) => (
          <option key={project} value={project}>
            {project}
          </option>
        ))}
      </select>
      <select
        value={etcFormData.taskType}
        onChange={handleChange}
        name="taskType"
        placeholder="Select task type"
      >
        <option value="">Select Task Type</option>
        {taskTypeOptions.map((taskType) => (
          <option key={taskType} value={taskType}>
            {taskType}
          </option>
        ))}
      </select>
      <select
        value={etcFormData.time}
        onChange={handleChange}
        name="time"
        placeholder="Select time"
      >
        <option value="">Select Time</option>
        {taskTimeOptions.map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={etcFormData.description}
        onChange={handleChange}
        name="description"
        placeholder="Enter description"
      ></input>
      <input
        type="date"
        value={etcFormData.date}
        onChange={handleChange}
        name="date"
        placeholder="Enter date"
      ></input>
      <button type="submit">Submit</button>
    </form>
  );
};

export default EtcTaskForm;
