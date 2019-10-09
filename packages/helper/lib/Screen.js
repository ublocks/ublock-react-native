import { Dimensions, Platform, PixelRatio } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters/extend';

const { width, height } = Dimensions.get('window');

export default {
  width,
  height,
  scale,
  verticalScale,
  moderateScale,
};
