import { useState, useEffect } from "react";

export default function useDebounceState<T>(state: T, delay: number) {
  const [debouncedState, setDebouncedValue] = useState<T>(state);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(state), delay);

    return () => clearTimeout(handler);
  }, [state, delay]);

  return debouncedState;
}
