import Box from "@mui/material/Box";
import { useEffect, useState, FC } from "react";

import type { Contestant } from "../Interfaces/MatchInterface";
import Image from "next/image";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import StarIcon from "@mui/icons-material/Star";
import IconButton from "@mui/material/IconButton";
import { TransitionGroup } from "react-transition-group";
import Collapse from "@mui/material/Collapse";

const BaseFollowingTeamsList: FC<{
  setTeamsStore: Function;
  teams: Contestant[];
}> = ({ setTeamsStore, teams }) => {
  function removeTeamFromFollowingList(arr: Contestant[], teamID: string) {
    const index = arr.findIndex((el: Contestant) => el.id === teamID);

    if (index > -1) {
      arr.splice(index, 1);
    }

    setTeamsStore([...arr]);
    localStorage.setItem("teams", JSON.stringify(arr));
  }

  return (
    <Box
      sx={{
        width: 300,
        height: "100%",
        backgroundColor: "primary.dark",
        pt: "3px",
        pl: "4px",
      }}
    >
      <h3 style={{ margin: "6px" }}>Following list</h3>
      <List dense sx={{ width: "100%", maxWidth: 360 }}>
        <TransitionGroup>
          {teams.map((team) => {
            return (
              <Collapse key={team.id}>
                <ListItem
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      title="Delete"
                      onClick={() =>
                        removeTeamFromFollowingList(teams, team.id)
                      }
                    >
                      <StarIcon />
                    </IconButton>
                  }
                  disablePadding
                >
                  <ListItemButton>
                    <ListItemAvatar>
                      <Image
                        src="/placeholder.png"
                        alt="me"
                        width="25"
                        height="25"
                      />
                    </ListItemAvatar>
                    <ListItemText id={team.id} primary={team.name} />
                  </ListItemButton>
                </ListItem>
              </Collapse>
            );
          })}
        </TransitionGroup>
      </List>
    </Box>
  );
};

export default BaseFollowingTeamsList;
