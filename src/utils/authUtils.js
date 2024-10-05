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

const saveLoginData = async (userId, lastLogin) => {
    return Promise.all([
        AsyncStorage.setItem('userId', userId),
        AsyncStorage.setItem('lastLoginTime', lastLogin),
    ])
        .then(() => {
            log.info('login details stored successfully');
        })
        .catch((error) => {
            log.error('Error saving login details', error);
        });
};

const fetchLoginDataFromCache = async () => {
    try {
        const userId = await AsyncStorage.getItem('userId');
        const lastLoginTime = await AsyncStorage.getItem('lastLoginTime')
        return { userId, lastLoginTime }
    } catch (error) {
        log.error('Error saving retrieving details', error);
        throw error;
    }
}

const revokeLogData = async () => {
    return Promise.all([
        AsyncStorage.removeItem('userId'),
        AsyncStorage.removeItem('lastLoginTime'),
    ])
        .then(() => {
            log.info('Tokens revoked successfully');
        })
        .catch((error) => {
            log.error('Error revoking tokens', error);
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
    fetchLoginDataFromCache,
    saveLoginData,
    saveTokens,
    revokeLogData,
    revokeTokens
}

export default authUtils;