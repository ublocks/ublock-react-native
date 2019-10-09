import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';

import { Screen, ScaledSheet } from '@ublocks-react-native/helper';

const styles = ScaledSheet.create({
  underline: { textDecorationLine: 'underline' },
});

export default class ImageButton extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    style: PropTypes.any,
    onPress: PropTypes.func,
    height: PropTypes.any,
    width: PropTypes.any,
    text: PropTypes.string.isRequired,
    textColor: PropTypes.string,
    textSize: PropTypes.number,
    textStyle: PropTypes.any,
  };

  static defaultProps = {
    onPress: () => {},
    disabled: false,
    height: 'auto',
    width: 'auto',
    style: {},
    textStyle: {},
    textColor: 'blue',
    textSize: Screen.scale(24),
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.btnClick = false;
  }

  handleOnPress = () => {
    const { disabled, onPress } = this.props;

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
  };

  render() {
    const {
      height,
      width,
      style,
      disabled,
      text,
      textStyle,
      textColor,
      textSize,
    } = this.props;
    return (
      <TouchableOpacity
        style={[
          {
            justifyContent: 'center',
            alignItems: 'center',
            margin: 5,
            height,
            width,
          },
          style,
        ]}
        onPress={this.handleOnPress}
        activeOpacity={disabled ? 1 : 0.2}
      >
        <Text
          style={[
            styles.underline,
            { color: textColor },
            { fontSize: textSize },
            textStyle,
          ]}
        >
          {text}
        </Text>
      </TouchableOpacity>
    );
  }
}
