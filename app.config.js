export default {
  expo: {
    name: 'Lucy',
    slug: 'lucy',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './src/shared/assets/images/icon.png',
    scheme: 'myapp',
    userInterfaceStyle: 'automatic',
    newArchEnabled: false,
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.rbinoliveira.lucy',
      googleServicesFile:
        process.env.GOOGLE_SERVICES_PLIST || './GoogleService-Info.plist',
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
      },
    },
    android: {
      versionCode: 1,
      adaptiveIcon: {
        foregroundImage: './src/shared/assets/images/adaptive-icon.png',
        backgroundColor: '#008b84',
      },
      package: 'com.rbinoliveira.lucy',
      googleServicesFile:
        process.env.GOOGLE_SERVICES_JSON || './google-services.json',
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './src/shared/assets/images/favicon.png',
    },
    plugins: [
      'expo-router',
      [
        'expo-splash-screen',
        {
          image: './src/shared/assets/images/splash-icon.png',
          imageWidth: 200,
          resizeMode: 'contain',
          backgroundColor: '#ffffff',
        },
      ],
      [
        'expo-notifications',
        {
          icon: './src/shared/assets/images/icon.png',
          color: '#008b84',
          sounds: [],
        },
      ],
      '@react-native-firebase/app',
      '@react-native-firebase/auth',
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: 'cdc15f7a-71a8-4712-b89a-9511432f81c6',
      },
    },
  },
}
