import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { Screen, ScaledSheet } from '@ublocks-react-native/helper';

const styles = ScaledSheet.create({
  button: {
    flexWrap: 'nowrap',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    // marginTop: '2@vs',
  },
});

export default class IconButton extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    disabled: PropTypes.bool,
    style: PropTypes.any,
    iconName: PropTypes.string,
    iconType: PropTypes.oneOf(['Ionicons', 'Material', 'FontAwesome', 'FontAwesome5']),
    iconSize: PropTypes.number,
    iconColor: PropTypes.string,
    iconParams: PropTypes.any,
    width: PropTypes.number,
    height: PropTypes.number,
    children: PropTypes.object,
    transparent: PropTypes.bool,
  };

  static defaultProps = {
    onPress: () => {},
    disabled: false,
    style: {},
    iconName: 'ion-md-person',
    iconType: 'Ionicons',
    iconSize: Screen.scale(48),
    iconColor: 'black',
    iconParams: {},
    width: Screen.scale(48),
    height: Screen.scale(48),
    children: null,
    transparent: false,
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.btnClick = false;
  }

  handleOnPress = () => {
    const { onPress, disabled } = this.props;
    if (!disabled) {
      if (!this.btnClick) {
        this.btnClick = true;
        if (onPress) {
          onPress();
        }
        setTimeout(() => {
          this.btnClick = false;
        }, 200);
      }
    }
  };

  render() {
    const {
      style,
      iconName,
      iconType,
      iconSize,
      iconColor,
      iconParams,
      width,
      height,

      disabled,
      children,
    } = this.props;
    const getIcon = () => {
      switch (iconType) {
        case 'Ionicons': {
          return (
            <Ionicons name={iconName} size={iconSize} color={iconColor} {...iconParams} />
          );
        }
        case 'Material': {
          return (
            <MaterialIcons
              name={iconName}
              size={iconSize}
              color={iconColor}
              {...iconParams}
            />
          );
        }
        case 'FontAwesome': {
          return (
            <FontAwesome
              name={iconName}
              size={iconSize}
              color={iconColor}
              {...iconParams}
            />
          );
        }
        case 'FontAwesome5': {
          return (
            <FontAwesome5
              name={iconName}
              size={iconSize}
              color={iconColor}
              {...iconParams}
            />
          );
        }
        default:
          return <Text>{iconName}</Text>;
      }
    };
    return (
      <TouchableOpacity
        style={[styles.button, height, width, style]}
        onPress={this.handleOnPress}
        activeOpacity={disabled ? 1 : 0.2}
      >
        {getIcon()}
        {children}
      </TouchableOpacity>
    );
  }
}
