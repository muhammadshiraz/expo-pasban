import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Layout from '@components/Layout';
import HeadingComponent from '@components/HeadingComponent';
import { ThemeContext } from '@context/ThemeContext';
import AntDesign from '@expo/vector-icons/AntDesign';
import Icon from '@components/Icon';
import LayoutCard from '@components/LayoutCard';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import ModalComponent from '@components/ModalComponent';
import { useDispatch, useSelector } from 'react-redux';
import ReusableModal from '@components/ReusableModal';
import LTOToPrint from '@components/LTOToPrint';
import {
  getAllAuthorityLetterStatuses,
  getAuthorityLetterForPrint,
} from '@redux/actions/ltoActions';

const UserMenuScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { employeeId } = user || {};
  const { getThemeColor } = useContext(ThemeContext);
  const [activeItem, setActiveItem] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLTOModalVisible, setLTOIsModalVisible] = useState(false);
  const [isId, setIsId] = useState();
  const [LTOData, setLTOData] = useState({});
  const { viewAuthLetter, authorityLetterForPrint, loading, error } =
    useSelector((state) => state.lto);

  useEffect(() => {
    dispatch(getAllAuthorityLetterStatuses());
  }, [dispatch]);

  useEffect(() => {
    if (viewAuthLetter && viewAuthLetter.length > 0) {
      // Filter for the Id where LocalId or UserId matches the employeeId
      const filteredItem = viewAuthLetter.find(
        (item) =>
          item.LocalId === employeeId || item.LocalId === Number(employeeId),
      );

      if (filteredItem) {
        setIsId(filteredItem.Id);
      } else {
        console.log('No matching entry found for the given employeeId');
      }
    }
  }, [dispatch, viewAuthLetter, employeeId]);

  useEffect(() => {
    if (isId) {
      dispatch(getAuthorityLetterForPrint(isId));
    }
  }, [dispatch, isId]);

  useEffect(() => {
    if (authorityLetterForPrint.length > 0 && isId) {
      const selectedData = authorityLetterForPrint.find(
        (item) => item.Id === isId,
      );
      if (selectedData) {
        setLTOData(selectedData);
      }
    }
  }, [authorityLetterForPrint, isId]);

  const dbBoxData = [
    {
      id: '1',
      title: 'Dashboard',
      screen: 'UserDashboard',
      icon: () => (
        <AntDesign
          name="dashboard"
          size={35}
          color={getThemeColor('iconBoxColor')}
        />
      ),
    },
    {
      id: '2',
      title: 'Quiz',
      screen: 'QuizMenu',
      icon: () => <Icon name="quiz" size={35} />,
    },
  ];

  const alBoxData = [
    {
      id: '1',
      title: 'LTO Approvals',
      screen: 'ManageLTO',
      icon: () => <Icon name="lto_approvals" size={35} />,
    },
  ];

  const vtBoxData = [
    {
      id: '1',
      title: 'Vehicle Tracking',
      icon: () => <Icon name="vehicle_tracking" size={35} />,
    },
  ];

  const tmBoxData = [
    {
      id: '1',
      title: 'Tracker Maintenance / Field Request',
      screen: 'TrackerMaintenance',
      icon: () => (
        <AntDesign
          name="questioncircle"
          size={35}
          color={getThemeColor('iconBoxColor')}
        />
      ),
    },
  ];

  // Render each item
  const renderItem = (item) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={[
          styles.box,
          {
            flex: 1,
            backgroundColor: getThemeColor('background'),
          },
        ]}
        onPress={() => {
          navigation.navigate(item.screen);
        }}
      >
        <View style={styles.boxContent}>
          <View style={styles.boxIcon}>
            {/* Call icon function directly */}
            {typeof item.icon === 'function' ? item.icon() : null}
          </View>
          <Text
            style={[
              tw`text-center`,
              {
                color: getThemeColor('actionText'),
                fontSize: 14,
                fontWeight: '700',
              },
            ]}
          >
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const fullRenderItem = (item) => {
    const isActive = activeItem === item.title;
    return (
      <TouchableOpacity
        key={item.id}
        style={[
          styles.fullBox,
          {
            backgroundColor: getThemeColor('background'),
          },
        ]}
        onPress={() => {
          setActiveItem(item.title);
          navigation.navigate(item.screen);
        }}
      >
        <View style={[styles.boxContent]}>
          <View style={[styles.boxIcon]}>{item.icon(isActive)}</View>
          <Text
            style={[
              tw`text-center`,
              {
                color: getThemeColor('actionText'),
                fontSize: 14,
                fontWeight: '700',
              },
            ]}
          >
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const vehicleTrackingRenderItem = (item) => {
    const isActive = activeItem === item.title;
    return (
      <TouchableOpacity
        key={item.id}
        style={[
          styles.fullBox,
          {
            backgroundColor: getThemeColor('background'),
          },
        ]}
        onPress={handleModal}
      >
        <View style={[styles.boxContent]}>
          <View style={[styles.boxIcon]}>{item.icon(isActive)}</View>
          <Text
            style={[
              tw`text-center`,
              {
                color: getThemeColor('actionText'),
                fontSize: 14,
                fontWeight: '700',
              },
            ]}
          >
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const vtList = [
    { id: 1, title: 'Show Entire Fleet', screen: 'ShowEntireFleet' },
    { id: 2, title: 'Traveling History', screen: 'TravelingHistory' },
    { id: 3, title: 'Live Vehicle Tracking', screen: 'LiveVehicleTracking' },
    { id: 4, title: 'Vehicle Tracking Reports', screen: 'Reports' },
  ];

  const handleModal = () => {
    setIsModalVisible(true);
  };

  const handlePress = () => {
    setLTOIsModalVisible(true);
  };

  return (
    <Layout type="pick" userType="User" layoutBgColor={getThemeColor('white')}>
      <View style={[styles.container]}>
        <View
          style={[
            styles.headerContent,
            {
              marginBottom: 30,
            },
          ]}
        >
          <HeadingComponent
            style={{ textAlign: 'center' }}
            size="h3"
            color={getThemeColor('h1')}
          >
            Where would you like to go?
          </HeadingComponent>
        </View>
        <LayoutCard cardBgColor={getThemeColor('primary')}>
          <View style={styles.boxesContainer}>
            {/* Map over dbBoxData to render each box */}
            {dbBoxData.map((item) => renderItem(item))}
          </View>
          <View style={styles.boxesContainer}>
            {/* Map over qmBoxData to render each box */}
            <TouchableOpacity
              style={[
                styles.box,
                {
                  flex: 1,
                  backgroundColor: getThemeColor('background'),
                },
              ]}
              onPress={handlePress}
            >
              <View style={styles.boxContent}>
                <View style={styles.boxIcon}>
                  <Icon name="authority_letter" size={35} />
                </View>
                <Text
                  style={[
                    tw`text-center`,
                    {
                      color: getThemeColor('actionText'),
                      fontSize: 14,
                      fontWeight: '700',
                    },
                  ]}
                >
                  Authority Letter
                </Text>
              </View>
            </TouchableOpacity>
            {alBoxData.map((item) => renderItem(item))}
          </View>
          <View style={[styles.boxesContainer]}>
            {vtBoxData.map((item) => vehicleTrackingRenderItem(item))}
          </View>
          <View style={[styles.boxesContainer]}>
            {tmBoxData.map((item) => fullRenderItem(item))}
          </View>
        </LayoutCard>
      </View>
      <ModalComponent
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        showSignButton={false}
      >
        <View style={styles.col}>
          <Text style={styles.filterTitle}>Vehicle Tracking</Text>
          {vtList.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.filterList, { borderBottomWidth: 1 }]}
              onPress={() => {
                setIsModalVisible(false);
                navigation.navigate(item.screen);
              }}
            >
              <View style={styles.list}>
                <Text style={styles.listText}>{item.title}</Text>
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={16}
                  color="black"
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ModalComponent>
      {/* Modal Integration */}
      <ReusableModal
        visible={isLTOModalVisible}
        onClose={() => setLTOIsModalVisible(false)}
        padding={0}
        showCloseButton={true}
        showTitle={false}
        content={
          authorityLetterForPrint.length > 0 ? (
            <LTOToPrint data={LTOData} />
          ) : (
            <View style={styles.noDataContainer}>
              <Text style={styles.noDataText}>
                No Authority Letter Available
              </Text>
              <Text style={styles.noDataSubText}>
                We're sorry, but we don't have an authority letter available
                right now.
              </Text>
            </View>
          )
        }
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  boxesContainer: {
    flex: 1,
    paddingHorizontal: 20,
    flexDirection: 'row',
    columnGap: 20,
    width: '100%',
    height: '100%',
  },
  boxHeader: {
    borderBottomWidth: 1,
    paddingBottom: 8,
  },
  box: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    // Box Shadow
    shadowColor: '#000000', // Shadow color
    shadowOffset: { width: 5, height: 3 }, // x = 5, y = 3
    shadowOpacity: 0.58, // Opacity of the shadow
    shadowRadius: 10, // Blur radius
    elevation: 10, // Required for Android to show the shadow
  },
  fullBox: {
    width: '100%', // Ensure the box takes full width
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    // Box Shadow
    shadowColor: '#000000', // Shadow color
    shadowOffset: { width: 5, height: 3 }, // x = 5, y = 3
    shadowOpacity: 0.58, // Opacity of the shadow
    shadowRadius: 10, // Blur radius
    elevation: 10, // Required for Android to show the shadow
  },
  boxContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 8,
  },
  boxIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 40,
  },
  filterList: {
    flexDirection: 'column',
    borderBottomColor: '#DBDBDB',
    paddingBottom: 12,
    marginBottom: 12,
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listText: {
    color: '#000000',
    fontSize: 14,
  },
  col: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
    paddingBottom: 8,
    marginBottom: 20,
  },
  noDataContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noDataText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#9EACBF',
    marginBottom: 10,
    textAlign: 'center',
  },
  noDataSubText: {
    fontSize: 14,
    color: '#6D7E92',
    textAlign: 'center',
  },
});

export default UserMenuScreen;
