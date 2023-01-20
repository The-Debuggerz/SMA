import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // delay setting the debouncedValue state by the specified delay
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // cancel the timeout if the value state changes before the timeout is reached
    return () => {
      clearTimeout(timeoutId);
    };
  }, [value]);

  return debouncedValue;
}

export default useDebounce;
