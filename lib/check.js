const chokidar = require('chokidar');
const colors = require('colors');
const concentric = require('./concentric');
const css = require('css');
const fs = require('fs');

function checkDeclarations({ declarations }) {
  let result = 0;
  let prevProps = [];

  for (let declIndex = 0; declIndex < declarations.length; ++declIndex) {
    const { property, position: { start, source } } = declarations[declIndex];
    const propOrder = concentric.indexOf(property);

    if (prevProps.length > 0) {
      let revIndex = 1;
      let currProp = prevProps[declIndex - revIndex];

      if (propOrder < currProp.order) {
        while (propOrder < currProp.order && revIndex < prevProps.length) {
          revIndex += 1;
          currProp = prevProps[declIndex - revIndex];
        }

        const msg = `Property ${property} must be at line ${currProp.line}`;
        console.log(colors.magenta(`${source}:${start.line}: ${msg}`));
        result = 1;
      }
    }

    prevProps.push({ order: propOrder, line: start.line });
  }

  return result;
}

function checkRules({ rules }) {
  let result = 0;

  for (let ruleIndex = 0; ruleIndex < rules.length; ++ruleIndex) {
    const rule = rules[ruleIndex];

    if (rule.type === 'rule') {
      result = checkDeclarations(rule);
    }
  }

  return result;
}

function checkSource(source) {
  let result = 0;

  try {
    const str = fs.readFileSync(source, 'utf8');
    const { type, stylesheet } = css.parse(str, { source, silent: false });

    if (type === 'stylesheet') {
      result = checkRules(stylesheet);
    }
  }
  catch (ex) {
    console.log(colors.red(ex));
    result = 1;
  }

  return result;
}

module.exports = function(source, { watchOption }) {
  let result = 0;

  if (watchOption) {
    const watcher = chokidar.watch(source);

    watcher.on('change', () => {
      console.log(colors.green(`${source}: changed, needs to be checked`));
      checkSource(source);
    });
  } else {
    result = checkSource(source);
  }

  return result;
}
