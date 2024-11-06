import React, { useContext } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ButtonComponent from '@components/ButtonComponent';
import { ThemeContext } from '@context/ThemeContext';

const ModalComponent = ({
  isVisible,
  onClose,
  onButtonPress,
  children,
  showSignButton = true,
}) => {
  const { getThemeColor } = useContext(ThemeContext);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.modalContainer} onPress={onClose}>
        <View
          style={[
            styles.modalContent,
            { backgroundColor: getThemeColor('background') },
          ]}
          onStartShouldSetResponder={() => true} // Prevents the touch from propagating to the container
        >
          {children}

          {showSignButton && (
            <ButtonComponent
              title="Sign In"
              type="primary"
              onPress={onButtonPress}
              style={styles.button}
            />
          )}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    paddingVertical: 30,
    paddingHorizontal: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  closeButton: {
    marginTop: 0,
    alignSelf: 'center',
    width: '100%',
  },
  closeButtonText: {
    color: '#006EDA',
    textAlign: 'center',
  },
});

export default ModalComponent;
