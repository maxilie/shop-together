import { ScreenSizeProp, withScreenSize } from '../../context/ScreenSizeContext';
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { useMemo, useState } from 'react';
import SearchBox from '../input/SearchBox';
import SearchResults from '../overlay/SearchResults';
import { DUMMY_USERS } from '../../constant/DummyData';
import { UserData } from '../../type/UserData';
import UserSearchResult from '../overlay/UserSearchResult';
import NotificationsModal from '../overlay/NotificationsModal';
import { useTabVisibility } from '../../hook/UseTabVisibility';
import { useFelaNative } from '../../hook/UseFelaNative';
import { MAIN_HEADER_STYLES } from './MainHeaderStyles';

const MainHeader = (props: ScreenSizeProp) => {

  // Init state vars
  const [searchingFriends, setSearchingFriends,] = useState(false);
  const [notificationsOpen, setNotificationsOpen,] = useState(false);
  const [searchQuery, setSearchQuery,] = useState('');

  // Check whether tabs bar is visible
  const topTabsVisible = useTabVisibility();

  // Get styles
  const insetTop = useSafeAreaInsets().top;
  const styleProps = useMemo(() => MAIN_HEADER_STYLES.getStyleProps(props.screenSize, insetTop, topTabsVisible),
    [topTabsVisible,]);
  const style = useFelaNative(styleProps);
  const styles = MAIN_HEADER_STYLES.styles;

  // Render the component...
  return (
    <>

      {/**
       * Header containers
       */}
      <View
        style={style(styles.headerContainer)}>
        <View
          style={style(styles.headerContentContainer)}>

          {/**
           * Logo
           */}
          <Image
            defaultSource={require('../../../assets/logo.png')}
            style={style(styles.logo)}
          />

          {/**
           * Header bottom row
           */}
          <View
            style={style(styles.headerBottomRow)}>

            {/**
             * Add friends area
             */}
            <View
              style={style(styles.addFriendsArea)}>

              {/**
               * Add friends button
               */}
              {(!searchingFriends && !notificationsOpen) &&
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={style(styles.addFriendsArea)}
                  onPress={() => setSearchingFriends(true)}>
                  <Image
                    defaultSource={require('../../../assets/plus_icon.png')}
                    style={style(styles.addFriendsBtn, styles.addFriendsBtnShadow)} />
                  <Text
                    style={style(styles.addFriendsText)}>Add Friends</Text>
                </TouchableOpacity>}

              {/**
               * Search box
               */}
              {searchingFriends &&
                <View
                  style={style(styles.searchArea)}>
                  <SearchBox
                    width={styleProps.screenWidth - styleProps.headerBottomRowHorizontalPadding * 2 - styleProps.cancelBtnWidth}
                    height={styleProps.headerBottomRowHeight}
                    onChange={setSearchQuery}
                    placeholder='Search People'
                    value={searchQuery} />
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={style(styles.cancelBtn)}
                    onPress={() => setSearchingFriends(false)}>
                    <Text
                      style={style(styles.cancelBtnText)}>Cancel</Text>
                  </TouchableOpacity>
                </View>}
            </View>

            {/**
             * Bell area
             */}
            {(!searchingFriends && !notificationsOpen) &&
              <View
                style={style(styles.addFriendsArea)}>

                {/**
                 * Notification bell button
                 */}
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => setNotificationsOpen(true)}>
                  <Image
                    defaultSource={require('../../../assets/bell_icon.png')}
                    style={style(styles.addFriendsBtn, styles.notificationBtnShadow)} />
                </TouchableOpacity>
              </View>}

          </View>
        </View>
      </View>

      {/**
       * Gray-out area
       */}
      {searchingFriends &&
        <TouchableOpacity
     style={style(styles.grayOutArea)}
          onPress={() => {
            setSearchingFriends(false);
            setNotificationsOpen(false);
          }} />}

      {/**
       * Search results overlay
       */}
      {searchingFriends &&
        <SearchResults
          width={styleProps.screenWidth - styleProps.headerBottomRowHorizontalPadding * 2}
          minHeight={styleProps.headerContentHeight}
          maxHeight={(styleProps.screenHeight - styleProps.searchResultsTopMargin) * 0.7}
          marginTop={styleProps.searchResultsTopMargin + styleProps.headerBottomRowHeight * 0.1}
          marginLeft={styleProps.headerBottomRowHorizontalPadding}>
          {filterUsers(searchQuery).map((userData: UserData, index, array) =>
            <UserSearchResult
              key={userData.name}
              width={styleProps.screenWidth - styleProps.headerBottomRowHorizontalPadding * 2}
              height={styleProps.headerBottomRowHeight * 1.7}
              userData={userData}
              isLastItem={index == array.length - 1} />)
          }
        </SearchResults>
      }

      {/**
       * Notifications overlay
       */}
      <Modal
        animationType={'fade'}
        onDismiss={() => setNotificationsOpen(false)}
        onRequestClose={() => setNotificationsOpen(false)}
        transparent={true}
        visible={notificationsOpen}>
        <NotificationsModal
          width={styleProps.notificationsWidth}
          height={styleProps.headerContentHeight * 3}
          marginTop={styleProps.notificationsTopMargin}
          marginLeft={styleProps.notificationsLeftMargin}
          closeBtnWidth={styleProps.headerBottomRowHeight}
          closeBtnMarginLeft={styleProps.screenWidth - styleProps.headerBottomRowHorizontalPadding - styleProps.headerBottomRowHeight}
          onClose={() => setNotificationsOpen(false)}>
        </NotificationsModal>
      </Modal>
    </>
  );
};

// Define function to search users by name
const filterUsers = (query: string): Array<UserData> => {

  // If there is no search query, return all users
  if (query.length == 0) {
    return Object.values(DUMMY_USERS);
  }

  // Otherwise, filter users by name
  return Object.keys(DUMMY_USERS)
    .filter(key => DUMMY_USERS[key].name.toLowerCase().includes(query.toLowerCase()))
    .map(key => DUMMY_USERS[key]);
};

export default withScreenSize(MainHeader);
