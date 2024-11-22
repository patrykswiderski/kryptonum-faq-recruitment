import { useState, useEffect, useRef } from 'react';

const useDelayedLoading = (isLoading: boolean, delay: number = 500): boolean => {
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const loadingTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isLoading) {
      loadingTimerRef.current = setTimeout(() => {
        setShowLoading(true);
      }, delay);
    } else {
      if (loadingTimerRef.current) {
        clearTimeout(loadingTimerRef.current);
        loadingTimerRef.current = null;
      }
      setShowLoading(false);
    }

    return () => {
      if (loadingTimerRef.current) {
        clearTimeout(loadingTimerRef.current);
      }
    };
  }, [isLoading, delay]);

  return showLoading;
};

export default useDelayedLoading;
