# Shop Together

NOTE: The easiest way to gain access to the app is for me to add your email as a tester, and then you can download the app through TestFlight.

|  | DEMO |  |
| -- | -- | -- |
| ![](https://user-images.githubusercontent.com/6299223/220726101-10fb3d9f-d133-4afc-bc49-d13cfa7e5d3c.png) | <video src="https://user-images.githubusercontent.com/6299223/220723719-cf10bb6d-9679-4d83-89bf-bda900778f72.mp4"/> | ![](https://user-images.githubusercontent.com/6299223/220725264-e6e5b9ac-5e76-45cb-8ca1-1c29240d4884.png) |


## Overview

Shop Together is a social shopping app with two main functions:
1. Interacting with other users via Instagram-style posts.
    - Each post is centered on a product which the poster is either considering purchasing or has just purchased.
2. Finding new products, either by searching for a specific product or by browsing through the entire product catalogue by category.


<details>
<summary>Design Decisions</summary>

### React Native Expo
React Native has one of the best communities for any framework out there. It is less performant than Flutter or native, but performant enough for most apps - and also extremely flexible.

RN makes it simple to build for both iOS and Android devices in a single codebase. Expo also adds support for web, although one could make a strong case for writing a separate web app using another tool like Next.js. The main reasons to use Expo are:
- Their helpful libraries, which have become stable over the years.
- The Expo Go app, which allows testing in real time using hot reloading and a JS debugger.
- Support for Over-the-Air updates, meaning the ability to update your app without getting Apple's approval.
- EAS build, which makes it easy to set up pipelines for building, testing, and submitting apps to Apple and Google's app stores.

Expo features used by Shop Together:
- Hot reloading in Expo Go app, for faster visual testing.
- Solid and growing suite of libraries that provide native functionalities, plus the ability to use native libraries (using a development build) if needed.
    - `expo-image-picker` enables user to upload a profile picture
    - `expo-splash-screen` makes it easy to add a splash screen while the app initializes
    - `expo-web-browser` provides the web browser that shows product pages
    - `expo-local-authentication` makes it easy to enable Face ID and fingerprint scanning to log in
    - `expo-font` and `@expo-google-fonts` provide easy access to thousands of fonts
- Support for the Hermes JavaScript engine, which compiles JavaScript into bytecode to make for a smaller app binary and better performance on older devices.

Expo has a couple of notable disadvantages as well. Mainly, reliance on their ecosystem & build services, and a need for third-party solutions to in-app purchases, which take a cut for themselves. Additionally, there is some hassle required to access certain Firebase features.

### TypeScript Linting
I use ESLint for linting TypeScript (using the `@typescript-eslint` library). Controversial decision, but I'm also using ESLint for formatting -- with a very helpful setting in my IntelliJ IDE that automatically runs ESLint with CMD+s. I prefer ESLint's highly configurable formatting rules over Prettier's opinionated configuration, which does not allow you to put an empty line before comments.

### Styling
I use a slightly unconventional styling method called Fela. It is used by large companies alongside React, but I have adopted it for use with React Native:
- See `src/hook/UseFelaNative.ts`.
- Extremely performant since it uses atomic css with caching (each style property becomes its own cached stylesheet).
- Allows for styles to be defined as static or as functions of style props.
- When a component has many style props, we can use a function to calculate the style props based on screen dimensions, and this function can be memoized to increase performance.
- Fela strikes a great balance between high performance and ease-of-use at scale.
- The only downside is that some typings are weakened so that some errors will not be flagged at compile time. This can be fixed but will take some work.

### Context
I use Context with Higher Order Components to pass user data and screen size data (e.g. `export default withScreenSize(Component)`), which is more performant and easier to use than "prop drilling", because many intermediary components don't need the data. Sometimes I use the `useContext()` hook instead of a Context HOC, but that decision is arbitrary and doesn't make a meaningful difference.

### Future Considerations
If the app were to expand into a fully fledged product, the following might be a good idea:
- Use redux or another state management solution
- Add error boundaries
- Add a lot more unit tests

</details>

## Building the App
The recommended build method is to run the following commands:
```bash
# Create a build
eas build --platform ios --profile testflight --local

# Upload the build to App Store Connect
eas submit -p ios
```

<details>
<summary>Full Build Instructions</summary>

### Create a Build

Before you can build a `.ipa` file, you will need a free account with `https://expo.dev` in addition to a paid Apple Developer account. The setup process for Expo is as follows:
- Visit expo.dev and create a new project called `shop-together'.
- Globally install the EAS cli on your local environment: `sudo npm install -g eas-cli`
- `eas login`
- In `app.json`, delete the following identifiers that are linked to my Apple account:
    - `expo.ios.bundleIdentifier`
    - `expo.extra` and everything within it
- Run `eas build:configure`.
    - Select Yes ("Configure this project?") -> iOS ("Which platforms would you like to configure?").
- You must decide which <build profile> to use:
    - `local` (install to device using ad hoc provisioning)
    - `simulator` (run .app file in a simulator via Xcode)
    - **`testflight` (RECOMMENDED) (build a .ipa file and install to device via TestFlight)**
- You must decide whether to build locally (faster) or using Expo servers (less likely to run into errors).
    - **To build locally, append `--local` to the command. THIS IS THE PREFERRED BUILD COMMAND: `eas build --platform ios --profile testflight --local`.**
    - Building locally might require the following additional configuration:
        - If your computer does not have an M1 chip, remove the line for `"resourceClass": "m1-medium"` in `eas.json`.
        - Ensure your node version (`node -v`) is at least version 16.
        - Install FastLane: `brew install fastlane`.
        - Building may fail if you installed cocoapods using gem instead of brew: `brew install cocoapods`
        - You may need to download and install this Certificate Authority from Apple: https://www.apple.com/certificateauthority/AppleWWDRCAG3.cer
        - You may need to install the latest version of XCode, which may require you to first update MacOS.
- Build the app (replacing <build profile> with an option from above): `eas build --platform ios --profile <build profile>`.
    - If you chose `local` build profile, you MUST follow the steps to register your device before building. The build cannot be used on any unregistered devices.


### Access the Build

If you chose the `local` build profile:
- Simply scan the QR code that was generated after building finished (developer mode & device restart required).
- You may run into issues if you use another browser besides Safari to open the instructions link.

If you chose the `simulator` build profile:
- Download the `.ipa` file from https://www.expo.dev (ShopTogether app -> Builds -> select the build -> download).
- Extract the `.ipa` file, which creates `shoptogether.app`
- Open a new simulator in Xcode and drag & drop `shoptogether.app` to the simulator.

If you chose the `testflight` build profile:
- You now have access to a `.ipa` file, either on your computer or in your Expo dashboard (https://www.expo.dev -> ShopTogether app -> Builds -> select the build -> download), depending on whether you built locally or using Expo servers.
- Before submitting the build, visit https://appstoreconnect.apple.com/apps and make a new app using whatever name/company/SKU you choose.
- **To submit the build to App Store Connect, run `eas submit -p ios`, and enter the path to the `.ipa` file.**
- On the app's page, press "Internal Testing" to make a new Internal Group.
    - If you are not a tester, add yourself as a tester and check your email for a link to download the app in TestFlight.
- Using your iOS device with TestFlight installed, visit the link in your email to install the app.
</details>


<details>
<summary>EXTRA: Expo Go</summary>
For development purposes, the quickest way to use the Shop Together app is to via the Expo Go app, either in a simulator or on your iOS device.

This feature:
- allows for hot reloading, i.e. the ability to change the code and see the results in real time
- does NOT support native features that Shop Together uses: Face ID and Picture Upload

To use this feature, simply run `yarn install` and `yarn start`. Now you can either:
- Scan the QR code with your iOS device to test it on that device (using the Expo Go app).
- Press `i` to open the app using the Expo Go app within a simulator on your computer.

</details>

## Testing

To run all 11 tests, run `yarn test`.

### Setup and Mocks

- We use `jest` as our test runner and `react-test-renderer` for testing React Native components.
- Global mocks are created in `jest/setup.js` before each test, and additional mocks are also created within individual test files.
- A patch for `react-native-pager-view` is required for tests involving `TabBar` components. This addresses a bug caused by ref cycles creating a string that is too long to format into a snapshot file.
    - The patch is located in the `patches` directory and is automatically applied when running `yarn install`.

### Test File Structure

Tests are located under the `__tests__` directory, which mirrors the project structure (i.e. tests for file, `/path/to/file.ts`, are located in the file, `__tests__/path/to/file.test.ts`). This layout makes it easy to locate all the test files while avoiding cluttered project structure. The only minor tradeoff is the longer import paths in the test files.

### Testing Coverage

- Unit tests:
    - Dummy data is valid
    - API functions produce valid data
- Snapshot tests:
    - Each navigation screen is same as previous snapshot
