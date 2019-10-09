/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';
import {
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  Text,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { Screen, ScaledSheet } from '@ublocks-react-native/helper';

const styles = ScaledSheet.create({
  container: {
    flexWrap: 'nowrap',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  iconWrapper: {
    justifyContent: 'center',
    marginLeft: Screen.scale(16),
    marginRight: Screen.scale(8),
  },
  textInput: {
    // backgroundColor: 'gray',
    flex: 1,
    paddingLeft: Screen.scale(8),
    // width: '90%',
  },
  showPwdButton: {
    justifyContent: 'center',
    marginLeft: Screen.scale(8),
    marginRight: Screen.scale(16),
  },
});

export default class IconTextInput extends React.Component {
  static propTypes = {
    // view props
    style: PropTypes.any,
    keyboardAvoiding: PropTypes.bool,
    backgroundColor: PropTypes.string,
    borderRadius: PropTypes.number,
    height: PropTypes.number,
    borderColor: PropTypes.string,
    borderWidth: PropTypes.number,
    // input props
    inputStyle: PropTypes.any,
    fontColor: PropTypes.string,
    fontFamily: PropTypes.string,
    secureTextEntry: PropTypes.bool,
    // icon props
    iconType: PropTypes.oneOf([
      'None',
      'Ionicons',
      'Material',
      'FontAwesome',
      'FontAwesome5',
    ]),
    iconName: PropTypes.string,
    iconSize: PropTypes.number,
    iconColor: PropTypes.string,
    iconParams: PropTypes.any,
    iconStyle: PropTypes.any,
  };

  static defaultProps = {
    // view props
    style: {},
    keyboardAvoiding: true,
    backgroundColor: 'white',
    borderRadius: Screen.verticalScale(5),
    height: Screen.verticalScale(40),
    borderColor: 'gray',
    borderWidth: Screen.scale(0),
    // input props
    inputStyle: {},
    fontColor: 'gray',
    fontFamily: undefined,
    secureTextEntry: false,
    // icon props
    iconType: 'None',
    iconName: '',
    iconSize: Screen.scale(22),
    iconColor: 'gray',
    iconParams: {},
    iconStyle: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      isShowOriginPassword: false,
    };
  }

  componentDidMount() {}

  renderIcon = () => {
    const { iconType, iconName, iconSize, iconColor, iconParams, iconStyle } = this.props;
    switch (iconType) {
      case 'None': {
        return null;
      }
      case 'Ionicons': {
        return (
          <Ionicons
            style={[styles.icon, iconStyle]}
            name={iconName}
            size={iconSize}
            color={iconColor}
            {...iconParams}
          />
        );
      }
      case 'Material': {
        return (
          <MaterialIcons
            style={[styles.icon, iconStyle]}
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
            style={[styles.icon, iconStyle]}
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
            style={[styles.icon, iconStyle]}
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

  onShowPwdPress = () => {
    this.setState((state) => ({
      isShowOriginPassword: !state.isShowOriginPassword,
    }));
  };

  render() {
    const {
      style,
      keyboardAvoiding,
      fontColor,
      fontFamily,
      backgroundColor,
      height,
      borderColor,
      borderWidth,
      inputStyle,
      secureTextEntry,
      borderRadius,
      iconType,
      iconName,
      iconSize,
      iconColor,
      iconParams,
      iconStyle,
      ...props
    } = this.props;
    const { isShowOriginPassword } = this.state;
    return (
      <KeyboardAvoidingView
        enable={keyboardAvoiding}
        style={[
          styles.container,
          {
            borderRadius,
            backgroundColor,
            borderColor,
            borderWidth,
            height,
          },
          style,
        ]}
      >
        {iconType !== 'None' && (
          <View style={styles.iconWrapper}>{this.renderIcon()}</View>
        )}
        <TextInput
          {...props}
          secureTextEntry={!isShowOriginPassword && secureTextEntry}
          style={[
            styles.textInput,
            {
              color: fontColor,
              fontFamily,
              borderRadius,
              height,
            },
            inputStyle,
          ]}
        />
        {secureTextEntry && (
          <TouchableOpacity style={styles.showPwdButton} onPress={this.onShowPwdPress}>
            <FontAwesome
              style={[styles.icon, iconStyle]}
              type="Ionicons"
              name="eye"
              size={iconSize}
              color={iconColor}
              {...iconParams}
            />
          </TouchableOpacity>
        )}
      </KeyboardAvoidingView>
    );
  }
}
