# 🧭 Pokemon React Native App

[![React Native](https://img.shields.io/badge/React%20Native-0.74-blue.svg)](https://reactnative.dev/)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-%40reduxjs%2Ftoolkit-purple.svg)](https://redux-toolkit.js.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/yourusername/pokemon-app/pulls)

A simple **React Native** application that retrieves and persistently stores a list of Pokémon using the [PokeAPI](https://pokeapi.co).  
This project demonstrates modern React Native development patterns, state management with **Redux Toolkit Query**, offline caching with **redux-persist**, navigation, and testing.

---

## 📱 Features

- ✅ Pokémon List with infinite scroll pagination  
- ✅ Pokémon Detail screen with image and stats  
- ✅ Persistent caching using `redux-persist`  
- ✅ RTK Query for API integration  
- ✅ TypeScript support  
- ✅ Unit testing using Jest & Testing Library  

---

## 🛠️ Tech Stack

- [React Native](https://reactnative.dev)
- [TypeScript](https://www.typescriptlang.org/)
- [Redux Toolkit & RTK Query](https://redux-toolkit.js.org/)
- [React Navigation](https://reactnavigation.org/)
- [redux-persist](https://github.com/rt2zz/redux-persist)
- [Jest](https://jestjs.io/) + [React Native Testing Library](https://testing-library.com/docs/react-native-testing-library/intro/)

---

## 🚀 Getting Started

### 1️⃣ Clone the repo

```bash
git clone https://github.com/shani293/pokemon-react-native.git
cd pokemon-react-native
```

### 2️⃣ Install dependencies

```bash
yarn install
```

### 3️⃣ Start Metro

```bash
yarn start
```

### 4️⃣ Run the app

#### 🧩 Android

```bash
yarn android
```

#### 🍎 iOS

```bash
cd ios && bundle install && bundle exec pod install && cd ..
yarn ios
```

---

## 🧪 Running Tests

We use **Jest** and **@testing-library/react-native** for testing components and screens.

```bash
yarn test
```

---

## 🧠 Project Structure

```
📂 src
 ├── api/                 # RTK Query APIs
 ├── app/                 # Redux store configuration
 ├── components/          # Reusable UI components
 ├── navigation/          # Navigation setup
 ├── screens/             # List & Detail screens
 └── types/               # Shared TypeScript types
```

---

## 🧰 Scripts

| Script                | Description                          |
|-----------------------|---------------------------------------|
| `yarn start`          | Starts the Metro bundler             |
| `yarn ios`            | Builds and runs iOS app              |
| `yarn android`        | Builds and runs Android app          |
| `yarn test`          | Runs all unit tests                  |

---

## 🧑‍💻 Developer Notes

- The **base URL** for the PokeAPI is defined directly in the API layer.
- RTK Query caches and persists data automatically using redux-persist.
- Warnings about `ImmutableStateInvariantMiddleware` can be safely ignored in development — or disabled if needed.

---

Made with ❤️ using React Native
