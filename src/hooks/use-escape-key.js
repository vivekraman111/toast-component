import React from "react";

export default function useEscapeKey(fn) {
  React.useEffect(() => {
    function handleEsc(event) {
      if (event.code === "Escape") {
        fn();
      }
    }

    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  }, [fn]);
}
