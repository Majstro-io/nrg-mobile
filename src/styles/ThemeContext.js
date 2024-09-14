import React, { createContext, useState, useContext, useMemo } from 'react';
import { extendTheme, NativeBaseProvider } from 'native-base';
import { useSelector } from 'react-redux';

const defaultTheme = extendTheme({
  colors: {
    black: {
      10: '#FFFFFF',
      50: '#F7F7F7',
      100: '#E1E1E1',
      200: '#CFCFCF',
      300: '#B1B1B1',
      400: '#9E9E9E',
      500: '#7E7E7E',
      600: '#4A4A4A',
      700: '#2E2E2E',
      750: '#151515',
      800: '#000000',
    },
    white: {
      100: '#FFFFFF',
      200: '#F8F8F8',
      300: '#E8E8E8',
      800: '#C0C0C0',
    },
    primary: {
      50: '#F7F7F7',
      100: '#E1E1E1',
      200: '#CFCFCF',
      300: '#B1B1B1',
      400: '#9E9E9E',
      500: '#7E7E7E',
      600: '#4A4A4A',
      700: '#2E2E2E',
      750: '#2D2D35',
      800: '#000000',
    },
    base: {
      50: '#F9FBE7', // Very light lime green
      100: '#F0F4C3', // Light lime green
      200: '#E6EE9C', // Pale lime green
      300: '#DCE775', // Light green
      400: '#D4E157', // Lighter lime green
      500: '#DDFF5F', // Midpoint vibrant lime green (reference color)
      600: '#C4D600', // Slightly darker lime green
      700: '#AABF00', // Medium-dark lime green
      800: '#8F9D00', // Darker lime green
      900: '#6D7A00',
    },
    yellow: {
      50: '#FFF8E1',
      100: '#FFECB3',
      200: '#FFE082',
      300: '#FFD54F',
      400: '#FFCA28',
      500: '#FEDD30',
      600: '#FDBE10',
      700: '#F9A825',
      800: '#F57F17',
      900: '#EF6C00',
    },

    red: {
      50: '#FFEBEE',
      100: '#FFCDD2',
      200: '#EF9A9A',
      300: '#E57373',
      400: '#EF5350',
      500: '#F44336',
      600: '#E53935',
      700: '#D32F2F',
      800: '#C62828',
      900: '#B71C1C',
    },


    violet: {
      700: '#6B46C1',
    },
    blue: {
      50: '#e7f1ff',
      100: '#c2ddff',
      200: '#99c7ff',
      300: '#70b1ff',
      400: '#4f9eff',
      500: '#007bff',
      600: '#006fe0',
      700: '#0060bf',
      800: '#00509e',
      900: '#00397a',
    },
  },
  components: {
    View: {
      baseStyle: {
        bg: 'white.100',
      },
    },
    Modal: {
      baseStyle: {
        borderColor: 'white.300',
        bg: 'white.900',
      }
    },
    ModalHeader: {
      baseStyle: {
        color: 'white.100',
        bg: 'white.100',
        borderColor: 'white.300'
      }
    },
    ModalContent: {
      baseStyle: {
        bg: 'white.100',
      }
    },
    ModalFooter: {
      baseStyle: {
        borderColor: 'white.300',
        bg: 'white.100',
      }
    },
    Pressable: {
      baseStyle: {
        bg: 'transparent',
      },
    },
    Flex: {
      baseStyle: {
        color: 'white.100',
      },
    },
    Divider: {
      baseStyle: {
        backgroundColor: 'white.100',
      },
    },

    Text: {
      baseStyle: {
        color: 'black.800',
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
    Heading: {
      baseStyle: {
        color: 'black.800',
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
          color: 'black.800',
          fontFamily: 'MontRegular',
        },
      },
    },
    Input: {
      baseStyle: {
        color: 'black.800',
        borderColor: 'black.300',
        _focus: {
          borderColor: "black.800",
          backgroundColor: "black.50",
        },
        width: '72',
        borderRadius: '15'
      },
    },
    Select: {
      baseStyle: {
        color: 'black.800',
        bg: 'white.100',
      },
    },
    IconButton: {
      baseStyle: {
        _icon: { size: "md" },
        _light: {
          bgColor: "transparent"
        },
        _pressed: { bgColor: "transparent" }
      }
    },
    Button: {
      baseStyle: {
        bgColor: 'black.800',
        borderRadius: 25,
        width: "72",
        _loading: {
          bg: 'black.800',

        }
      },
    },
    Link: {
      baseStyle: {
        _text: {
          fontWeight: "bold",
          color: "blue.500"
        },
      }
    }
  },
});



const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const userPreferences = useSelector((state) => state.userPreferences);
  const [theme, setTheme] = useState(userPreferences.theme || 'default');

  // currently only one theme available
  const themeObject = useMemo(() => (defaultTheme), [theme]);
  const contextValue = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <NativeBaseProvider theme={themeObject}>{children}</NativeBaseProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);