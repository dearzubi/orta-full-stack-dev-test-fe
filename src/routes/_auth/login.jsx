import { createFileRoute } from "@tanstack/react-router";
import LoginInPage from "../../components/pages/login";

export const Route = createFileRoute("/_auth/login")({
  component: LoginInPage,
});
