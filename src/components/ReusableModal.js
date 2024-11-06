import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Reusable Close Button Component
const CloseButton = ({ onPress, size = 24, color = '#000', style = {} }) => {
  return (
    <TouchableOpacity
      style={[styles.closeIconContainer, style]}
      onPress={onPress}
    >
      <Icon name="close" size={size} color={color} />
    </TouchableOpacity>
  );
};

// Reusable Title Component
const ModalTitle = ({ title, style = {} }) => {
  return <Text style={[styles.title, style]}>{title}</Text>;
};

// Reusable Modal Component
const ReusableModal = ({
  visible,
  onClose,
  title,
  content,
  padding = 20,
  showCloseButton = true,
  showTitle = true,
  titleStyle = {}, // Style for title passed as prop
}) => {
  return (
    <Modal transparent={true} animationType="none" visible={visible}>
      {/* TouchableOpacity added to close the modal when clicking outside */}
      <TouchableOpacity
        style={styles.modalContainer}
        activeOpacity={0.8} // Prevents immediate closing on inner content press
        onPress={onClose} // Closes modal when pressing outside content
      >
        <View style={[styles.modalContent, { padding }]}>
          {/* Prevent the modal content from closing the modal */}
          <TouchableOpacity activeOpacity={1}>
            {/* Conditionally Render the Close Button */}
            {showCloseButton && <CloseButton onPress={onClose} />}

            {/* Modal Title using reusable ModalTitle */}
            {showTitle && <ModalTitle title={title} style={titleStyle} />}

            {/* Modal Content */}
            <View style={styles.content}>{content}</View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    elevation: 5,
    position: 'relative',
    alignItems: 'center', // Centers the title and content horizontally
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center', // Centers the text itself
  },
  content: {
    width: '100%',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  closeIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
    zIndex: 10,
  },
});

export default ReusableModal;
