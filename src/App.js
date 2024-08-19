import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PokemonList from "./pages/PokemonList";
import PokemonDetail from "./pages/PokemonDetail";
import MyPokemonList from "./pages/MyPokemonList";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<PokemonList />} />
        <Route path="/pokemon/:name" element={<PokemonDetail />} />
        <Route path="/my-pokemon-list" element={<MyPokemonList />} />
      </Routes>
    </Router>
  );
}

export default App;
