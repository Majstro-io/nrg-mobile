
import React, { useState } from "react";
import { View } from "react-native";
import DropDown from "react-native-paper-dropdown";

function DropdownComponent() {
    const [showDropDown, setShowDropDown] = useState(false);
    const [gender, setGender] = useState("male");
    const genderList = [
        {
            label: "Male",
            value: "male",
        },
        {
            label: "Female",
            value: "female",
        },
        {
            label: "Others",
            value: "others",
        },
    ];

    return (
        <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center', width: '100%' }}>
            <DropDown
                label={"Gender"}
                mode={"outlined"}
                visible={showDropDown}
                showDropDown={() => setShowDropDown(true)}
                onDismiss={() => setShowDropDown(false)}
                value={gender}
                setValue={setGender}
                list={genderList}
            />
        </View>

    );
}



export default DropdownComponent;