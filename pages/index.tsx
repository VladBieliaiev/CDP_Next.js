import EtcTable from "./EtcTable";
import { Data, DataProps } from "../types/dataTypes";
import EtcTaskForm from "../components/EtcTaskForm";
import Header from "../components/Header";
import { useEffect, useState } from "react";

const Home: React.FC<DataProps> = () => {
  const [showForm, setShowForm] = useState(false);
  const [fetchedData, setFetchedData] = useState<Data[]>([]);
  const [taskDates, setTaskDates] = useState<string[]>([]);

  const onToggleForm = () => setShowForm(!showForm);

  const fetchData = async (dates: string[]) => {
    try {
      const response = await fetch("/api/fetchTasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dates),
      });
      const data = await response.json();
      if (data.message == "ETC Task found successfully") {
        setFetchedData(data.task);
      }
    } catch (error) {
      console.error("Error finding task:", error);
    }
  };

  useEffect(() => {
    fetchData(taskDates);
  }, [taskDates]);

  return (
    <div>
      <Header onToggleForm={onToggleForm} onDateRangeChange={setTaskDates} />
      <EtcTable task={fetchedData} />
      {showForm && <EtcTaskForm onToggleForm={onToggleForm} />}
    </div>
  );
};

export default Home;
