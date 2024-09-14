import axios from "axios";
import configs from "../configs.json"

const nrgBackend = axios.create({
    baseURL: `${configs.nrgBackendUrl}/api/${configs.nrgBackendVersion}/`,
})

const apiInstances = {
    nrgBackend
}

export default apiInstances;