import { useState, useEffect } from 'react';

export const useInFocus = (ref) => {

  const [ inFocus, setInFocus ] = useState(false);

  useEffect(() => {

    const handleClickOutside = (e) => {
      if (inFocus && ref.current && !ref.current.contains(e.target)) {
        setInFocus(false);
      }
    };

    const handleClickInside = (e) => {
      if (!inFocus && ref.current && ref.current.contains(e.target)) {
        setInFocus(true);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('mousedown', handleClickInside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('mousedown', handleClickInside);
    };
  }, [ref, inFocus]);

  return inFocus;
}