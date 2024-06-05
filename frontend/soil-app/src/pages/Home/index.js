import React from "react";
import{useState, useEffect} from "react";
import ItemList from "./components/ItemList";
import '../../shared/components/Forms/forms.css';

import ITEM_API from '../../api/services/Item';

function Home() {
    const DESCRIPTION = `
    "Organic" means how farmers grow and handle foods like fruits and veggies. They do it naturally, without using harmful pesticides or synthetic fertilizers, and they don't use genetically modified organisms (GMOs).
    Switching to organic farming isn't just about changing products; it's about working with nature instead of trying to control it. Organic farmers care about things like keeping the soil healthy, protecting wildlife, and using natural ways to grow food, so it's good for the environment.
    Organic farming is all about being responsible and sustainable. By learning more about how nature works, organic farmers can grow food that's safe, healthy, and good for the planet. So, when you buy organic produce, you're supporting farmers who care about the Earth and providing your family with good, nutritious food.`

    const [items, setItems] = useState();

    useEffect(() => {
        ITEM_API.getAllItems()
            .then((result)=>{
                setItems(result.data);
            })
            .catch(error => console.error("Error: ", error))
    }, []);

    return (
        <>
            <div className="margin-left">
                <h2>What Does Organic Mean?</h2>
                <p>{DESCRIPTION}</p>
                {/* <ItemList items={items}/> */}
                {items ? <ItemList items={items} /> : <p>Loading items...</p>}
            </div>
        </>
    )
}

export default Home