import AsyncStorage from '@react-native-async-storage/async-storage';
import log from '../config/logger';

const saveTokens = async (idToken, accessToken, refreshToken) => {
    return Promise.all([
        AsyncStorage.setItem('idToken', idToken),
        AsyncStorage.setItem('accessToken', accessToken),
        AsyncStorage.setItem('refreshToken', refreshToken),
    ])
        .then(() => {
            log.info('Tokens stored successfully');
        })
        .catch((error) => {
            log.error('Error saving tokens', error);
        });
};

const revokeTokens = async () => {
    return Promise.all([
        AsyncStorage.removeItem('idToken'),
        AsyncStorage.removeItem('accessToken'),
        AsyncStorage.removeItem('refreshToken'),
    ])
        .then(() => {
            log.info('Tokens revoked successfully');
        })
        .catch((error) => {
            log.error('Error revoking tokens', error);
        });
};




const authUtils = {
    saveTokens,
    revokeTokens
}

export default authUtils;