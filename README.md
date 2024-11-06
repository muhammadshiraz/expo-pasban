# ExpoPasban

ExpoPasban is a mobile application built using the Expo framework and React Native. The app is designed to help users manage transactions, visualize data, and interact with real-time maps. It integrates with Google Maps and supports features like data visualization using charts and graphs. The app also includes state management with Redux, API handling with Axios, and form validation using Formik and Yup.

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [Build and Deployment](#build-and-deployment)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install and run ExpoPasban on your local machine, follow these steps:

### Prerequisites
- Node.js (v16 LTS)
- Expo CLI (>= 12.5.1)
- Watchman (for macOS/iOS development)
- Android Studio (for Android development)
- Xcode (for iOS development)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/username/expopasban.git
   ```

2. Navigate to the project directory:

   ```bash
   cd expopasban
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Run the app on your desired platform:

   - For Android:
     ```bash
     npm run android
     ```

   - For iOS:
     ```bash
     npm run ios
     ```

   - For Web:
     ```bash
     npm run web
     ```

## Features

- **Google Maps Integration**: Displays maps with clustering for markers using `react-native-maps` and `react-native-map-clustering`.
- **Data Visualization**: Charts and graphs with libraries like `react-native-svg-charts` and `recharts`.
- **Redux for State Management**: Centralized state using Redux and the Redux Toolkit.
- **API Integration**: Axios is used for HTTP requests.
- **Form Handling and Validation**: Formik for form handling and Yup for validation.
- **Cross-Platform**: The app is built to work on both iOS and Android.
- **Localization Support**: The app supports tablet devices and various screen sizes.
- **Development, Preview, and Production Builds**: Three build types for different environments (internal, preview, production).

## Project Structure

```
.
├── assets/                 # Icons, images, and logos used in the app
├── src/
│   ├── components/         # Reusable components across the app
│   ├── navigation/         # React Navigation configuration
│   ├── screens/            # Screen components for different pages
│   ├── store/              # Redux store setup
│   └── utils/              # Helper functions and utilities
├── App.js                  # Main entry point of the app
├── app.json                # App configuration
├── eas.json                # Expo Application Services (EAS) configuration
├── package.json            # Project dependencies and scripts
└── README.md               # Project documentation
```

## Scripts

- `npm run start`: Starts the Expo development server.
- `npm run android`: Runs the app on an Android emulator or device.
- `npm run ios`: Runs the app on an iOS simulator or device.
- `npm run web`: Runs the app on a web browser.
- `npm run test`: Runs Jest unit tests.

## Dependencies

Key libraries used in this project:

- **React Native**: Core framework for building the app.
- **Expo**: For building and deploying the app.
- **Redux**: State management using Redux Toolkit.
- **Axios**: For making API requests.
- **Formik**: For handling forms.
- **Yup**: For form validation.
- **React Native Maps**: Google Maps integration for the app.
- **React Navigation**: For navigation between screens.
- **React Native SVG Charts**: For data visualization.

See the `package.json` for the full list of dependencies.

## Build and Deployment

### Development Build

The development build allows you to test the app on Expo Go or custom development clients. To create a development build, run:

```bash
eas build --profile development --platform android
```

For iOS:

```bash
eas build --profile development --platform ios
```

### Preview Build

The preview build can be shared with internal testers:

```bash
eas build --profile preview --platform android
```

For iOS:

```bash
eas build --profile preview --platform ios
```

### Production Build

To build the app for the Play Store or App Store:

```bash
eas build --profile production --platform android
```

For iOS:

```bash
eas build --profile production --platform ios
```

Make sure you have the necessary credentials and configurations set up in `eas.json`.

## Testing

Unit tests are written using Jest and Testing Library:

1. To run the tests, use the command:

   ```bash
   npm run test
   ```

2. The Jest configuration is defined in the `jest` field of `package.json`, and tests are located in the `__tests__` directory.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit and push (`git commit -m 'Add new feature'`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Happy coding with ExpoPasban!