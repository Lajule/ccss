const chokidar = require("chokidar");
const css = require("css");
const colors = require("colors");
const fs = require("fs");

function check({rules}) {
  for (let index = 0; index < rules.length; ++index) {
    const rule = rules[index];


  }

  return 0;
}

function process(source) {
  let result = 0;

  try {
    const str = fs.readFileSync(source, "utf8");
    const {type, stylesheet} = css.parse(str, {source});

    if (type === "stylesheet") {
      result = check(stylesheet);
    }
  }
  catch(ex) {
    console.log(colors.red(ex));
    result = 1;
  }

  return result;
}

module.exports = function (source, watch) {
  let result = 0;

  if (watch) {
    const watcher = chokidar.watch(source);

    watcher.on("change", () => {
      console.log(colors.green(`${source}: changed, needs to be processed`));
      process(source);
    });
  }
  else {
    result = process(source);
  }

  return result;
}
