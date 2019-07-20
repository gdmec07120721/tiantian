module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ["plugin:vue/recommended", 'eslint:recommended'],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  /**
   * 规则的错误等级有三种
   * "off" 或者 0：关闭规则。
   * "warn" 或者 1：打开规则，并且作为一个警告（不影响exit code）。
   * "error" 或者 2：打开规则，并且作为一个错误（exit code将会是1）。
   */
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    // 必须使用 2 空格缩进
    "indent": [2, 2, {
      'SwitchCase': 1
    }],
    'semi': [2, 'always'],
    'quotes': [2, 'single', {
      'avoidEscape': true,
      'allowTemplateLiterals': true
    }],
    'object-curly-spacing': [2, 'always', {
      objectsInObjects: false
    }],
    // 对象字面量中冒号的前后空格
    'key-spacing': [2, {
      'beforeColon': false,
      'afterColon': true
    }],
    'block-spacing': [2, 'always'],
    // function 等的花括号之前使用空格
    'space-before-blocks': 2,
    // 操作符前后要加空格
    'space-infix-ops': 2,
    // 强制在圆括号内使用一致的空格
    "space-in-parens": [2, "never"],
    // 要求箭头函数的箭头前后要有空格
    "arrow-spacing": [2, {
      "before": true,
      "after": true
    }],
    // 强制关键字周围空格的一致性
    'keyword-spacing': [2, {
      'before': true,
      'after': true
    }],
    // 禁止使用拖尾逗号
    'comma-dangle': [2, 'never'],
    // 强制在逗号周围使用空格
    'comma-spacing': [2, {
      'before': false,
      'after': true
    }],
    // 禁止使用 tabs
    'no-tabs': 2,
    // 禁止混用空格和 tab 来做缩进，必须统一
    'no-mixed-spaces-and-tabs': 2,
    // 禁止使用 var，必须用 let 或 const，警告
    'no-var': 1,
    // 禁止 function 定义中出现重名参数
    "no-dupe-args": 2,
    // 禁止对象字面量中出现重复的 key
    "no-dupe-keys": 2,
    // 禁止重复的 case 标签
    "no-duplicate-case": 2,
    // 禁止空语句块
    "no-empty": 2,
    // 禁止将 undefined 赋值给变量
    'no-undef-init': 2,
    // 禁止访问未定义的变量或方法
    'no-undef': 2,
    // 禁止使用 undefined，如需判断一个变量是否为 undefined，请使用 typeof a === 'undefined'
    'no-undefined': 2,
    // 强制所有控制语句使用一致的括号风格
    "curly": [2, "all"],
    // 禁止在循环中出现 function 声明和表达式
    "no-loop-func": 1,
    // 强制使用一致的反勾号、双引号或单引号
    "quotes": [2, "single", "avoid-escape"],
    // 禁止修改 const 声明的变量
    "no-const-assign": 2,
    // 禁止定义不使用的变量
    'no-unused-vars': [1,
      {
        'vars': 'all', // 变量定义必须被使用
        'args': 'none', // 对于函数形参不检测
        'ignoreRestSiblings': true, // 忽略剩余子项 fn(...args)，{a, b, ...coords}
        'caughtErrors': 'none', // 忽略 catch 语句的参数使用
      }
    ],
    "vue/max-attributes-per-line": [2, {
      "singleline": 10,
      "multiline": {
        "max": 1,
        "allowFirstLine": false
      }
    }],
    "vue/singleline-html-element-content-newline": "off",
    "vue/multiline-html-element-content-newline":"off",
    "vue/html-self-closing": ["error", {
      "html": {
        "void": "never",
        "normal": "never",
        "component": "always"
      },
      "svg": "always",
      "math": "never"
    }]
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
