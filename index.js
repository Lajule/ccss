const program = require("commander");
const colors = require("colors");
const css = require("css");
const fs = require("fs");
const {description, version} = require("./package");
const concentricCss = require("./lib/concentric-css");

program
  .version(version)
  .description(description)
  .arguments("<files...>")
  .option("-w, --watch", "Use watch mode")
  .parse(process.argv);

for (let argv = 0; argv < program.args.length; ++argv) {
  const source = program.args[argv];

  try {
    const {type, stylesheet} = css.parse(fs.readFileSync(source, "utf8"), {source});

    if (type === "stylesheet") {
      console.log(stylesheet);
    }
  }
  catch(ex) {
    console.log(colors.red(ex));
  }
}
