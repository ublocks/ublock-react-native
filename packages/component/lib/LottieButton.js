/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';
import { Animated, Easing, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';

import RoundButton from './RoundButton';

export default class LottieButton extends React.Component {
  lottie = null;

  static propTypes = {
    // button props
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    onPressIn: PropTypes.func,
    onPressOut: PropTypes.func,
    delayLongPress: PropTypes.number,
    delayPressIn: PropTypes.number,
    delayPressOut: PropTypes.number,
    style: PropTypes.any,
    // lottie props
    speed: PropTypes.number,
    loop: PropTypes.bool,
    autoPlay: PropTypes.bool,
    autoSize: PropTypes.bool,
    source: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    animationStyle: PropTypes.any,
    duration: PropTypes.number,
    onAnimationFinish: PropTypes.func,
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
    style: {},
    // lottie props
    speed: 1,
    source: '',
    loop: true,
    autoPlay: true,
    autoSize: true,
    animationStyle: {},
    duration: undefined,
    onAnimationFinish: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      progress: undefined,
      isPlaying: props.autoPlay,
    };
  }

  componentDidMount() {
    const { duration } = this.props;
    if (duration) {
      this.setState({
        progress: new Animated.Value(0),
      });
      Animated.timing(this.state.progress, {
        easing: Easing.linear,
        toValue: 1,
        duration,
      }).start();
    }
  }

  play = (startFrame, endFrame) => {
    this.lottie.play(startFrame, endFrame);
    this.setState({ isPlaying: true });
  };

  reset = (frame) => {
    this.lottie.reset(frame);
    this.setState({ isPlaying: false });
  };

  isPlaying = () => this.state.isPlaying;

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
      style: buttonStyle,
      // lottie props
      source,
      speed,
      loop,
      autoPlay,
      autoSize,
      animationStyle,
      duration,
      onAnimationFinish,
    } = this.props;
    return (
      <RoundButton
        {...this.props}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onLongPress={onLongPress}
        delayPressIn={delayPressIn}
        delayPressOut={delayPressOut}
        delayLongPress={delayLongPress}
        // style={buttonStyle}
        backgroundColor="translucent"
        borderColor="translucent"
        borderRadius={0}
        style={[
          // {
          //   // flex: 1,
          //   paddingLeft: 0,
          //   paddingRight: 0,
          //   height: 'auto',
          //   borderWidth: 0,
          //   justifyContent: 'center',
          //   alignItems: 'center',
          //   backgroundColor: 'translucent',
          // },
          buttonStyle,
        ]}
        translucent
        noRound
      >
        <LottieView
          ref={(lottie) => {
            this.lottie = lottie;
          }}
          source={source}
          onAnimationFinish={onAnimationFinish}
          progress={this.state.progress}
          style={animationStyle}
          autoPlay={autoPlay}
          autoSize={autoSize}
          speed={speed}
          loop={loop}
        />
      </RoundButton>
    );
  }
}
