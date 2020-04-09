import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Colors } from 'App/Theme';
import { Screen, StyleSheet } from 'App/Helpers';

const styles = StyleSheet.create({
  separator: {
    marginTop: '20@vs',
    marginBottom: '15@vs',
    borderStyle: 'solid',
    borderBottomColor: Colors.black,
    borderBottomWidth: '1@vs',
    height: '1@vs',
    width: 200,
    alignItems: 'center',
    alignSelf: 'center',
  },
  fullWidth: {
    width: Screen.width,
  },
});

const Separator = ({ fullWidth, width }) => (
  <View style={[styles.separator, fullWidth && styles.fullWidth, width && { width }]} />
);

Separator.propTypes = {
  fullWidth: PropTypes.bool,
  width: PropTypes.number,
};

Separator.defaultProps = {
  fullWidth: false,
  width: 200,
};

export default Separator;
