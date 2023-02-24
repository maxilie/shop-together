import renderer from 'react-test-renderer';
import { NavigationContainer } from '@react-navigation/native';
import { RendererProvider } from 'react-fela';
import { createRenderer } from 'fela-native';
import Shop from '../../../src/screen/Shop';

describe('Shop component', () => {
  it('renders correctly', () => {
    const felaRenderer = createRenderer();
    const tree = renderer.create(
      <RendererProvider renderer={felaRenderer}>
        <NavigationContainer>
          <Shop />
        </NavigationContainer>
      </RendererProvider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
