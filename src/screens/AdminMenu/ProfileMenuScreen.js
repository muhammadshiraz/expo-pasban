import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Layout from '@components/Layout';
import HeadingComponent from '@components/HeadingComponent';
import { ThemeContext } from '@context/ThemeContext';
import Icon from '@components/Icon';

const ProfileMenuScreen = ({ navigation }) => {
  const { getThemeColor } = useContext(ThemeContext);
  const [activeItem, setActiveItem] = useState(null);

  const createBoxData = [
    {
      id: '1',
      title: 'Create Profile',
      screen: 'CreateProfile',
      icon: () => <Icon name="create" size={35} />,
    },
  ];
  const viewBoxData = [
    {
      id: '1',
      title: 'View / Edit',
      screen: 'ViewEdit',
      icon: () => <Icon name="view" size={35} />,
    },
  ];
  const driverBoxData = [
    {
      id: '1',
      title: 'Driver Assessment',
      screen: 'DriverAssessment',
      icon: () => <Icon name="driver" size={35} />,
    },
  ];

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
    <Layout type="submenu" title="Profile Management">
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
        <View
          style={[
            styles.menuCard,
            {
              backgroundColor: getThemeColor('primary'),
            },
          ]}
        >
          <View style={[styles.boxesContainer]}>
            {createBoxData.map((item) => fullRenderItem(item))}
          </View>
          <View style={[styles.boxesContainer]}>
            {viewBoxData.map((item) => fullRenderItem(item))}
          </View>
          <View style={[styles.boxesContainer]}>
            {driverBoxData.map((item) => fullRenderItem(item))}
          </View>
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuCard: {
    flex: 1, // This makes menuCard take the full height of its parent
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingVertical: 30,
    rowGap: 20,
  },
  boxesContainer: {
    flex: 1,
    paddingHorizontal: 20,
    flexDirection: 'row',
    columnGap: 20,
    width: '100%',
    maxHeight: 128,
  },
  boxHeader: {
    borderBottomWidth: 1,
    paddingBottom: 8,
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

export default ProfileMenuScreen;
