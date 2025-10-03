import { useEffect, useRef, useState } from "react";

export function useWindowWidth<T extends HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function updateWidth() {
      if (ref.current) {
        setWindowWidth(ref.current.offsetWidth);
      }
    }

    updateWidth();

    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return {
    ref,
    windowWidth,
  };
}
