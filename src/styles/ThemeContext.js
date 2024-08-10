import React, { createContext, useState, useContext, useMemo } from 'react';
import { extendTheme, NativeBaseProvider } from 'native-base';
import { useSelector } from 'react-redux';

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
      600: '#6B46C1',
      700: '#6B46C1',
      800: '#888888',
      900: '#E8E8E8',
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
        bg: 'white.800',
        borderColor: 'white.300',
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
          bg: "transparent"
        },
        _pressed: { bg: "transparent" }
      }
    },
    Button: {
      baseStyle: {
        color: 'primary.700',
        borderRadius: 300
      }
    }
  },
});



const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const userPreferences = useSelector((state) => state.userPreferences);
  const [theme, setTheme] = useState(userPreferences.theme || 'dark');

  const themeObject = useMemo(() => (theme === 'dark' ? darkTheme : lightTheme), [theme]);
  const contextValue = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <NativeBaseProvider theme={themeObject}>{children}</NativeBaseProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
