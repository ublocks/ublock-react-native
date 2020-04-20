import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, ViewPropTypes, StatusBar, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';

import IconButton from './IconButton';

import { Screen, ScaledSheet } from '@ublocks-react-native/helper';

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'center',
    // height: 'auto',
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
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  leftBlock: {
    height: '100%',
    flex: 0.25,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  rightBlock: {
    height: '100%',
    flex: 0.25,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  icon: {
    padding: '3@s',
  },
});

class NavBar extends React.PureComponent {
  static propTypes = {
    drawerStatus: PropTypes.string,
    numberOfLines: PropTypes.number,
    leftComponent: PropTypes.any,
    rightComponent: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    titleComponent: PropTypes.any,
    title: PropTypes.string,
    titleColor: PropTypes.string,
    titleStyle: PropTypes.any,
    style: ViewPropTypes.style,
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    statusBar: PropTypes.bool,
    statusbarStyle: PropTypes.oneOf([
      'default',
      'light-content',
      'dark-content',
      undefined,
    ]),
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

    // route props from RNRF
    routeName: PropTypes.string,
    initialRouteName: PropTypes.string,
    initial: PropTypes.bool,
  };

  static defaultProps = {
    drawerStatus: 'DrawerClose',
    title: '',
    titleStyle: {},
    titleColor: 'black',
    leftComponent: 'BACK',
    rightComponent: null,
    titleComponent: null,
    numberOfLines: 1,
    style: {},
    height: Screen.scale(48),
    statusBar: false,
    statusbarStyle: undefined,
    statusbarHidden: false,
    statusbarAnimated: true,
    statusbarTranslucent: false,
    statusbarBackgroundColor: 'black',
    backIconType: 'Ionicons',
    backIconSize: 26,
    backIconColor: 'dodgerblue',
    backIconName: 'ios-arrow-back',
    backIconText: 'Back',
    nextIconText: 'Next',
    nextIconType: 'Ionicons',
    nextIconSize: 26,
    nextIconColor: 'dodgerblue',
    nextIconName: 'ios-arrow-forward',

    // route props from RNRF
    routeName: '',
    initialRouteName: '',
    initial: false,
  };

  onMenuPress = () => {
    const { drawerStatus } = this.props;
    if (drawerStatus === 'DrawerClose') {
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
      initial,
    } = this.props;
    if (typeof leftComponent === 'string') {
      switch (leftComponent.toUpperCase()) {
        case 'BACK':
          if (Actions.prevScene && !initial) {
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
      onPress={() => Actions.pop()}
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
      onPress={() => Actions.pop()}
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
      onPress={() => Actions.drawerOpen()}
    />
  );

  render() {
    const {
      title,
      titleColor,
      titleStyle,
      titleComponent,
      height,
      rightComponent,
      leftComponent,
      statusBar,
      statusbarStyle,
      statusbarHidden,
      statusbarAnimated,
      statusbarTranslucent,
      statusbarBackgroundColor,
      routeName,
      initialRouteName,
    } = this.props;
    return (
      <View style={[styles.container, this.props.style, { height }]}>
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
              {title || routeName || initialRouteName}
            </Text>
          )}
        </View>
        <View style={styles.rightBlock}>{this.renderRightComponent(rightComponent)}</View>
      </View>
    );
  }
}

export default NavBar;
