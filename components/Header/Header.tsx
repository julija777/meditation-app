import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface HeaderProps {
  name: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  variant: 'light' | 'dark';
}

 const Header: React.FC<HeaderProps> = ({ name, showBackButton = false, onBackPress, variant }) => {
  const isDarkMode = variant === 'dark';

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      {showBackButton && (
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={isDarkMode ? 'white' : 'black'} />
        </TouchableOpacity>
      )}
      <Text style={[styles.text, isDarkMode ? styles.darkText : styles.lightText]}>
        Hello {name}!
      </Text>
      <View style={styles.placeholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 64,
  },
  lightContainer: {
    backgroundColor: 'white',
  },
  darkContainer: {
    backgroundColor: '#1F2937',
  },
  backButton: {
    marginRight: 16,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  lightText: {
    color: 'black',
  },
  darkText: {
    color: 'white',
  },
  placeholder: {
    width: 32,
  },
});

export default Header;