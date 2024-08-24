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
};

export const TAB = {
  Moves: "moves",
  Abilities: "abilities",
};

export const tabList = [TAB.Moves, TAB.Abilities];
