import { ImagePage } from "../../types/Images"
import api from "../../utils/requests"


export const getTenantImages = (pageNumber: number) => {
    return api.get(`/pictures/images?size=12&page=${pageNumber}&sort=name`)

}

export const deleteImagesByTenant = (id: string) => {
    return api.delete(`/pictures/delete/${id}`)
    .then(response =>{
        return response;

    }).catch(error => {
        return error;
    })
}