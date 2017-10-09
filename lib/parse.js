const css = require("css");
const colors = require("colors");
const fs = require("fs");
const check = require("./check");

module.exports = function (source) {
  try {
    const str = fs.readFileSync(source, "utf8");
    const {type, stylesheet} = css.parse(str, {source});

    if (type === "stylesheet") {
      check(stylesheet);
    }

    return 0;
  }
  catch(ex) {
    console.log(colors.red(ex));
    return 1;
  }
}
