import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Layout from '@components/Layout';
import HeadingComponent from '@components/HeadingComponent';
import { ThemeContext } from '@context/ThemeContext';
import Icon from '@components/Icon';

const VehicleManageMenuScreen = ({ navigation }) => {
  const { getThemeColor } = useContext(ThemeContext);
  const [activeItem, setActiveItem] = useState(null);

  const manageBoxData = [
    {
      id: '1',
      title: 'All LTO',
      screen: 'AllLTO',
      icon: () => <Icon name="lto_ddc" size={30} />,
    },
    {
      id: '2',
      title: 'Cancelled LTO',
      screen: 'CancelledLTO',
      icon: () => <Icon name="can_lto" size={30} />,
    },
  ];
  const ltoBoxData = [
    {
      id: '1',
      title: 'Cancelled LTO',
      icon: () => <Icon name="can_lto" size={30} />,
    },
    {
      id: '2',
      title: 'Pending LTO',
      screen: '',
      icon: () => <Icon name="pen_lto" size={30} />,
    },
  ];
  const initiateBoxData = [
    {
      id: '1',
      title: 'Initiate LTO',
      screen: 'InitiateLTO',
      icon: () => <Icon name="auth_letter" size={35} />,
    },
  ];
  const alBoxData = [
    {
      id: '1',
      title: 'View Authority Letter',
      screen: 'ViewAuthLetter',
      icon: () => <Icon name="auth_letter" size={35} />,
    },
  ];
  const rvBoxData = [
    {
      id: '1',
      title: 'Monitor Real-Time Status of Registered Vehicles',
      icon: () => <Icon name="moniter" size={35} />,
    },
  ];
  const mdBoxData = [
    {
      id: '1',
      title: 'Manage and Update Vehicle Master Data',
      icon: () => <Icon name="master_data" size={35} />,
    },
  ];
  const viBoxData = [
    {
      id: '1',
      screen: 'VehicleInspection',
      title: 'Vehicle Inspection',
      icon: () => <Icon name="vehicle_inspection" size={35} />,
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

  return (
    <Layout type="submenu" title="Vehicle Management">
      <View style={[styles.container]}>
        <View
          style={[
            styles.headerContent,
            {
              marginBottom: 15,
            },
          ]}
        >
          <HeadingComponent
            style={{ textAlign: 'center' }}
            size="h3"
            color={getThemeColor('h1')}
          >
            Choose your option
          </HeadingComponent>
        </View>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={[
              styles.menuCard,
              { backgroundColor: getThemeColor('primary') },
            ]}
          >
            <View style={styles.boxesContainer}>
              {manageBoxData.map((item) => renderItem(item))}
            </View>
            {/* <View style={styles.boxesContainer}>
              {ltoBoxData.map((item) => renderItem(item))}
            </View> */}
            <View style={styles.boxesContainer}>
              {initiateBoxData.map((item) => fullRenderItem(item))}
            </View>
            <View style={styles.boxesContainer}>
              {alBoxData.map((item) => fullRenderItem(item))}
            </View>
            {/* <View style={styles.boxesContainer}>
              {rvBoxData.map((item) => fullRenderItem(item))}
            </View> */}
            {/* <View style={styles.boxesContainer}>
              {mdBoxData.map((item) => fullRenderItem(item))}
            </View> */}
            <View style={styles.boxesContainer}>
              {viBoxData.map((item) => fullRenderItem(item))}
            </View>
          </View>
        </ScrollView>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  scrollContent: {
    flexGrow: 1,
  },
  menuCard: {
    flex: 1, // This makes menuCard take the full height of its parent
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingVertical: 30,
    rowGap: 20,
  },
  boxesContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    columnGap: 20,
    width: '100%',
    minHeight: 128,
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
});

export default VehicleManageMenuScreen;
