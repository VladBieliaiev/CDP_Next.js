import { Column, textEditor } from "react-data-grid";
import "react-data-grid/lib/styles.css";
import DataGrid from "react-data-grid";
import { Data, DataProps } from "../types/dataTypes";
import deleteTask from "../hooks/deleteTaskHook";

const columns: Column<Data>[] = [
  { key: "project", name: "Project" },
  { key: "taskType", name: "Task Type", renderEditCell: textEditor },
  { key: "time", name: "Time", renderEditCell: textEditor },
  { key: "description", name: "Description", renderEditCell: textEditor },
  { key: "date", name: "Date", renderEditCell: textEditor },
  {
    key: "delete",
    name: "Delete",
    width: 80,
    renderCell: ({ row }) => (
      <button
        onClick={() => {
          deleteTask(row._id);
        }}
      >
        Delete
      </button>
    ),
  },
];

const EtcTable: React.FC<DataProps> = ({ task }) => {
  return (
    <div>
      <DataGrid columns={columns} rows={task} />
    </div>
  );
};

export default EtcTable;
