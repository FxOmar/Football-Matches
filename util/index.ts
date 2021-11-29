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
): Array<Array<MatchInterface>> {
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

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// `wait` milliseconds.
export const debounce = (func: Function, wait: number) => {
  let timeout: any;

  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
