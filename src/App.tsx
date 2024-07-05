import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Header from "./components/Header";
import Pokemon from "./pages/Pokemon";
import Search from "./pages/Search";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header />}>
      <Route index element={<Search />} />
      <Route path="pokemon/:name" element={<Pokemon />} />
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
