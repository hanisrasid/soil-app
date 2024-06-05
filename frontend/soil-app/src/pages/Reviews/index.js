import React, {useState, useEffect} from 'react';

import { useLogStatus } from "../../shared/components/LogStatusContext"

import '../../shared/components/Forms/forms.css';
import './Reviews.css';

import Review from "./Review";

import ITEM_API from '../../api/services/Item';
import REVIEW_API from '../../api/services/Review';

function Reviews() {

    const [comment, setComment] = useState();
    const [items, setItems] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [currentItem, setCurrentItem] = useState(0);
    const [stars, setStars] = useState(0);

    const [editMode, setEditMode] = useState([]);

    const [formData, setFormData] = useState({});

    const [successCreateReview, setSuccessCreateReview] = useState(false);
    const [starError, setStarError] = useState(false);

    const logStatus = useLogStatus();

    //Get Items
    useEffect(() => {
        ITEM_API.getAllItems()
            .then((result)=>{
                setItems(result.data);
            })
            .catch(error => console.error("Error: ", error))

        REVIEW_API.getAllReviews()
            .then((result)=>{
                const newReviews = result.data;

                //Put current users' reviews on top
                newReviews.sort((a, b) => {
                    if (a.userID === logStatus) return -1;
                    if (b.userID === logStatus) return 1;
                    return 0;
                });

                setReviews(newReviews);

                const editObject = {};

                result.data.forEach(item => {
                    editObject[item.id] = false;
                });

                setEditMode(editObject);
            })
            .catch(error => console.error("Error: ", error))
    }, [logStatus])

    //Submit form logic
    function createReview(e) {
        e.preventDefault();

        if(stars === 0) {
            setStarError(true);
            return false;
        }

        REVIEW_API.createReview({itemID: currentItem, userID: logStatus, comment: comment, stars: stars})
            .then(()=>{
                setSuccessCreateReview("Created");
            })
            .catch(error => console.error("Error: ", error))
    }
        
    function checkMaxWordLength(obj) {
        const maxWordLength = 100;
        var currWordLength = obj.value.split(/[\s]+/);
        if(currWordLength.length > maxWordLength){
            return false;
        }
        else {
            setComment(obj.value);
        }
        return true;
    }

    function deleteReview(id) {
        REVIEW_API.deleteReview(id)
            .then(()=>{
                setSuccessCreateReview("Deleted");
            })
            .catch(error => console.error("Error: ", error))
    }

    function editReview(id, stars, comment, itemID) {
        if(!Object.values(editMode).some(element => element === true)) {
            setEditMode(
                prev => ({
                    ...prev,
                    [id]: true
                }
            ));
        }

        setFormData(prevState => ({
            ...prevState,
            [id]: {
                stars: stars,
                comment: comment,
                itemID: itemID
            }
        }));
    }

    function saveReview(id, e) {
        e.preventDefault();

        setEditMode(
            prevState => ({
                ...prevState,
                [id]: false
            }
        ));

        const reviewID = Object.keys(formData)[0];
        REVIEW_API.updateReview(reviewID, {itemID : formData[reviewID].itemID, comment : formData[reviewID].comment, 
        stars : formData[reviewID].stars})
            .then(()=>{
                setSuccessCreateReview("Edited");
            })
            .catch(error => console.error("Error: ", error))

        setFormData({});
        
    }

    function editForm(id, e) {
        const { name, value } = e.target;

        if(name === "comment") {
            const maxWordLength = 100;
            var currWordLength = value.split(/[\s]+/);
            if(currWordLength.length <= maxWordLength){
                setFormData(prevState => ({
                    ...prevState,
                    [id]: {
                        ...prevState[id],
                        [name]: value
                    }
                }));
            }
        }
        else {
            setFormData(prevState => ({
                ...prevState,
                [id]: {
                    ...prevState[id],
                    [name]: value
                }
            }));
        }
    }

    return (
        <>
            {successCreateReview ?
            <div className="notification">
                <div className="popup-inner">
                    <h2>Successfully {successCreateReview} Review!</h2>
                    <button className="close-notif" onClick={() => window.location.reload()}>&times;</button>
                    <div>
                        Close this window to view reviews.
                    </div>
                </div>
            </div>
            : null
            }

            { logStatus !== null ?
                <div>
                    <div className='center'>
                        <h2 className='center'>Create a Review</h2>
                    </div>
                    <form className="center box" onSubmit={createReview}>
                        <div className="form-group">
                            <label htmlFor="">Product:</label>
                            <select value={currentItem} onChange={(e) => setCurrentItem(e.target.value)}>
                                <option key={0} value={0}>
                                    General Review
                                </option>
                                {items.map((item) => {
                                    return (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    );
                                })}
                            </select>

                        </div>
                        <div className="form-group">
                            <label htmlFor="inputComment">Comment (max 100 words):</label>
                            <textarea placeholder="Share your own experience with this product" className="form-control" name="inputComment" value={comment} onChange={(e) => checkMaxWordLength(e.target)} required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputStars">Stars:</label>
                            <div>
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <span key={value} onClick={() => setStars(value)} className="star" style={{color: value <= stars ? "gold" : "gray"}}>
                                        ★
                                    </span>
                                ))}
                            </div>

                            {starError 
                                ? <p className="incorrect center">Please Select a Star!</p>
                                : null
                            }
                        </div>
                        <button type="submit" className="my-btn btn-success" required>Create Review</button>
                    </form>
                </div>
            : null
            }

            <div className='center'>
                <h2 className='center'>List of Reviews</h2>
            </div>

            <div className='center'>
                {reviews.map((review) => {
                    return (
                        <div key={review.id} className='center box'>
                            <Review
                                id={review.id}
                                comment={review.comment}
                                userFullName={review.user.fullName}
                                userID={review.user.id}
                                item={review.item ? review.item.name : 'General Review'}
                                itemID={review.item ? review.item.id : 0}
                                stars={review.stars}
                                currentUserID={Number(logStatus)}
                                deleteReview={deleteReview}
                                editReview={editReview}
                                editMode={editMode}
                                setEditMode={setEditMode}
                                saveReview={saveReview}
                                items={items}
                                chageItems={items}
                                editForm={editForm}
                                formData={formData}
                            />
                        </div>
                    );
                })}
            </div>
        </>
    )
}

export default Reviews