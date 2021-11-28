import { useState, FC } from "react";

import DateAdapter from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import CircleIcon from "@mui/icons-material/Circle";
import { day } from "../util";
import BaseSearchFilter from "./BaseSearchFilter";

const BaseFilters: FC<{ callback: Function; loading?: boolean | undefined }> =
  ({ callback, loading }) => {
    const [value, setValue] = useState<Date | null>(new Date());

    return (
      <div>
        <div>
          <BaseSearchFilter />
        </div>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <DatePicker
            views={["day", "month", "year"]}
            label="Invert the order of views"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            onClose={() => {
              callback(
                `date.$date=${day(
                  Date.parse(day(value).format("YYYY-MM-DD"))
                ).toISOString()}&_sort=time`
              );
            }}
            renderInput={(params) => (
              <TextField {...params} helperText={null} />
            )}
          />
        </LocalizationProvider>
        <LoadingButton
          color="primary"
          onClick={() => callback("match_details.match_status=Playing")}
          loading={loading}
          loadingPosition="start"
          startIcon={<CircleIcon />}
          variant="contained"
        >
          On live
        </LoadingButton>
      </div>
    );
  };

export default BaseFilters;
