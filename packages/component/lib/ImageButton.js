import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Image,
} from 'react-native';

import RoundButton from './RoundButton';

export default class ImageButton extends Component {
  static propTypes = {
    // button props
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    onPressIn: PropTypes.func,
    onPressOut: PropTypes.func,
    delayLongPress: PropTypes.number,
    delayPressIn: PropTypes.number,
    delayPressOut: PropTypes.number,
    // 
    disabled: PropTypes.bool,
    style: PropTypes.any,
    imageStyle: PropTypes.any,
    height: PropTypes.any,
    width: PropTypes.any,
    source: PropTypes.any,
    blurRadius: PropTypes.number,
    resizeMode: PropTypes.string,
  };

  static defaultProps = {
    // button props
    onPress: undefined,
    onPressIn: undefined,
    onPressOut: undefined,
    onLongPress: undefined,
    delayLongPress: 400,
    delayPressIn: 200,
    delayPressOut: 200,
    // 
    source: '',
    resizeMode: 'center',
    blurRadius: 0,
    disabled: false,
    height: 'auto',
    width: 'auto',
    style: {},
    imageStyle: {},
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.btnClick = false;
  }

  handleOnPress = () => {
    const {
      disabled,
      onPress,
    } = this.props;

    if (!disabled) {
      if (!this.btnClick) {
        this.btnClick = true;
        if (onPress) {
          onPress();
        }
        setTimeout(() => {
          this.btnClick = false;
        }, 100);
      }
    }
  }

  render() {
    const {
      // button props
      onPress,
      onPressIn,
      onPressOut,
      onLongPress,
      delayLongPress,
      delayPressIn,
      delayPressOut,
      height,
      width,
      style,
      source,
      disabled,
      imageStyle,
      resizeMode,
      blurRadius,
    } = this.props;
    return (
      <RoundButton
        style={[{
          justifyContent: 'center',
          alignItems: 'center',
          opacity: 1,
          height,
          width,
        }, style]}
        disabled={disabled || !onPress}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onLongPress={onLongPress}
        delayPressIn={delayPressIn}
        delayPressOut={delayPressOut}
        delayLongPress={delayLongPress}
        translucent
      >
        <Image
          source={source}
          blurRadius={blurRadius}
          resizeMode={resizeMode}
          style={[{
            justifyContent: 'center',
            alignItems: 'center',
          }, imageStyle]}
        />
      </RoundButton>
    );
  }
}
