import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input } from 'native-base';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';
import { TouchableOpacity } from 'react-native-gesture-handler';

const DateInput = ({ label, onChange, value }) => {
    const [date, setDate] = useState(dayjs());
    const [isPickerVisible, setIsPickerVisible] = useState(false);

    useEffect(() => {
        handleDateChange(value)
    }, [])

    const handleDateChange = (text) => {
        if (text) {
            // Format the input as YYYY-MM-DD
            let formattedDate = text.replace(/\D/g, ''); // Remove non-numeric characters
            if (formattedDate.length >= 4) {
                formattedDate = `${formattedDate.slice(0, 4)}-${formattedDate.slice(4, 6)}`;
            }
            if (formattedDate.length > 6) {
                formattedDate = `${formattedDate.slice(0, 7)}-${formattedDate.slice(6, 8)}`;
            }

            setDate(formattedDate);
            onChange(formattedDate);
        }
    };

    const handleDatePick = (selectedDate) => {
        const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD');
        setDate(formattedDate);
        onChange(formattedDate);
        setIsPickerVisible(false);
    }

    return (
        <View >
            <TouchableOpacity onPressIn={() => setIsPickerVisible(true)} activeOpacity={1}>
                <Input
                    placeholder={label}
                    maxLength={10}
                    value={date}
                    editable={false}
                />
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isPickerVisible}
                mode="date"
                date={new Date(date)}
                maximumDate={new Date()}
                onConfirm={handleDatePick}
                onCancel={() => setIsPickerVisible(false)}
                textColor='#ff1111'
                accentColor='#ff1111'
                style={{ backgroundColor: '#ff1111' }}
            />
        </View>


    )
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
        justifyContent: 'center', // Center vertically
        alignItems: 'center',    // Center horizontally
    },
    datePickerContainer: {
        backgroundColor: 'white', // Picker background color
        padding: 20,
        borderRadius: 10,
    },
    triggerButton: {
        marginTop: 50, // Add some margin for trigger button
    },
});


export default DateInput;
