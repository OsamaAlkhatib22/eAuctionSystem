import { createContext, useState } from "react";

const TaskCreationContext = createContext();
export const TaskCreationProvider = ({ children }) => {
  // Fetch states
  const [workers, setWorkers] = useState([]);

  // Team states
  const [leader, setLeader] = useState(null);
  const [members, setMembers] = useState([]);

  // Task state
  const [task, setTask] = useState({
    id: "--",
    status: "Scheduled",
    startDate: null,
    dueDate: null,
    taskType: null,
    comment: null,
  });

  // Shipped states
  const values = {
    workers,
    setWorkers,
    leader,
    setLeader,
    members,
    setMembers,
    task,
    setTask,
  };

  /////////////
  return (
    <TaskCreationContext.Provider value={values}>
      {children}
    </TaskCreationContext.Provider>
  );
};

export default TaskCreationContext;
