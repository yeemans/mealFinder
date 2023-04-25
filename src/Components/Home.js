import {useState, useEffect} from "react"
// import Select from 'react-select';
import axios from "axios"

function Home() { 
    const searchURL = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${process.env.REACT_APP_API_ID}&app_key=${process.env.REACT_APP_API_KEY}`;
    const [searchTerm, setSearchTerm] = useState("");
    const [cuisines, setCuisines] = useState(new Set());
    const [diets, setDiets] = useState(new Set());

    const dietOptions = ["balanced", "high-fiber", "high-protein", "low-carb", "low-fat", "low-sodium"];
        

    function setSearch(e) { 
        let term = "";
        if (e.target.value !== "") term = "&q="; 
        term += e.target.value;
        setSearchTerm(term); 
    }

    function addCuisine(e) { 
        let clone = new Set(cuisines);
        clone = addToggleable(clone, e.target.value)
        setCuisines(clone); 
        console.log(clone);
    }

    function addDiet(e) { 
        let clone = new Set(diets); 
        clone = addToggleable(clone, e.target.value); 
        setDiets(clone); 
        console.log(clone);
    }

    function addToggleable(items, item) { 
        if (items.has(item)) 
            items.delete(item) 
        else 
            items.add(item); 
        return items;
    }

    function getSearchURL() { 
        // add search term, cuisine, and more to do at the end of searchURL 
        let url = searchURL;
        
        for (let cuisine of cuisines) 
            url += `&cuisineType=${cuisine}`;
        for (let diet of diets) 
            url += `&diet=${diet}`;

        return url + searchTerm;
    }

    async function findRecipes() { 
        let result = await axios.get(getSearchURL()); 
        console.log(result);
        console.log(getSearchURL());
    }

    return( 
        <div> 
            <h1>Search</h1>
            <p>{process.env.REACT_APP_API_KEY}</p>
            <input type="text" onChange={(e) => setSearch(e)} /> 
            <p>Search term: {searchTerm}</p>
            <p>URL: {getSearchURL()} </p>

            <h2>Cuisines: All cuisines are included by default</h2>
            <input type="checkbox" id="American" onChange={(e) => addCuisine(e)} value="American" />
            <label htmlFor="American">American</label>

            <input type="checkbox" id="Asian" onChange={(e) => addCuisine(e)} value="Asian" />
            <label htmlFor="Asian">Asian</label>

            <input type="checkbox" id="Mexican" onChange={(e) => addCuisine(e)} value="Mexican" />
            <label htmlFor="Mexican">Mexican</label>

            <h2>Diets</h2>
            {dietOptions.map(diet => { 
                return(
                    <div> 
                        <label htmlFor={diet}>{diet}</label>
                        <input type="checkbox" value={diet} key={diet} id={diet} onChange=
                            {(e) => addDiet(e) }/>
                    </div>
                )
            })}

            <button onClick={() => findRecipes()}>Find Recipes</button>

        </div>
    )
}

export default Home;