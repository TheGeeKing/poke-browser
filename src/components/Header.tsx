import { useTheme } from "next-themes";
import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

function Header() {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  useEffect(() => {
    if (theme === null) {
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? setTheme("dark")
        : setTheme("light");
    }
  }, [theme, setTheme]);

  return (
    <>
      <div
        id="header"
        className="fixed top-0 left-0 w-screen h-16 transition ease-in-out duration-500 -translate-y-5 hover:translate-y-0"
      >
        <header className="h-full scale-90 sm:scale-1">
          <nav className="h-full">
            <ul className="flex row-auto justify-center h-full items-center space-x-2 sm:space-x-4 [&_li]:h-full [&_li]:flex [&_a]:dark:text-white [&_a]:h-full [&_a]:flex [&_a]:items-center [&_a]:sm:text-xl">
              <li>
                <Link
                  onClick={() => navigate("/")}
                  to="/"
                  draggable={false}
                  className="hover:dark:text-legacyBlurple transition ease-in-out duration-500"
                >
                  Rechercher
                </Link>
              </li>
            </ul>
          </nav>
        </header>
      </div>
      <Outlet />
    </>
  );
}

export default Header;
