// useOnline hook 可以让你检测用户的在线/离线状态，并做出相应反应。
import { useCallback, useEffect, useRef } from 'react';

function useOnline () {
  const [isOnline, setIsOnline] = useState(true);

  const handleOnline = () => setIsOnline(true);
  const handleOffline = () => setIsOnline(false);

  useEffect(() => {
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}
