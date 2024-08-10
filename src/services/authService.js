import apiInstances from "../config/apiInstances"
import log from "../config/logger";
import httpConstants from "../constants/httpConstants";

const AUTH_BASE = "auth"

const validateOTP = async (otp) => {
    try {
        const response = await apiInstances.nrgBackend.request({
            method: httpConstants.HTTP_METHODS.POST,
            url: `${AUTH_BASE}/validate`,
            data: {
                otp
            }
        })
        return response;
    } catch (error) {
        log.error(`Error in validating OTP`, error)
        throw error;
    }
}

const authService = {
    validateOTP,
}

export default authService;