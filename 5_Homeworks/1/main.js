const fs = require("fs");
const path = require("path");

const pathDir = __dirname;

function readTestFile(fileName) {
  function checkType(s) {
    switch (`${s.charAt(0)}${s.charAt(s.length - 1)}`) {
      case "[]":
        return "Array";
      case "{}":
        return "Object";
      default:
        return "string";
    }
  }

  function parseArray(s) {
    return s
      .slice(1, s.length - 1)
      .split(",")
      .map((d) => changeType(d.trim()));
  }

  function parseObject(s) {
    const object = {};
    s.slice(1, s.length - 1)
      .split(",")
      .forEach((d) => {
        const keyValue = d.trim().split(":");
        object[keyValue[0].trim()] = changeType(keyValue[1].trim());
      });
    return object;
  }

  function changeType(s) {
    switch (checkType(s)) {
      case "Array":
        return parseArray(s);
      case "Object":
        return parseObject(s);
      default:
        return s.charAt(0) === `"` ? s.slice(1, s.length - 1) : s;
    }
  }

  const inputs = fs.readFileSync(fileName).toString();

  return changeType(inputs);
}

const solution = [
  function (s) {
    const answer =
      s.length % 2
        ? s[(s.length - 1) / 2]
        : s[s.length / 2 - 1] + s[s.length / 2];
    return answer;
  },
  function (seoul) {
    console.log(seoul);
    const answer = `김서방은 ${seoul.indexOf("Kim")}에 있다`;
    return answer;
  },
];

fs.readdir(pathDir, (err, files) => {
  files.forEach((file) => {
    if (file.split(".")[1] !== "txt") {
      return;
    }
    const number = +file.split(".")[0].split("_")[1].charAt(0);
    console.log(`solution${number}`);
    console.log("====================================");
    console.log(`Testing ${file}...`);
    console.log("");
    console.log("Test Ouput:");

    const parsedInputs = readTestFile(path.join(pathDir, file));

    const tStart = new Date().getTime();
    answer = solution[number - 1](parsedInputs);
    console.log(answer);
    const tDiff = new Date().getTime() - tStart;

    console.log("");
    console.log(`${tDiff} ms ellapsed.`);
    console.log("====================================\n");
  });
});
