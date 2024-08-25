const calculateCountdown = (lastAttempt) => {
  const now = new Date();
  const timeDifference = lastAttempt.getTime() + 3600000 - now.getTime();

  if (timeDifference <= 0) {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
  const seconds = Math.floor((timeDifference / 1000) % 60);

  return {
    hours,
    minutes,
    seconds,
  };
};

export default calculateCountdown;
