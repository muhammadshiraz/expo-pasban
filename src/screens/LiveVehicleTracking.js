import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Alert, Image } from 'react-native';
import MapView from 'react-native-map-clustering';
import { Marker } from 'react-native-maps';
import { ThemeContext } from '@context/ThemeContext';
import Layout from '@components/Layout';
import LayoutCard from '@components/LayoutCard';
import SearchBox from '@components/SearchBox';
import Tooltip from '@components/Tooltip'; // Import your Tooltip component

const carIcon = require('@assets/icons/car-icon.png');

const LiveVehicleTracking = () => {
  const { getThemeColor } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    searchVehicle: '',
  });
  const [mapRegion, setMapRegion] = useState({
    latitude: 24.853308693510183,
    longitude: 67.03196585433692,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [selectedCar, setSelectedCar] = useState(null); // State to manage selected car
  const [showTooltip, setShowTooltip] = useState(false); // State to control tooltip visibility

  // Mock data for car locations
  const carLocations = [
    {
      id: 1,
      title: 'ALU-916',
      coordinate: { latitude: 24.8607, longitude: 67.0011 },
    },
  ];

  // Effect to center the map on the car when the component mounts
  useEffect(() => {
    if (carLocations.length > 0) {
      const initialCar = carLocations[0]; // Get the first car's coordinates
      setMapRegion({
        latitude: initialCar.coordinate.latitude,
        longitude: initialCar.coordinate.longitude,
        latitudeDelta: 0.005, // Adjust zoom level as necessary
        longitudeDelta: 0.005,
      });
    }
  }, []); // Empty dependency array ensures this runs once when the component mounts

  const handleInputChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleSearch = () => {
    const { searchVehicle } = formData;

    // Check if the search box is empty
    if (searchVehicle.trim() === '') {
      Alert.alert('Search', 'Please enter a vehicle title to search.');
      return;
    }

    // Find the matching car based on the search input
    const matchedCar = carLocations.find((car) =>
      car.title.toLowerCase().includes(searchVehicle.toLowerCase()),
    );

    if (matchedCar) {
      // Update the map region to focus on the matched car
      setMapRegion({
        latitude: matchedCar.coordinate.latitude,
        longitude: matchedCar.coordinate.longitude,
        latitudeDelta: 0.005, // Adjust this value for zoom level
        longitudeDelta: 0.005, // Adjust this value for zoom level
      });
      Alert.alert('Vehicle Found', `Found vehicle: ${matchedCar.title}`);
    } else {
      Alert.alert('Not Found', 'No vehicles matched your search.');
    }
  };

  // Filter car locations based on search input
  const filteredCarLocations = carLocations.filter((car) =>
    car.title.toLowerCase().includes(formData.searchVehicle.toLowerCase()),
  );

  // Function to handle marker press
  const handleMarkerPress = (car) => {
    setSelectedCar(car); // Set the selected car
    setShowTooltip(true); // Show the tooltip
  };

  // Function to close the tooltip
  const handleCloseTooltip = () => {
    setShowTooltip(false);
    setSelectedCar(null); // Clear selected car
  };

  return (
    <Layout
      type="innerScreen"
      title="Live Vehicle Tracking"
      layoutBgColor={getThemeColor('primary')}
    >
      <View style={styles.container}>
        <SearchBox
          placeholder="Search Vehicle"
          value={formData.searchVehicle}
          onChangeText={(value) => handleInputChange('searchVehicle', value)}
          onSearch={handleSearch}
        />
        <LayoutCard
          style={{
            paddingHorizontal: 0,
            paddingVertical: 0,
            overflow: 'hidden',
          }}
        >
          <MapView
            style={styles.map}
            region={mapRegion} // Bind the region to state
            onRegionChangeComplete={setMapRegion} // Optional: Update the region on drag/zoom
          >
            {filteredCarLocations.map((car) => (
              <Marker
                key={car.id}
                coordinate={car.coordinate}
                onPress={() => handleMarkerPress(car)} // Handle marker press
              >
                <Image
                  source={carIcon}
                  resizeMode="native"
                  style={styles.markerImage}
                />
              </Marker>
            ))}
          </MapView>

          {/* Conditionally render the tooltip */}
          {showTooltip && selectedCar && (
            <Tooltip
              vehicle={
                {
                  // number: 'TLH-252',
                  // driverName: 'John Doe',
                  // speed: '80 km/h',
                }
              }
              onClose={handleCloseTooltip}
            />
          )}
        </LayoutCard>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    rowGap: 30,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default LiveVehicleTracking;
