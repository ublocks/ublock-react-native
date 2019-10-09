/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
} from 'react-native';
import {
  GaugeProgress,
  // AnimatedGaugeProgress as GaugeProgress,
} from 'react-native-simple-gauge';

import {
  Screen,
  ScaledSheet,
} from '../utils';

const styles = ScaledSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignContent: 'center',
    // alignSelf: 'center',
    // alignItems: 'center',
    // textAlign: 'center',
  },
  image: {
  },
});


export default class CircleGauge extends React.Component {
  meter = null;

  static propTypes = {
    // button props
    onPress: PropTypes.func,
    style: PropTypes.any,
    // lottie props
    gaugeStyle: PropTypes.any,
    backgroundColor: PropTypes.string,
    tintColor: PropTypes.string,
    strokeCap: PropTypes.oneOf(['circle', 'butt', 'round', 'square']),
    cropDegree: PropTypes.number,
    rotation: PropTypes.number,
    size: PropTypes.number,
    width: PropTypes.number,
    // eslint-disable-next-line react/no-unused-prop-types
    value: PropTypes.number.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    max: PropTypes.number,
    stroke: PropTypes.array,
    children: PropTypes.object,
    friction: PropTypes.number,
    tension: PropTypes.number,
    surfaceWidth: PropTypes.number,
    surfaceHeight: PropTypes.number,
  }

  static defaultProps = {
    onPress: null,
    style: {},
    gaugeStyle: {},
    size: Screen.scale(200),
    surfaceWidth: Screen.scale(200),
    surfaceHeight: Screen.verticalScale(200),
    width: Screen.scale(15),
    rotation: 90,
    cropDegree: 70,
    tintColor: '#4682b4',
    backgroundColor: '#b0c4de',
    stroke: [2, 2],
    strokeCap: 'circle',
    max: 100,
    children: null,
    friction: 10,
    tension: 7,
  }

  constructor(props) {
    super(props);
    this.state = {
      progress: 0, //new Animated.Value(0),
    };
  }

  componentDidMount() {
    this.setMeterValue(this.props);
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setMeterValue(nextProps);
  // }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.value !== prevState.value
      || nextProps.max !== prevState.max
    ) {
      const value = nextProps.value > nextProps.max
        ? nextProps.max
        : nextProps.value;
      return {
        value: nextProps.value,
        max: nextProps.max,
        progress: parseInt(100 * (value / nextProps.max), 10),
      };
    }
    return null;
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   const { value } = this.props;
  //   const { value: nextValue } = nextProps;
  //   if (value !== nextValue) {
  //     return isFinite(nextValue);
  //   }
  //   return false;
  // }

  setMeterValue = (props) => {
    const {
      value,
      max,
    } = props;
    this.setState({
      progress: parseInt(100 * (value / max), 10),
    });
  }

  render() {
    const {
      // button props
      onPress,
      style: buttonStyle,
      // meter props
      size,
      width,
      rotation,
      cropDegree,
      tintColor,
      backgroundColor,
      stroke,
      strokeCap,
      children,
      gaugeStyle,
      friction,
      tension,
      surfaceWidth,
      surfaceHeight,
    } = this.props;
    const {
      progress,
    } = this.state;
    return (
      <TouchableOpacity
        style={[styles.container, buttonStyle]}
        disabled={!onPress}
        onPress={onPress}
      >
        <GaugeProgress
          ref={(ref) => { this.meter = ref; }}
          backgroundColor={backgroundColor}
          style={gaugeStyle}
          cropDegree={cropDegree}
          strokeCap={strokeCap}
          tintColor={tintColor}
          rotation={rotation}
          fill={progress}
          stroke={stroke}
          width={width}
          size={size}
          surfaceWidth={surfaceWidth}
          surfaceHeight={surfaceHeight}
          tension={tension}
          friction={friction}
        >
          {children}
        </GaugeProgress>
      </TouchableOpacity>
    );
  }
}
