import React, { useState } from 'react';
import { View } from 'react-native';
import { Input } from 'native-base';

const DateInput = ({ label, onChange }) => {
    const [date, setDate] = useState('');

    const handleDateChange = (text) => {
        // Format the input as MM/DD/YYYY
        let formattedDate = text.replace(/\D/g, ''); // Remove non-numeric characters
        if (formattedDate.length > 2) {
            formattedDate = `${formattedDate.slice(0, 2)}/${formattedDate.slice(2)}`;
        }
        if (formattedDate.length > 5) {
            formattedDate = `${formattedDate.slice(0, 5)}/${formattedDate.slice(5, 9)}`;
        }

        setDate(formattedDate);
        onChange(formattedDate);
    };

    return (
        <View >
            <Input
                placeholder={label}
                keyboardType="numeric"
                maxLength={10}
                value={date}
                onChangeText={handleDateChange}
            />
        </View>
    );
};



export default DateInput;
