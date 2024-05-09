const deleteTask = async (id: string) => {
  try {
    console.log("id : ", id);
    const responce = await fetch("api/deleteTask", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(id),
    });
    const data = await responce.json();
    if (data.message == "ETC Task deleted successfully") {
      console.log("ETC Task deleted successfully");
    }
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};

export default deleteTask;
