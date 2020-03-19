import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { Screen, ScaledSheet } from '@ublocks-react-native/helper';

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
    height: PropTypes.number,
    width: PropTypes.number,
    source: PropTypes.any.isRequired,
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
    resizeMode: 'contain',
    blurRadius: 0,
    disabled: false,
    height: 32,
    width: 32,
    style: {},
    imageStyle: {},
    imageWidth: null,
    imageHeight: null,
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
            height,
            width,
            margin: 0,
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
              height: imageHeight ? Screen.verticalScale(imageHeight) : '100%',
              width: imageWidth ? Screen.scale(imageWidth) : '100%',
              padding: Screen.scale(4),
            },
            imageStyle,
          ]}
        />
      </RoundButton>
    );
  }
}
