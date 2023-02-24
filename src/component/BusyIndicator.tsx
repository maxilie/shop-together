import { ActivityIndicator, View } from 'react-native';
import { THEME_COLORS } from '../constant/ThemeConstants';

/**
 * Covers the screen with an animated blue loading circle.
 */
const BusyIndicator = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', }}>
      <ActivityIndicator size='large' color={THEME_COLORS.blue} />
    </View>
  );
};

export default BusyIndicator;
