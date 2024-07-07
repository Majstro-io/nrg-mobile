import { useNavigation } from "@react-navigation/native";
import { FavouriteIcon, HStack, IconButton, Switch, ThreeDotsIcon, View } from "native-base"
import navigationconstants from "../../constants/navigationConstants";

const NrgActivitiesAppBar = ({ onFavouriteToggle, isFavourite }) => {
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
                        icon={<FavouriteIcon />}
                        _icon={{ color: "violet.700", size: "md" }}
                        _light={{
                            bg: "transparent"
                        }}
                        _pressed={{ bg: "transparent" }}

                    />
                    <Switch onTrackColor={"violet.700"} value={isFavourite} onToggle={onFavouriteToggle} size="sm" />
                </HStack>
            </HStack>
        </View>
    )
}

export default NrgActivitiesAppBar;