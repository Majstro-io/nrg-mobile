import React from "react";
import { Avatar } from "native-base";
import { useNavigation } from "@react-navigation/native";

import profileImage from "../../resources/profileImage.png";
import authUtils from "../../utils/authUtils";
import navigationconstants from "../../constants/navigationConstants";
import AlertModal from "./aleart";

const LogOffButton = () => {
    const navigation = useNavigation();
    const [visible, setVisible] = React.useState(false);

    const logOut = () => {
        authUtils.revokeTokens();
        navigation.navigate(navigationconstants.PAGES.login);
    }

    return (
        <>
            <Avatar onTouchStart={() => navigation.navigate(navigationconstants.PAGES.updatePersonalDetails)} source={profileImage} size="sm" />
            <AlertModal
                errorDescription={"Please confirm to log out"}
                errorTitle={"Confirm Logout"}
                setVisible={setVisible}
                visible={visible}
                onConfirm={logOut}
            />
        </>


    );
};

export default LogOffButton;
