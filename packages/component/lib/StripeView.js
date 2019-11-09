import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Screen, ScaledSheet } from '@ublocks-react-native/helper';

import RoundButton from './RoundButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stripeWrapper: {
    width: '100%',
    paddingLeft: 27,
    paddingRight: 27,
    flexDirection: 'row-reverse',
    flex: 1,
    opacity: 1,
  },
  stripeRight: {
    flex: 1,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  stripeLeft: {
    flex: 1,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  stripeLight: {
    backgroundColor: 'white',
  },
  stripeDark: {
    backgroundColor: 'gray',
  },
});

export const Stripe = ({ rightComponent, leftComponent, style, disabled, onPress }) => (
  <RoundButton
    onPress={onPress}
    disabled={typeof onPress !== 'function'}
    style={[styles.stripeWrapper, style]}
    transparent
  >
    <View style={styles.stripeRight}>{rightComponent}</View>
    <View style={styles.stripeLeft}>{leftComponent}</View>
  </RoundButton>
);
Stripe.propTypes = {
  rightComponent: PropTypes.object,
  leftComponent: PropTypes.object,
  style: PropTypes.any,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
};
Stripe.defaultProps = {
  rightComponent: null,
  leftComponent: null,
  style: {},
  disabled: false,
  onPress: null,
};

export const StripeView = ({
  stripes,
  stripeHeight,
  stripeLightColor,
  stripeDarkColor,
  style,
  stripStyle,
  disabled,
}) => (
  <View style={[styles.container, style]}>
    {stripes.map((item, index) => (
      <Stripe
        key={index}
        disabled={disabled}
        leftComponent={item.leftComponent}
        rightComponent={item.rightComponent}
        onPress={item.onPress}
        style={[
          index % 2 === 0
            ? {
                ...styles.stripeLight,
                backgroundColor: stripeLightColor,
              }
            : {
                ...styles.stripeDarkColor,
                backgroundColor: stripeDarkColor,
              },
          { height: Screen.verticalScale(stripeHeight) },
          stripStyle,
        ]}
      />
    ))}
  </View>
);

StripeView.propTypes = {
  stripes: PropTypes.array.isRequired,
  stripeHeight: PropTypes.number,
  stripeLightColor: PropTypes.string,
  stripeDarkColor: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  stripStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.number]),
};

StripeView.defaultProps = {
  stripeHeight: 36,
  stripeLightColor: 'white',
  stripeDarkColor: 'gray',
  style: {},
  stripStyle: {},
};

export default StripeView;
