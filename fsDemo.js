import fs from "fs/promises";

//readFile() - callback;

// fs.readFile("./test.txt", "utf8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });
// //readFileSync() - synchronous version ;

// const data = fs.readFileSync("./test.txt", "utf8");
// console.log(data);

// //readFilePromise() - Promise .then() ;

// fs.readFile("./test.txt", "utf8")
//   .then((data) => console.log(data))
//   .catch((error) => console.log(error));

// readFileSync() - async/await

const readFile = async () => {
  try {
    const data = await fs.readFile("./test.txt", "utf8");
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

//Write file
const writeFile = async () => {
  try {
    await fs.writeFile("./test.txt", "Hello im writing to this");
    console.log("File written to");
  } catch (error) {
    console.log(error);
  }
};
//Append file
const appendFile = async () => {
  try {
    await fs.appendFile("./test.txt", "\n This is appended file");
    console.log("this was appended text");
  } catch (error) {
    console.error(error);
  }
};

writeFile();
appendFile();
readFile();
