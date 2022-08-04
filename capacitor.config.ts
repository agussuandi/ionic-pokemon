import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'ionic-pokemon',
  webDir: 'build',
  bundledWebRuntime: false,
  server: {
    androidScheme: "http",
    allowNavigation: [
      "https://pokeapi.co"
    ]
  }
};

export default config;
