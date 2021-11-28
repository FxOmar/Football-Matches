import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import type { MatchInterface } from "../Interfaces/MatchInterface";
import { groupCompetitionBy, day } from "../util";
import { getMatches } from "../Http/Fetch";
import { useFetch } from "../util/hooks";
/**
 * Components
 */
import BaseTable from "../components/BaseTable";
import BaseFilters from "../components/BaseFilters";

const Home: NextPage = ({
  matches,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [{ data, error, loading }, fetchData] =
    useFetch<MatchInterface[]>("/matches");

  return (
    <>
      <BaseFilters callback={fetchData} loading={loading} />
      <BaseTable matches={groupCompetitionBy(data ?? matches)} />
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
