import {
  FaInstagram,
  FaGithub,
  FaFacebook,
  FaLinkedinIn,
} from "react-icons/fa";

export const API_URL = process.env.REACT_APP_API_URL;
export const POKE_API = process.env.REACT_APP_POKE_API_URL;

export const STATUS = {
  Idle: "Idle",
  Loading: "Loading",
  Succeded: "Succeded",
  Failed: "Failed",
};

export const VARIANT = {
  Success: "success",
  Failed: "danger",
  Info: "primary",
  Warning: "warning",
};

export const LIMIT_PAGINATION = 40;

export const TAB = {
  Moves: "moves",
  Abilities: "abilities",
};

export const tabList = [TAB.Moves, TAB.Abilities];

export const colors = [
  "#10B981",
  "#DC2626",
  "#3B82F6",
  "#EAB308",
  "#e76f51",
  "#8338ec",
];

const MEDIA_SOSIAL = {
  Linkedin: {
    link: "https://google.com/",
    color: "#0a66c2",
    icon: <FaLinkedinIn size={28} />,
  },
  Instagram: {
    link: "https://google.com/",
    color: "#C13584",
    icon: <FaInstagram size={28} />,
  },
  Facebook: {
    link: "https://google.com/",
    color: "#4267B2",
    icon: <FaFacebook size={28} />,
  },
  Github: {
    link: "https://google.com/",
    color: "#2b3137",
    icon: <FaGithub size={28} />,
  },
};

const { Linkedin, Instagram, Facebook, Github } = MEDIA_SOSIAL;

export const mediaSosialLinks = [Linkedin, Instagram, Facebook, Github];
