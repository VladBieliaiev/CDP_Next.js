import EtcTable from "./EtcTable";
import { Data, DataProps } from "../types/dataTypes";
import EtcTaskForm from "../components/EtcTaskForm";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import SingleTask from "../components/SingleTask";

const Home: React.FC<DataProps> = () => {
  const [showForm, setShowForm] = useState(false);
  const onToggleForm = () => setShowForm(!showForm);
  const [fetchedData, setFetchedData] = useState<Data[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/fetchAllTask");
      const data = await response.json();
      if (data.message == "ETC Task found successfully") {
        // console.log("ETC Task found successfully");
        setFetchedData(data.task);
        // console.log("FEtched data : ", fetchedData);
      }
    } catch (error) {
      console.error("Error finding task:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [showForm]);

  return (
    <div>
      <Header onToggleForm={onToggleForm} />
      <EtcTable task={fetchedData} />
      {showForm && <EtcTaskForm onToggleForm={onToggleForm} />}
      <SingleTask task={[]} />
    </div>
  );
};

export default Home;
