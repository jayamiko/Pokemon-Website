export default function sortRandomData(data) {
  const randomData = data.sort(() => {
    return 0.5 - Math.random();
  });

  return randomData;
}
