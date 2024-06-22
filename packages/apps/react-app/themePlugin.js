const post = require("postcss");

const defaults = {
  functionName: "theme",
  groups: {},
  dataThemeSelector: 'html(data-theme="dark")',
  nestingPlugin: null,
};

module.exports = postcss.plugin("postcss-theme-color", (opts) => {
  opts = Object.assign({}, defaults, opts);
  // opts.groups -> slate50: {light: '', dark: ''}

  const reGroup = new RegExp(`\\b${opts.functionName}\\(([^)]+)\\)`, "g");
  return (css, result) => {

    const hasPlugin = (name) => name.replace(/^postcss-/, "")

    const getValue = (value, theme) => {
      return value.replace(reGroup, (match, group) => {
        return opts.groups[group][theme]
      });
    };

    css.walkDecls((decl) => {
      const value = decl.value;
      // 没匹配到
      if (!value || !reGroup.test(value)) {
        return;
      }

      // 匹配到了
      const lightValue = getValue(value, "light");
      const darkValue = getValue(value, "dark");
      let darkRule;
      if(hasPlugin('postcss-nesting')){
        darkRule = postcss.atRule({
          name: "nest",
          params: `${opts.dataThemeSelector} &`,
        });
      } else if(hasPlugin('postcss-nested')){
        darkRule = postcss.atRule({
          params: `${opts.dataThemeSelector} &`,
        });
      }else{
        decl.warn(result, 'no plugins')
      }
      darkRule.append(decl.clone({ value: darkValue }));

      // TODO: 没做完
    });
  };
});
