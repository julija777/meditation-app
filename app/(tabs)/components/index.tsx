
import Header from "@/components/Header/Header";
import { router } from "expo-router";
import { View, Text, Button } from "react-native";



const Components = () => {
  const userName= 'Julia'
  return (
        <View style={{ flex: 1 }}>
    <Header name={userName} showBackButton={true} onBackPress={() => { } } variant="dark" />
    {/* Rest of your screen content */}

        <Button
        title="button"
          onPress={() => {}}
        >
        </Button>

    </View>
  );
};

export default Components;
