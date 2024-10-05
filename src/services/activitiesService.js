import qs from 'qs';

import apiInstances from "../config/apiInstances"
import log from "../config/logger";
import httpConstants from "../constants/httpConstants";

const ACTIVITIES_BASE = "activities"

const getAllActivities = async () => {
    try {
        const response = await apiInstances.nrgBackend.request({
            method: httpConstants.HTTP_METHODS.GET,
            url: ACTIVITIES_BASE
        })
        return response;
    } catch (error) {
        log.error("Error in getting activities", error)
        throw error;
    }
}

const getDetailedActivityById = async (activityId) => {
    try {
        const response = await apiInstances.nrgBackend.request({
            method: httpConstants.HTTP_METHODS.GET,
            url: `${ACTIVITIES_BASE}/${activityId}/detailed`
        })
        return response;
    } catch (error) {
        log.error("Error in getting detailed activity data", error)
        throw error;
    }
}

const getActivitiesByType = async (types) => {
    const params = {
        types: [types]
    };
    try {
        const response = await apiInstances.nrgBackend.request({
            method: httpConstants.HTTP_METHODS.GET,
            url: `${ACTIVITIES_BASE}/type`,
            params,
            paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' })
        })
        return response;
    } catch (error) {
        log.error("Error in getting activities by type", error)
        throw error;
    }
}

const activitiesService = {
    getAllActivities,
    getActivitiesByType,
    getDetailedActivityById
}

export default activitiesService;