import {request} from "./request";

export function getHomepage() {
    return request({
        method:"GET",
        url: '/homepage'
    })
  };

  export const getProducts = (params)=> {
    return request({
        method:"GET",
        url: '/products',
        params,
    })
  }