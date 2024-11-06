// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const defaultConfig = getDefaultConfig(__dirname);

module.exports = {
  ...defaultConfig,
  transformer: {
    ...defaultConfig.transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    ...defaultConfig.resolver,
    assetExts: defaultConfig.resolver.assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
    extraNodeModules: {
      ...defaultConfig.resolver.extraNodeModules,
      '@assets': path.resolve(__dirname, 'assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@navigation': path.resolve(__dirname, 'src/navigation'),
      '@redux': path.resolve(__dirname, 'src/redux'),
      '@screens': path.resolve(__dirname, 'src/screens'),
      '@context': path.resolve(__dirname, 'src/context'),
      // Add more aliases as needed
    },
  },
};
