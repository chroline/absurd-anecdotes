import {
  Nunito_400Regular,
  Nunito_400Regular_Italic,
  Nunito_700Bold,
  Nunito_700Bold_Italic,
  Nunito_900Black,
  Nunito_900Black_Italic,
} from "@expo-google-fonts/nunito";
import { FontAwesome } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          Nunito_400Regular,
          Nunito_400Regular_Italic,
          Nunito_700Bold,
          Nunito_700Bold_Italic,
          Nunito_900Black,
          Nunito_900Black_Italic,
        });

        // Pre-fetch background image
        await Asset.fromModule(
          require("../../../assets/bg.png")
        ).downloadAsync();
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        await SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
