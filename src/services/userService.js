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
        return response.data;
    } catch (error) {
        log.error(`Error in getting user with id ${userId}`, error)
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
        return response.data;
    } catch (error) {
        log.error(`Error in adding new user`, error)
        throw error;
    }
}

const userService = {
    getUserData,
    addNewUser
}

export default userService;