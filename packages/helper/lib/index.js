export { ScaledSheet } from 'react-native-size-matters/extend';
export { default as Screen } from './Screen';

export const isJSON = (str) => {
  const { isError, attempt } = require('lodash');
  return !isError(attempt(JSON.parse, str));
};

export const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};
