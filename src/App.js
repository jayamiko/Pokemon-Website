import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./layouts/Navbar";
import { lazy, Suspense } from "react";
import LoaderPage from "./components/loading/LoaderPage";

const PokemonList = lazy(() => import("./pages/PokemonList"));
const PokemonDetail = lazy(() => import("./pages/PokemonDetail"));
const MyPokemonList = lazy(() => import("./pages/MyPokemonList"));

function App() {
  return (
    <Router>
      <Suspense fallback={<LoaderPage />}>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<PokemonList />} />
          <Route path="/pokemon/:name" element={<PokemonDetail />} />
          <Route path="/my-pokemon-list" element={<MyPokemonList />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
