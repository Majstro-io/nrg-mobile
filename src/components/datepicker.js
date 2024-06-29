import React from "react";
import { View } from "react-native";
import { TextInput } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import conversionUtils from "../utils/conversionUtils";

export default function DatePicker({ label, onSelect }) {
    const [date, setDate] = React.useState(null);
    const [open, setOpen] = React.useState(false);

    const onDismissSingle = React.useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    const onConfirmSingle = React.useCallback(
        (params) => {
            setOpen(false);
            setDate(params.date);
            if (onSelect) {
                onSelect(params.date);
            }
        },
        [setOpen, setDate]
    );

    return (
        <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center', width: '100%' }} >
            <TextInput
                style={{
                    width: '100%',
                    marginBottom: 20,
                }}
                label={label}
                value={conversionUtils.formatDate(date)}
                 mode="outlined"
                onPress={() => setOpen(true)}
            />
            <DatePickerModal
                locale="en"
                mode="single"
                visible={open}
                onDismiss={onDismissSingle}
                date={date}
                onConfirm={onConfirmSingle}
            />
        </View>
    )
}