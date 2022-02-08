<div align="center">

# Absurd Anecdotes!

[![runs with expo](https://img.shields.io/badge/Runs%20with%20Expo-4630EB.svg?style=for-the-badge&logo=EXPO&labelColor=f3f3f3&logoColor=000)](https://github.com/expo/expo)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=for-the-badge)](https://github.com/chroline/madlibs-api/compare)

[![built with words-aas](https://img.shields.io/badge/built%20with-words--aas-black?style=for-the-badge)](https://github.com/chroline/words-aas)
[![built with madlibs-api](https://img.shields.io/badge/built%20with-madlibs--api-black?style=for-the-badge)](https://github.com/chroline/madlibs-api)


🤣 Create funky fill-in-the-blank stories! 🤣

</div>

## 🎥 [Tutorials](https://www.youtube.com/playlist?list=PL-rBG3fUBkKh3mbGGbM715MFSh15-c6lJ)

This app was built as an educative tool for working with the `expo-in-app-purchases` package and Expo Application
Services (EAS). I created 2 videos to go along with this app:

- **[Implementing In-App Purchases in Expo & React Native](https://www.youtube.com/watch?v=dyz1S6FWJ9A)** (9:03)
- **Using Expo Application Services (EAS) to Develop your Expo App** (coming soon!)

## 🧑‍💻 Tech stack

**Absurd Anecdotes!** is built with Expo and React Native, and uses Typescript for a type-safe codebase.

Here's a condensed list of important packages used by the app:

- **`expo-in-app-purchases`** — handles in-app purchases
- **`@react-native-async-storage/async-storage`** — stores persistent data to the user's device
- **`@react-navigation/native`** — built-in native navigation
- **`react-native-paper`** — stylish, customizable component library

## 🚀 Getting the app up and running

### Installation steps

1. Clone this GitHub repo.
   ```bash
   git clone https://github.com/chroline/absurd-anecdotes.git
   ```
2. Install the necessary packages.
   ```bash
   yarn install
   # or
   npm install
   ```
3. Install the necessary CocoaPod Pods.
   ```bash
   npx pod-install
   ```
4. Make sure you have the [Expo CLI installed](https://docs.expo.dev/get-started/installation/#1-expo-cli).

Now your app should be ready to run!

### Running the app

There are a few different methods you can use to test-run this app.

<details>

<summary>Expo Go</summary>

<br />

You can run this app in Expo Go by running:

```bash
expo start
```

Note that in Expo Go, in-app purchases won't work.

<br />

</details>

<details>

<summary>Local build</summary>

<br />

The most straight-forward way to run your app on a device is with the `expo run` command.

Simply run:

```bash
expo run:ios -d
# or
expo run:android -d
```

to run your app on a device.

<br />

</details>

<details>

<summary>Internal distribution</summary>

<br />

With EAS Build, you can run your app on your device without Expo Go, giving you full access to native code. To do so,
first make sure you have [the EAS CLI installed](https://docs.expo.dev/build/setup/#1-install-the-latest-eas-cli). Then,
log into your Expo user account with `eas login`.

If you're on iOS, you'll have to register your device for EAS with `eas device:create`. Read the QR code with your
phone's camera and install the provisioning profile.

To build the app for internal distribution, run:

```bash
eas build -p ios --profile development
# or
eas build -p android --profile development
```

When the build is completed, scan the QR Code to install "Absurd Anecdotes!"

</details>