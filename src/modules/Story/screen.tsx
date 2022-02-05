import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, View } from "react-native";

import styled from "@emotion/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Appbar, FAB } from "react-native-paper";

import { SnackbarMsgHandler } from "~core/components/SnackbarMsgHandler";
import ErrorCtrl from "~core/ctrl/ErrorCtrl";
import MonetizationCtrl from "~core/ctrl/MonetizationCtrl";
import { RootStackParamList } from "~core/navigation/types";
import theme from "~core/theme";
import openNewStory from "~core/util/openNewStory";

import BuyNewStoryModal from "./components/BuyNewStoryModal";
import { LoadingOverlay } from "./components/LoadingOverlay";
import useStoryData from "./hooks/useStoryData";

export default function StoryScreen({
  navigation,
  route: {
    params: { saveDate },
  },
}: NativeStackScreenProps<RootStackParamList, "Story">) {
  const { title, blanks, text } = useStoryData(saveDate);

  const [showModal, setShowModal] = useState(false);

  async function handleNewStory() {
    try {
      if (!(await MonetizationCtrl.I.hasUpgraded())) {
        setShowModal(true);
      } else {
        openNewStory(saveDate, navigation, true);
      }
    } catch (e) {
      console.log(e);
      ErrorCtrl.I.stream.next(["An error occurred!", e]);
    }
  }

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex: 1,
        }}
      >
        <Container>
          {!(title && blanks.length > 0 && text.length > 0) && <LoadingOverlay />}
          <Header>
            <Appbar.BackAction onPress={() => navigation.pop()} color={theme.colors.text} />
            <Appbar.Content title={"Your story"} titleStyle={styles.appbarTitleStyle} />
          </Header>
          <Main>
            <Title style={{ fontSize: 36 }}>{title}</Title>
            <Text style={{ fontSize: 20 }} selectable>
              {text.map((t, i) => (
                <React.Fragment key={i}>
                  <Text>{t}</Text>
                  <Text style={{ color: "#0ea5e9" }}>{blanks[i] || ""}</Text>
                </React.Fragment>
              ))}
            </Text>
            <View style={{ height: 100 }} />
          </Main>
          <SafeAreaView
            style={{
              position: "absolute",
              bottom: 16,
              right: 16,
            }}
          >
            <FAB
              style={{
                backgroundColor: theme.colors.primary,
              }}
              color={"white"}
              icon={"autorenew"}
              onPress={handleNewStory}
            />
          </SafeAreaView>
          <SnackbarMsgHandler />
        </Container>
      </KeyboardAvoidingView>
      <BuyNewStoryModal
        visible={showModal}
        onDismiss={() => setShowModal(false)}
        onPurchase={() => openNewStory(saveDate, navigation, true)}
      />
    </>
  );
}

const Header = styled(Appbar.Header)`
  z-index: 9;
  background-color: white;
  color: red;
`;

const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
`;

const Main = styled.ScrollView`
  flex: 1;
  padding: 16px;
  padding-top: 48px;
`;

const Title = styled.Text`
  font-family: "${theme.fonts.medium.fontFamily};
  margin-bottom: 20px;
`;

const Text = styled.Text`
  font-family: "${theme.fonts.regular.fontFamily}";
`;

const styles = StyleSheet.create({
  appbarTitleStyle: {
    fontFamily: theme.fonts.medium.fontFamily,
    color: theme.colors.primary,
  },
});
