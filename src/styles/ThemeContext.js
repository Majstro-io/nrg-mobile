import React, { createContext, useState, useContext, useMemo } from 'react';
import { CheckIcon, extendTheme, NativeBaseProvider } from 'native-base';
import { useSelector } from 'react-redux';

const defaultTheme = extendTheme({
  colors: {
    black: {
      10: '#FFFFFF',
      50: '#F4F4F6',
      100: '#DEDEE2',
      200: '#C8C8CE',
      300: '#B2B2BA',
      400: '#9D9DA6',
      500: '#868690',
      600: '#5E5E66',
      700: '#3F3F47',
      750: '#292A22', // default gray
      800: '#1B1B23',
      850: '#0b0b17', // button
    },

    inputFont: {
      300: '#B1B1B1',
    },

    text: {
      100: '#ffffff',
      300: '#B1B1B1',
      600: '#2D2D35',
      900: '#0b0b17'
    },

    heading: {
      100: '#ffffff',
      900: '#151515'
    },

    background: {
      100: '#0F1511',
      200: '#2d2d35'
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
      750: '#2D2D35', // card
      800: '#000000',
    },

    base: {
      50: '#F6FFE5',
      100: '#ECFFC7',
      200: '#E2FFAA',
      300: '#D5FF8B',
      400: '#CAFF71',
      500: '#97ff00', // base default
      600: '#B8E64F',
      700: '#9ACC40',
      800: '#7CB131',
      900: '#5E9721',
      1000: '#4B7A18'
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




  fontConfig: {
    Rajdhani: {
      100: {
        normal: 'Rajdhani-Regular',
        medium: 'Rajdhani-Medium',
        semi_bold: 'Rajdhani-SemiBold',
        bold: 'Rajdhani-Bold'
      },
      200: {
        normal: 'Rajdhani-Regular',
        medium: 'Rajdhani-Medium',
        semi_bold: 'Rajdhani-SemiBold',
        bold: 'Rajdhani-Bold'
      },
      300: {
        normal: 'Rajdhani-Regular',
        medium: 'Rajdhani-Medium',
        semi_bold: 'Rajdhani-SemiBold',
        bold: 'Rajdhani-Bold'
      },
      400: {
        normal: 'Rajdhani-Regular',
        medium: 'Rajdhani-Medium',
        semi_bold: 'Rajdhani-SemiBold',
        bold: 'Rajdhani-Bold'
      },
      500: {
        normal: 'Rajdhani-Regular',
        medium: 'Rajdhani-Medium',
        semi_bold: 'Rajdhani-SemiBold',
        bold: 'Rajdhani-Bold'
      },
      600: {
        normal: 'Rajdhani-Regular',
        medium: 'Rajdhani-Medium',
        semi_bold: 'Rajdhani-SemiBold',
        bold: 'Rajdhani-Bold'
      },
      700: {
        normal: 'Rajdhani-Regular',
        medium: 'Rajdhani-Medium',
        semi_bold: 'Rajdhani-SemiBold',
        bold: 'Rajdhani-Bold'
      },
      800: {
        normal: 'Rajdhani-Regular',
        medium: 'Rajdhani-Medium',
        semi_bold: 'Rajdhani-SemiBold',
        bold: 'Rajdhani-Bold'
      },
      900: {
        normal: 'Rajdhani-Regular',
        medium: 'Rajdhani-Medium',
        semi_bold: 'Rajdhani-SemiBold',
        bold: 'Rajdhani-Bold'
      },
    },
  },
  fonts: {
    heading: 'Rajdhani',
    body: 'Rajdhani',
    mono: 'Rajdhani',
  },

  fontSizes: {
    xl: '64px',
    lg: '32px',
    md: '16px',
    sm: '12px',
  },


  components: {
    View: {
      baseStyle: {
        bg: 'background.200',
      },
    },
    Modal: {
      baseStyle: {
        borderColor: 'background.200',
        bg: 'transparent',
      }
    },
    ModalHeader: {
      baseStyle: {
        color: 'white.100',
        bg: 'background.200',
        borderColor: 'background.200'
      }
    },
    ModalContent: {
      baseStyle: {
        bg: 'background.200',
      }
    },
    ModalFooter: {
      baseStyle: {
        borderColor: 'background.200',
        bg: 'background.200',
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
      defaultProps: {
        color: 'text.100',
        fontFamily: 'body',
        fontStyle: 'normal'
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
        color: 'text.100',
        fontFamily: 'heading',
        fontStyle: 'semi_bold',
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
          color: 'text.100',
        },
      },
    },

    Input: {
      defaultProps: {
        color: 'text.100',
        borderColor: 'black.300',
        _focus: {
          borderColor: "black.300",
          backgroundColor: "black.800",
        },
        _input: {
          cursorColor: 'base.500',
          selectionColor: 'base.500'
        },
        _autfill: {
          backgroundColor: 'transparent'
        },
        width: '72',
        borderRadius: '15',
      },
    },
    Select: {
        baseStyle: {
          _selectedItem: {
            bg: 'base.200',  
            endIcon: <CheckIcon size="5" />,
          },
          color: 'text.100',
          _item: {
            bg: 'background.500',  
            color: 'text.100',
            _pressed: {
              bg: 'base.100',  
            },
          },
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
      defaultProps: {
        backgroundColor: 'black.850',
        borderRadius: 25,
        width: "72",
        _loading: {
          bg: 'black.850',
        },
        _text: {
          fontFamily: 'heading',
          fontStyle: 'bold',
          letterSpacing: 1, 
          color: 'base.500',
        },
        _pressed: {
          bg: 'black.850',
        },
        _hover: {
          bg: 'black.850',
        },
      },
    },
    Link: {
      defaultProps: {
        _text: {
          color: "base.500",
          fontFamily: 'body',
          fontStyle: 'bold',
          fontSize: 'md',
        },
      },
    }
  },
});

const ThemeContext = createContext();

const customFonts = {
  'Rajdhani-Regular': require("../../assets/fonts/Rajdhani-Regular.ttf"),
  'Rajdhani-Bold': require("../../assets/fonts/Rajdhani-Bold.ttf"),
  'Rajdhani-Medium': require("../../assets/fonts/Rajdhani-Medium.ttf"),
  'Rajdhani-SemiBold': require("../../assets/fonts/Rajdhani-SemiBold.ttf"),
};

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
