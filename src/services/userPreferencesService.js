import apiInstances from "../config/apiInstances"
import log from "../config/logger";
import httpConstants from "../constants/httpConstants";

const USER_PREFERENCES_BASE = "user-preperences"

const getUserPreferenceData = async (userId) => {
    try {
        const response = await apiInstances.nrgBackend.request({
            method: httpConstants.HTTP_METHODS.GET,
            url: `${USER_PREFERENCES_BASE}/profile/${userId}`
        })
        return response;
    } catch (error) {
        log.error(`Error in getting user preferences for user with id ${userId}`, error)
        throw error;
    }
}

const addNewUserPreference = async (userPreferenceData) => {
    try {
        const response = await apiInstances.nrgBackend.request({
            method: httpConstants.HTTP_METHODS.POST,
            url: `${USER_PREFERENCES_BASE}`,
            data: userPreferenceData
        })
        return response;
    } catch (error) {
        log.error(`Error in adding new user preference`, error)
        throw error;
    }
}

const updateUserPreference = async (userPreferenceId, userPreferenceData) => {
    try {
        const response = await apiInstances.nrgBackend.request({
            method: httpConstants.HTTP_METHODS.PUT,
            url: `${USER_PREFERENCES_BASE}/${userPreferenceId}`,
            data: userPreferenceData
        })
        return response;
    } catch (error) {
        log.error(`Error in updating user preference`, error)
        throw error;
    }
}

const updateUserFavouriteActivities = async (userPreferenceId, favouriteActivityIds) => {
    try {
        const response = await apiInstances.nrgBackend.request({
            method: httpConstants.HTTP_METHODS.PUT,
            url: `${USER_PREFERENCES_BASE}/${userPreferenceId}/favourites`,
            data: favouriteActivityIds
        })
        return response;
    } catch (error) {
        log.error(`Error in updating user favourites`, error)
        throw error;
    }
}

const userPreferencesService = {
    getUserPreferenceData,
    addNewUserPreference,
    updateUserPreference,
    updateUserFavouriteActivities
}

export default userPreferencesService;