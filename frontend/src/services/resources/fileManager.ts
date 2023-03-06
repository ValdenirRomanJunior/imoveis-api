import api from "../../utils/requests"


export const getTenantImages = () => {
    return api.get('/pictures/images')
}

export const deleteImagesByTenant = (id: string) => {
    return api.delete(`/pictures/delete/${id}`)
    .then(response =>{
        return response;

    }).catch(error => {
        return error;
    })
}