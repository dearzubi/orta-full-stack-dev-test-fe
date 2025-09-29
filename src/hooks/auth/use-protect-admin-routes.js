import { useNavigate } from "@tanstack/react-router";
import { useUserStore } from "../../stores/user.store.js";
import { useEffect } from "react";

/**
 * A hook to protect admin routes by checking user authentication and role.
 */
export const useProtectAdminRoutes = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (!user) {
      navigate({ to: "/login" });
    } else if (user.role !== "admin") {
      navigate({ to: "/" });
    }
  }, [user, navigate]);

  if (!user || user.role !== "admin") {
    return null;
  }
};
