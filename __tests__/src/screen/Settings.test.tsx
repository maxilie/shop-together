import renderer from 'react-test-renderer';
import { NavigationContainer } from '@react-navigation/native';
import { RendererProvider } from 'react-fela';
import { createRenderer } from 'fela-native';
import Settings from '../../../src/screen/Settings';

describe('Settings component', () => {
  it('renders correctly', () => {
    const felaRenderer = createRenderer();
    const tree = renderer.create(
      <RendererProvider renderer={felaRenderer}>
        <NavigationContainer>
          <Settings />
        </NavigationContainer>
      </RendererProvider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
