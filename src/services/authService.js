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

const login = async (otp, mobile) => {
    try {
        const response = await apiInstances.nrgBackend.request({
            method: httpConstants.HTTP_METHODS.POST,
            url: `${AUTH_BASE}/login`,
            data: {
                otp: otp,
                mobileNo: mobile
            }
        })
        return response;
    } catch (error) {
        log.error(`Error in login with otp and mobile number`, error)
        throw error;
    }
}

const authService = {
    validateOTP,
    login
}

export default authService;