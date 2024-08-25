function getStatus(item) {
  if (item.isCaught === true) return "Pending";
  if (item.isCaught === false) return "Caught";
  return "";
}

export default getStatus;
