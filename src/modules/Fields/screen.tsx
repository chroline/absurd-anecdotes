import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import styled from "@emotion/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Appbar, FAB, TextInput } from "react-native-paper";

import ErrorCtrl from "~core/ctrl/ErrorCtrl";
import GameDataCtrl from "~core/ctrl/GameDataCtrl";
import { RootStackParamList } from "~core/navigation/types";
import theme from "~core/theme";

import fetchFieldValues from "./helpers/fetchFieldValues";
import validateFields from "./helpers/validateFields";

export default function FieldsScreen({
  navigation,
  route: {
    params: { blanks, saveDate },
  },
}: NativeStackScreenProps<RootStackParamList, "Fields">) {
  const [fields, setFields] = useState(Array(blanks.length).fill(""));
  const [errors, setErrors] = useState(Array(blanks.length).fill(false));
  const [hasValidated, setHasValidated] = useState(false);

  async function handleAutofill() {
    setFields(await fetchFieldValues(blanks));
  }

  function validate() {
    setHasValidated(true);
    const errors = validateFields(fields);
    setErrors(errors);
    return errors.filter(v => !!v).length === 0;
  }

  async function handleContinue() {
    const valid = validate();

    if (valid) {
      try {
        await GameDataCtrl.I.saveBlanks(fields, saveDate);

        navigation.replace("Story", { saveDate });
      } catch (e) {
        ErrorCtrl.I.stream.next(["An error occurred while saving your phrases!", e]);
      }
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
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <Container>
            <StatusBar style={"dark"} />
            <Header>
              <Appbar.BackAction onPress={() => navigation.pop()} color={theme.colors.text} />
              <Appbar.Content title={"Fill in the fields!"} titleStyle={styles.appbarTitleStyle} />
              <Appbar.Action icon={"auto-fix"} onPress={handleAutofill} color={theme.colors.text} />
            </Header>
            <Main>
              {blanks.map((blank, i) => (
                // @ts-ignore
                <Field
                  key={i}
                  mode={"outlined"}
                  label={blank}
                  autoCapitalize={"none"}
                  value={fields[i]}
                  onChangeText={text => {
                    setFields(fields => {
                      fields[i] = text;
                      return [...fields];
                    });

                    if (hasValidated) validate();
                  }}
                  error={errors[i]}
                />
              ))}
              <View style={{ height: 116 }} />
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
                icon={"check"}
                onPress={handleContinue}
              />
            </SafeAreaView>
          </Container>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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
  padding: 16px;
`;

const Field = styled(TextInput)`
  background-color: white;
  margin: 5px 0;
`;

const styles = StyleSheet.create({
  appbarTitleStyle: {
    fontFamily: "Nunito_700Bold",
    color: theme.colors.primary,
  },
});
