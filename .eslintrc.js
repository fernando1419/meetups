module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/recommended",
    "@vue/typescript/recommended",
    // "prettier",
    // "prettier/vue"
    // "plugin:vue/strongly-recommended"
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    // custom rules:
    "vue/html-self-closing": ["error", {
      "html": {
        "normal": "never", // HTML elements. E.g. <div></div>
        "void": "always", // HTML void elements. E.g. <img>
        // "components": "always", // Vue.js components.
      },
      "svg": "always",
      "math": "always",
    }],

    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off"
  }
};
