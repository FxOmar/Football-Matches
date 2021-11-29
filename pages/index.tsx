import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import type { Contestant, MatchInterface } from "../Interfaces/MatchInterface";
import { groupCompetitionBy } from "../util";
import { getMatches } from "../Http/Fetch";
import { useEffect, useState } from "react";
/**
 * Components
 */
import BaseTable from "../components/BaseTable";
import BaseFilters from "../components/BaseFilters";
import BaseFollowingTeamsList from "../components/BaseFollowingTeamsList";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";

const style = {
  marginTop: "20px",
  marginBottom: "50px",
};

const Home: NextPage = ({
  matches,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [searchData, setSearchData] = useState<MatchInterface[] | undefined>();

  const [teamsStore, setTeamsStore] = useState<Contestant[]>([]);

  useEffect(() => {
    setTeamsStore(JSON.parse(localStorage.getItem("teams") || "[]"));
  }, []);

  const setLocalItem = () => {
    /** local storage update is not that fast */
    /** it makes sure that we are getting the new value  */
    setTimeout(() => {
      const itemValueFromStorage = localStorage.getItem("teams");
      const value = itemValueFromStorage && JSON.parse(itemValueFromStorage);
      setTeamsStore(value);
    }, 50);
  };

  useEffect(() => {
    window.addEventListener("storage", setLocalItem, false);

    return () => window.removeEventListener("storage", setLocalItem);
  }, [teamsStore]);

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        spacing={9}
      >
        <Grid item xs={9}>
          <div style={style}>
            <BaseFilters setSearch={setSearchData} />
            <div style={style}>
              <BaseTable
                matches={groupCompetitionBy(searchData ?? matches)}
                setTeamsStore={setTeamsStore}
                teams={teamsStore}
              />
            </div>
          </div>
        </Grid>
        <Grid item xs={3}>
          <BaseFollowingTeamsList
            setTeamsStore={setTeamsStore}
            teams={teamsStore}
          />
        </Grid>
      </Grid>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await getMatches("2020-09-11");

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      matches: data,
    },
  };
};

export default Home;
