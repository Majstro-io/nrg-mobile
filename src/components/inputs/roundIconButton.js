import { IconButton } from 'native-base';
import React from 'react';
import { Dimensions } from 'react-native';

const RoundIconButton = ({ onPress, color, size, icon, ...props }) => {

    const { width } = Dimensions.get('window'); // Get screen width

    return (
        <IconButton
            _icon={icon}
            bgColor={color}
            width={width * size}
            height={width * size}
            rounded="full"
            onPress={onPress}
            props
        />
    )
}

export default RoundIconButton;