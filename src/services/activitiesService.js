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
        return response.data;
    } catch (error) {
        log.error("Error in getting activities", error)
        throw error;
    }
}

const activitiesService = {
    getAllActivities
}

export default activitiesService;