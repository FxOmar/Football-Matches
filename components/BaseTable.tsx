import { FC, useEffect, useState } from "react";
import type { Contestant, MatchInterface } from "../Interfaces/MatchInterface";
import BaseTeams from "./BaseTeams";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const BaseTable: FC<{
  matches: Array<Array<MatchInterface>>;
  setTeamsStore: Function;
  teams: Contestant[];
}> = ({ matches, setTeamsStore, teams }) => {
  return (
    <div>
      {matches.map((competition: MatchInterface[]) => (
        <Accordion key={competition[0].competition.name}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{competition[0].competition.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {competition.map((match) => (
              <div key={match.match_id}>
                <BaseTeams
                  teams={match}
                  addTeamToFollowingList={setTeamsStore}
                  followingList={teams}
                />
              </div>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default BaseTable;
