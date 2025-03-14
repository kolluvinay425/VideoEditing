// useCollapsibleTabScroll.js
import {useRef, useEffect} from 'react';
import {Animated} from 'react-native';

const HeaderHeight = 150;

export const useCollapsibleTabScroll = (routes, tabIndex, scrollY) => {
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

  const syncScrollOffset = () => {
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

  return {
    listRefArr,
    isListGliding,
    syncScrollOffset,
  };
};
