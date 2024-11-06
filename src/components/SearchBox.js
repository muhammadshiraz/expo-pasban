import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import SearchIcon from '@assets/icons/search.svg';

const SearchBox = ({
  placeholder,
  value,
  onChangeText,
  onSearch,
  showSearchButton,
}) => {
  return (
    <View style={styles.searchBoxContainer}>
      <View style={styles.searchBoxCard}>
        <TextInput
          style={{ flex: 1 }}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
        />
        {showSearchButton && ( // Conditionally render the button
          <TouchableOpacity style={styles.searchBtn} onPress={onSearch}>
            <SearchIcon />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBoxContainer: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    paddingHorizontal: 30,
    minHeight: 50,
    maxHeight: 50,
  },
  searchBoxCard: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 4,
    paddingHorizontal: 12,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 5,
    elevation: 5,
  },
  searchBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#006EDA',
    width: 35,
    height: 35,
    borderRadius: 100,
  },
});

export default SearchBox;
