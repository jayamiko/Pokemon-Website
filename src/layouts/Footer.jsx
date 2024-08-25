import React from "react";
import PokemonLogo from "../assets/pokemon-logo.png";
import Image from "../components/image/Image";
import { Link } from "react-router-dom";
import { mediaSosialLinks } from "../utils/constants";

const Footer = () => {
  return (
    <footer className="bg-sky-700 text-white py-6 mt-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div>
          <Image src={PokemonLogo} width={350} height={350} alt="loading..." />
          <p className="text-xs sm:text-sm text-center mt-2">
            © 2024 All rights reserved.
          </p>
        </div>
        <div className="flex space-x-5">
          {mediaSosialLinks.map((medsos, index) => {
            return (
              <Link
                key={index}
                to={medsos?.link}
                target="_black"
                className="text-white p-2 border rounded-full shadow-xl hover:scale-110"
                style={{ background: medsos.color }}
              >
                {medsos?.icon}
              </Link>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
