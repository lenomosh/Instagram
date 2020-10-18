const apiUrl = 'http://localhost:8000/api/'
export const axiosHeader = {
    'Accept' : 'application/json',
    'Content-Type': 'application/json'
}
const apiUrls = {
    user:{
        create:apiUrl+'register',
        login:apiUrl+'login',
        logout:apiUrl+'logout',
        profile:apiUrl+'profile/',
    },
    post:{
        create:apiUrl+'post',
        read:apiUrl+'post/',
        index:apiUrl+'post',
        del:apiUrl+'post/'
    },
    profile_picture:{
        read:apiUrl+'profile_picture/',
        create:apiUrl+'profile_picture'
    },
    comment:{
        create:apiUrl+'comment'
    },
    action:{
        create:apiUrl+'action',
        del:apiUrl+'action/'
    }



}
export default apiUrls
