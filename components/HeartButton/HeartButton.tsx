import AsyncStorage from "@react-native-async-storage/async-storage";


const HeartButton = ({ result }: { result: PostcodeResult | null }) => {
    const addToFavorites = async () => {
      if (!result) return;
      try {
        const savedFavorites = await AsyncStorage.getItem("favorites");
        const favorites = JSON.parse(savedFavorites || "[]");
        const updatedFavorites = [
          ...favorites,
          { postcode: result.postcode, region: result.region },
        ];
        await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        Alert.alert("Success", "Postcode added to favorites");
      } catch (error) {
        console.error("Error adding to favorites:", error);
        Alert.alert("Error", "Failed to add postcode to favorites");
      }
    };
  
    return (
      <TouchableOpacity
        onPress={addToFavorites}
        style={{ marginRight: 10 }}>
        <Ionicons
          name="heart"
          size={24}
          color={result ? "red" : "gray"}
        />
      </TouchableOpacity>
    );
  };
  