const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const fs = require("fs");
  console.log("Type no. of operation to do\n");
  
  readline.question(
    "1.Make a folder\n2.delete a folder\n3.rename a folder\n",
    (valueFromInput) => {
      switch (parseInt(valueFromInput)) {
        case 1:
          readline.question("Enter Name of the folder\n", (folderName) => {
            fs.mkdirSync(`${folderName}`);
            console.log("done");
            readline.close();
          });
          break;
        case 2:
          readline.question("Enter Name of the folder\n", (folderName) => {
            fs.rmdirSync(`${folderName}`);
            console.log("done");
            readline.close();
          });
          break;
        case 3:
          readline.question(
            "Enter Name of the folder to rename\n",
            (folderName) => {
              readline.question("Enter new Name of the folder\n", (newName) => {
                fs.renameSync(`${folderName}`, `${newName}`);
                console.log("done");
                readline.close();
              });
            }
          );
          break;
        default:
          console.error("Wrong input entered");
      }
    }
  );