import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import Portal from './src/screen/Portal';

enableScreens();

const App = () => {

  // Because of difficulties testing the root component with Jest, ...
  // NavigationContainer must be in root component, but everything else must be in Portal
  return (
    <NavigationContainer>
      <Portal />
    </NavigationContainer>
  );
};

export default App;
