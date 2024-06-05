import React from "react";
import "./Item.css";
import { Link } from "react-router-dom";
// import PathConstants from "../../../routes/pathConstants";

function Item(props) {
    return (
        <div className="col">
            <div className="card h-100">
                <h2 className="card-header text-center">{props.name}</h2>
                <Link className="link-decoration" onClick={()=>props.addToCart(props.id, props.price)}>
                    <img src={props.image} alt={props.name} className="card-img-top card-img"/>
                    <div className="card-body">
                        <p className="card-text">{props.description}</p>
                    </div>
                    <div className="card-footer text-body-secondary text-center">
                        ${props.price}
                    </div>
                    <div className="card-footer text-body-secondary text-center">
                        {props.stockCount} left!
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Item