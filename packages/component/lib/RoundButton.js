import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';
import { isNumber, throttle } from 'lodash';

import { Screen, ScaledSheet } from '@ublocks-react-native/helper';

const styles = ScaledSheet.create({
  button: {
    height: '48@vs',
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
    justifyContent: PropTypes.string,
    alignItems: PropTypes.string,
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
    throttleTime: PropTypes.number,
    disabledOpacity: PropTypes.number,
  };

  static defaultProps = {
    // button props
    onPress: () => {},
    onPressIn: undefined,
    onPressOut: undefined,
    onLongPress: undefined,
    delayLongPress: undefined,
    delayPressIn: undefined,
    delayPressOut: undefined,
    numberOfLines: 1,
    disabled: false,
    disabledOpacity: 0.2,
    borderColor: undefined,
    color: 'gray',
    style: {},
    text: '',
    textColor: 'black',
    textStyle: {},
    justifyContent: 'center',
    alignItems: 'center',
    hitSlop: {
      top: Screen.verticalScale(5),
      bottom: Screen.verticalScale(5),
      left: Screen.scale(5),
      right: Screen.scale(5),
    },
    children: null,
    roundRadius: 8,
    transparent: false,
    width: '100%',
    height: 48,
    throttleTime: 1500,
  };

  constructor(props) {
    super(props);
    this.state = {
      locked: false,
    };
    this.lockTimer = null;
  }

  componentWillUnmount() {
    if (this.lockTimer) {
      clearTimeout(this.lockTimer);
    }
  }

  handleOnPress = (e) => {
    const { onPress, disabled, throttleTime } = this.props;
    const { locked } = this.state;
    if (disabled || locked) {
      return false;
    }
    requestAnimationFrame(onPress);
    this.setState(
      () => ({ locked: true }),
      () => {
        // this.forceUpdate();
        clearTimeout(this.lockTimer);
        this.lockTimer = setTimeout(() => {
          this.setState({ locked: false });
        }, throttleTime);
      },
    );
  };

  render() {
    const {
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
      justifyContent,
      alignItems,
      throttleTime,
      onPress,
      disabledOpacity,
      ...props
    } = this.props;
    const { locked } = this.state;
    return (
      <TouchableOpacity
        {...props}
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
            opacity: disabled || locked ? disabledOpacity : 1,
            width: isNumber(width) ? Screen.scale(width) : width,
            height: isNumber(height) ? Screen.verticalScale(height) : height,
            justifyContent,
            alignItems,
          },
          btnStyle,
        ]}
        onPress={throttle(this.handleOnPress, throttleTime)}
        activeOpacity={disabled || locked ? 1 : 0.2}
        hitSlop={hitSlop}
        disabled={disabled || locked}
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
