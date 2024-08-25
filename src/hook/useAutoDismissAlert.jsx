import { useEffect } from "react";

function useAutoDismissAlert(alert, setAlert, value = false) {
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(value);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [alert, setAlert]);
}

export default useAutoDismissAlert;
