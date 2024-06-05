import USER_API from '../axios'

const service = {
    userLogin(params){
        return USER_API.post('/user/login', params)
    },
    getUserDetails(id){
        return USER_API.get(`/user/${id}`)
    },
    userSignUp(params){
        return USER_API.post('/user/', params)
    },
    updateUserDetails(params) {
        return USER_API.put(`/user/update`, params)
    },
    deleteUser(id){
        return USER_API.delete(`/user/${id}`)
    }
}

export default service