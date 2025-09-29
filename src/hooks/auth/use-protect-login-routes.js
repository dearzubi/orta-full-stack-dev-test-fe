import { useNavigate } from "@tanstack/react-router";
import { useUserStore } from "../../stores/user.store.js";
import { useEffect } from "react";

/**
 * A hook to protect routes that require user to be logged in
 */
export const useProtectLoginRoutes = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (!user) {
      navigate({ to: "/login" });
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }
};
