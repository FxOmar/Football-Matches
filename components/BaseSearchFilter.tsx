import { FC, useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import http from "../Http/http";

const BaseSearchFilter: FC<{ setSearchData: Function }> = ({
  setSearchData,
}) => {
  const [input, setInput] = useState<string | undefined>();

  function Search(text: string): void {
    let endpoints = [
      `/api/matches/_search?contestant[0].name=${text}`,
      `/api/matches/_search?contestant[1].name=${text}`,
      `/api/matches/_search?competition.name=${text}`,
    ];

    Promise.all(endpoints.map((endpoint: string) => http.get(endpoint))).then(
      (response) => {
        response.forEach(({ data }) => {
          if (data.length > 0) {
            setSearchData(data);
          }
        });
      }
    );
  }

  function handleSearchBarClick(event) {
    event.preventDefault();

    if (input) Search(input);
    else return null;
  }

  return (
    <Paper
      component="form"
      sx={{ p: "3px 6px", display: "flex", alignItems: "center", width: 400 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search for Competition or Team"
        inputProps={{ "aria-label": "Search for Competition or Team" }}
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />
      <IconButton
        type="submit"
        onClick={handleSearchBarClick}
        sx={{ p: "10px" }}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default BaseSearchFilter;
