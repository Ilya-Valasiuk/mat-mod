module.exports = {
    extends: 'airbnb',
    parser: 'babel-eslint',
    env: {
      browser: true,
    },
    globals: {
      browser: true,
    },
    rules: {
      // require trailing commas in multiline object literals
      'comma-dangle': ['error', {               // 'comma-dangle': ['error', {
        arrays: 'always-multiline',             // arrays: 'always-multiline',
        objects: 'always-multiline',            // objects: 'always-multiline',
        imports: 'always-multiline',            // imports: 'always-multiline',
        exports: 'always-multiline',            // exports: 'always-multiline',
        functions: 'never',                     // functions: 'always-multiline',
      }],
      'no-underscore-dangle': ['error', {       // ['error', {
        'allowAfterThis': false,                //   allowAfterThis: false
        'allow': [
          '__PRELOADED_STATE__',
          '__mode',
          '_err']
      }],                                       // }]
      'import/prefer-default-export': 'off',    // 'error'
      'max-len': ['error', 120, 2, {            // ['error', 100, 2, {
        ignoreUrls: true,                       //   ignoreUrls: true,
        ignoreComments: false,                  //   ignoreComments: false,
        ignoreRegExpLiterals: true,             //   ignoreRegExpLiterals: true,
        ignoreStrings: true,                    //   ignoreStrings: true,
        ignoreTemplateLiterals: true            //   ignoreTemplateLiterals: true
      }],                                       // }]
      // Prevent usage of arrow functions and .bind() in JSX props
      // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md
      'react/jsx-no-bind': ['warn', {
        ignoreRefs: true,
        allowArrowFunctions: false,
        allowBind: false,
      }],
    }
  }
  