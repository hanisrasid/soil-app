import React from "react";

function Review(props) {
    const editMode = props.editMode[props.id];
    return (
        //Edit Mode
        <div>
            {
            editMode ?
                <div>
                    <form onSubmit={(e) => props.saveReview(props.id, e)}>
                        <div className="form-group">
                            <label>Product:</label>
                            <select name="itemID" value={props.formData[props.id]?.itemID} onChange={(e) => props.editForm(props.id, e)}>
                                <option key={0} value={0}>
                                    General Review
                                </option>
                                {props.items.map((item) => {
                                    return (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    );
                                })}
                            </select>

                        </div>
                        <div className="form-group">
                            <label htmlFor="comment">Comment (max 100 words):</label>
                            <textarea placeholder="Share your own experience with this product" className="form-control" name="comment" value={props.formData[props.id]?.comment} onChange={(e) => props.editForm(props.id, e)} required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputStars">Stars:</label>
                            <div>
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <span key={value} onClick={() => props.editForm(props.id, { target: { name: 'stars', value } })} className="star" style={{color: value <= props.formData[props.id]?.stars ? "gold" : "gray"}}>
                                        ★
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="center"><button type="submit" className="btn btn-primary" style={{ fontSize: "12px" }}>Save Review</button></div>
                    </form>
                </div>
            :
            // Not Edit Mode
            <div style={{marginLeft: 10, marginBottom: 10}}>
                <div><b>{props.item}</b></div>
                <div>User: <b>{props.userFullName}</b></div>
                <div>
                    {[1, 2, 3, 4, 5].map((value) => (
                        <span key={value} className="small-star" style={{color: value <= props.stars ? "gold" : "gray"}}>
                            ★
                        </span>
                    ))}
                </div>
                <div style={{marginBottom: 10}}>"{props.comment}"</div>
                {props.currentUserID === props.userID ?
                    <div>
                        <button className="btn btn-success" style={{ fontSize: "12px", marginRight: "10px"}} onClick={() => props.editReview(props.id, props.stars, props.comment, props.itemID)}>Edit Review</button>
                        <button className="btn btn-danger" style={{ fontSize: "12px" }} onClick={() => props.deleteReview(props.id)}>Delete Review</button>
                    </div>
                : null}           
            </div>
            }
        </div>
    )
}

export default Review