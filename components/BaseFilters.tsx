import { useState, FC } from "react";

import DateAdapter from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";

const BaseFilters: FC<{ callback: Function }> = ({ callback }) => {
  const [value, setValue] = useState<Date | null>(new Date());

  return (
    <div>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <DatePicker
          views={["day", "month", "year"]}
          label="Invert the order of views"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          onClose={() => {
            callback(value);
          }}
          renderInput={(params) => <TextField {...params} helperText={null} />}
        />
      </LocalizationProvider>
    </div>
  );
};

export default BaseFilters;
