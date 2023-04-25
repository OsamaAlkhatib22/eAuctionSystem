import React, { useState, useEffect } from "react";

// Project Imports
import { TaskCreationProvider } from "./Context/TaskCreationContext";
import TaskCreationSlider from "./Components/TaskCreationSlider";
import TaskCreationDetails from "./Components/TaskCreationDetails";
import NotFoundPage from "../NotFound";

const TaskCreation = ({ photos, complaint }) => {
  const [step, setStep] = useState();
  const page = () => {
    switch (step) {
      case 1:
      case 2:
        return (
          <TaskCreationSlider
            photos={photos}
            complaint={complaint}
            setStep={setStep}
          />
        );
      case 3:
        return <TaskCreationDetails setStep={setStep} />;

      default:
        return <NotFoundPage />;
    }
  };

  return <TaskCreationProvider>{page()}</TaskCreationProvider>;
};

export default TaskCreation;
