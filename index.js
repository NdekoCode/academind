let arr = [
  { id: "1", name: "John" },
  { id: "2", name: "Doe" },
];
const newArr = [
  ...arr.map((item, key) => {
    item["label"] = item["name"];
    delete item.name;
    return item;
  }),
];
console.log(newArr);
