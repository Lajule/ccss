const program = require("commander");
const parse = require("./lib/parse");
const {description, version} = require("./package");

program
  .version(version)
  .description(description)
  .arguments("<files...>")
  .option("-w, --watch", "Use watch mode")
  .parse(process.argv);

const sources = program.args;
const watch = program.watch;
let code = 0;

for (let argv = 0; argv < sources.length; ++argv) {
  code += parse(sources[argv], watch);
}

if (!watch) {
  process.exit(code);
}
