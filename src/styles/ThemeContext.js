import React, { createContext, useState, useContext } from 'react';
import { extendTheme, NativeBaseProvider } from 'native-base';

const darkTheme = extendTheme({
  colors: {
    black: {
      100: '#C4C4C4',
      200: '#7C7C7C',
      300: '#292929',
      800: '#181725',
    },
    white: {
      100: '#FFFFFF',
      200: '#F8F8F8',
      300: '#E8E8E8',
      800: '#C0C0C0',
    },
    primary: {
      50: '#6B46C1',
      100: '#6B46C1',
      200: '#6B46C1',
      300: '#6B46C1',
      400: '#6B46C1',
      500: '#6B46C1',
      600: '#a78bfa',
      700: '#6B46C1',
      800: '#6B46C1',
      900: '#6B46C1',
    },
    amber: {
      400: '#d97706',
    },
    violet: {
      700: '#6B46C1',
    },
  },
  components: {
    View: {
      baseStyle: {
        bg: 'black.800',
      },
    },
    Pressable: {
      baseStyle: {
        bg: 'black.300',
        borderColor: 'black.300',
      },
    },
    Flex: {
      baseStyle: {
        color: 'black.100',
      },
    },
    Divider: {
      baseStyle: {
        backgroundColor: 'black.100',
      },
    },
    Heading: {
      baseStyle: {
        color: 'white.100',
      },
      defaultProps: {
        size: 'xl',
        fontFamily: 'MontSemibold',
      },
    },
    Text: {
      baseStyle: {
        color: 'white.100',
      },
      defaultProps: {
        size: 'md',
        fontFamily: 'MontRegular',
      },
      sizes: {
        xl: {
          fontSize: '64px',
        },
        lg: {
          fontSize: '32px',
        },
        md: {
          fontSize: '16px',
        },
        sm: {
          fontSize: '12px',
        },
      },
    },
    FormControl: {
      baseStyle: {
        label: {
          color: 'white.100',
          fontFamily: 'MontRegular',
        },

      },
    },
    Input: {
      baseStyle: {
        color: 'white.100',
      },
    },
    Select: {
      baseStyle: {
        color: 'white.100',
        bg: 'black.800',
      },
    },
    IconButton: {
      baseStyle: {
        _icon: { size: "md" },
        _light: {
          bg: "transparent"
        },
        _pressed: { bg: "transparent" }
      }
    },
    Button: {
      baseStyle: {
        color: 'primary.600',
        borderRadius: 25
      }
    }
  },
});


const lightTheme = extendTheme({
  colors: {
    white: {
      100: '#FFFFFF',
      200: '#F8F8F8',
      300: '#E8E8E8',
      800: '#C0C0C0',
    },
    black: {
      100: '#C4C4C4',
      200: '#7C7C7C',
      300: '#292929',
      800: '#181725',
    },
    green: {
      300: '#53B175',
    },
    primary: {
      50: '#E3F2F9',
      100: '#C5E4F3',
      200: '#A2D4EC',
      300: '#7AC1E4',
      400: '#47A9DA',
      500: '#0088CC',
      600: '#007AB8',
      700: '#006BA1',
      800: '#005885',
      900: '#003F5E',
    },
    amber: {
      400: '#d97706',
    },
    violet: {
      700: '#6B46C1',
    },
    blueGray: {
      50: '#F8FAFC',
      100: '#F1F5F9',
      200: '#E2E8F0',
      300: '#CBD5E1',
      400: '#94A3B8',
      500: '#64748B',
      600: '#475569',
      700: '#334155',
      800: '#1E293B',
      900: '#0F172A',
    },
  },
  components: {
    View: {
      baseStyle: {
        bg: 'white.100',
      },
    },
    Pressable: {
      baseStyle: {
        bg: 'muted.100',
        borderColor: 'muted.200',
      },
    },
    Flex: {
      baseStyle: {
        color: 'white.800',
      },
    },
    Divider: {
      baseStyle: {
        backgroundColor: 'black.200',
      },
    },
    Heading: {
      baseStyle: {
        color: 'violet.700',
      },
      defaultProps: {
        size: 'xl',
        fontFamily: 'MontSemibold',
      },
    },
    Text: {
      baseStyle: {
        color: 'blueGray.800', // Default color for Text
      },
      defaultProps: {
        size: 'md',
        fontFamily: 'MontRegular',
      },
      sizes: {
        xl: {
          color: 'violet.400', // Customize color for xl size
        },
        lg: {
          color: 'violet.400', // Customize color for lg size
        },
        md: {
          color: 'coolGray.800', // Customize color for md size
        },
        sm: {
          color: 'coolGray.800', // Customize color for sm size
        },
      },
    },
    FormControl: {
      baseStyle: {
        label: {
          color: 'black.300',
          fontFamily: 'MontRegular',
        },
      },
    },
    Input: {
      baseStyle: {
        color: 'black.300',
      },
    },
    Select: {
      baseStyle: {
        color: 'black.300',
        bg: 'white.100',
      },
    },
  },
});



const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  const themeObject = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <NativeBaseProvider theme={themeObject}>{children}</NativeBaseProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
