import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import { Screen, ScaledSheet } from '@ublocks-react-native/helper';

const inline = {
  flexWrap: 'nowrap',
  flexDirection: 'row',
  alignItems: 'center',
  alignSelf: 'center',
  alignContent: 'center',
};
const styles = ScaledSheet.create({
  container: {
    width: '100%',
  },
  headWrapper: {
    ...inline,
    width: '100%',
  },
  bodyWrapper: {
    ...inline,
    width: '100%',
  },
});

export const Grid = ({ headStyle, bodyStyle, head, body, keyExtractor }) => (
  <View style={styles.container} key={keyExtractor}>
    <View style={[styles.headWrapper, headStyle]}>{head}</View>
    <View style={[styles.bodyWrapper, bodyStyle]}>{body}</View>
  </View>
);
Grid.propTypes = {
  headStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  bodyStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  head: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  body: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  keyExtractor: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.func]),
};
Grid.defaultProps = {
  headStyle: {},
  bodyStyle: {},
  head: null,
  body: null,
  keyExtractor: new Date().getTime(),
};

export const GridView = ({ items = [], style, keyExtractor }) => (
  <View key={keyExtractor} style={[styles.container, style]}>
    {items.map((e) => ({ key: new Date().getTime(), ...e }))}
  </View>
);
GridView.propTypes = {
  items: PropTypes.array.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
};
GridView.defaultProps = {
  style: {},
};

export default {
  GridView,
  Grid,
};
