import { DefaultTheme } from "react-native-paper";

const theme = {
  ...DefaultTheme,
  dark: false,
  roundness: 8,
  colors: {
    ...DefaultTheme.colors,
    primary: "#10b981",
    accent: "#F97316",
    background: "#f9fafb",
    text: "#1F2937",
    error: "#ef4444",
  },
  fonts: {
    ...DefaultTheme.fonts,
    regular: {
      fontFamily: "Nunito_400Regular",
    },
    medium: {
      fontFamily: "Nunito_700Bold",
    },
  },
};

export default theme;
