import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useKeyboardNav() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      switch (e.key) {
        case "1":
          navigate("/");
          break;
        case "2":
          navigate("/ai-actions");
          break;
        case "3":
          navigate("/analytics");
          break;
        case "4":
          navigate("/infrastructure");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);
}
