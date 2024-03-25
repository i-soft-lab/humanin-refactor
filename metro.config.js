const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const {withNativeWind} = require('nativewind/metro');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import("metro-config").MetroConfig}
 */
const configOption = {};

const config = mergeConfig(getDefaultConfig(__dirname), configOption);

module.exports = withNativeWind(config, {input: './global.css'});
