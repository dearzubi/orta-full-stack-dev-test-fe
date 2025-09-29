import { Link, useNavigate, useLocation } from "@tanstack/react-router";
import {
  Button,
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useUserStore } from "../../stores/user.store.js";

const MainLayout = ({ children }) => {
  /** @type AppUser | null */
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const location = useLocation();

  const navigate = useNavigate();

  const isHomePage = location.pathname === "/";

  const logout = () => {
    setUser(null);
    navigate({ to: "/login" });
  };

  return (
    <div className="flex flex-col h-screen bg-background w-full">
      <HeroNavbar
        isBordered
        className="w-full"
        classNames={{
          wrapper: "max-w-7xl ",
        }}
      >
        <NavbarBrand>
          <Link to={"/"}>
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-1 rounded-md shadow-lg">
                <Icon icon="fluent:shifts-team-24-filled" width={24} />
              </div>
              <span className="font-semibold text-lg bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                Orta Shift Manager
              </span>
            </div>
          </Link>
        </NavbarBrand>
        <NavbarContent justify="end">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-foreground/70">
                <Icon
                  icon="lucide:user"
                  className="text-orange-500"
                  width={16}
                />
                <span className="font-medium">Welcome, {user.name}</span>
              </div>
              <Button
                className="focus:outline-none hover:border-transparent bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-600 text-white shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
                size="sm"
                variant="solid"
                onPress={logout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors px-3 py-1.5 rounded-md"
              >
                Login
              </Link>

              <Button
                className="focus:outline-none hover:border-transparent bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-600 text-white shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
                size="sm"
                variant="solid"
                onPress={() => navigate({ to: "/register" })}
              >
                Register
              </Button>
            </div>
          )}
        </NavbarContent>
      </HeroNavbar>

      <div className="flex flex-1 overflow-hidden">
        <motion.main
          className={`flex-1 overflow-auto ${!isHomePage ? "p-4 md:p-6" : ""}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {isHomePage ? (
            children
          ) : (
            <div className="max-w-7xl mx-auto">{children}</div>
          )}
        </motion.main>
      </div>
    </div>
  );
};

export default MainLayout;
