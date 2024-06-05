import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider} from "react-router-dom";

import {LogStatusProvider} from "./shared/components/LogStatusContext";
import {CartQuantityProvider} from "./shared/components/CartQuantityContext";

import Layout from './shared/components/Layout';
import routes from './routes';

import './App.css';
import { getFromLocalStorage, saveToLocalStorage } from "./shared/util/localStorage.util";

const ITEMS = [
  {
    id: 1,
    name: "Organic Apples",
    desc: "Grown without synthetic pesticides or fertilizers, organic apples are naturally sweet and crunchy, making them a healthy and delicious snack option.",
    img: "https://images.unsplash.com/photo-1590005354167-6da97870c757?q=80&w=2962&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    specialDay: 2,
    quantity: 56,
    price: 32.56
  },
  {
    id: 2,
    name: "Organic Spinach",
    desc: "Packed with vitamins and minerals, organic spinach is grown without harmful chemicals, making it a nutritious addition to salads, smoothies, and cooked dishes.",
    img: "https://images.unsplash.com/photo-1580910365203-91ea9115a319?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    specialDay: 3,
    quantity: 78,
    price: 21.89
  },
  {
    id: 3,
    name: "Organic Eggs",
    desc: "Produced by hens raised in free-range environments and fed organic feed, organic eggs are rich in protein and essential nutrients, providing a healthy breakfast or ingredient for baking and cooking.",
    img: "https://images.unsplash.com/photo-1587486913049-53fc88980cfc?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    specialDay: 4,
    quantity: 45,
    price: 14.75
  },
  {
    id: 4,
    name: "Organic Tomatoes",
    desc: "Grown without synthetic pesticides, organic tomatoes are bursting with flavor and packed with antioxidants, making them perfect for salads, sandwiches, and sauces.",
    img: "https://images.unsplash.com/photo-1576856497337-4f2be24683da?q=80&w=2891&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    specialDay: 5,
    quantity: 63,
    price: 38.22
  },
  {
    id: 5,
    name: "Organic Milk",
    desc: "Produced by cows raised on organic pastures and fed organic feed, organic milk is free from artificial hormones and antibiotics, offering a wholesome and nutritious beverage option.",
    img: "https://images.unsplash.com/photo-1600788907416-456578634209?q=80&w=2850&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    specialDay: 6,
    quantity: 92,
    price: 27.33
  },
  {
    id: 6,
    name: "Organic Carrots",
    desc: "Grown without synthetic fertilizers, organic carrots are crisp, sweet, and rich in vitamins and fiber, making them a versatile ingredient for soups, salads, and snacks.",
    img: "https://images.unsplash.com/photo-1639427444459-85a1b6ac2d68?q=80&w=2788&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    specialDay: 0,
    quantity: 38,
    price: 45.12
  },
  {
    id: 7,
    name: "Organic Chicken",
    desc: "Raised without antibiotics or synthetic hormones, organic chicken is free-range and fed organic feed, resulting in tender and flavorful meat suitable for various culinary dishes.",
    img: "https://images.unsplash.com/photo-1633096013004-e2cb4023b560?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    specialDay: 1,
    quantity: 81,
    price: 19.47
  },
  {
    id: 8,
    name: "Organic Quinoa",
    desc: "Cultivated without synthetic pesticides or fertilizers, organic quinoa is a nutrient-dense grain rich in protein, fiber, and essential amino acids, making it a healthy and gluten-free alternative to rice or pasta.",
    img: "https://plus.unsplash.com/premium_photo-1705056546518-9abeabdbb361?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    specialDay: 2,
    quantity: 24,
    price: 33.78
  },
  {
    id: 9,
    name: "Organic Strawberries",
    desc: "Grown without synthetic pesticides, organic strawberries are juicy, sweet, and packed with vitamins and antioxidants, making them a delicious and healthy snack or dessert option.",
    img: "https://images.unsplash.com/photo-1518635017498-87f514b751ba?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    specialDay: 3,
    quantity: 57,
    price: 29.65
  },
  {
    id: 10,
    name: "Organic Broccoli",
    desc: "Rich in vitamins and minerals, organic broccoli is grown without synthetic pesticides, making it a nutritious and versatile vegetable for stir-fries, salads, and side dishes.",
    img: "https://images.unsplash.com/photo-1583663848850-46af132dc08e?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    specialDay: 4,
    quantity: 69,
    price: 17.92
  },
  {
    id: 11,
    name: "Organic Potatoes",
    desc: "Grown without synthetic pesticides, organic potatoes are versatile and nutritious, with a rich flavor and texture suitable for various culinary applications, including roasting, mashing, and boiling.",
    img: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    specialDay: 5,
    quantity: 82,
    price: 25.84
  },
  {
    id: 12,
    name: "Organic Blueberries",
    desc: "Packed with antioxidants and vitamins, organic blueberries are grown without synthetic pesticides, making them a healthy and delicious addition to breakfast cereals, yogurt, and baked goods.",
    img: "https://images.unsplash.com/photo-1594002348772-bc0cb57ade8b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    specialDay: 6,
    quantity: 63,
    price: 36.78
  },
  {
    id: 13,
    name: "Organic Avocado",
    desc: "Rich in healthy fats and vitamins, organic avocados are grown without synthetic pesticides, making them a nutritious and versatile ingredient for salads, sandwiches, and dips.",
    img: "https://images.unsplash.com/photo-1616485828923-2640a1ee48b4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    specialDay: 0,
    quantity: 45,
    price: 19.45
  },
  {
    id: 14,
    name: "Organic Bell Pepper",
    desc: "Grown without synthetic pesticides, organic bell peppers are crisp and sweet, with vibrant colors and a fresh flavor that adds depth to salads, stir-fries, and grilled dishes.",
    img: "https://images.unsplash.com/photo-1525607551316-4a8e16d1f9ba?q=80&w=1910&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    specialDay: 1,
    quantity: 79,
    price: 28.94
  },
  {
    id: 15,
    name: "Organic Cucumber",
    desc: "Grown without synthetic pesticides, organic cucumbers are crisp, refreshing, and packed with hydration, making them a perfect addition to salads, sandwiches, and snacks.",
    img: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    specialDay: 2,
    quantity: 51,
    price: 16.87
  },
  {
    id: 16,
    name: "Organic Kale",
    desc: "Packed with vitamins and minerals, organic kale is grown without synthetic pesticides, making it a nutrient-dense and versatile leafy green suitable for salads, smoothies, and cooked dishes.",
    img: "https://images.unsplash.com/photo-1622943495354-f49d2964094c?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    specialDay: 3,
    quantity: 72,
    price: 22.56
  },
  {
    id: 17,
    name: "Organic Celery",
    desc: "Grown without synthetic pesticides, organic celery is crisp, crunchy, and packed with hydration, making it a healthy and refreshing snack or ingredient for salads, soups, and stews.",
    img: "https://images.unsplash.com/photo-1580391564590-aeca65c5e2d3?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    specialDay: 4,
    quantity: 64,
    price: 18.75
  }
]

const farmingTips = [
  {
    title: 'Choose the perfect space for your fruit and vegetables',
    desc: "Don’t be too ambitious to start with. A small vegetable patch or a couple of raised beds in your back garden or – if you don’t have outdoor space – two or three large pots or tubs on the deck or close to the kitchen door would be ideal starting points. If space is at an absolute premium at home, there may be a community garden nearby. If you like the idea of gardening with friends, put your name down for a plot.",
    img: "https://plus.unsplash.com/premium_photo-1678655852216-2c067ee35ecb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Know your fruit and vegetable seasons",
    desc: "Most fruits and vegetables are seasonal – they reach maturity or bear fruits at particular times of the year. Tomatoes, for example, are at their peak over summer, while apples and pears are ready to harvest in late summer and autumn. For veggies at least, that means there’s a best time of the year to plant so they mature at the right time. Good gardening involves a bit of research and planning for fruit and vegetable seasons, so get yourself a diary or calendar and pencil in the times when you should be sowing seeds and planting seedlings or young trees and then harvesting.",
    img: "https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Plant a variety of fruit and vegetables",
    desc: "Even if space is limited it’s still worthwhile trying to vary what you’re planting. Your first bumper crop of green beans will be exciting, but several smaller crops of different fruits and vegetables over the course of the year will keep you enthused – and you’ll learn so much more.",
    img: "https://images.unsplash.com/photo-1457530378978-8bac673b8062?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Types of soil",
    desc: "Knowing your soil is the key to success. A simple “squeeze test” of a handful will quickly tell you whether your soil is mainly clay, sand, or loam. It will also help determine whether you’ll need to add anything to the soil before you start sowing your crops. Potatoes, carrots and onions will do reasonably well in heavier soils but for strawberries, you might be better using a raised bed or containers filled with Scotts Performance Naturals Premium Potting Mix or, if you prefer, Osmocote Tomato, Vegetable & Herb Premium Potting Mix.",
    img: "https://plus.unsplash.com/premium_photo-1678652879454-38d9fb300ad9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Enrich your soil",
    desc: "Healthy plants need healthy soil. Give your garden soil a boost by adding a generous layer of Scotts Performance Naturals Soil Improver (naturally powerful organic-based compost) to the soil before planting. Alternatively, fertilisers can be added to help nourish your newly planted fruits and vegetables – we recommend 100% natural plant foods suitable for edible crops.",
    img: "https://images.unsplash.com/photo-1492496913980-501348b61469?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "What to sow",
    desc: "Seeds, seedlings, offsets (bulbs) or young plants? What you plant will depend on the types of crops you’re growing. Bulbs and seeds of some vegetables can go straight into the ground while others will do better when sown into seed trays before being hardened off and transplanted when better established.  Read the instructions on packets and labels before you start. Punnets of seedlings and cell packs of young plants may be the better option if you’re new to growing your own food.",
    img: "https://images.unsplash.com/photo-1599320092708-8a9dde49fc2c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHNlZWR8ZW58MHx8MHx8fDA%3D"
  },
]

function App() {

  useEffect(()=> {
    if(!getFromLocalStorage('items')) saveToLocalStorage('items', ITEMS)
    
    if(!getFromLocalStorage('farmingTips')) saveToLocalStorage('farmingTips', farmingTips)

    // if(!getFromLocalStorage('carts')) saveToLocalStorage('carts', [])
  }, [])

  
  const router = createBrowserRouter([
    {
      element: <Layout/>,
      children: routes
    }
  ]);
  return (
    <CartQuantityProvider>
        <LogStatusProvider>
            <RouterProvider router={router}/>
        </LogStatusProvider>
    </CartQuantityProvider>
  );
}

export default App;
