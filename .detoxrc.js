module.exports = {
  testRunner: {
    jest: {
      config: 'e2e/jest.config.js',
      setupTimeout: 120000,
    },
  },
  apps: {
    'android.debug': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/debug/app-debug.apk',
    },
  },
  devices: {
    'android.emulator': {
      type: 'android.emulator',
      device: 'Pixel_API_30_AOSP',
      headless: true,
    },
  },
  configurations: {
    'android.emu.debug': {
      device: 'android.emulator',
      app: 'android.debug',
    },
  },
};
