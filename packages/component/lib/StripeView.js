import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet, View } from 'react-native';

import RoundButton from './RoundButton';

const styles = StyleSheet.create({
  container: {},
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
    backgroundColor: 'white',
  },
  stripeDark: {
    backgroundColor: 'gray',
  },
  stripeButton: {
    opacity: 1,
  },
});

export const Stripe = ({
  rightComponent,
  leftComponent,
  style,
  disabled,
  onPress,
  btnStyle,
}) => (
  <RoundButton
    onPress={onPress}
    disabled={typeof onPress !== 'function'}
    transparent
    style={[styles.stripeButton, btnStyle]}
  >
    <View style={[styles.stripeListWrapper, style]}>
      <View style={styles.stripeRight}>{rightComponent}</View>
      <View style={styles.stripeLeft}>{leftComponent}</View>
    </View>
  </RoundButton>
);
Stripe.propTypes = {
  rightComponent: PropTypes.object,
  leftComponent: PropTypes.object,
  style: PropTypes.any,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
  btnStyle: PropTypes.object,
};
Stripe.defaultProps = {
  rightComponent: null,
  leftComponent: null,
  style: {},
  btnStyle: {},
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
  buttonStyle,
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
          { height: stripeHeight },
          stripStyle,
        ]}
        btnStyle={buttonStyle}
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
  stripeLightColor: 'white',
  stripeDarkColor: 'gray',
  style: {},
  stripStyle: {},
};

export default StripeView;
