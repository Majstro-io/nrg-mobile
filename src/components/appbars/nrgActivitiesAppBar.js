import { useNavigation } from "@react-navigation/native";
import { HStack, IconButton, SearchIcon, ThreeDotsIcon, View } from "native-base"
import navigationconstants from "../../constants/navigationConstants";

const NrgActivitiesAppBar = () => {
    const navigation = useNavigation();

    return (
        <View style={{ alignItems: 'left' }}>
            <HStack justifyContent="space-between" alignItems="center">
                <HStack space={2} justifyContent="space-between" alignItems="center" mx="5" mt="5">
                    <IconButton
                        icon={<ThreeDotsIcon />}
                        _icon={{ color: "violet.700", size: "md" }}
                        _light={{
                            bg: "transparent"
                        }}
                        _pressed={{ bg: "transparent" }}
                        onPress={() => navigation.navigate(navigationconstants.PAGES.preferences)}
                    />
                </HStack>
                <HStack space={2} justifyContent="space-between" alignItems="center" mx="5" mt="5">
                    <IconButton
                        icon={<SearchIcon />}
                        _icon={{ color: "violet.700", size: "md" }}
                        _light={{
                            bg: "transparent"
                        }}
                        _pressed={{ bg: "transparent" }}
                        onPress={() => alert('Button Pressed')}
                    />
                </HStack>
            </HStack>
        </View>
    )
}

export default NrgActivitiesAppBar;