import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, ViewPropTypes, StatusBar, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';

import IconButton from './IconButton';

import { Screen, ScaledSheet } from '@ublocks-react-native/helper';

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: '15@s',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 'auto',
    flex: 0,
    width: '100%',
  },
  titleText: {
    fontSize: '18@s',
    fontWeight: '600',
    letterSpacing: -0.43,
    textAlign: 'center',
    color: 'black',
    justifyContent: 'center',
  },
  navButton: {
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
    flex: 1,
  },
  navText: {
    color: 'white',
    fontSize: '16@s',
    justifyContent: 'center',
    marginRight: '8@s',
    marginLeft: '8@s',
  },
  centerBlock: {
    height: '100%',
    flex: 7,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  leftBlock: {
    height: '100%',
    flex: 1.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  rightBlock: {
    height: '100%',
    flex: 1.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  icon: {
    padding: '3@s',
  },
});

class NavBar extends Component {
  static propTypes = {
    appRoute: PropTypes.object.isRequired,
    numberOfLines: PropTypes.number,
    leftComponent: PropTypes.any,
    rightComponent: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    titleComponent: PropTypes.any,
    title: PropTypes.string,
    titleColor: PropTypes.string,
    titleStyle: PropTypes.any,
    style: ViewPropTypes.style,
    statusbarStyle: PropTypes.oneOf(['default', 'light-content', 'dark-content']),
    statusbarHidden: PropTypes.bool,
    statusbarAnimated: PropTypes.bool,
    statusbarTranslucent: PropTypes.bool,
    statusbarBackgroundColor: PropTypes.string,

    backIconType: PropTypes.string,
    backIconSize: PropTypes.number,
    backIconName: PropTypes.string,
    backIconColor: PropTypes.string,
    backIconText: PropTypes.string,
    nextIconText: PropTypes.string,
    nextIconType: PropTypes.string,
    nextIconSize: PropTypes.number,
    nextIconName: PropTypes.string,
    nextIconColor: PropTypes.string,
  };

  static defaultProps = {
    title: '',
    titleStyle: {},
    titleColor: 'black',
    leftComponent: 'BACK',
    rightComponent: null,
    titleComponent: null,
    numberOfLines: 1,
    style: {},
    statusbarStyle: 'default',
    statusbarHidden: false,
    statusbarAnimated: true,
    statusbarTranslucent: false,
    statusbarBackgroundColor: 'black',
    backIconType: 'Ionicons',
    backIconSize: 26,
    backIconColor: 'white',
    backIconName: 'ios-arrow-back',
    backIconText: 'Back',
    nextIconText: 'Next',
    nextIconType: 'Ionicons',
    nextIconSize: 26,
    nextIconColor: 'white',
    nextIconName: 'ios-arrow-forward',
  };

  onMenuPress = () => {
    const {
      appRoute: {
        scene: { drawer },
      },
    } = this.props;
    if (drawer === 'DrawerClose') {
      Actions.drawerOpen();
    } else {
      Actions.drawerClose();
    }
  };

  renderLeftComponent = (leftComponent) => {
    const {
      backIconType,
      backIconText,
      backIconSize,
      backIconName,
      backIconColor,
      appRoute,
    } = this.props;
    // console.log('appRoute=>', appRoute);
    if (typeof leftComponent === 'string') {
      switch (leftComponent.toUpperCase()) {
        case 'BACK':
          if (Actions.prevScene || appRoute.prevRoute) {
            return this.renderLeftBack({
              backIconType,
              backIconSize,
              backIconName,
              backIconText,
              backIconColor,
            });
          }
          return null;
        case 'DRAWER':
          return this.renderDrawerIcon();
        default:
          return null;
      }
    }
    return leftComponent;
  };

  renderIconText = ({ color, text }) =>
    Platform.OS === 'ios' || Platform.OS === 'android' ? (
      <Text style={[styles.navText, { color }]}>{text}</Text>
    ) : null;

  renderRightComponent = (rightComponent) => {
    const {
      nextIconText,
      nextIconType,
      nextIconSize,
      nextIconName,
      nextIconColor,
    } = this.props;
    if (typeof rightComponent === 'string') {
      switch (rightComponent.toUpperCase()) {
        case 'NEXT':
          return this.renderRightNext({
            nextIconText,
            nextIconType,
            nextIconSize,
            nextIconName,
            nextIconColor,
          });
        default:
          return null;
      }
    }
    return rightComponent;
  };

  renderLeftBack = ({
    backIconType,
    backIconSize,
    backIconName,
    backIconText,
    backIconColor,
  }) => (
    <IconButton
      onPress={Actions.pop}
      style={styles.navButton}
      iconName={backIconName}
      iconType={backIconType}
      iconSize={backIconSize}
      iconColor={backIconColor}
    >
      {this.renderIconText({
        color: backIconColor,
        text: backIconText,
      })}
    </IconButton>
  );

  renderRightNext = ({
    nextIconText,
    nextIconType,
    nextIconSize,
    nextIconName,
    nextIconColor,
  }) => [
    this.renderIconText({
      color: nextIconColor,
      text: nextIconText,
    }),
    <IconButton
      onPress={Actions.pop}
      style={styles.navButton}
      iconName={nextIconName}
      iconType={nextIconType}
      iconSize={nextIconSize}
      iconColor={nextIconColor}
    />,
  ];

  renderDrawerIcon = () => (
    <IconButton
      iconName="bars"
      iconType="FontAwesome5"
      iconSize={Screen.scale(32)}
      style={styles.navButton}
      onPress={Actions.drawerOpen}
    />
  );

  render() {
    const {
      title,
      titleColor,
      titleStyle,
      titleComponent,
      rightComponent,
      leftComponent,
      statusbarStyle,
      statusbarHidden,
      statusbarAnimated,
      statusbarTranslucent,
      statusbarBackgroundColor,
    } = this.props;
    return (
      <View style={[styles.container, this.props.style]}>
        <StatusBar
          hidden={statusbarHidden}
          barStyle={statusbarStyle}
          backgroundColor={statusbarBackgroundColor}
          animated={statusbarAnimated}
          translucent={statusbarTranslucent}
        />
        <View style={styles.leftBlock}>{this.renderLeftComponent(leftComponent)}</View>
        <View style={styles.centerBlock}>
          {titleComponent || (
            <Text
              numberOfLines={this.props.numberOfLines}
              style={[styles.titleText, { color: titleColor }, titleStyle]}
            >
              {title}
            </Text>
          )}
        </View>
        <View style={styles.rightBlock}>{this.renderRightComponent(rightComponent)}</View>
      </View>
    );
  }
}

export default NavBar;

// connect(
//   (state, props) => ({
//     appRoute: state.appRoute,
//   }),
//   (dispatch) => bindActionCreators({}, dispatch),
// )(NavBar);
