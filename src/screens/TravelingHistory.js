import React, { useState, useContext, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import MapView, { Marker, Polyline, AnimatedRegion } from 'react-native-maps';
import Layout from '@components/Layout';
import { ThemeContext } from '@context/ThemeContext';
import LayoutCard from '@components/LayoutCard';
import UitCalender from '@assets/icons/uit_calender.svg';
import InputField from '@components/InputField';
import SearchIcon from '@assets/icons/search.svg';
import PlayIcon from '@assets/icons/play.svg';
import PauseIcon from '@assets/icons/pause.svg';

const carIcon = require('@assets/icons/car-icon.png');

const TravelingHistory = () => {
  const { getThemeColor } = useContext(ThemeContext);
  const mapRef = useRef(null);
  const [formData, setFormData] = useState({
    searchVehicle: '',
    startDate: '',
    endDate: '',
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  // Initialize the animated car position
  const [carPosition, setCarPosition] = useState(
    new AnimatedRegion({
      latitude: 24.8607,
      longitude: 67.0011,
    }),
  );

  // Mock data for travel history
  const travelHistory = [
    { latitude: 24.8607, longitude: 67.0011 },
    { latitude: 24.8707, longitude: 67.0211 },
    { latitude: 24.8807, longitude: 67.0111 },
    { latitude: 24.8507, longitude: 67.0311 },
  ];

  const handleInputChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleSearch = () => {
    const { startDate, endDate } = formData;
    if (!startDate || !endDate) {
      Alert.alert('Error', 'Please select both start and end dates.');
      return;
    }
    // Implement your search logic here
    Alert.alert('Success', 'Search executed!'); // Dummy alert
  };

  const moveCarSmoothly = (nextCoordinate) => {
    // Animate the car marker to the next point
    carPosition
      .timing({
        latitude: nextCoordinate.latitude,
        longitude: nextCoordinate.longitude,
        duration: 2000, // Slow down the movement duration
        useNativeDriver: false,
      })
      .start();

    // Animate the map to fit the car position and the polyline
    if (mapRef.current) {
      mapRef.current.fitToCoordinates(travelHistory, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  };

  // Function to start moving the car
  const handlePlay = () => {
    // If already playing, do not start a new interval
    if (isPlaying) return;

    setIsPlaying(true);
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex < travelHistory.length - 1) {
          const nextIndex = prevIndex + 1;
          moveCarSmoothly(travelHistory[nextIndex]); // Move smoothly to the next point
          return nextIndex;
        } else {
          clearInterval(intervalRef.current);
          setIsPlaying(false);
          return prevIndex; // Stay at the last index
        }
      });
    }, 2500); // Time interval for next point
  };

  // Function to pause the animation
  const handlePause = () => {
    setIsPlaying(false);
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    // Initial map animation to the first car location
    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: travelHistory[0].latitude,
          longitude: travelHistory[0].longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000,
      );
    }

    return () => clearInterval(intervalRef.current); // Clean up interval on unmount
  }, []);

  useEffect(() => {
    // Update car position whenever currentIndex changes
    if (currentIndex < travelHistory.length) {
      const nextCoordinate = travelHistory[currentIndex];
      moveCarSmoothly(nextCoordinate); // Move to the new position
    }
  }, [currentIndex]);

  return (
    <Layout
      type="innerScreen"
      title="Traveling History"
      layoutBgColor={getThemeColor('primary')}
    >
      <View style={styles.container}>
        <View style={styles.searchBoxContainer}>
          <View style={styles.searchBoxCard}>
            <InputField
              placeholder="Start Date"
              value={formData.startDate}
              onChange={(value) => handleInputChange('startDate', value)}
              type="date"
              mainStyle={{ flex: 1 }}
              icon={UitCalender}
              style={styles.inputField}
            />
            <InputField
              placeholder="End Date"
              value={formData.endDate}
              onChange={(value) => handleInputChange('endDate', value)}
              type="date"
              mainStyle={{ flex: 1 }}
              icon={UitCalender}
              style={styles.inputField}
            />
            <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
              <SearchIcon />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.thContent}>
          <Text style={styles.thContentText}>
            0 Km From NAFEES BARBECUE & BURGUR SHOP, Sher Shah Road, Multan,
            Punjab
          </Text>
          <Text style={styles.thContentText}>03-Jul-2024 12:16</Text>
        </View>

        {/* Map Section */}
        <LayoutCard
          style={[
            styles.layoutCard,
            { paddingHorizontal: 0, paddingVertical: 0 },
          ]}
        >
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={{
              latitude: 24.8607,
              longitude: 67.0011,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker.Animated coordinate={carPosition} title="ALU-916">
              <Image source={carIcon} resizeMode="native" />
            </Marker.Animated>
            <Polyline
              coordinates={travelHistory}
              strokeColor="#006EDA"
              strokeWidth={1.5}
            />
          </MapView>
          <View style={styles.playBar}>
            <Text style={styles.playBarCarNo}>BTY-469</Text>
            <Text style={styles.playBarCarSpeed}>Speed: 0 KM/hr</Text>
            <View style={styles.actionButton}>
              <TouchableOpacity onPress={isPlaying ? handlePause : handlePlay}>
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </TouchableOpacity>
            </View>
          </View>
        </LayoutCard>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
  thContent: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
    rowGap: 10,
    marginBottom: 20,
  },
  thContentText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  inputField: {
    paddingTop: 8,
  },
  searchBoxContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 15,
    minHeight: 50,
    maxHeight: 50,
  },
  searchBoxCard: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    borderRadius: 4,
    paddingHorizontal: 5,
    columnGap: 8,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 5,
    elevation: 5,
    paddingTop: 7,
  },
  searchBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#006EDA',
    width: 35,
    height: 35,
    borderRadius: 100,
  },
  playBar: {
    position: 'absolute',
    bottom: 15,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.70)',
    // padding: 8,
    paddingVertical: 5,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playBarCarNo: {
    color: 'white',
    fontWeight: 'bold',
  },
  playBarCarSpeed: {
    color: 'white',
  },
  actionButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  layoutCard: {
    flex: 1,
  },
  markerImage: {
    width: 15,
    height: 29.63,
  },
});

export default TravelingHistory;
