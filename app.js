const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("Done"), 2000);
  });
};
setTimeout(() => {
  fetchData()
    .then((text) => {
      console.log(text);
      return fetchData();
    })
    .then((text) => console.log(text));
}, 2000);
