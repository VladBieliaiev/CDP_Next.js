const findSingleTask = async (taskDate: string) => {
  try {
    const response = await fetch("/api/findOne", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskDate),
    });
    const data = await response.json();
    if (data.message == "ETC Task found successfully") {
      console.log("ETC Task found successfully");
      //   setFetchedData(data.task[0]);
    }
  } catch (error) {
    console.error("Error finding task:", error);
  }
};

export default findSingleTask;
