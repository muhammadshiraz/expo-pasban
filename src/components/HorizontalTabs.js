import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { ThemeContext } from '@context/ThemeContext';

const HorizontalTabs = ({ tabs }) => {
  const { getThemeColor } = useContext(ThemeContext);
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsContainer}
      >
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.tab,
              {
                borderBottomColor:
                  selectedTab === index
                    ? getThemeColor('primary')
                    : 'transparent',
              },
            ]}
            onPress={() => setSelectedTab(index)}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color:
                    selectedTab === index
                      ? getThemeColor('primary')
                      : getThemeColor('text'),

                  fontWeight: selectedTab === index ? '600' : '400',
                },
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.contentContainer}>{tabs[selectedTab].content}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  tabsContainer: {
    flex: 1,
    columnGap: 15,
    flexDirection: 'row',
    justifyContent: 'start',
    width: '100%',
    marginBottom: 15,
  },
  tab: {
    paddingVertical: 8,
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: 12,
  },
  contentContainer: {
    display: 'block',
    width: '100%',
  },
});

export default HorizontalTabs;
