import type { FC } from "react";
import type { MatchInterface } from "../Interfaces/MatchInterface";
import { day } from "../util";

type Matches = { matches: Array<Array<MatchInterface>> };

const BaseTable: FC<Matches> = ({ matches }) => {
  return (
    <div>
      {matches.map((competition: MatchInterface[]) => (
        <div key={competition[0].competition.name}>
          <h1>{competition[0].competition.name}</h1>
          {competition.map((match) => (
            <div key={match.match_id}>
              {match.description}
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
