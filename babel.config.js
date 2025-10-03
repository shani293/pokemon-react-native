module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ts', '.tsx', '.js', '.json'],
          alias: {
            '@types': './src/types',
            '@screens': './src/screens',
            '@api': './src/api',
            '@navigation': './src/navigation',
          },
        },
      ],
    ],
  };
};
