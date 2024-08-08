import {useWindowDimensions} from 'react-native';
import React from 'react';
import {SharedValue, useDerivedValue} from 'react-native-reanimated';
import {Canvas, SkFont, Text} from '@shopify/react-native-skia';

type AnimatedDonationAmountProp = {
    selectedValue : SharedValue<number>
    font : SkFont
    percantageToGoal : string
}
const AnimatedDonationAmount = ({ selectedValue, font, percantageToGoal } : AnimatedDonationAmountProp ) => {
    const MARGIN_VERTICAL = 20;

    const animatedText = useDerivedValue(() => {
      return `$${(Math.round(selectedValue.value * 100) / 100).toLocaleString()}`;
    });
  
    const fontSize = font?.measureText('0');
  
    const textX = useDerivedValue(() => {
      const _fontSize = font?.measureText(animatedText.value);
      return _fontSize!.width / 12;
    }, []);
    
   
    return (
      <Canvas style={{height: fontSize!.height + MARGIN_VERTICAL}}>
        <Text
          text={animatedText}
          font={font}
          color={'white'}
          x={textX}
          y={fontSize!.height + MARGIN_VERTICAL / 2}
        />
      </Canvas>
    )
}

export default AnimatedDonationAmount