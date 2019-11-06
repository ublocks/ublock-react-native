import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';
import { isNumber, debounce } from 'lodash';

import { Screen, ScaledSheet } from '@ublocks-react-native/helper';

const styles = ScaledSheet.create({
  button: {
    // flex: 1,
    paddingLeft: '12@s',
    paddingRight: '12@s',
    height: '40@s',
    borderWidth: Screen.onePixel * 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  buttonText: {
    color: '#000',
    fontSize: '18@s',
  },
});

export default class RoundButton extends React.PureComponent {
  static propTypes = {
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    onPressIn: PropTypes.func,
    onPressOut: PropTypes.func,
    delayLongPress: PropTypes.number,
    delayPressIn: PropTypes.number,
    delayPressOut: PropTypes.number,
    style: PropTypes.any,
    color: PropTypes.string,
    text: PropTypes.string,
    textColor: PropTypes.string,
    textStyle: PropTypes.any,
    borderColor: PropTypes.string,
    disabled: PropTypes.bool,
    hitSlop: PropTypes.object,
    numberOfLines: PropTypes.number,
    children: PropTypes.any,
    roundRadius: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    transparent: PropTypes.bool,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  };

  static defaultProps = {
    // button props
    onPress: () => {},
    onPressIn: undefined,
    onPressOut: undefined,
    onLongPress: undefined,
    delayLongPress: 400,
    delayPressIn: 200,
    delayPressOut: 200,
    numberOfLines: 1,
    disabled: false,
    borderColor: undefined,
    color: 'gray',
    style: {},
    text: '',
    textColor: 'black',
    textStyle: {},
    hitSlop: {
      top: Screen.verticalScale(5),
      bottom: Screen.verticalScale(5),
      left: Screen.scale(5),
      right: Screen.scale(5),
    },
    children: null,
    roundRadius: 16,
    transparent: false,
    width: '100%',
    height: 32,
  };

  constructor(props) {
    super(props);
    this.state = {};
    // this.btnClick = false;
  }

  render() {
    const {
      onPress,
      onPressIn,
      onPressOut,
      onLongPress,
      delayLongPress,
      delayPressIn,
      delayPressOut,
      color,
      style: btnStyle,
      text,
      textStyle,
      textColor,
      borderColor,
      disabled,
      hitSlop,
      numberOfLines,
      children,
      roundRadius,
      transparent,
      width,
      height,
    } = this.props;
    return (
      <TouchableOpacity
        style={[
          styles.button,
          transparent
            ? {
                paddingLeft: 0,
                paddingRight: 0,
                height: 'auto',
                borderWidth: 0,
                borderRadius: 0,
                borderColor: 'transparent',
                backgroundColor: 'transparent',
              }
            : {
                backgroundColor: color,
                borderColor: borderColor || color,
                borderRadius: isNumber(roundRadius) ? Screen.scale(roundRadius) : 0,
              },
          {
            opacity: disabled ? 0.2 : 1,
            width: isNumber(width) ? Screen.scale(width) : width,
            height: isNumber(height) ? Screen.verticalScale(height) : height,
          },
          btnStyle,
        ]}
        onPress={disabled ? () => {} : debounce(onPress, 400)}
        activeOpacity={disabled ? 1 : 0.2}
        hitSlop={hitSlop}
        disabled={disabled}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onLongPress={onLongPress}
        delayPressIn={delayPressIn}
        delayPressOut={delayPressOut}
        delayLongPress={delayLongPress}
      >
        {children || (
          <Text
            style={[styles.buttonText, textStyle, { color: textColor }]}
            numberOfLines={numberOfLines}
          >
            {text}
          </Text>
        )}
      </TouchableOpacity>
    );
  }
}
