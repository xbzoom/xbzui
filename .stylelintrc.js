module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
  rules: {
    'at-rule-no-unknown': [true, { ignoreAtRules: ['mixin', 'extend', 'content'] }],
    'block-no-empty': null,
    'font-family-no-missing-generic-family-keyword': null,
  },
};
