const program = require("commander");
const parse = require("./lib/parse");
const {description, version} = require("./package");

program
  .version(version)
  .description(description)
  .arguments("<files...>")
  .option("-w, --watch", "Use watch mode")
  .parse(process.argv);

let code = 0;

for (let argv = 0; argv < program.args.length; ++argv) {
  code += parse(program.args[argv]);
}

process.exit(code);
