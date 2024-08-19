import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-sky-700 w-full h-20 flex items-center sticky top-0 z-50">
      <div className="container mx-auto flex justify-center items-center px-5">
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
