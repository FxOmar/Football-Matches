import { useState, useEffect, useCallback, FC } from "react";

import DateAdapter from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import CircleIcon from "@mui/icons-material/Circle";
import { day } from "../util";
import BaseSearchFilter from "./BaseSearchFilter";
import Grid from "@mui/material/Grid";
import { useFetch } from "../util/hooks";
import { MatchInterface } from "../Interfaces/MatchInterface";
import debounce from "lodash.debounce";

const BaseFilters: FC<{
  setSearch: Function;
}> = ({ setSearch }) => {
  const [{ data, error, loading }, fetchData] =
    useFetch<MatchInterface[]>("/matches");
  const [value, setValue] = useState<Date | null>(new Date());

  useEffect(() => {
    setSearch(data);
  }, [data, setSearch]);

  function changeHandler(newValue) {
    setValue(newValue);
    fetchData(
      `date.$date=${day(
        Date.parse(day(newValue).format("YYYY-MM-DD"))
      ).toISOString()}&_sort=time`
    );
  }

  const debouncedChangeHandler = useCallback(debounce(changeHandler, 500), []);

  return (
    <Grid container direction="row" alignItems="center" spacing={12}>
      <Grid item xs={5}>
        <BaseSearchFilter setSearchData={setSearch} />
      </Grid>
      <Grid item xs={3}>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <DatePicker
            label="Pick a date"
            value={value}
            onChange={debouncedChangeHandler}
            // onClose={changeHandler}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={2.5}>
        <LoadingButton
          color="primary"
          onClick={() => fetchData("match_details.match_status=Playing")}
          loading={loading}
          loadingPosition="start"
          startIcon={<CircleIcon />}
          variant="contained"
        >
          On live
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default BaseFilters;
