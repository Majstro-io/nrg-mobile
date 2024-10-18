import React from 'react';
import { Dimensions } from 'react-native';
import { Button } from "native-base"

const RoundButton = ({ onPress, color, text, size, icon }) => {

    const { width } = Dimensions.get('window'); // Get screen width

    return (
        <Button
            bgColor={color}
            width={width * size}
            height={width * size}
            rounded="full"
            _icon={icon}
            onPress={onPress}
            _text={{ fontSize: '2xl', color: 'text.100' }}
        >
            {text}
        </Button>
    )
}

export default RoundButton;