import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Screen, ScaledSheet } from '@ublocks-react-native/helper';

import RoundButton from './RoundButton';

const styles = ScaledSheet.create({
  button: {
    flexWrap: 'nowrap',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    padding: '4@s',
    // marginTop: '2@vs',
  },
});

export default class IconButton extends React.PureComponent {
  static propTypes = {
    onPress: PropTypes.func,
    disabled: PropTypes.bool,
    style: PropTypes.any,
    iconName: PropTypes.string.isRequired,
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
    iconSize: 24,
    iconColor: 'black',
    iconParams: {},
    width: 32,
    height: 32,
    children: null,
    transparent: false,
  };

  render() {
    const {
      onPress,
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
    const scaledSize = Screen.scale(iconSize);
    const getIcon = () => {
      switch (iconType) {
        case 'Ionicons': {
          return (
            <Ionicons
              name={iconName}
              size={scaledSize}
              color={iconColor}
              {...iconParams}
            />
          );
        }
        case 'Material': {
          return (
            <MaterialIcons
              name={iconName}
              size={scaledSize}
              color={iconColor}
              {...iconParams}
            />
          );
        }
        case 'FontAwesome': {
          return (
            <FontAwesome
              name={iconName}
              size={scaledSize}
              color={iconColor}
              {...iconParams}
            />
          );
        }
        case 'FontAwesome5': {
          return (
            <FontAwesome5
              name={iconName}
              size={scaledSize}
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
      <RoundButton
        {...this.props}
        style={[styles.button, style]}
        onPress={onPress}
        height={height}
        width={width}
        disabled={disabled}
        transparent
      >
        {getIcon()}
        {children}
      </RoundButton>
    );
  }
}
