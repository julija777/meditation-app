import React from 'react';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface HeaderProps {
  name: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  variant: 'light' | 'dark';
}

const Header: React.FC<HeaderProps> = ({ name, showBackButton = false, onBackPress, variant }) => {
  const isDarkMode = variant === 'dark';

  return (
    <View className={`flex-row items-center justify-between p-16 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      {showBackButton && (
         <Pressable
         onPress={() => router.back()}
         className="right-6"
     >
         <AntDesign name="leftcircleo" size={50} color={isDarkMode ? 'white' : 'black'} />
        </Pressable>
      )}
      <Text className={`text-2xl font-bold mr-24 ${isDarkMode ? 'text-white' : 'text-black'}`}>
        Hello {name}!
      </Text>
    </View>
  );
};

export default Header;
