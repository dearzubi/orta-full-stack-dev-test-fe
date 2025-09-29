import { Link } from "@tanstack/react-router";
import { Icon } from "@iconify/react";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-[#242424] text-center px-6 py-12">
      <Icon
        className="w-24 h-24 text-yellow-500 dark:text-yellow-400 mb-8 animate-bounce"
        icon={"lucide:triangle-alert"}
      />
      <h1 className="text-6xl font-extrabold text-primary-600 dark:text-primary-500 tracking-tight sm:text-7xl">
        404 - Page Not Found
      </h1>
      <p className="mt-6 text-xl font-medium text-gray-800 dark:text-white/[.87] sm:text-2xl">
        It seems one the pages you were looking for has wandered off into the
        digital wilderness.
      </p>
      <div className="mt-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none"
        >
          <Icon className="w-5 h-5" icon={"lucide:home"} />
          Back to Homepage
        </Link>
      </div>
    </div>
  );
};
export default NotFoundPage;
