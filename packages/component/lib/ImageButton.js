import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';

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
    transparent: PropTypes.bool,
    disabled: PropTypes.bool,
    style: PropTypes.any,
    imageStyle: PropTypes.any,
    height: PropTypes.any,
    width: PropTypes.any,
    source: PropTypes.any,
    blurRadius: PropTypes.number,
    resizeMode: PropTypes.string,
    imageWidth: PropTypes.number,
    imageHeight: PropTypes.number,
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
    transparent: true,
    //
    source: '',
    resizeMode: 'center',
    blurRadius: 0,
    disabled: false,
    height: 'auto',
    width: 'auto',
    style: {},
    imageStyle: {},
    imageWidth: 0,
    imageHeight: 0,
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.btnClick = false;
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
      imageWidth,
      imageHeight,
      resizeMode,
      blurRadius,
      transparent,
    } = this.props;
    return (
      <RoundButton
        style={[
          {
            justifyContent: 'center',
            alignItems: 'center',
            opacity: 1,
            height,
            width,
          },
          style,
        ]}
        disabled={disabled || !onPress}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onLongPress={onLongPress}
        delayPressIn={delayPressIn}
        delayPressOut={delayPressOut}
        delayLongPress={delayLongPress}
        transparent={transparent}
      >
        <Image
          source={source}
          blurRadius={blurRadius}
          resizeMode={resizeMode}
          style={[
            {
              justifyContent: 'center',
              alignItems: 'center',
              height: imageHeight || Screen.verticalScale(height - 5),
              width: imageWidth || Screen.scale(width - 5),
            },
            imageStyle,
          ]}
        />
      </RoundButton>
    );
  }
}
