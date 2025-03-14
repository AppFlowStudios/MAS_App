import React, { useState } from 'react';
import { Button, StyleSheet, View, Image, Pressable, Text, Linking, ImageBackground } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useFrameCallback,
  useSharedValue,
} from 'react-native-reanimated';
import X from '@/src/components/Icons/X';
import WhatsApp from '@/src/components/Icons/Whatsapp';
import Instagram from '@/src/components/Icons/Instagram';
import TikTok from '@/src/components/Icons/Tiktok';
import Meta from '@/src/components/Icons/Meta';
import YouTube from '@/src/components/Icons/Youtube';
const MeasureElement = ({ onLayout, children }) => (
  <Animated.ScrollView
    horizontal
    style={marqueeStyles.hidden}
    pointerEvents="box-none">
    <View onLayout={(ev) => onLayout(ev.nativeEvent.layout.width)}>
      {children}
    </View>
  </Animated.ScrollView>
);

const TranslatedElement = ({ index, children, offset, childrenWidth }) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      left: (index - 1) * childrenWidth,
      transform: [
        {
          translateX: -offset.value,
        },
      ],
    };
  });
  return (
    <Animated.View style={[styles.animatedStyle, animatedStyle]}>
      {children}
    </Animated.View>
  );
};

const getIndicesArray = (length) => Array.from({ length }, (_, i) => i);

const Cloner = ({ count, renderChild }) => (
  <>{getIndicesArray(count).map(renderChild)}</>
);

const ChildrenScroller = ({
  duration,
  childrenWidth,
  parentWidth,
  reverse,
  children,
}) => {
  const offset = useSharedValue(0);
  const coeff = useSharedValue(reverse ? 1 : -1);

  React.useEffect(() => {
    coeff.value = reverse ? 1 : -1;
  }, [reverse]);

  useFrameCallback((i) => {
    // prettier-ignore
    offset.value += (coeff.value * ((i.timeSincePreviousFrame ?? 1) * childrenWidth )) / duration;
    offset.value = offset.value % childrenWidth;
  }, true);

  const count = Math.round(parentWidth / childrenWidth) + 2;
  const renderChild = (index) => (
    <TranslatedElement
      key={`clone-${index}`}
      index={index}
      offset={offset}
      childrenWidth={childrenWidth}>
      {children}
    </TranslatedElement>
  );

  return <Cloner count={count} renderChild={renderChild} />;
};

export const Marquee = ({ duration = 50000, reverse = false, children, style }) => {
  const [parentWidth, setParentWidth] = React.useState(0);
  const [childrenWidth, setChildrenWidth] = React.useState(0);

  return (
    <View
      style={style}
      onLayout={(ev) => {
        setParentWidth(ev.nativeEvent.layout.width);
      }}
      pointerEvents="box-none">
      <View style={marqueeStyles.row} pointerEvents="box-none">
        <MeasureElement onLayout={setChildrenWidth}>{children}</MeasureElement>

        {childrenWidth > 0 && parentWidth > 0 && (
          <ChildrenScroller
            duration={duration}
            parentWidth={parentWidth}
            childrenWidth={childrenWidth}
            reverse={reverse}>
            {children}
          </ChildrenScroller>
        )}
      </View>
    </View>
  );
};

const marqueeStyles = StyleSheet.create({
  hidden: { opacity: 0, zIndex: -1 },
  row: { flexDirection: 'row', overflow: 'hidden' },
});

function JummahMarquee() {
  const [reverse, setReverse] = useState(false);

  return (
    <View style={styles.container} className='pb-12 mt-4'>
      <View style={styles.safeArea}>
        <Marquee reverse={reverse} style={{  }}>
          <View className='flex flex-row gap-2'>
            {
                ['12:15 PM', '1:00 PM', '1:45 PM', '3:45 PM'].map((item, index) => (
                    <ImageBackground className="w-[190] h-[170] items-start justify-end"
                    source={index == 0 || index == 1 ? require('@/assets/images/Jummah12.png') : require('@/assets/images/Jummah34.png')}
                    imageStyle={{ height : '100%', width : '90%', borderRadius : 15, objectFit : 'fill' }}
                    >
                     <Text className='text-white ml-3 text-md font-semibold'>Prayer {index + 1}</Text>
                     <Text className='text-white ml-3 font-bold text-lg'>{item}</Text>
                    </ImageBackground>
                ))
            }
          </View>
        </Marquee>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  horseImage: {
    width: 140,
    height: 80,
    marginRight: 80,
  },
  container: {
    flex: 1,
  },
  safeArea: {
    display: 'flex',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  animatedStyle: {
    position: 'absolute',
  },
  circle: {
    marginTop: 4,
    borderRadius: 100,
    height: 120,
    width: 160,
    backgroundColor: '#b58df1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default JummahMarquee;