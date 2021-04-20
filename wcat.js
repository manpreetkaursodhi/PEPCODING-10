//  input -> ??
let fs = require("fs");
//input
let input = process.argv.slice(2);
console.log("input", input);
let options = [];
let filePaths = [];
// to extract options and filepaths from input
for (let i = 0; i < input.length; i++) {
    // first character js string 
    if (input[i] == "-s" || input[i] == "-b" || input[i] == "-n") {
        options.push(input[i]);
    } else {
        filePaths.push(input[i]);
    }
}
// console.log("options", options);
// console.log("filePath", filePaths);


// to check that all file paths exist
for (let i = 0; i < filePaths.length; i++) {
    let isFilePresent = fs.existsSync(filePaths[i]);
    if (isFilePresent == false) {
        console.log("filepath", filePaths[i], "does not exist");
        return;
    }
}
// to read content from file path
let totalContent = "";
for (let i = 0; i < filePaths.length; i++) {
    let contentOFCurrent = fs.readFileSync(filePaths[i]);
    // after every file's content next file's content should come in next line
    totalContent += contentOFCurrent + "\r\n";
}

//  implements -s option-> remove empty line breaks
let isSoption = options.includes("-s");
if (isSoption == true) {
    // split on basis of line breaks
    let contentArr = totalContent.split("\r\n");
    
    // identify and remove line breaks 
    let tempArr = [];
    for (let i = 0; i < contentArr.length; i++) {
        if (contentArr[i] !== "") {
            tempArr.push(contentArr[i]);
        }
    }
    totalContent = tempArr.join("\r\n");
}
//console.log(totalContent);


// when both -n and -b will be given by user
let isN = options.includes("-n");
let isB = options.includes("-b");
let finalOption;
if(isN==true){
    if(isB==true){

let idxB=options.indexOf("-b");
let idxN=options.indexOf("-n");
finalOption=idxB<idxN?"-b":"-n"; //the option that comes first will be implemented
    }else{
        finalOption="-n";
    }
}else if(isB ==true){
    finalOption="-b";
}


//implement -n ->put a number to every line

if (finalOption=="-n") {
    let count = 1;
    let contentArr = totalContent.split("\r\n");

    for (let i = 0; i < contentArr.length; i++) {
        contentArr[i] = count+". " + contentArr[i];
        count++;
    }
    totalContent = contentArr.join("\r\n");
}
//console.log(totalContent);


// implement -b ->put number to non-empty lines

if(finalOption=="-b"){
    let count = 1;
    let contentArr = totalContent.split("\r\n");
    for (let i = 0; i < contentArr.length; i++) {
        if(contentArr[i]!=""){
        contentArr[i] = count+". " + contentArr[i];
        count++;
      }
    }
    totalContent = contentArr.join("\r\n");
}
console.log(totalContent);










//  -s option implement
// console.log(totalContent);

//  node wcat.js -s -b -n "f1.txt" 
//  node wcat.js -s -b -n "f1.txt" "f2.txt" "f4.txt" 