import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, View } from 'react-native';

import { Screen, ScaledSheet } from '@ublocks-react-native/helper';

const styles = ScaledSheet.create({
  loadingContent: {
    position: 'absolute',
    width: Screen.width,
    height: Screen.height,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'gray',
    // opacity: 0.1,
    zIndex: 100,
  },
  loadingCover: {
    width: Screen.scale(100),
    height: Screen.scale(100),
    borderRadius: Screen.scale(10),
    backgroundColor: 'rgba(100,100,100,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    zIndex: 101,
  },
});

export default class LoadingIndicator extends Component {
  static propTypes = {
    open: PropTypes.bool,
  };

  static defaultProps = {
    open: false,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { open } = this.props;
    return (
      <View style={[styles.loadingContent, open ? {} : { height: 0, width: 0 }]}>
        <View style={[styles.loadingCover, open ? {} : { height: 0, width: 0 }]}>
          {open ? <ActivityIndicator size="large" color="white" /> : null}
        </View>
      </View>
    );
  }
}
