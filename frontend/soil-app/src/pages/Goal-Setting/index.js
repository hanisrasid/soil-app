import React, {useEffect, useState} from "react";
import MealHandler from "./MealHandler"

function GoalSetting() {
    const emptyValue = "";
    const [mealData, setMealdata] = useState(null);
    const [weight, setWeight] = useState(null);
    const [height, setHeight] = useState(null);
    const [age, setAge] = useState(null);
    const [gender, setGender] = useState(null);
    const [activityLevel, setActivityLevel] = useState(null);
    const [goal, setGoal] = useState(null);
    const [apiFail, setApiFail] = useState(null);

    const activityLevelOptions = [
        {value: 0, label: "Little to No exercise"},
        {value: 1, label: "Slighty Active: Exercise 1-3 times/week"},
        {value: 2, label: "Moderately Active: Exercise 4-5 times/week"},
        {value: 3, label: "Active: Daily Exercise or Intense Exercise 3-4 times/week"},
        {value: 4, label: "Very Active: Intense Exercise 6-7 times/week"}
    ];

    const goalOptions = [
        {value: 0, label: "Lose Weight"},
        {value: 1, label: "Maintain Weight"},
        {value: 2, label: "Gain Muscle"}
    ]

    function getCalorieIntake(weight, height, age, gender, activityLevel, goal) {
        if (age > 80) {
            age = 80;
        }
        if (age < 15) {
            age = 15;
        }

        var calculatedBmr = 0;

        //BMR Equation: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7478086/#:~:text=Energy%20metabolism%20can%20also%20be,especially%20in%20obesity%20%5B9%5D.
        if(gender === "male") {
            calculatedBmr = ((10 * weight) + (6.25 * height) - (5 * age) + 5);
        }
        else if (gender === "female") {
            calculatedBmr = ((10 * weight) + (6.25 * height) - (5 * age) - 161);
        }      

        //https://www.pediatriconcall.com/calculators/basel-metabolic-rate-bmr-calculator
        // Sedentary Lifestyle: little or no exercise
        if(activityLevel === 0) {
            calculatedBmr = calculatedBmr * 1.2;
        }
        // Slighty Active Lifestlye: Exercise 1-3 times/week
        if(activityLevel === 1) {
            calculatedBmr = calculatedBmr * 1.375;
        }
        // Moderately Active Lifestyle: Exercise 4-5 times/week
        if(activityLevel === 2) {
            calculatedBmr = calculatedBmr * 1.55;
        }
        // Active Lifestyle: Daily exercise or intense exercise 3-4 times/week
        if(activityLevel === 3) {
            calculatedBmr = calculatedBmr * 1.725;
        }
        // Very Active Lifestyle: Intense exercise 6-7 times/week
        if(activityLevel === 4) {
            calculatedBmr = calculatedBmr * 1.9;
        }
        
        //Lose Weight: https://www.fitmatecoach.com/blog/how-to-use-bmr-for-weight-loss#:~:text=Use%20your%20BMR%20to%20calculate,through%20the%20loss%20of%20muscle.
        if(goal === 0) {
            calculatedBmr = calculatedBmr - 500;
        }
        //Maintain Weight
        else if(goal === 1) {
            calculatedBmr = calculatedBmr * 1;
        }
        //Gain Muscle: https://www.healthline.com/nutrition/how-to-gain-weight#:~:text=To%20gain%20weight%2C%20you%20need,want%20to%20gain%20weight%20fast.
        if(goal ===2) {
            calculatedBmr = calculatedBmr + 300;
        }
        return calculatedBmr;
    }

    

    function getMeal(e) {
        e.preventDefault();
    
        //Get Calories
        var calories = getCalorieIntake(weight, height, age, gender, activityLevel, goal);

        //Call GET Meal API
        var apiKey = "f8749aa250f149d9b7d0f4a5cc45e342";
        fetch(`https://api.spoonacular.com/mealplanner/generate?apiKey=${apiKey}&timeFrame=day&targetCalories=${calories}`)
            .then(response => response.json())
            .then(json => {
                if(json && json.status === 'failure' && json.code === 402) {
                    setApiFail(true);
                } else {
                    setMealdata(json);
                }
            }
            )
            .catch(error => console.error(error));
    }

    return (
        <>
            <div className='center'>
                <h2 className='center'>Personal Dietry Plan:</h2>
            </div>
            <form className="center box" onSubmit={getMeal}>
                <div className="form-group">
                    <label htmlFor="weight">Weight (kg):</label>
                    <input type="number" className="form-control" name="weight" value={weight} onChange={(e) => setWeight(e.target.value)} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="height">Height (cm):</label>
                    <input type="number" className="form-control" name="height" value={height} onChange={(e) => setHeight(e.target.value)} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="age">Age:</label>
                    <input type="number" className="form-control" name="age" value={age} onChange={(e) => setAge(e.target.value)} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="gender">Gender:</label>
                    <select className="form-control" name="gender" value={gender} onChange={(e) => setGender(e.target.value)} required>
                        <option value={emptyValue}></option>
                        <option value="male">Male</option>
                        <option value="female">Female</option> 
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="activityLevel">Activity Level:</label>
                    <select className="form-control" name="activityLevel" value={activityLevel} onChange={(e) => setActivityLevel(parseInt(e.target.value))} required>
                        <option value={emptyValue}></option>
                        {activityLevelOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="goal"><h2>Fitness Goal:</h2></label>
                    <select className="form-control" name="goal" value={goal} onChange={(e) => setGoal(parseInt(e.target.value))} required>
                        <option value={emptyValue}></option>
                        {goalOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="my-btn btn-success" required>Get Meal Plan</button>
            </form>
            
            {mealData && <div className="center"><h2 className="center">Meal Plans:</h2></div>}
            {mealData && <MealHandler mealData={mealData} />}
            {apiFail && <div className="center"><h2 style={{color: "darkred"}}>Daily Limit Reached (Please Try Again Tommorow)!</h2></div>}
        </>
    )
}

export default GoalSetting