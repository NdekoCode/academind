const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("Done"), 2000);
  });
};
setTimeout(async () => {
  const response = await fetchData();
  console.log(response);
}, 2000);
