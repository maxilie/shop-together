import renderer from 'react-test-renderer';
import Home from '../../../src/screen/Home';
import { NavigationContainer } from '@react-navigation/native';
import { RendererProvider } from 'react-fela';
import { createRenderer } from 'fela-native';

// Mock nanoid func used for key generation by react-navigation
jest.mock('nanoid/non-secure', () => ({
  nanoid: jest.fn(() => 'mock-nanoid-id'),
}));

describe('Home component', () => {
  it('renders correctly', () => {
    const felaRenderer = createRenderer();
    const tree = renderer.create(
      <RendererProvider renderer={felaRenderer}>
        <NavigationContainer>
          <Home
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            signOutFunc={() => {}} />
        </NavigationContainer>
      </RendererProvider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
