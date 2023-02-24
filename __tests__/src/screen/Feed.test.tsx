import renderer, {act} from 'react-test-renderer';
import Feed from '../../../src/screen/Feed';
import { RendererProvider } from 'react-fela';
import { NavigationContainer } from '@react-navigation/native';
import { createRenderer } from 'fela-native';

// Mock nanoid func used for key generation by react-navigation
jest.mock('nanoid/non-secure', () => ({
  nanoid: jest.fn(() => 'mock-nanoid-id'),
}));

describe('Feed component', () => {
  it('renders correctly', async () => {
    const felaRenderer = createRenderer();
    const tree = renderer.create(
      <RendererProvider renderer={felaRenderer}>
        <NavigationContainer>
          <Feed />
        </NavigationContainer>
      </RendererProvider>).toJSON();
    await act(async () => expect(tree).toMatchSnapshot());
  });
});
