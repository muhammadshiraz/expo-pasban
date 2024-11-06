// utils/navigationHandler.js

const navigateToRoleBasedScreen = (roleId, navigation) => {
  // Check if the userId is 1 and navigate to AdminMenu
  if (roleId === '1') {
    navigation.navigate('AdminMenu');
  } else if (roleId === '3') {
    navigation.navigate('UserMenu');
  } else if (roleId === '16') {
    navigation.navigate('GSMMenu');
  } else {
    //navigation.navigate('Login');
  }
};

export default navigateToRoleBasedScreen;
