import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useState } from "react";
import { groupCompetitionBy, day } from "../util";
import { getMatches } from "../Http/Fetch";
/**
 * Components
 */
import BaseTable from "../components/BaseTable";
import BaseFilters from "../components/BaseFilters";
import { MatchInterface } from "../Interfaces/MatchInterface";

const Home: NextPage = ({
  matches,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [data, setData] = useState<Array<
    Array<MatchInterface | string>
  > | null>(null);

  async function fetchData(date: Date) {
    const data = await getMatches(day(date).format("YYYY-MM-DD"));
    setData(groupCompetitionBy(data));
  }

  return (
    <>
      <BaseFilters callback={fetchData} />
      <BaseTable matches={data ?? matches} />
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
      matches: groupCompetitionBy(data),
    },
  };
};

export default Home;
