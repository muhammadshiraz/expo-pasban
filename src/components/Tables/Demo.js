import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Example using FontAwesome icons

const Demo = () => {
  const columns = [
    { label: 'Reg #' },
    { label: 'Model', width: 150 },
    { label: 'Year', width: 80 },
  ];

  const rows = [
    {
      'Reg #': 'ANE-591',
      Insurance: 'Yaris ATIV',
      Year: '2023',
      //   Action: (
      //     <View style={styles.actionIcons}>
      //       <Icon
      //             name="file-pdf-o"
      //             size={16}
      //             color="#B30B00"
      //             style={styles.icon}
      //           />
      //       <Icon name="eye" size={16} color="#66f" style={styles.icon} />
      //       <TouchableOpacity style={styles.approveButton}>
      //         <Icon name="check" size={16} color="#28a745" />
      //       </TouchableOpacity>
      //       <TouchableOpacity style={styles.rejectButton}>
      //         <Icon name="times" size={16} color="#dc3545" />
      //       </TouchableOpacity>
      //       <Icon name="user" size={16} color="#008000" style={styles.icon} />
      //     </View>
      //   ),
      //   'Cancel LTO': (
      //     <View style={styles.actionIcons}>
      //       <TouchableOpacity style={styles.cancelButton}>
      //         <Icon name="times" size={16} color="#dc3545" />
      //       </TouchableOpacity>
      //     </View>
      //   ),
    },
    {
      'Reg #': 'ANE-591',
      Insurance: 'Yaris ATIV',
      Year: '2023',
    },
    {
      'Reg #': 'ANE-591',
      Insurance: 'Yaris ATIV',
      Year: '2023',
    },
    {
      'Reg #': 'ANE-591',
      Insurance: 'Yaris ATIV',
      Year: '2023',
    },
    {
      'Reg #': 'ANE-591',
      Insurance: 'Yaris ATIV',
      Year: '2023',
    },
    {
      'Reg #': 'ANE-591',
      Insurance: 'Yaris ATIV',
      Year: '2023',
    },
  ];

  const [page, setPage] = React.useState(1);
  const [perPage] = React.useState(4); // Number of rows per page

  // Calculate the index range of rows to display based on the current page
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const displayedRows = rows.slice(startIndex, endIndex);

  const totalPages = Math.ceil(rows.length / perPage);

  const goToNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const goToPrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tableContainer}>
        <View style={styles.fixedColumnsContainer}>
          <View style={styles.header}>
            {columns.slice(0, 1).map((column, index) => (
              <Text
                key={index}
                style={[
                  styles.scrollableColumnCell,
                  { width: column.width, color: '#fff' },
                ]}
              >
                {column.label}
              </Text>
            ))}
          </View>
          {displayedRows.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {Object.keys(row)
                .slice(0, 1)
                .map((key, cellIndex) => (
                  <Text
                    key={cellIndex}
                    style={[
                      styles.fixedColumnCell,
                      { width: columns[cellIndex].width },
                    ]}
                  >
                    {row[key]}
                  </Text>
                ))}
            </View>
          ))}
        </View>
        <ScrollView horizontal>
          <View>
            <View style={styles.header}>
              {columns.slice(1).map((column, index) => (
                <Text
                  key={index}
                  style={[
                    styles.scrollableColumnCell,
                    { width: column.width, color: '#fff' },
                  ]}
                >
                  {column.label}
                </Text>
              ))}
            </View>
            {displayedRows.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {Object.keys(row)
                  .slice(1)
                  .map((key, cellIndex) => (
                    <Text
                      key={cellIndex}
                      style={[
                        styles.scrollableColumnCell,
                        { width: columns[cellIndex + 1].width },
                      ]}
                    >
                      {row[key]}
                    </Text>
                  ))}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
      {/* Creative pagination design */}
      <View style={styles.pagination}>
        <TouchableOpacity
          onPress={goToPrevPage}
          disabled={page === 1}
          style={[
            styles.pageButton,
            { marginRight: 10 },
            page === 1 && styles.disabledButton,
          ]}
        >
          <Icon name="chevron-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.pageText}>
          Page {page} of {totalPages}
        </Text>
        <TouchableOpacity
          onPress={goToNextPage}
          disabled={page === totalPages}
          style={[
            styles.pageButton,
            { marginLeft: 10 },
            page === totalPages && styles.disabledButton,
          ]}
        >
          <Icon name="chevron-right" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Light gray background
  },
  noRecordsText: {
    fontSize: 14,
    color: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    width: '100%',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Light gray background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
    color: '#666',
  },
  button: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  tableContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 20,
    //borderWidth: 1,
    //borderColor: 'transparnt',
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#fff', // White background for the table
  },
  fixedColumnsContainer: {
    width: 150,
    backgroundColor: '#FFFFFF', // Light gray background for fixed columns
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#006EDA', // Theme color
    borderBottomWidth: 0,
    borderBottomColor: '#ddd',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff', // White background for rows
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  fixedColumnCell: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderWidth: 0,
    borderColor: '#ddd',
    textAlign: 'center',
    fontWeight: 'bold', // Bold font for fixed columns
  },
  scrollableColumnCell: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderWidth: 0,
    borderColor: '#ddd',
    flex: 1,
    alignSelf: 'stretch',
    textAlign: 'center',
    flexWrap: 'wrap', // Allow text wrapping
  },
  actionIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 8, // Space between icons
  },
  approveButton: {
    color: '#28a745',
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rejectButton: {
    color: '#dc3545',
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    color: '#dc3545',
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: '#FFFFFF', // Light gray background for pagination bar
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  pageButton: {
    backgroundColor: '#006EDA', // Theme color for pagination buttons
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20, // Increased border radius for a circular button effect
  },
  pageButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold', // Bold text for better visibility
  },
  pageText: {
    fontSize: 16,
    marginHorizontal: 10,
    color: '#333',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
});

export default Demo;
