import React from 'react';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import { ActivityIndicator, View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Screen, ScaledSheet } from '@ublocks-react-native/helper';

const styles = ScaledSheet.create({
  loadingCoverWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContent: {
    position: 'absolute',
    width: Screen.width,
    height: Screen.height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    zIndex: Number.MAX_SAFE_INTEGER,
  },
  loadingCover: {
    width: Screen.scale(100),
    height: Screen.scale(100),
    borderRadius: Screen.scale(10),
    backgroundColor: 'rgba(10,10,10,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    zIndex: Number.MAX_SAFE_INTEGER,
  },
  largeLoadingCover: {
    width: 'auto',
    height: 'auto',
    minWidth: Screen.scale(100),
    minHeight: Screen.scale(120),
  },
  txtLoadingMessage: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginHorizontal: Screen.scale(16),
  },
});

const BACKGROUND_COLOR = 'rgba(100,100,100,0.5)';
const BACKGROUND_COLOR_DARK = 'rgba(20,20,20,0.5)';

export default class LoadingIndicator extends React.PureComponent {
  static propTypes = {
    text: PropTypes.string,
    open: PropTypes.bool,
    cover: PropTypes.bool,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  static defaultProps = {
    text: '',
    open: false,
    cover: true,
    width: Screen.width,
    height: Screen.height,
  };

  renderIndicator = () => {
    const { text, cover, width, height } = this.props;
    return (
      <Animatable.View
        style={[
          styles.loadingContent,
          { width, height },
          !cover && { backgroundColor: BACKGROUND_COLOR_DARK },
        ]}
        animation="fadeInDown"
        duration={250}
      >
        <View
          style={[
            styles.loadingCoverWrapper,
            cover && styles.loadingCover,
            text && styles.largeLoadingCover,
          ]}
        >
          <ActivityIndicator size="large" color={'white'} />
          {typeof text === 'string' && text.length > 0 && (
            <Text style={styles.txtLoadingMessage}>{text}</Text>
          )}
        </View>
      </Animatable.View>
    );
  };

  renderLinearGradient = () => {
    const { width, height } = this.props;
    return (
      <LinearGradient
        style={[styles.loadingContent, { width, height }]}
        colors={[BACKGROUND_COLOR, '#ffffff00']}
        start={{ x: 0, y: 0.9 }}
        end={{ x: 0, y: 1 }}
      >
        {this.renderIndicator()}
      </LinearGradient>
    );
  };

  render() {
    const { cover, open } = this.props;
    return open && (cover ? this.renderLinearGradient() : this.renderIndicator());
  }
}
