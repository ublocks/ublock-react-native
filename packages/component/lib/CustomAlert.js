import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import DropDownAlert from 'react-native-dropdownalert';

import { Screen, ScaledSheet } from '@ublocks-react-native/helper';

const styles = ScaledSheet.create({
  titleStyle: {
    fontSize: Screen.scale(16),
    textAlign: 'left',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'transparent',
    ...Platform.select({
      android: {},
    }),
  },
  messageStyle: {
    fontSize: Screen.scale(14),
    textAlign: 'left',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'transparent',
  },
});

const COLORS = {
  GREEN: '#32A54A',
  ORANGE: '#cd853f',
  BLUE: '#2B73B6',
  RED: '#cc3232',
};

export default class CustomAlert extends Component {
  alert = null;

  static propTypes = {
    open: PropTypes.bool,
    closeInterval: PropTypes.number,
    replaceEnabled: PropTypes.bool,
    showCancel: PropTypes.bool,
    titleStyle: PropTypes.any,
    messageStyle: PropTypes.any,
    infoColor: PropTypes.string,
    warnColor: PropTypes.string,
    errorColor: PropTypes.string,
    successColor: PropTypes.string,
    onTap: PropTypes.func,
    onClose: PropTypes.func,
    onCancel: PropTypes.func,
    getRef: PropTypes.func,
  };

  static defaultProps = {
    open: false,
    closeInterval: 6000,
    replaceEnabled: true,
    showCancel: false,
    titleStyle: {},
    messageStyle: {},
    infoColor: COLORS.BLUE,
    warnColor: COLORS.ORANGE,
    errorColor: COLORS.RED,
    successColor: COLORS.GREEN,
    onTap: undefined,
    onClose: undefined,
    onCancel: undefined,
    getRef: undefined,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      open,
      closeInterval,
      replaceEnabled,
      showCancel,
      titleStyle,
      messageStyle,
      infoColor,
      warnColor,
      errorColor,
      successColor,
      onTap,
      onClose,
      onCancel,
      getRef,
      ...props
    } = this.props;
    return (
      <DropDownAlert
        {...props}
        ref={(r) => {
          this.alert = r;
          if (getRef) {
            getRef(r);
          }
        }}
        onClose={onClose}
        showCancel={showCancel}
        closeInterval={closeInterval}
        replaceEnabled={replaceEnabled}
        titleStyle={Object.assign({}, styles.titleStyle, titleStyle)}
        messageStyle={Object.assign({}, styles.messageStyle, messageStyle)}
        infoColor={infoColor}
        warnColor={warnColor}
        errorColor={errorColor}
        successColor={successColor}
      />
    );
  }
}
