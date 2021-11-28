import { useReducer } from "react";
import http from "../Http/http";

interface State<T> {
  data?: T;
  error?: Error;
  loading?: boolean;
}

// discriminated union type
type Action<T> =
  | { type: "loading"; payload: boolean }
  | { type: "fetched"; payload: T }
  | { type: "error"; payload: Error };

export function useFetch<T = unknown>(endpoint: string): [State<T>, Function] {
  const initialState: State<T> = {
    error: undefined,
    data: undefined,
    loading: false,
  };

  // Keep state logic separated
  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case "loading":
        return { ...initialState, loading: action.payload };
      case "fetched":
        return { ...initialState, data: action.payload };
      case "error":
        return { ...initialState, error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  const fetchData = async (query: string) => {
    if (!endpoint) return;

    dispatch({ type: "loading", payload: true });

    try {
      const { data, statusText } = await http.get(`${endpoint}?${query}`);

      if (statusText !== "OK") {
        throw new Error(statusText);
      }

      dispatch({ type: "fetched", payload: data });
    } catch (error) {
      dispatch({ type: "error", payload: error as Error });
    }
  };

  return [state, fetchData];
}
