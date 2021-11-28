import { FC, useEffect, useState } from "react";
import type { Contestant, MatchInterface } from "../Interfaces/MatchInterface";
import { day } from "../util";
import BaseTeams from "./BaseTeams";

const BaseTable: FC<{ matches: Array<Array<MatchInterface>> }> = ({
  matches,
}) => {
  const [teamsStore, setTeamsStore] = useState<Contestant[]>([]);

  useEffect(() => {
    setTeamsStore(JSON.parse(localStorage.getItem("teams") || "[]"));
    console.log("object");
  }, []);

  return (
    <div>
      {matches.map((competition: MatchInterface[]) => (
        <div key={competition[0].competition.name}>
          <h1>{competition[0].competition.name}</h1>
          {competition.map((match) => (
            <div key={match.match_id}>
              <BaseTeams
                teams={match.contestant}
                addTeamToFollowingList={setTeamsStore}
                followingList={teamsStore}
              />
              <br />
              <span>
                {day(
                  `${day.utc(match.date.$date).format("YYYY-MM-DD")}T${
                    match.time
                  }`
                ).format("hh:mm A")}
              </span>
              <br />
              <span>{match.match_details.match_status}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default BaseTable;
