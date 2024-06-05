import REVIEW_API from '../axios'

const service = {
    getAllReviews() {
        return REVIEW_API.get(`/review/`);
    },
    createReview(params){
        return REVIEW_API.post('/review/', params)
    },
    updateReview(id, params){
        return REVIEW_API.put(`/review/${id}/`, params)
    },
    deleteReview(id) {
        return REVIEW_API.delete(`/review/${id}/`)
    }
}

export default service