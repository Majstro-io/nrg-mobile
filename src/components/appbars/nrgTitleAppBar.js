import { useNavigation } from "@react-navigation/native";
import { ChevronLeftIcon, HStack, IconButton, Text, View } from "native-base"

const NrgTitleAppBar = ({ title, backNavigateTo }) => {
    const navigation = useNavigation();

    return (
        <View style={{
            justifyContent: 'flex-start',
            alignItems: 'left',
            backgroundColor: 'transparent'
        }}>
            <HStack justifyContent="left" alignItems="center" mx="2" mt={5} >
                <IconButton
                    icon={<ChevronLeftIcon color="black.800" />}
                    onPress={() => backNavigateTo ? navigation.navigate(backNavigateTo) : null}
                    _pressed={{
                        bgColor: "transparent",
                    }}
                    bgColor="transparent"
                />
                <Text onPress={() => backNavigateTo ? navigation.navigate(backNavigateTo) : null} fontWeight={"bold"} size='md' color='black.800'>
                    {title}
                </Text>
            </HStack>
        </View >
    )
}

export default NrgTitleAppBar;