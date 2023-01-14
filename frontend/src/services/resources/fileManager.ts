import api from "../../utils/requests"


export const getTenantImages = () => {
    return api.get('/pictures/images')
}