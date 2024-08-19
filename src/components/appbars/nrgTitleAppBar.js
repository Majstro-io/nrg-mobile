import { useNavigation } from "@react-navigation/native";
import { ChevronLeftIcon, HStack, IconButton, Text, View } from "native-base"

const NrgTitleAppBar = ({ title, backNavigateTo }) => {
    const navigation = useNavigation();

    return (
        <View style={{
            justifyContent: 'flex-start',
            alignItems: 'left',
        }}>
            <HStack justifyContent="left" alignItems="center" mx="2" mt={5} >
                <IconButton
                    icon={<ChevronLeftIcon color="black.500" />}
                    onPress={() => backNavigateTo ? navigation.navigate(backNavigateTo) : null}
                    _pressed={{
                        bgColor: "transparent",
                    }}
                    bgColor="transparent"
                />
                <Text size='md' mx="-1" color='black.500'>
                    {title}
                </Text>
            </HStack>
        </View >
    )
}

export default NrgTitleAppBar;