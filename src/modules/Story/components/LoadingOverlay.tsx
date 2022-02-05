import { ActivityIndicator, View } from "react-native";

export function LoadingOverlay() {
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: 9,
        backgroundColor: "rgba(0,0,0,0.5)",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator animating={true} size={"large"} color={"white"} />
    </View>
  );
}
