import { Text, View } from 'react-native';
import { memo } from 'react';
import { DynamicStylesheet, useFelaNative } from '../../hook/UseFelaNative';
import { THEME_COLORS } from '../../constant/ThemeConstants';

type Props = {
  title: string;
  screenWidth: number;
}

const ProductCategoryHeader = (props: Props) => {
  const style = useFelaNative({ screenWidth: props.screenWidth, });
  return (
    <View
      style={style(styles.headerContainer)}>
      <Text
        style={style(styles.titleText)}>{props.title}</Text>
    </View>
  );
};

// Define dynamic styles
const styles: DynamicStylesheet = {
  headerContainer: ({ screenWidth, }) => ({
    width: screenWidth,
    marginTop: '14%',
    marginBottom: '2%',
  }),
  titleContainer: {},
  titleText: {
    marginLeft: '4%',
    fontFamily: 'RobotoCondensed_700Bold',
    fontSize: 30,
    color: '#262626',
    textShadowRadius: 5,
    textShadowColor: THEME_COLORS.lightBlue,
  },
};

export default memo(ProductCategoryHeader);
