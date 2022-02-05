import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FieldsScreen from "~modules/Fields/screen";
import HomeScreen from "~modules/Home/screen";
import StoryScreen from "~modules/Story/screen";

import LinkingConfiguration from "./LinkingConfiguration";
import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <Stack.Navigator>
        <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen name={"Home"} component={HomeScreen} />
          <Stack.Screen name={"Fields"} component={FieldsScreen} />
          <Stack.Screen name={"Story"} component={StoryScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
