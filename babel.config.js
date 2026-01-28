module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'], // The base rules for Expo
    plugins: ['expo-router/babel'
      // Your plugins go here
    ],
  };
};