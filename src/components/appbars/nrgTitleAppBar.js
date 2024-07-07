import { useNavigation } from "@react-navigation/native";
import { ChevronLeftIcon, Heading, HStack, IconButton, View } from "native-base"

const NrgTitleAppBar = ({ title, backNavigateTo }) => {
    const navigation = useNavigation();

    return (
        <View style={{
            justifyContent: 'flex-start',
            alignItems: 'left',
            marginTop: 50,
        }}>
            <HStack space={3} justifyContent="left" alignItems="center" mx="5">
                <IconButton icon={<ChevronLeftIcon />} _icon={{
                    color: "violet.700",
                    size: "md",
                }}
                    _pressed={{
                        bg: "transparent"
                    }}
                    _light={{
                        bg: "transparent"
                    }}
                    onPress={() => backNavigateTo ? navigation.navigate(backNavigateTo) : null}
                />
                <Heading size="xl">
                    {title}
                </Heading>
            </HStack>
        </View >
    )
}

export default NrgTitleAppBar;