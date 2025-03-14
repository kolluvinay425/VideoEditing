// useCollapsibleTabScroll.js
import {useRef, useEffect} from 'react';

export const useCollapsibleTabScroll = (
  routes,
  tabIndex,
  scrollY,
  headerHeight,
) => {
  const HeaderHeight = headerHeight;
  const listRefArr = useRef([]);
  const listOffset = useRef({});
  const isListGliding = useRef(false);

  useEffect(() => {
    scrollY.addListener(({value}) => {
      const curRoute = routes[tabIndex].key;
      listOffset.current[curRoute] = value;
    });
    return () => {
      scrollY.removeAllListeners();
    };
  }, [routes, tabIndex]);

  const syncScrollOffsetDetail = () => {
    const curRouteKey = routes[tabIndex].key;
    listRefArr.current.forEach(item => {
      if (item.key !== curRouteKey) {
        const offset =
          scrollY._value >= HeaderHeight ? HeaderHeight : scrollY._value;
        if (item.value) {
          item.value.scrollToOffset({offset, animated: false});
          listOffset.current[item.key] = offset;
        }
      }
    });
  };

  const syncScrollOffsetAchievement = () => {
    const curRouteKey = routes[tabIndex].key;
    listRefArr.current.forEach(item => {
      if (item.key !== curRouteKey) {
        if (scrollY._value < HeaderHeight && scrollY._value >= 0) {
          if (item.value) {
            item.value.scrollToOffset({
              offset: scrollY._value,
              animated: false,
            });
            listOffset.current[item.key] = scrollY._value;
          }
        } else if (scrollY._value >= HeaderHeight) {
          if (
            listOffset.current[item.key] < HeaderHeight ||
            listOffset.current[item.key] == null
          ) {
            if (item.value) {
              item.value.scrollToOffset({
                offset: HeaderHeight,
                animated: false,
              });
              listOffset.current[item.key] = HeaderHeight;
            }
          }
        }
      }
    });
  };

  const syncScrollOffset =
    headerHeight === 300 ? syncScrollOffsetAchievement : syncScrollOffsetDetail;

  return {
    listRefArr,
    isListGliding,
    syncScrollOffset: syncScrollOffset,
  };
};
