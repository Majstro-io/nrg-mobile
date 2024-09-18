import { Center, Image, Text } from "native-base";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get('window');

const NrgHeader = ({ marginTop = '5%' }) => {
    return (
        <Center marginTop={marginTop}>
            <Image
                source={require("../../resources/logo/nrglogo.png")}
                alt="NRG Remix Logo"
                width={width / 2}
                height={height / 30}
                mb={3}
            />
        </Center>
    )
}

export default NrgHeader;