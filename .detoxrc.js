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
      build: 'cd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug && cd ..',
    },
    'ios.debug': {
      type: 'ios.app',
      binaryPath: 'ios/build/Build/Products/Debug-iphonesimulator/Haunt.app',
      build: 'xcodebuild -workspace ios/Haunt.xcworkspace -scheme Haunt -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build',
    },
  },
  devices: {
    'android.emulator': {
      type: 'android.emulator',
      device: 'Pixel_API_30_AOSP',
      headless: true,
    },
    'ios.simulator': {
      type: 'ios.simulator',
      device: {
        type: 'iPhone 14',
      },
    },
  },
  configurations: {
    'android.emu.debug': {
      device: 'android.emulator',
      app: 'android.debug',
    },
    'ios.sim.debug': {
      device: 'ios.simulator',
      app: 'ios.debug',
    },
  },
};
