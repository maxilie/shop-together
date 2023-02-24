import renderer from 'react-test-renderer';
import { NavigationContainer } from '@react-navigation/native';
import { RendererProvider } from 'react-fela';
import { createRenderer } from 'fela-native';
import SignInUpPage from '../../../src/screen/SignInUpPage';

// Mock nanoid func used for key generation by react-navigation
jest.mock('nanoid/non-secure', () => ({
  nanoid: jest.fn(() => 'mock-nanoid-id'),
}));

describe('SignInUpPage component', () => {
  it('renders correctly', () => {
    const felaRenderer = createRenderer();
    const tree = renderer.create(
      <RendererProvider renderer={felaRenderer}>
        <NavigationContainer>
          <SignInUpPage />
        </NavigationContainer>
      </RendererProvider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
