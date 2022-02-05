import React, { useState } from "react";
import { StyleSheet } from "react-native";

import styled from "@emotion/native";
import { Button, Modal, Portal } from "react-native-paper";

import ErrorCtrl from "~core/ctrl/ErrorCtrl";
import MonetizationCtrl from "~core/ctrl/MonetizationCtrl";
import SnackbarMsgCtrl from "~core/ctrl/SnackbarMsgCtrl";
import theme from "~core/theme";

export default function BuyUpgradeModal({ visible, onDismiss }: { visible: boolean; onDismiss: () => void }) {
  const [isUpgradeBtnLoading, setIsUpgradeBtnLoading] = useState(false);
  const [isRestoreBtnLoading, setIsRestoreBtnLoading] = useState(false);

  async function handlePurchase() {
    setIsUpgradeBtnLoading(true);

    try {
      const result = await MonetizationCtrl.I.buyUpgrade();
      if (result) {
        SnackbarMsgCtrl.I.stream.next({
          text: "Thanks for upgrading :)",
          type: "info",
        });
        onDismiss();
      }
    } catch (e) {
      ErrorCtrl.I.stream.next(["An error occurred!", e]);
    }

    setIsUpgradeBtnLoading(false);
  }

  async function handleRestore() {
    setIsRestoreBtnLoading(true);

    try {
      const result = await MonetizationCtrl.I.restoreUpgrade();
      if (result) {
        SnackbarMsgCtrl.I.stream.next({
          text: "Thanks for upgrading :)",
          type: "info",
        });
        onDismiss();
      }
    } catch (e) {
      ErrorCtrl.I.stream.next(["An error occurred!", e]);
    }

    setIsRestoreBtnLoading(false);
  }

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.container}>
        <Title>Upgrade for $9.99!</Title>
        <Text style={{ marginBottom: 24 }}>UNLIMITED DAILY ANECDOTES!! 😱 😱 😱</Text>
        <Btn
          mode={"contained"}
          loading={isUpgradeBtnLoading}
          disabled={isUpgradeBtnLoading}
          onPress={handlePurchase}
          labelStyle={styles.btnLabel}
        >
          Upgrade
        </Btn>
        <Btn
          mode={"outlined"}
          loading={isRestoreBtnLoading}
          disabled={isRestoreBtnLoading}
          onPress={handleRestore}
          labelStyle={{ ...styles.btnLabel, color: theme.colors.primary }}
          style={{ marginTop: 16 }}
        >
          Restore
        </Btn>
      </Modal>
    </Portal>
  );
}

const Title = styled.Text`
  font-family: "${theme.fonts.medium.fontFamily}_Italic";
  font-size: 24px;
  text-align: center;
  color: ${theme.colors.accent};
  margin-bottom: 16px;
`;

const Text = styled.Text`
  font-family: "${theme.fonts.regular.fontFamily}";
  font-size: 18px;
  text-align: center;
`;

const Btn = styled(Button)`
  width: 100%;
`;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 32,
    margin: 16,
    borderRadius: 8,
  },
  btnLabel: {
    fontSize: 18,
    color: "white",
  },
});
