import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
  },
  stripeListWrapper: {
    width: '100%',
    paddingLeft: 27,
    paddingRight: 27,
    flexDirection: 'row-reverse',
    height: 40,
  },
  stripeRight: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  stripeLeft: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  stripeLight: {
    backgroundColor: '#202a51',
  },
  stripeDark: {
    backgroundColor: '#121937',
  },
});

export const Stripe = ({
  rightComponent,
  leftComponent,
  style,
  disabled,
  onPress,
}) => (
  <TouchableOpacity onPress={onPress} disabled={disabled}>
    <View
      style={[
        styles.stripeListWrapper,
        style,
        { opacity: disabled ? 0.2 : 1 },
      ]}
    >
      <View style={styles.stripeRight}>
        {rightComponent}
      </View>
      <View style={styles.stripeLeft}>
        {leftComponent}
      </View>
    </View>
  </TouchableOpacity>
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
}) => (
  <View style={[styles.container, style]}>
    {stripes.map((item, index) => (
      <Stripe
        key={index}
        leftComponent={item[0]}
        rightComponent={item[1]}
        onPress={item[2]}
        style={[(index % 2 === 0)
          ? {
            ...styles.stripeLight,
            backgroundColor: stripeLightColor,
          }
          : {
            ...styles.stripeDarkColor,
            backgroundColor: stripeDarkColor,
          },
        { height: stripeHeight },
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
  stripStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
};
StripeView.defaultProps = {
  stripeHeight: 36,
  stripeLightColor: '#202a51',
  stripeDarkColor: '#121937',
  style: {},
  stripStyle: {},
};

export default {
  StripeView,
  Stripe,
};
