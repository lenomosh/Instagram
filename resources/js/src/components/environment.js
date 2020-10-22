export const siteUrl = "http://localhost:8000"
const apiUrl = siteUrl+'/api/'

export const axiosHeader = {
    'Accept' : 'application/json',
    'Content-Type': 'application/json'
}
const apiUrls = {
    profile:{
        update:apiUrl+'profile/',
        search:apiUrl+'search',
        read:apiUrl+'profile/',
        index:apiUrl+'profile'
    },
    follower:{
        create:apiUrl+'follower',
        del:apiUrl+'follower/'
    },
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
    like:{
        create:apiUrl+'like',
        del:apiUrl+'like/'
    }



}
export default apiUrls
