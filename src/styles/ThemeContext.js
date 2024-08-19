import React, { createContext, useState, useContext, useMemo } from 'react';
import { extendTheme, NativeBaseProvider } from 'native-base';
import { useSelector } from 'react-redux';
import { _View } from 'react-native';

const darkTheme = extendTheme({
  colors: {
    black: {
      100: '#C4C4C4',
      200: '#7C7C7C',
      300: '#292929',
      800: '#181725',
      900: '#181725ee',
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
      800: '#292929',
      900: '#181725',
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
    Modal: {
      baseStyle: {
        borderColor: 'black.300',
        bg: 'black.900',
      }
    },
    ModalHeader: {
      baseStyle: {
        color: 'white.100',
        bg: 'black.800',
        borderColor: 'black.300'
      }
    },
    ModalContent: {
      baseStyle: {
        bg: 'black.800',
      }
    },
    ModalFooter: {
      baseStyle: {
        borderColor: 'black.300',
        bg: 'black.800',
      }
    },
    Pressable: {
      baseStyle: {
        bg: 'transparent',
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
        backgroundColor: 'black.800',
        borderRadius: 25,
        width: "72",
        _loading: {
          bg: 'black.800',

        }
      },
    },
  },
});

const lightTheme = extendTheme({
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
      800: '#000000',
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
  const [theme, setTheme] = useState(userPreferences.theme || 'dark');

  const themeObject = useMemo(() => (theme === 'light' ? darkTheme : lightTheme), [theme]);
  const contextValue = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <NativeBaseProvider theme={themeObject}>{children}</NativeBaseProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
