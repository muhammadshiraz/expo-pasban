import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Layout from '@components/Layout';
import HeadingComponent from '@components/HeadingComponent';
import { ThemeContext } from '@context/ThemeContext';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Icon from '@components/Icon';
import LayoutCard from '@components/LayoutCard';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import ModalComponent from '@components/ModalComponent';
import SelVehicle from '@assets/icons/selVehicle.svg';
import UitCalender from '@assets/icons/uit_calender.svg';
import InputField from '@components/InputField';

const AdminMenuScreen = ({ navigation }) => {
  const { getThemeColor } = useContext(ThemeContext);
  const [activeItem, setActiveItem] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isTHModalVisible, setTHIsModalVisible] = useState(false);

  const [formData, setFormData] = useState({
    selVehicle: {
      value: '',
      required: true,
    },
    startDate: '2024-05-17',
    endDate: '2024-05-31',
  });

  const dbBoxData = [
    {
      id: '1',
      title: 'Dashboard',
      screen: 'DashboardMenu',
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
      title: 'Quiz Management',
      screen: 'QuizManagement',
      icon: () => <Icon name="quiz" size={35} />,
    },
  ];

  const qmBoxData = [
    {
      id: '1',
      title: 'Profile Management',
      screen: 'ProfileMenu',
      icon: () => (
        <AntDesign
          name="user"
          size={35}
          color={getThemeColor('iconBoxColor')}
        />
      ),
    },
    {
      id: '2',
      title: 'Vehicle Management',
      screen: 'VehicleManageMenu',
      icon: () => (
        <FontAwesome5
          name="car"
          size={35}
          color={getThemeColor('iconBoxColor')}
        />
      ),
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
          navigation.navigate(item.screen); // Navigate to the selected screen
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

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: {
        ...prevData[name],
        value,
        required: value ? false : true,
      },
    }));
  };

  const handleDateChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleTHShowReport = () => {
    // Navigate to ReportsDetailLists when "Show Report" is pressed
    navigation.navigate('TravelingHistory');
    setTHIsModalVisible(false); // Close the modal
  };

  return (
    <Layout type="pick" userType="Admin" layoutBgColor={getThemeColor('white')}>
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
            {qmBoxData.map((item) => renderItem(item))}
          </View>
          <View style={[styles.boxesContainer]}>
            {vtBoxData.map((item) => vehicleTrackingRenderItem(item))}
          </View>
          <View style={[styles.boxesContainer]}>
            {tmBoxData.map((item) => fullRenderItem(item))}
          </View>
        </LayoutCard>
      </View>
      {/* Vehicle Tracking Modal */}
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
                if (item.title === 'Traveling History') {
                  // Close the Vehicle Tracking modal and open Traveling History modal
                  setIsModalVisible(false);
                  setTHIsModalVisible(true); // Open Traveling History modal
                } else if (item.title === 'Show Entire Fleet') {
                  // Open the Vehicle Tracking modal when clicked
                  setIsModalVisible(true);
                  navigation.navigate(item.screen);
                } else if (item.title === 'Live Vehicle Tracking') {
                  // Open the Vehicle Tracking modal when clicked
                  setIsModalVisible(true);
                  navigation.navigate(item.screen);
                } else if (item.title === 'Vehicle Tracking Reports') {
                  // Open the Vehicle Tracking modal when clicked
                  setIsModalVisible(false);
                  navigation.navigate(item.screen);
                }
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
      {/* Traveling History Modal */}
      <ModalComponent
        isVisible={isTHModalVisible}
        onClose={() => setTHIsModalVisible(false)}
        showSignButton={false}
      >
        <View style={styles.col}>
          <Text style={styles.filterTitle}>Traveling History</Text>
          <View style={styles.formContainer}>
            <InputField
              type="dropdown"
              icon={SelVehicle}
              required={formData.selVehicle.required}
              placeholder={`Select Vehicle`}
              value={formData.selVehicle.value}
              onChange={(value) => handleInputChange('selVehicle', value)}
              options={[
                { label: 'ALU-916', value: 'ALU-916' },
                { label: 'AML-603', value: 'AML-603' },
                { label: 'AMR-600', value: 'AMR-600' },
                { label: 'ANM-906', value: 'ANM-906' },
              ]}
            />
            <InputField
              placeholder="Start Date"
              value={formData.startDate}
              onChange={(value) => handleDateChange('startDate', value)}
              type="date"
              icon={UitCalender}
            />
            <InputField
              placeholder="End Date"
              value={formData.endDate}
              onChange={(value) => handleDateChange('endDate', value)}
              type="date"
              icon={UitCalender}
            />
            <TouchableOpacity
              style={styles.showRepoBtn}
              onPress={handleTHShowReport} // Navigate when "Show Report" is pressed
            >
              <Text style={styles.showRepoBtnText}>Show Report</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ModalComponent>
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
  formContainer: {
    flexDirection: 'column',
    minHeight: 200,
    maxHeight: 200,
  },
  showRepoBtn: {
    alignItems: 'flex-end',
  },
  showRepoBtnText: { color: '#006EDA', fontWeight: 'bold' },
});

export default AdminMenuScreen;
