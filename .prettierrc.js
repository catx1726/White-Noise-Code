module.exports = {
  // 尽可能使用尾随逗号（包括函数参数)
  // trailingComma: 'all',
  // 末尾不需要逗号,注意与 eslint 的冲突
  trailingComma: 'none',
  // 一行最多 120 字符,照顾笔记本电脑开发者,与eslint 有冲突
  printWidth: 160,
  // 使用2个空格缩进
  tabWidth: 2,
  // 不使用缩进符，而使用空格
  useTabs: false,
  // 行尾需要有分号
  semi: false,
  // 使用单引号
  singleQuote: true,
  // 对象的 key 仅在必要时用引号
  quoteProps: 'as-needed',
  // jsx 不使用单引号，而使用双引号
  jsxSingleQuote: false,
  // 大括号内的首尾需要空格
  bracketSpacing: true,
  // jsx 标签的反尖括号需要换行
  jsxBracketSameLine: true,
  // 箭头函数，只有一个参数的时候，也需要括号
  arrowParens: 'always',
  // 每个文件格式化的范围是文件的全部内容
  rangeStart: 0,
  rangeEnd: Infinity,
  // 不需要写文件开头的 @prettier
  requirePragma: false,
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 使用默认的折行标准
  proseWrap: 'never',
  // 根据显示样式决定 html 要不要折行,与 eslint 冲突
  htmlWhitespaceSensitivity: 'ignore',
  // 换行符使用 lf
  endOfLine: 'auto'
}
