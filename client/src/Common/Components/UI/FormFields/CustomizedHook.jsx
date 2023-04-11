import { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import axios from "C:\\Users\\otaku\\source\\repos\\ComplaintSystem\\client\\src\\Common\\Utils\\AxiosAgent.js";
import { Controller, useFormContext } from "react-hook-form";

function EmployeeSelect({ name, label }) {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const { control } = useFormContext();

  useEffect(() => {
    axios.get("api/tasks/users").then((response) => {
      const employees = response.data.map((employee) => ({
        id: employee.id,
        name: employee.strFirstName,
      }));
      setEmployees(employees);
    });
  }, []);
  return (
    <Controller
    
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <Autocomplete
          multiple
          id={"employee-select"}
          name={name}
          options={employees}
          value={value || []}
          onChange={(_, data) => onChange(data)}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} label={label} />}
        />
      )}
    />
    
  );
}

export default EmployeeSelect;
