const { withAndroidManifest } = require('@expo/config-plugins');

const withBluetoothLE = (config) => {
  return withAndroidManifest(config, async (config) => {
    const androidManifest = config.modResults.manifest;

    // Check if <uses-feature> for Bluetooth LE already exists
    if (!androidManifest['uses-feature']) {
      androidManifest['uses-feature'] = [];
    }

    const features = androidManifest['uses-feature'];
    const bleFeature = features.find(
      (feature) =>
        feature['$']['android:name'] === 'android.hardware.bluetooth_le'
    );

    if (!bleFeature) {
      features.push({
        $: {
          'android:name': 'android.hardware.bluetooth_le',
          'android:required': 'true',
        },
      });
    }

    return config;
  });
};

module.exports = withBluetoothLE;
