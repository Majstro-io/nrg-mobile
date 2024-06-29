import { DarkTheme } from "@react-navigation/native";

const darkTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        background:"#444444",
        appbarColor:"#222222"
    },
};

export default darkTheme;