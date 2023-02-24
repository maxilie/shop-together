import 'react-native-gesture-handler/jestSetup';
import RN from 'react-native';

// Prevent tests from running code after teardown
jest.useFakeTimers();

// Mock reanimated library
jest.mock('react-native-reanimated', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const Reanimated = require('react-native-reanimated/mock');
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  Reanimated.default.call = () => {
  };

  class BaseAnimationMock {
    duration(_) {
      return this;
    }

    easing(_) {
      return this;
    }

    delay(_) {
      return this;
    }

    springify(_) {
      return this;
    }

    damping(_) {
      return this;
    }

    stiffness(_) {
      return this;
    }

    withCallback(_) {
      return this;
    }

    randomDelay() {
      return this;
    }

    withInitialValues() {
      return this;
    }

    build() {
      return () => ({ initialValues: {}, animations: {}, });
    }
  }

  Object.defineProperty(Reanimated, 'FadeInUp', {
    writable: true,
    value: new BaseAnimationMock(),
  });

  Object.defineProperty(Reanimated, 'SlideOutUp', {
    writable: true,
    value: new BaseAnimationMock(),
  });

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock SafeAreaProvider
jest.mock('react-native-safe-area-context', () => {
  const inset = { top: 0, right: 0, bottom: 0, left: 0, };
  return {
    ...jest.requireActual('react-native-safe-area-context'),
    SafeAreaProvider: jest.fn(({ children, }) => children),
    SafeAreaConsumer: jest.fn(({ children, }) => children(inset)),
    useSafeAreaInsets: jest.fn(() => inset),
    useSafeAreaFrame: jest.fn(() => ({ x: 0, y: 0, width: 390, height: 844, })),
  };
});

// Mock useIsReady hook to always return true
jest.mock('../src/hook/ReadyDelay', () => {
  const original = jest.requireActual('../src/hook/ReadyDelay');
  return {
    __esModule: true,
    ...original,
    default: jest.fn(() => true),
  };
});

// Mock FlatList (avoids error: "PrettyFormatPluginError: Invalid string length")
jest.spyOn(RN.Animated, 'FlatList', 'get')
  .mockImplementation(() => RN.FlatList);
