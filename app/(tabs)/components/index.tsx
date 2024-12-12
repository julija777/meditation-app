
import Header from "@/components/Header/Header";
import { router } from "expo-router";
import { View, Text, Button } from "react-native";



const Components = () => {
  const userName= 'I am Header'
  return (
        <View style={{ flex: 1 }}>
        <Header name={userName} showBackButton={true} onBackPress={() => { router.back();} } variant="dark" />
        <Button
        title="button"
          onPress={() => {}}
        >
        </Button>

    </View>
  );
};

export default Components;
