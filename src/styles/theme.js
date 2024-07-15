import { extendTheme } from 'native-base';

const darkTheme = extendTheme({
  fonts: {
    header: 'MontExtrabold',
    medium: 'MontMedium',
    regular: 'MontRegular',
    semibold: 'MontSemibold',
  },
  colors: {
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
  },
  components: {
    View: {
      baseStyle: ({ colorMode }) => ({
        bg: colorMode === 'dark' ? 'black.300' : 'light.800',
      }),
    },
    Pressable: {
      baseStyle: ({ colorMode }) => ({
        bg: colorMode === 'dark' ? 'black.300' : 'muted.100',
        borderColor: colorMode === 'dark' ? 'black.300' : 'muted.200',
      }),
    },
    Flex: {
      baseStyle: ({ colorMode }) => ({
        color: colorMode === 'dark' ? 'black.100' : 'light.800',
      }),
    },
    Divider: {
      baseStyle: ({ colorMode }) => ({
        backgroundColor: colorMode === 'dark' ? 'black.100' : 'black.200',
      }),
    },
    Heading: {
      baseStyle: ({ colorMode }) => ({
        color: colorMode === 'dark' ? 'black.100' : 'muted.50',
      }),
      defaultProps: {
        size: 'xl',
        fontFamily: 'MontSemibold',
      },
    },
    Text: {
      baseStyle: ({ colorMode }) => ({
        color: colorMode === 'dark' ? 'black.100' : 'black.300',
      }),
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
      baseStyle: ({ colorMode }) => ({
        label: {
          color: colorMode === 'dark' ? 'black.100' : 'black.300',
          fontFamily: 'MontRegular', // Adjust fontFamily as needed
        },
      }),
    },
  },
});

export default darkTheme;
