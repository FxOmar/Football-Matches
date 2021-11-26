import Http from "./http";
import { day } from "../util/index";
import type { MatchInterface } from "../Interfaces/MatchInterface";

export async function getMatches(
  date: string
): Promise<Array<MatchInterface> | void> {
  try {
    const { data } = await Http.get(
      `/matches?date.$date=${day(Date.parse(date)).toISOString()}&_sort=time`
    );

    return data;
  } catch (e) {
    console.error(e);
  }
}
