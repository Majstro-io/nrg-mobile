import React, { useEffect, useState } from 'react';
import { View, Modal, StyleSheet } from 'react-native';
import { Input } from 'native-base';
import DateTimePicker from 'react-native-ui-datepicker';
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

    const handleDatePick = (params) => {
        const selectedDate = new Date(params.date);

        const formattedDate = selectedDate.getFullYear() + '-' +
            String(selectedDate.getMonth() + 1).padStart(2, '0') + '-' +
            String(selectedDate.getDate()).padStart(2, '0');

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
            <Modal transparent visible={isPickerVisible} animationType="fade">
                <View style={styles.overlay}>
                    <View style={styles.datePickerContainer}>
                        <DateTimePicker
                            mode="single"
                            value={date}
                            onChange={handleDatePick}
                            maximumDate={date}
                        />
                    </View>
                </View>
            </Modal>
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
