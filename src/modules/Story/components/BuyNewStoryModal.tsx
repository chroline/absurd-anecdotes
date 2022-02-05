import React, { useState } from "react";
import { StyleSheet } from "react-native";

import styled from "@emotion/native";
import { Button, Modal, Portal } from "react-native-paper";

import ErrorCtrl from "~core/ctrl/ErrorCtrl";
import MonetizationCtrl from "~core/ctrl/MonetizationCtrl";
import SnackbarMsgCtrl from "~core/ctrl/SnackbarMsgCtrl";
import theme from "~core/theme";

export default function BuyNewStoryModal({
  visible,
  onDismiss,
  onPurchase,
}: {
  visible: boolean;
  onDismiss: () => void;
  onPurchase: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);

  async function handlePurchase() {
    setIsLoading(true);

    try {
      const result = await MonetizationCtrl.I.buyPlayPass();
      if (result) {
        SnackbarMsgCtrl.I.stream.next({
          text: "Thanks for buying a play pass :)",
          type: "info",
        });
        onPurchase();
      }
    } catch (e) {
      ErrorCtrl.I.stream.next(["An error occurred!", e]);
    }

    setIsLoading(false);
  }

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.container}>
        <Title>Play again for 99¢!</Title>
        <Text style={{ marginBottom: 24 }}>
          <Text style={{ fontFamily: "Nunito_700Bold" }}>You can only play one anecdote a day without upgrading.</Text>{" "}
          To play again today, purchase a one-time play pass for 99¢.
        </Text>
        <Btn
          mode={"contained"}
          loading={isLoading}
          disabled={isLoading}
          onPress={handlePurchase}
          labelStyle={styles.btnLabel}
        >
          Purchase
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
