// const { generateRandomNum, celciusToFahrenheit } = require("./util");
// console.log(`Random number: ${generateRandomNum()}`);
// console.log(`Celcius to fahrenhite : ${celciusToFahrenheit(0)}`);

import { getPosts, getPostsLength } from "./postController.js";

console.log(getPosts());
console.log(`Lenght is ${getPostsLength()}`);
