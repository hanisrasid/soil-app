import React, { useCallback, useState } from 'react';
import _ from 'lodash';
import './Item.css';

function Item(props) {
  const [quantity, setQuantity] = useState(props.quantity);

  // Debounced version of the changeQuantity function
  const debouncedChangeQuantity = useCallback(
    _.debounce((itemId, newQuantity) => props.changeQuantity(itemId, newQuantity), 1000),
    [props.changeQuantity]
  );

  // Handle input change event
  const onChange = (e) => {
    const value = e.target.value;
    setQuantity(value); // Update the state immediately for UI responsiveness
    debouncedChangeQuantity(props.id, value); // Debounced function call
  };

  return (
    <div className="row align-items-center">
      <div className="col-md-1">
        <img src={props.image} alt={props.name} className="small-img" />
      </div>
      <div className="col-md-6">
        <h5>{props.name}</h5>
        <p>{props.desc}</p>
      </div>
      <div className="col-md-1">
        <h6>${props.price}</h6>
      </div>
      <div className="col-md-1">
        <input type="number" value={quantity} min="1" onChange={onChange} />
      </div>
      <div className="col-md-1">
        <h6>${(props.price * quantity).toFixed(2)}</h6>
      </div>
      <div className="col-md-2">
        <button className="item-button" onClick={() => props.removeItem(props.id)}>Remove</button>
      </div>
    </div>
  );
}

export default Item;
