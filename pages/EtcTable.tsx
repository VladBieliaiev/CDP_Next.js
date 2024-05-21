import { Column, textEditor } from "react-data-grid";
import "react-data-grid/lib/styles.css";
import DataGrid from "react-data-grid";
import { Data, DataProps } from "../types/dataTypes";
import deleteTask from "../hooks/deleteTaskHook";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { useCallback, useEffect, useState } from "react";

const columns: Column<Data>[] = [
  { key: "project", name: "Project", renderEditCell: textEditor },
  { key: "taskType", name: "Task Type", renderEditCell: textEditor },
  { key: "time", name: "Time", renderEditCell: textEditor },
  { key: "description", name: "Description", renderEditCell: textEditor },
  { key: "date", name: "Date", renderEditCell: textEditor },
  {
    key: "options",
    name: "Options",
    width: 100,
    renderCell: ({ row }) => (
      <div>
        <button onClick={() => {}}>
          <EditIcon />
        </button>
        <button
          onClick={() => {
            deleteTask(row._id);
          }}
        >
          <DeleteForeverIcon />
        </button>
      </div>
    ),
  },
];

const EtcTable: React.FC<DataProps> = ({ task }) => {
  const [taskData, setTaskData] = useState<Data[]>(task);
  const [originalData, setOriginalData] = useState<Data[]>([]); // Store initial data

  useEffect(() => {
    setTaskData(task);
    setOriginalData(task); // Store initial data for comparison
  }, [task]);

  const hasChanged = (oldData: Data, newData: Data) => {
    for (const key in oldData) {
      if (oldData[key] !== newData[key]) {
        return true;
      }
    }
    return false;
  };

  const updateTask = async (id: string, data: Data) => {
    console.log(data);
    try {
      const response = await fetch("/api/updateTask", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, data }),
      });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const onRowsChange = useCallback(
    (rows: Data[]) => {
      setTaskData(rows);
      const changedTask = rows.find((row, index) =>
        hasChanged(originalData[index], row)
      );
      if (changedTask) {
        console.log("Changed task:", changedTask);
        updateTask(changedTask._id, changedTask);
      }
    },
    [hasChanged, originalData]
  );
  return (
    <div>
      <DataGrid columns={columns} rows={taskData} onRowsChange={onRowsChange} />
    </div>
  );
};

export default EtcTable;
