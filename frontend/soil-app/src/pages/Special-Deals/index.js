import React, {useState, useEffect} from "react";

import ItemList from "../Home/components/ItemList";

import ITEM_API from '../../api/services/Item';

function SpecialDeals() {
    const [items, setItems] = useState();

    useEffect(() => {
        ITEM_API.getAllItems()
            .then((result)=>{
                const currDay = new Date().getDay()
                const specialItems = result.data.filter((item)=> {
                    return item.specialDay == currDay;
                })

                setItems(specialItems);
            })
            .catch(error => console.error("Error: ", error))
    }, []);

    

    return (
        <>
            <div>
                <h1 className="text-center">Special Deals</h1>
                {items ? <ItemList items={items} /> : <p>Loading items...</p>}
            </div>
        </>
    )
}

export default SpecialDeals