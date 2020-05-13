// require dependencies
const fs = require(`fs`);
const path = require(`path`);
const assert = require(`assert`);

// declare constants
const EXERCISE_NAME = path.basename(__filename);
const START = Date.now();

// declare logging function
const log = (logId, value) =>
  console.log(`\nlog ${logId} (${Date.now() - START} ms):\n`, value);

// --- main script ---
console.log(`\n--- ${EXERCISE_NAME} ---`);

const fileName1 = process.argv[2];
const sourcePath = path.join(__dirname, fileName1);
log(1, sourcePath);

const fileName2 = process.argv[3];
const targetPath = path.join(__dirname, fileName2);
log(2, targetPath);

/*
log(3, `reading original contents from ${fileName1} ...`);
fs.readFile(sourcePath, `utf-8`, (err, originalSourceContent) => {
  if (err) {
    console.error(err);
    return;
  }

  log(4, `copying to ${fileName2} ...`);
  fs.copyFile(sourcePath, targetPath, (err) => {
    if (err) {
      console.error(err);
      return;
    }

    log(5, `reading ${fileName1} ...`);
    fs.readFile(sourcePath, `utf-8`, (err, sourceContent) => {
      if (err) {
        console.error(err);
        return;
      }

      log(6, `asserting ${fileName1} ...`);
      assert.strictEqual(sourceContent, originalSourceContent);

      log(7, `reading ${fileName2} ...`);
      fs.readFile(targetPath, `utf-8`, (err, targetContent) => {
        if (err) {
          console.error(err);
          return;
        }

        log(8, `asserting ${fileName2} ...`);
        assert.strictEqual(targetContent, originalSourceContent);

        log(9, "\033[32mpass!\x1b[0m");
        fs.appendFileSync(
          __filename,
          `\n// pass: ${new Date().toLocaleString()}`
        );
      });
    });
  });
});*/
// pass: 13/05/2020, 19:10:02

// Refactored
const util = require("util");
const readFilePromise = util.promisify(fs.readFile);
const copyFilePromise = util.promisify(fs.copyFile);

const readCopyAssert = async (sourcePath) => {
  try {
    log(3, `reading original contents from ${fileName1} ...`);
    const originalSourceContent = await readFilePromise(sourcePath, "utf-8");

    log(4, `copying to ${fileName2} ...`);
    await copyFilePromise(sourcePath, targetPath);

    log(5, `reading ${fileName1} ...`);
    const sourceContent = await readFilePromise(sourcePath, "utf-8");

    log(6, `asserting ${fileName1} ...`);
    assert.strictEqual(sourceContent, originalSourceContent);

    log(7, `reading ${fileName2} ...`);
    const targetContent = await readFilePromise(targetPath, "utf-8");

    assert.strictEqual(targetContent, originalSourceContent);

    log(9, "\033[32mpass!\x1b[0m");
    fs.appendFileSync(__filename, `\n// pass: ${new Date().toLocaleString()}`);

    log(5, "\033[32mpass!\x1b[0m");
    // you don't need to refactor this line
    fs.appendFileSync(__filename, `\n// pass: ${new Date().toLocaleString()}`);
  } catch (err) {
    console.error(err);
  }
};
readCopyAssert(sourcePath);

// pass: 13/05/2020, 19:24:48
// pass: 13/05/2020, 19:24:48
// pass: 13/05/2020, 19:43:47
// pass: 13/05/2020, 19:43:47