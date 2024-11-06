import React, { useState, useContext, useEffect, useRef } from 'react';
import { View, StyleSheet, Alert, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { ThemeContext } from '@context/ThemeContext';
import Layout from '@components/Layout';
import LayoutCard from '@components/LayoutCard';
import SearchBox from '@components/SearchBox';

const carIcon = require('@assets/icons/car-icon.png');

const ShowEntireFleet = () => {
  const { getThemeColor } = useContext(ThemeContext);
  const mapRef = useRef(null); // Ref for the MapView
  const [formData, setFormData] = useState({
    searchVehicle: '',
  });

  // Mock data for car locations
  const carLocations = [
    {
      id: 1,
      title: 'ALU-916',
      coordinate: { latitude: 24.8607, longitude: 67.0011 },
    },
    {
      id: 2,
      title: 'AML-603',
      coordinate: { latitude: 24.8707, longitude: 67.0211 },
    },
    {
      id: 3,
      title: 'AMR-600',
      coordinate: { latitude: 24.8807, longitude: 67.0111 },
    },
    {
      id: 4,
      title: 'ANM-906',
      coordinate: { latitude: 24.8507, longitude: 67.0311 },
    },
  ];

  // UseEffect to fit all markers in the map's viewport
  useEffect(() => {
    if (carLocations.length > 0 && mapRef.current) {
      const coordinates = carLocations.map((car) => car.coordinate);
      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 }, // Optional: Padding around the edges
        animated: true,
      });
    }
  }, [carLocations]); // This will run once on mount

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
      // Center the map on the matched car's location
      mapRef.current.animateToRegion(
        {
          latitude: matchedCar.coordinate.latitude,
          longitude: matchedCar.coordinate.longitude,
          latitudeDelta: 0.005, // Adjust this value for zoom level
          longitudeDelta: 0.005, // Adjust this value for zoom level
        },
        1000,
      );
      Alert.alert('Vehicle Found', `Found vehicle: ${matchedCar.title}`);
    } else {
      Alert.alert('Not Found', 'No vehicles matched your search.');
    }
  };

  // Filter car locations based on search input
  const filteredCarLocations = carLocations.filter((car) =>
    car.title.toLowerCase().includes(formData.searchVehicle.toLowerCase()),
  );

  return (
    <Layout
      type="innerScreen"
      title="Show Entire Fleet"
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
            ref={mapRef} // Attach ref to the MapView
            style={styles.map}
            onMapReady={() => {
              if (carLocations.length > 0 && mapRef.current) {
                const coordinates = carLocations.map((car) => car.coordinate);
                mapRef.current.fitToCoordinates(coordinates, {
                  edgePadding: { top: 50, right: 50, bottom: 50, left: 50 }, // Padding around the edges
                  animated: true,
                });
              }
            }}
          >
            {filteredCarLocations.map((car) => (
              <Marker
                key={car.id}
                coordinate={car.coordinate}
                title={car.title}
              >
                <Image
                  source={carIcon}
                  resizeMode="native"
                  style={styles.markerImage}
                />
              </Marker>
            ))}
          </MapView>
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

export default ShowEntireFleet;
