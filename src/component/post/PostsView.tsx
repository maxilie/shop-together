import { Animated, FlatList } from 'react-native';
import { fetchFollowingPosts, fetchMyPosts, UserPostResponse } from '../../util/APIUtil';
import { memo, useEffect, useRef, useState } from 'react';
import { UserProp, withUser } from '../../context/UserContext';
import UserPostView from './UserPostView';
import { useScrollToTop } from '@react-navigation/native';
import { ScreenSizeProp, withScreenSize } from '../../context/ScreenSizeContext';
import { SizeConstants } from '../../constant/SizeConstants';

type Props = {
  isMyPosts: boolean;
  setTabBarVisibility: (boolean) => void;
}

const PostsView = (props: Props & UserProp & ScreenSizeProp & { navigation }) => {

  // Init scroll handler vars
  const scrollRef = useRef(null);
  useScrollToTop(scrollRef);
  const [lastScrollY, setLastScrollY,] = useState(-1);
  const [yOffset, setYOffset,] = useState(0);

  // Epoch seconds since header tabs were hidden or shown
  const [lastTimeHeaderChanged, setTimeLastHeaderChanged,] = useState(new Date().getTime() / 1000);

  // Fetch posts data as a state variable
  const [posts, setPosts,] = useState<Array<UserPostResponse>>([]);
  const [refreshing, setRefreshing,] = useState(true);
  const myUserData = props.user.userData;
  useEffect(() => {
    if (!refreshing) return;
    const fetchPostsWrapper = async () => {
      if (!myUserData) return;
      const postsResponse = props.isMyPosts ? await fetchMyPosts(myUserData) : await fetchFollowingPosts();
      setPosts(postsResponse);
    };
    fetchPostsWrapper().finally(() => setTimeout(() => setRefreshing(false), 900));
  }, [refreshing,]);

  // Define renderItem function
  const renderItem = ({ item, }) => {
    return <UserPostView
      userData={item.userData}
      postData={item.postData}
    />;
  };

  // Define scroll event handler
  const handleScroll = ({ nativeEvent, }) => {

    // Always show header if user is scrolling near top of the page
    if (nativeEvent.contentOffset.y < 100) {
      props.setTabBarVisibility(true);
      setYOffset(0);
      setTimeLastHeaderChanged(new Date().getTime() / 1000);
      setLastScrollY(nativeEvent.contentOffset.y);
      return;
    }

    // Ignore other events if header animation is cooling down
    if (new Date().getTime() / 1000 - lastTimeHeaderChanged < 1) {
      setLastScrollY(nativeEvent.contentOffset.y);
      return;
    }

    // Show header if user is scrolling up
    else if (nativeEvent.contentOffset.y < lastScrollY - 5) {
      props.setTabBarVisibility(true);
      setYOffset(0);
      setTimeLastHeaderChanged(new Date().getTime() / 1000);
      setLastScrollY(nativeEvent.contentOffset.y);
    }

    // Hide header if user is scrolling down
    else if (nativeEvent.contentOffset.y > 200 && nativeEvent.contentOffset.y > lastScrollY + 5) {
      props.setTabBarVisibility(false);
      setYOffset(props.screenSize.screenHeight * SizeConstants.FEED.tabHeight);
      setTimeLastHeaderChanged(new Date().getTime() / 1000);
      setLastScrollY(nativeEvent.contentOffset.y);
    }

    // In any case, save current scroll position in state
    else {
      setLastScrollY(nativeEvent.contentOffset.y);
    }
  };


  // Render component...
  return (
    <Animated.View>
    <FlatList
      ref={scrollRef}
      data={posts}
      bounces={true}
      showsVerticalScrollIndicator={false}
      initialNumToRender={4}
      maxToRenderPerBatch={4}
      keyExtractor={item => item.postData.postID}
      renderItem={renderItem}
      removeClippedSubviews={true}
      scrollEventThrottle={90}
      refreshing={refreshing}
      onScroll={handleScroll}
      onRefresh={() => {
        if (!refreshing) setRefreshing(true);
      }}
      contentContainerStyle={{
        paddingTop: yOffset,
      }}
    />
    </Animated.View>
  );
};

// Don't re-render upon updates to props
export default memo(withScreenSize(withUser(PostsView)), () => true);
