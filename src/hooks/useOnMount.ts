import { useEffect } from "react";

const useOnMount = (callback: () => void): void => {
  // biome-ignore lint/correctness/useExhaustiveDependencies: Bad rule
  useEffect(() => {
    callback();
  }, []);
};

export default useOnMount;
