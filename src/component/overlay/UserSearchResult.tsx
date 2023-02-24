import { Image, Pressable, Text } from 'react-native';
import React, { useState } from 'react';
import { UserData } from '../../type/UserData';
import { DynamicStylesheet, useFelaNative } from '../../hook/UseFelaNative';

type Props = {
  width: number;
  height: number;
  userData: UserData;
  isLastItem: boolean;
}

const UserSearchResult = (props: Props) => {

  // Init state vars
  const [isSelected, setSelected,] = useState(false);

  // Get styles
  const styleProps = getStyleProps(props, isSelected);
  const style = useFelaNative(styleProps);

  // Render the component...
  return (
    <Pressable
      onPressIn={() => setSelected(true)}
      onPressOut={() => setSelected(false)}
      style={style(styles.container)}
    >
      <Image
        defaultSource={props.userData.image}
        style={style(styles.profileImage)} />
      <Text
        style={style(styles.nameText)}>{props.userData.name}</Text>
      {props.userData.isFollowed &&
        <Text
          style={style(styles.followingText)}>Following</Text>
      }
    </Pressable>
  );
};

// Define style variables
const getStyleProps = (props: Props, isSelected) => {
  return {
    width: props.width,
    height: props.height,
    isSelected: isSelected,
    imgWidthHeight: props.height * 0.75,
  };
};

// Define styles
const styles: DynamicStylesheet = {
  container: ({ width, height, isLastItem, isSelected, }) => ({
    width: width,
    height: height,
    padding: height * 0.23,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: isLastItem ? 0 : height * 0.03,
    borderBottomColor: 'lightgray',
    backgroundColor: isSelected ? '#fafdff' : 'white',
  }),
  nameText: ({ height, }) => ({
    marginLeft: height * 0.15,
    fontFamily: 'Montserrat_500Medium',
    fontWeight: 'bold',
    fontSize: height * 0.27,
  }),
  followingText: ({ height, }) => ({
    fontSize: height * 0.2,
    marginLeft: 'auto',
  }),
  profileImage: ({ imgWidthHeight, }) => ({
    width: imgWidthHeight,
    height: imgWidthHeight,
    borderRadius: imgWidthHeight * 0.5,
  }),
};

export default UserSearchResult;
