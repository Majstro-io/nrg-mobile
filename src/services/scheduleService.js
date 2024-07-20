import apiInstances from "../config/apiInstances"
import log from "../config/logger";
import httpConstants from "../constants/httpConstants";

const SCHEDULES_BASE = "schedules"

const getAllSchedulesByActivity = async (activityId) => {
    try {
        const response = await apiInstances.nrgBackend.request({
            method: httpConstants.HTTP_METHODS.GET,
            url: `${SCHEDULES_BASE}/activity/${activityId}`
        })
        return response;
    } catch (error) {
        log.error(`Error in getting schedules for activity ${activityId}`, error)
        throw error;
    }
}

const getScheduleData = async (scheduleId) => {
    try {
        const response = await apiInstances.nrgBackend.request({
            method: httpConstants.HTTP_METHODS.GET,
            url: `${SCHEDULES_BASE}/${scheduleId}/detailed`
        })
        return response;
    } catch (error) {
        log.error(`Error in getting schedue data for schedule id ${scheduleId} `, error)
        throw error;
    }
}

const scheduleService = {
    getAllSchedulesByActivity,
    getScheduleData
}

export default scheduleService;