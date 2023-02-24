import { ScreenSizeProp, withScreenSize } from '../../context/ScreenSizeContext';
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { memo, useReducer } from 'react';
import { lightenHex } from '../../util/Util';
import { Comment } from '../../type/Comment';
import { DUMMY_USERS } from '../../constant/DummyData';
import { DynamicStylesheet, useFelaNative } from '../../hook/UseFelaNative';

type Props = {
  color: string;
  comments: Array<Comment>;
}

const PostComments = (props: Props & ScreenSizeProp) => {

  // Init state vars
  const [isExpanded, toggleIsExpanded,] = useReducer(state => !state, false);

  // Get styles
  const styleProps = getStyleProps(props, isExpanded);
  const style = useFelaNative(styleProps);

  // Render the component...
  return (
    <>
      {/**
       * Comments button
       */}
      {!isExpanded &&
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={toggleIsExpanded}
          style={style(styles.button)}>
          <Text
            style={style(styles.buttonText)}>Comments</Text>
        </TouchableOpacity>
      }

      {/**
       * Comments area
       */}
      {isExpanded &&
        <View
          style={style(styles.commentsContainer)}>

          {/**
           * Comment container
           */}
          {props.comments.map((comment, index) =>
            <View
              key={index}
              style={style(styles.commentArea)}>

              {/**
               * Commenter profile area
               */}
              <View
                style={style(styles.commentProfileArea)}>

                <Image
                  style={style(styles.commentProfileImage)}
                  defaultSource={DUMMY_USERS[comment.userID].image} />

                <Text
                  style={style(styles.commentNameText)}>{DUMMY_USERS[comment.userID].name}</Text>
              </View>

              {/**
               * Comment
               */}
              <View
                style={style(styles.comment)}>
                <Text
                  style={style(styles.commentText)}>{comment.comment}</Text>
              </View>
            </View>)}
        </View>}

      {/**
       * Hide comments button
       */}
      {isExpanded &&
        <Pressable
          style={style(styles.hideCommentsContainer)}
          onPress={toggleIsExpanded}
          hitSlop={{
            top: styleProps.hideBtnHitBox,
            bottom: styleProps.hideBtnHitBox,
            left: styleProps.hideBtnHitBox,
            right: styleProps.hideBtnHitBox,
          }}>
          <Text
            style={style(styles.hideCommentsText)}>Hide Comments</Text>
        </Pressable>}
    </>
  );
};

// Define style variables
const getStyleProps = (props: Props & ScreenSizeProp, isExpanded) => {
  const { screenWidth, screenHeight, } = props.screenSize;
  const btnFontSize = props.screenSize.screenHeight * 0.025;
  const verticalMargin = screenHeight * 0.02;
  const profileImgWidthHeight = verticalMargin * 1.1;
  const hideBtnFontSize = btnFontSize * 0.7;
  const hideBtnHitBox = hideBtnFontSize * 1.2;
  return {
    screenWidth,
    screenHeight,
    btnFontSize,
    verticalMargin,
    profileImgWidthHeight,
    hideBtnFontSize,
    hideBtnHitBox,
    color: props.color,
    isExpanded,
  };
};

// Define styles
const styles: DynamicStylesheet = {
  button: ({ verticalMargin, btnFontSize, color, }) => ({
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: verticalMargin * 2,
    padding: btnFontSize * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: btnFontSize * 0.8,
    backgroundColor: lightenHex(color, -10),
  }),
  buttonText: ({ btnFontSize, }) => ({
    fontSize: btnFontSize,
    color: 'white',
    fontWeight: 'bold',
    textShadowColor: 'lightgray',
    textShadowRadius: btnFontSize * 0.15,
  }),
  commentsContainer: ({ isExpanded, verticalMargin, }) => ({
    marginTop: isExpanded ? 0 : verticalMargin * 1.2,
    flexDirection: 'column',
  }),
  commentArea: ({ verticalMargin, color, }) => ({
    marginTop: verticalMargin * 1.2,
    paddingLeft: verticalMargin * 0.6,
    paddingRight: verticalMargin * 0.6,
    paddingTop: verticalMargin * 0.8,
    paddingBottom: verticalMargin * 0.8,
    flexDirection: 'column',
    backgroundColor: lightenHex(color, 100),
    borderRadius: verticalMargin * 0.6,
    borderColor: lightenHex(color, -10),
    borderWidth: StyleSheet.hairlineWidth * 5,
    width: '100%',
    shadowOpacity: 0.9,
    shadowColor: lightenHex(color, 10),
    shadowRadius: verticalMargin * 0.15,
    shadowOffset: { width: verticalMargin * 0.02, height: verticalMargin * 0.02, },
  }),
  commentProfileArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentProfileImage: ({ profileImgWidthHeight, color, }) => ({
    width: profileImgWidthHeight,
    height: profileImgWidthHeight,
    borderRadius: profileImgWidthHeight * 0.5,
    borderWidth: profileImgWidthHeight * 0.08,
    borderColor: lightenHex(color, -10),
  }),
  commentNameText: ({ profileImgWidthHeight, btnFontSize, }) => ({
    marginLeft: profileImgWidthHeight * 0.4,
    fontFamily: 'RobotoCondensed_700Bold',
    color: '#3a3939',
    fontSize: btnFontSize * 0.63,
  }),
  comment: ({ verticalMargin, }) => ({
    marginTop: verticalMargin * 0.7,
    marginLeft: verticalMargin * 0.8,
  }),
  commentText: ({ btnFontSize, }) => ({
    fontSize: btnFontSize * 0.69,
  }),
  hideCommentsContainer: ({ verticalMargin, }) => ({
    marginTop: verticalMargin,
    marginLeft: 'auto',
    marginRight: 'auto',
  }),
  hideCommentsText: ({ hideBtnFontSize, color, }) => ({
    fontSize: hideBtnFontSize,
    textDecorationLine: 'underline',
    color: lightenHex(color, -120),
    fontFamily: 'Montserrat_500Medium',
  }),
};

// Don't re-render due to changes in props
export default memo(withScreenSize(PostComments), () => true);
