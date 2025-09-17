import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop({ behavior = 'smooth' }) {
  const location = useLocation();

  useEffect(() => {
    // Always scroll to top on route change
    try {
      window.scrollTo({ top: 0, left: 0, behavior });
    } catch (_) {
      // Fallback for older browsers
      window.scrollTo(0, 0);
    }
  }, [location.pathname, behavior]);

  return null;
}
