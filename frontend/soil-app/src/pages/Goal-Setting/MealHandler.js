import '../../shared/components/Forms/forms.css';
import { useEffect , useState} from 'react';

function Mealhandler({ mealData }) {
    const [mealImages, setMealImages] = useState({});

    useEffect(() => {
        const apiKey = "f8749aa250f149d9b7d0f4a5cc45e342";

        mealData.meals.forEach(meal => {
            fetch(`https://api.spoonacular.com/recipes/${meal.id}/information?apiKey=${apiKey}`)
                .then(response => response.json())
                .then(data => {
                    setMealImages(oldImages => {
                        const newImages = { ...oldImages };
                        newImages[meal.id] = data.image;
                        return newImages;
                    });
                })
                .catch(error => console.error(error));
        });
    }, [mealData.meals]);
    
    return (
        <>
            <div className="flex-horizontal">
                {mealData.meals.map((meal) => (
                    <div key={meal.id} className="box margin-top margin-right margin-left">
                        <h4 className="margin-left">{meal.title}</h4>
                        <img className="fit-img" src={mealImages[meal.id]} alt={meal.title}/>
                        <h6 className="margin-left">Ready in: {meal.readyInMinutes} Minutes</h6>
                        <h6 className="margin-left margin-bottom">Servings: {meal.servings}</h6>
                        <a style={{textAlign : "center"}} className="btn-primary my-btn bottom" href={meal.sourceUrl} target="blank" >Recipe Link</a>
                    </div>
                ))}
            </div>

            <div className="center"><h2 className="center">Overall Nutrients:</h2></div>
            
            <div className="center box">
                <div className="center margin-top">
                    <h4>Calories: {mealData.nutrients.calories}</h4>
                    <h4>Carbohydrates: {mealData.nutrients.carbohydrates}</h4>
                    <h4>Fat: {mealData.nutrients.fat}</h4>
                    <h4>Protein: {mealData.nutrients.protein}</h4>
                </div>
            </div>
        </>
    )
}

export default Mealhandler