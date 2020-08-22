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
      "vue/max-attributes-per-line": ["error", {
         "singleline": 5,
         "multiline": {
            "max": 5,
            "allowFirstLine": true
         }
      }],
      "indent": ["error", 3],
      "vue/html-indent": ["error", 3],
      "vue/script-indent": ["error", 3],
      "vue/singleline-html-element-content-newline": 0,
      "vue/multiline-html-element-content-newline": 0,
      "vue/require-prop-types": 0,

      "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off"
   }
};
