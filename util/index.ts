import type { MatchInterface } from "../Interfaces/MatchInterface";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/de";

// dayjs.locale("de");
dayjs.extend(utc);

export const day = dayjs;

/**
 * Group the matches by its competition
 *
 * @param collection
 * @param key
 * @returns Array
 */
export function groupCompetitionBy(
  collection: MatchInterface[]
): Array<Array<MatchInterface | string>> {
  let index,
    values = [],
    result = [];
  for (let i = 0; i < collection.length; i++) {
    let val = collection[i]["competition"]["competition_code"];

    index = values.indexOf(val);

    if (index > -1) result[index].push(collection[i]);
    else {
      values.push(val);
      result.push([collection[i]]);
    }
  }

  return result;
}
