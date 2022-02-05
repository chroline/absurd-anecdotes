import React from "react";

import { SnackbarMsgHandler } from "~core/components/SnackbarMsgHandler";
import theme from "~core/theme";

import useCachedResources from "./core/hooks/useCachedResources";
import Navigation from "./core/navigation";

import "expo-dev-client";
import { StatusBar } from "expo-status-bar";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <StatusBar />
        <Navigation />
        <SnackbarMsgHandler />
      </SafeAreaProvider>
    </PaperProvider>
  );
}
