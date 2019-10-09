// import DropdownAlert from 'react-native-dropdownalert';

// return 
// <DropdownAlert
//   replaceEnabled
//   closeInterval={6000}
//   showCancel
//   ref={ref => (this.dropdown = ref)}
//   onClose={async ({ action }) => {
//     if (action === 'tap') {
//       const {
//         desc,
//         type,
//         service,
//         title,
//         actionSubject,
//         actionTime,
//         actionType,
//         attachData,
//       } = alert;
//       handleNotify.action({
//         type,
//         title,
//         service,
//         updateNotifyAction: this.props.updateNotifyAction,
//         actionSubject,
//         actionTime,
//         message: desc,
//         actionType,
//         attachData,
//       });
//     }
//   }}
//   infoColor={colors.mainYellow}
//   updateStatusBar={Platform.OS === 'ios'}
//   titleStyle={{
//     fontSize: Screen.moderateScale(16),
//     textAlign: 'left',
//     fontWeight: 'bold',
//     color: 'white',
//     backgroundColor: 'transparent',
//     ...Platform.select({
//       android: {},
//     }),
//   }}
//   messageStyle={{
//     fontSize: Screen.moderateScale(14),
//     textAlign: 'left',
//     fontWeight: 'bold',
//     color: 'white',
//     backgroundColor: 'transparent',
//   }}
// />
