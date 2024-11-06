import React, { useContext, useState, useEffect } from 'react';
import tw from 'tailwind-react-native-classnames';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TextComponent from '@components/TextComponent';
import { useNavigation, useRoute } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import IonIcons from '@expo/vector-icons/Ionicons';
import { ThemeContext } from '@context/ThemeContext';
import { logoutUser } from '@redux/actions/authActions';
import { clearAuthData } from '@utils/authStorage';
import { useDispatch, useSelector } from 'react-redux';
import LoadingIndicator from '@components/LoadingIndicator';

const Layout = ({
  children,
  title,
  type,
  dateFrom,
  dateTo,
  userType,
  layoutBgColor,
}) => {
  const [userName, setUserName] = useState('Guest'); // Initialize userName
  const [userRole, setUserRole] = useState('Guest'); // Initialize userRole
  //const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute(); // Get the current route
  const { getThemeColor } = useContext(ThemeContext);

  // Date formatting function
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  // Assuming dateFrom and dateTo are coming from props or state
  const formattedDateFrom = dateFrom ? formatDate(dateFrom) : '';
  const formattedDateTo = dateTo ? formatDate(dateTo) : '';

  const user = useSelector((state) => state.auth.user);

  // Function to determine if a tab is active
  const isActive = (screenName) => route.name === screenName;

  const backgroundColor = layoutBgColor || getThemeColor('background');

  // Function to fetch user data and set userName and userRole
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const authData = user; // Retrieve auth data (from AsyncStorage or Redux)
        if (authData) {
          // Set userName and userRole dynamically based on the retrieved authData
          setUserName(authData.username || 'Guest'); // Set userName dynamically from authData
          // Set userRole based on roleId from authData
          switch (authData.roleId) {
            case '1': // Admin
              setUserRole('Admin');
              break;
            case '3': // User
              setUserRole('User');
              break;
            case '16': // GSM
              setUserRole('GSM');
              break;
            default: // Fallback to 'Guest' if roleId is unrecognized
              setUserRole('Guest');
              break;
          }
        }
      } catch (error) {
        console.error('Error fetching auth data:', error);
      } finally {
        //setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchUserData();
  }, [user]);

  // Render user header with the userName and userRole
  const renderUserHeader = () => (
    <View style={styles.userInfo}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          columnGap: 5,
        }}
      >
        <EvilIcons name="user" size={50} color={getThemeColor('primary')} />
        <View style={{ rowGap: 2 }}>
          <Text
            style={[
              tw`text-sm font-medium`,
              {
                color: getThemeColor('authTextColor'),
              },
            ]}
          >
            {userName} {/* Display userName here */}
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '500',
              color: getThemeColor('text'),
            }}
          >
            {userRole} {/* Display userRole here */}
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={handleLogout}>
        <Image
          source={require('@assets/icons/power-64.png')}
          style={styles.power}
        />
      </TouchableOpacity>
    </View>
  );

  // Logout function
  const handleLogout = async () => {
    try {
      await clearAuthData(); // Clear auth data from AsyncStorage or Redux
      dispatch(logoutUser()); // Dispatch logout action to clear user from Redux (if applicable)

      // Navigate to the login screen after logout
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // if (loading) {
  //   return <LoadingIndicator size="large" color="#006EDA" />;
  // }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View
        style={[
          styles.header,
          type === 'auth' && styles.authHeader,
          type === 'pick' && styles.pickHeader,
          type === 'cnp' && styles.cnpHeader,
          type === 'resetPassword' && styles.resetPasswordHeader,
        ]}
      >
        {(type === 'cnp' || type === 'submenu') && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <IonIcons
              name="arrow-back"
              size={24}
              color={getThemeColor('icon')}
            />
          </TouchableOpacity>
        )}

        {type === 'innerScreen' && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <IonIcons
              name="arrow-back"
              size={24}
              color={getThemeColor('white')}
            />
          </TouchableOpacity>
        )}

        {type !== 'innerScreen' &&
          type !== 'submenu' &&
          type !== 'cnp' &&
          type !== 'pick' && (
            <TouchableOpacity
              onPress={() => {
                if (navigation.canGoBack()) {
                  navigation.goBack();
                } else {
                  navigation.navigate('GetStarted');
                }
              }}
              style={styles.backButton}
            >
              <AntDesign
                name={
                  type === 'auth'
                    ? 'close'
                    : 'arrow-back' || type === 'resetPassword'
                    ? 'close'
                    : 'arrow-back'
                }
                size={24}
                color={getThemeColor('icon')}
              />
            </TouchableOpacity>
          )}
        {type !== 'auth' &&
          type !== 'pick' &&
          type !== 'resetPassword' &&
          type !== 'submenu' &&
          type !== 'innerScreen' && <Text style={styles.title}>{title}</Text>}

        {type === 'submenu' && (
          <View
            style={[
              styles.dateContainer,
              {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}
          >
            <Text style={[styles.vdTitle, { color: getThemeColor('h1') }]}>
              {title}
            </Text>
          </View>
        )}

        {type === 'innerScreen' && (
          <View
            style={[
              styles.dateContainer,
              {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                //minHeight: 45,
              },
            ]}
          >
            <Text style={[styles.vdTitle, { color: getThemeColor('white') }]}>
              {title}
            </Text>
            {formattedDateFrom && formattedDateTo && (
              <Text
                style={[
                  styles.date,
                  { color: getThemeColor('white'), fontWeight: '500' },
                ]}
              >{`${formattedDateFrom} - ${formattedDateTo}`}</Text>
            )}
          </View>
        )}

        {type === 'pick' && (
          <View style={styles.userHeader}>{renderUserHeader()}</View>
        )}
      </View>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          {
            paddingHorizontal:
              type === 'pick' || type === 'submenu' || type === 'innerScreen'
                ? 0
                : 28,
          }, // Corrected conditional style
        ]}
      >
        {children}
      </ScrollView>
      {type === 'auth' && (
        <View style={[tw`flex flex-col`, styles.poweredBy]}>
          <TextComponent>Powered By:</TextComponent>
          <Image
            source={require('@assets/logos/mega-logo.png')} // Adjust path to your image
            style={[{ width: 174, height: 48 }, tw`self-start`]} // Added width and height
            resizeMode="contain"
          />
        </View>
      )}
      {type === 'innerScreen' && (
        <View
          style={[
            styles.navigation,
            { backgroundColor: getThemeColor('background') },
          ]}
        >
          <TouchableOpacity
            style={[
              styles.navButton,
              isActive(
                userRole === 'Admin'
                  ? 'ViolationScreen'
                  : userRole === 'GSM'
                  ? 'GSMMenu'
                  : userRole === 'User'
                  ? 'UserMenu'
                  : '',
              ) && {
                backgroundColor: getThemeColor('active'),
              },
            ]}
            onPress={() => {
              // Navigate based on userRole
              if (userRole === 'Admin') {
                navigation.navigate('AdminMenu');
              } else if (userRole === 'GSM') {
                navigation.navigate('GSMMenu');
              } else if (userRole === 'User') {
                navigation.navigate('UserMenu');
              } else {
                console.warn('User role not recognized, cannot navigate.');
              }
            }}
          >
            <Entypo
              name="home"
              size={24}
              color={getThemeColor(
                isActive(
                  userRole === 'Admin'
                    ? 'AdminMenu'
                    : userRole === 'GSM'
                    ? 'GSMMenu'
                    : userRole === 'User'
                    ? 'UserMenu'
                    : '',
                )
                  ? 'primary'
                  : 'placeholder',
              )}
            />
            <Text
              style={[
                tw`text-xs font-medium`,
                {
                  color: getThemeColor(
                    isActive(
                      userRole === 'Admin'
                        ? 'AdminMenu'
                        : userRole === 'GSM'
                        ? 'GSMMenu'
                        : userRole === 'User'
                        ? 'UserMenu'
                        : '',
                    )
                      ? 'primary'
                      : 'text',
                  ),
                },
              ]}
            >
              Home
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.navButton,
              isActive('ManageLTO') && {
                backgroundColor: getThemeColor('active'),
              }, // Active button style
            ]}
            onPress={() => navigation.navigate('ManageLTO')}
          >
            <FontAwesome
              name="tasks"
              size={24}
              color={getThemeColor(
                isActive('ManageLTO') ? 'primary' : 'placeholder',
              )}
            />
            <Text
              style={[
                tw`text-xs font-medium`,
                {
                  color: getThemeColor(
                    isActive('ManageLTO') ? 'primary' : 'text',
                  ),
                },
              ]}
            >
              LTOs
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.navButton,
              isActive('BlackPoints') && {
                backgroundColor: getThemeColor('active'),
              },
            ]}
            onPress={() => navigation.navigate('BlackPoints')}
          >
            <FontAwesome
              name="exclamation-circle"
              size={26}
              color={getThemeColor(
                isActive('BlackPoints') ? 'primary' : 'placeholder',
              )}
            />
            <Text
              style={[
                tw`text-xs font-medium`,
                {
                  color: getThemeColor(
                    isActive('BlackPoints') ? 'primary' : 'text',
                  ),
                },
              ]}
            >
              Black Points
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.navButton,
              isActive('MyProfile') && {
                backgroundColor: getThemeColor('active'),
              }, // Active button style
            ]}
            onPress={() => navigation.navigate('MyProfile')}
          >
            <EvilIcons
              name="user"
              size={30}
              color={getThemeColor(
                isActive('MyProfile') ? 'primary' : 'placeholder',
              )}
            />
            <Text
              style={[
                tw`text-xs font-medium`,
                {
                  color: getThemeColor(
                    isActive('MyProfile') ? 'primary' : 'text',
                  ),
                },
              ]}
            >
              Profile
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  header: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 15,
  },
  authHeader: {
    borderBottomWidth: 0,
  },
  resetPasswordHeader: { borderBottomWidth: 0 },
  pickHeader: {
    borderBottomWidth: 0,
  },
  cnpHeader: {
    borderBottomWidth: 0,
  },
  backButton: {
    marginRight: 20,
    // position: 'absolute',
    // paddingHorizontal: 20,
    // paddingVertical: 15,
    // left: 25,
    zIndex: 100,
    //backgroundColor: 'red',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  dateContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  vdTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  date: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
    flex: 1,
  },
  userHeader: {
    flex: 1,
    columnGap: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 30,
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    //paddingHorizontal: 28,
    height: '100%',
  },
  placeholder: {
    flex: 1,
  },
  poweredBy: {
    rowGap: 10,
    paddingBottom: 50,
    marginHorizontal: 'auto',
  },
  navigation: {
    minHeight: 75,
    rowGap: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white', // Ensure a solid background color
    shadowColor: '#000000', // Darker shadow color for contrast
    shadowOffset: { width: 0, height: 4 }, // Slightly larger offset for visibility
    shadowOpacity: 0.95, // Increased opacity for a more pronounced shadow
    shadowRadius: 10, // Larger radius for a softer shadow
    elevation: 8, // Increased elevation for Android
    zIndex: 1, // Ensure this component is above others
  },
  navButton: {
    flexDirection: 'column',
    rowGap: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  power: {
    width: 20,
    height: 20,
  },
});

export default Layout;
