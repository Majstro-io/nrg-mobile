import apiInstances from "../config/apiInstances"
import log from "../config/logger";
import httpConstants from "../constants/httpConstants";

const USERS_BASE = "user-profiles"

const getUserData = async (userId) => {
    try {
        const response = await apiInstances.nrgBackend.request({
            method: httpConstants.HTTP_METHODS.GET,
            url: `${USERS_BASE}/${userId}`
        })
        return response;
    } catch (error) {
        log.error(`Error in getting user with id ${userId}`, error)
        throw error;
    }
}

const getUserDataFromMobileNumber = async (mobileNumber) => {
    try {
        const response = await apiInstances.nrgBackend.request({
            method: httpConstants.HTTP_METHODS.GET,
            url: `${USERS_BASE}/mobile/${mobileNumber}`
        })
        return response;
    } catch (error) {
        log.error(`Error in getting user with mobile ${mobileNumber}`, error)
        throw error;
    }
}

const addNewUser = async (userData) => {
    try {
        const response = await apiInstances.nrgBackend.request({
            method: httpConstants.HTTP_METHODS.POST,
            url: `${USERS_BASE}`,
            data: userData
        })
        return response;
    } catch (error) {
        log.error(`Error in adding new user`, error)
        throw error;
    }
}

const updateUser = async (userId, userData) => {
    try {
        const response = await apiInstances.nrgBackend.request({
            method: httpConstants.HTTP_METHODS.PUT,
            url: `${USERS_BASE}/${userId}`,
            data: userData
        })
        return response;
    } catch (error) {
        log.error(`Error in updating user with id ${userId}`, error)
        throw error;
    }
}

const userService = {
    addNewUser,
    getUserData,
    getUserDataFromMobileNumber,
    updateUser
}

export default userService;