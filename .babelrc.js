module.exports = {
  plugins: [
    // 为api提供沙箱的垫片方案，不会污染全局的 api
    ['@babel/plugin-transform-runtime'],
    // 修饰器
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties'],
    // asyn await 支持
    ['@babel/plugin-transform-async-to-generator'],
    ['react-hot-loader/babel'],
  ],
  presets: [
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        modules: process.env.OUTPUT_MODULE || false,
      },
    ],
  ],
};
