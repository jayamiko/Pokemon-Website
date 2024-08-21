import React from "react";
import { Link } from "react-router-dom";
import PokeballIcon from "../assets/pokeball-icon.png";

export default function Navbar() {
  return (
    <nav className="bg-sky-700 w-full h-20 flex items-center sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-3 md:px-5">
        <Link to="/">
          <img src={PokeballIcon} width={50} height={50} alt="pokeball" />
        </Link>
        <ul className="flex items-center justify-center space-x-4 md:space-x-10 lg:space-x-20">
          <li className="navbar-list">
            <Link to="/">Pokemon List</Link>
          </li>
          <li className="navbar-list">
            <Link to="/my-pokemon-list">My Pokemon List</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
