const commander = require("commander");
const check = require("./lib/check");
const {description, version} = require("./package");

commander
  .version(version)
  .description(description)
  .arguments("<files...>")
  .option("-w, --watch", "use watch mode")
  .parse(process.argv);

const sources = commander.args;
const watchOption = commander.watch;
let exitCode = 0;

for (let sourceIndex = 0; sourceIndex < sources.length; ++sourceIndex) {
  exitCode += check(sources[sourceIndex], {watchOption});
}

if (!watchOption) {
  process.exit(exitCode);
}
