const nestConfig = require("@quentinpiot/configs/eslint/nest");
module.exports = {
  ...nestConfig,
  plugins: [...nestConfig.plugins],
  rules: {
    ...nestConfig.rules,
  },
};
