import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import styled from "@emotion/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import * as WebBrowser from "expo-web-browser";
import { Button } from "react-native-paper";

import ErrorCtrl from "~core/ctrl/ErrorCtrl";
import GameDataCtrl from "~core/ctrl/GameDataCtrl";
import MonetizationCtrl from "~core/ctrl/MonetizationCtrl";
import SnackbarMsgCtrl from "~core/ctrl/SnackbarMsgCtrl";
import { RootStackParamList } from "~core/navigation/types";
import theme from "~core/theme";
import openNewStory from "~core/util/openNewStory";

import BuyUpgradeModal from "./components/BuyUpgradeModal";
import { Logo } from "./components/Logo";

export default function HomeScreen({ navigation }: NativeStackScreenProps<RootStackParamList, "Home">) {
  const [isPlayBtnLoading, setIsPlayBtnLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  async function handlePlay() {
    if (isPlayBtnLoading) return;

    setIsPlayBtnLoading(true);

    try {
      const saveDate = GameDataCtrl.saveDate;
      if (await GameDataCtrl.I.hasPlayed(saveDate)) {
        navigation.push("Story", { saveDate });
        SnackbarMsgCtrl.I.stream.next({
          text: "Looks like you've already played today!",
        });
      } else {
        await openNewStory(saveDate, navigation);
      }
    } catch (e) {
      ErrorCtrl.I.stream.next(["An error occurred while loading the game!", e]);
    }

    setIsPlayBtnLoading(false);
  }

  async function handleUpgrade() {
    if (!(await MonetizationCtrl.I.hasUpgraded())) {
      setShowModal(true);
    } else {
      SnackbarMsgCtrl.I.stream.next({
        text: "You've already upgraded!",
      });
    }
  }

  return (
    <Container>
      <StatusBar style={"dark"} />
      <GradientBG source={require("../../assets/bg.png")} resizeMode={"cover"}>
        <Main>
          <Logo />
          <Btns>
            <Btn
              icon="play"
              mode="contained"
              loading={isPlayBtnLoading}
              disabled={isPlayBtnLoading}
              onPress={handlePlay}
              contentStyle={styles.playBtnContent}
              labelStyle={styles.btnLabel}
            >
              Play
            </Btn>
            <Btn
              icon="currency-usd"
              mode="contained"
              onPress={handleUpgrade}
              contentStyle={styles.upgradeBtnContent}
              labelStyle={styles.btnLabel}
            >
              Upgrade
            </Btn>
            <Btn
              icon="information"
              mode="text"
              onPress={() => WebBrowser.openBrowserAsync("https://projects.colegaw.in/absurd-anecdotes")}
              contentStyle={styles.learnMoreBtnContent}
              labelStyle={{ fontSize: 16, color: "#0EA5E9" }}
            >
              Learn more
            </Btn>
          </Btns>
        </Main>
        <SafeAreaView style={{ bottom: 16 }}>
          <Credits style={{ fontSize: 14 }}>Created by Cole Gawin, 2022</Credits>
        </SafeAreaView>
      </GradientBG>
      <BuyUpgradeModal visible={showModal} onDismiss={() => setShowModal(false)} />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;

const GradientBG = styled.ImageBackground`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
`;

const Main = styled.View`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Btns = styled.View`
  align-self: stretch;
  margin-top: 20px;
`;

const Btn = styled(Button)`
  width: 100%;
  margin-top: 20px;
`;

const Credits = styled.Text`
  font-family: "${theme.fonts.medium.fontFamily}";
  opacity: 0.5;
  width: 100%;
`;

const styles = StyleSheet.create({
  btnLabel: {
    fontSize: 20,
    color: "white",
  },
  playBtnContent: {},
  upgradeBtnContent: {
    backgroundColor: theme.colors.accent,
  },
  learnMoreBtnContent: {
    borderColor: "#0EA5E9",
  },
});
