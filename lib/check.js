const chokidar = require("chokidar");
const colors = require("colors");
const concentric = require("./concentric");
const css = require("css");
const fs = require("fs");

function checkDeclarations({declarations}) {
  let result = 0;
  let prevProperties = [];

  for (let declIndex = 0; declIndex < declarations.length; ++declIndex) {
    const {property, position: {start, source}} = declarations[declIndex];
    const propOrder = concentric.indexOf(property);

    if (prevProperties.length > 0) {
      let rIndex = 1;
      let currElement = prevProperties[declIndex - rIndex];

      if (propOrder < currElement.order) {
        while (propOrder < currElement.order
                && rIndex < prevProperties.length) {
          rIndex += 1;
          currElement = prevProperties[declIndex - rIndex];
        }
        const msg = `Property ${property} must be at line ${currElement.line}`;
        console.log(colors.magenta(`${source}:${start.line}: ${msg}`));
        result = 1;
      }
    }

    prevProperties.push({
      order: propOrder,
      line: start.line
    });
  }

  return result;
}

function checkRules({rules}) {
  let result = 0;

  for (let ruleIndex = 0; ruleIndex < rules.length; ++ruleIndex) {
    const rule = rules[ruleIndex];
    if (rule.type === "rule") {
      result = checkDeclarations(rule);
    }
  }

  return result;
}

function checkSource(source) {
  let result = 0;

  try {
    const str = fs.readFileSync(source, "utf8");
    const {type, stylesheet} = css.parse(str, {
      source,
      silent: false
    });
    if (type === "stylesheet") {
      result = checkRules(stylesheet);
    }
  }
  catch(ex) {
    console.log(colors.red(ex));
    result = 1;
  }

  return result;
}

module.exports = function (source, {watchOption}) {
  let result = 0;

  if (watchOption) {
    const watcher = chokidar.watch(source);
    watcher.on("change", () => {
      console.log(colors.green(`${source}: changed, needs to be checked`));
      checkSource(source);
    });
  }
  else {
    result = checkSource(source);
  }

  return result;
}
