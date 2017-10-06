const program = require("commander");
const {description, version} = require("./package");

program
  .version(version)
  .description(description)
  .arguments("<files...>")
  .option("-w, --watch", "Watch mode")
  .parse(process.argv);

console.log(program.watch);
console.log(program.args);
