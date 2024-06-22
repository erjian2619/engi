const { CreateLocalStore } = require("./index");

const store = new CreateLocalStore();

store.set("a", ["123"]);
store.push("a", "1");

const a = store.get("a");

console.log("====================", a);
