import { writeFile,appendFile,readFile, unlink,access} from "fs/promises";
import { constants } from "fs";

async function createFile() {
  await writeFile("example.txt", "Hello, Node.js\n");
  console.log("File created and content written.");
}

createFile();

async function appendToFile() {
  // await writeFile("example.txt", "Hello, Node.js\n");
  await appendFile("example.txt", "This is an appended line.\n");
  console.log("Line appended.");
  
}

appendToFile()



  async function readingfile() {

try {
    await access("example.txt", constants.F_OK);

    const content = await readFile("example.txt", "utf-8");
    console.log("File exists. Content:");
    console.log(content);
  } catch (error) {
    console.log("File does not exist.");
  }

}
readingfile()

async function deleteFile() {
  await unlink("example.txt");
  console.log("File deleted.");
}

//deleteFile();

