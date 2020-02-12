import React from 'react';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import {
  TouchableWithoutFeedback,
  ActivityIndicator,
  BackHandler,
  View,
  Text,
} from 'react-native';
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
    // backgroundColor: 'transparent',
    backgroundColor: BACKGROUND_COLOR,
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

let countTimer = null;

export default class LoadingIndicator extends React.PureComponent {
  static propTypes = {
    open: PropTypes.bool,
    cover: PropTypes.bool,
    text: PropTypes.string,
    countdown: PropTypes.bool,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onLongPress: PropTypes.func,
  };

  static defaultProps = {
    text: '',
    cover: true,
    open: false,
    countdown: false,
    width: Screen.width,
    height: Screen.height,
    onLongPress: () => {},
  };

  static getDerivedStateFromProps(props, state) {
    if (!props.open && state.count !== 0) {
      return {
        count: 0,
      };
    }
    return null;
  }

  state = {
    count: 0,
  };

  componentDidMount() {
    // Android "Back" button trigger event listener
    if (Platform.OS === 'android') {
      this.backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        this.onAndroidBackButtonPressed,
      );
    }

    countTimer = setInterval(() => {
      this.setState((state) => ({
        count: state.count + 1,
      }));
    }, 1000);
  }

  componentWillUnmount() {
    // Android "Back" button trigger event listener
    if (Platform.OS === 'android') {
      this.backHandler.remove();
    }
  }

  onAndroidBackButtonPressed = () => {
    return true;
  };

  renderIndicator = () => {
    const { text, cover, width, height, countdown } = this.props;
    const { count } = this.state;
    return (
      <Animatable.View
        style={[
          styles.loadingContent,
          { width, height },
          !cover && { backgroundColor: BACKGROUND_COLOR_DARK },
        ]}
        animation={cover ? 'fadeInDown' : 'fadeIn'}
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
          {countdown && <Text style={styles.txtLoadingMessage}>{count}</Text>}
        </View>
      </Animatable.View>
    );
  };

  renderLinearGradient = () => {
    const { width, height, onLongPress } = this.props;
    return (
      <TouchableWithoutFeedback onLongPress={onLongPress}>
        <LinearGradient
          style={[styles.loadingContent, { width, height }]}
          colors={[BACKGROUND_COLOR, '#ffffff00']}
          // start={{ x: 0, y: 1 }}
          // end={{ x: 0, y: 1 }}
        >
          {this.renderIndicator()}
        </LinearGradient>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    const { cover, open } = this.props;
    return open && (cover ? this.renderLinearGradient() : this.renderIndicator());
  }
}
