import { NextUIProvider } from "@nextui-org/react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Header from "./components/Header";
import Pokemon from "./components/Pokemon";
import Search from "./components/Search";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header />}>
      <Route index element={<Search />} />
      <Route path="pokemon" element={<Pokemon />} />
    </Route>
  )
);

function App() {
  return (
    <NextUIProvider>
      <NextThemesProvider
        enableColorScheme={true}
        enableSystem={true}
        attribute="class"
        defaultTheme={localStorage.getItem("theme") || undefined}
      >
        <RouterProvider router={router} />
      </NextThemesProvider>
    </NextUIProvider>
  );
}

export default App;
