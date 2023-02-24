import { useEffect, useState } from 'react';

const useIsReady = () => {
  /**
   * A hook that sets `isReady` to true after 500 ms.
   * To use it, show a `<BusyIndicator />` while `isReady == false`, before returning actual content.
   * This fixes a mysterious Navigation issue where the screen freezes for a second after logging in.
   */
  const [isReady, setIsReady,] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsReady(true), 500);
  }, []);

  return isReady;
};

export default useIsReady;
