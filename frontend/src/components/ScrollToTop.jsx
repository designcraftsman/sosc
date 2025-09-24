import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop({ behavior = 'smooth' }) {
  const location = useLocation();

  useEffect(() => {
    // If there's a hash (e.g., /about#team), scroll to that element
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior, block: 'start' });
        return;
      }
    }
    // Otherwise, scroll to top on route change
    try {
      window.scrollTo({ top: 0, left: 0, behavior });
    } catch (_) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash, behavior]);

  return null;
}
