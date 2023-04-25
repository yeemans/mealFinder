import {useState, useEffect} from "react"
import axios from "axios"

function Home() { 
    const searchURL = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${process.env.REACT_APP_API_ID}&app_key=${process.env.REACT_APP_API_KEY}`;
    const [searchTerm, setSearchTerm] = useState("");
    const [cuisines, setCuisines] = useState(new Set());

    function setSearch(e) { 
        let term = "";
        if (e.target.value !== "") term = "&q="; 
        term += e.target.value;
        setSearchTerm(term); 
    }

    function addCuisine(e) { 
        const clone = new Set(cuisines);
        // if cuisine is already toggled on
        if (clone.has(e.target.value)) 
            clone.delete(e.target.value);
        else 
            clone.add(e.target.value); 

        setCuisines(clone); 
        console.log(clone);
    }

    function getSearchURL() { 
        // add search term, cuisine, and more to do at the end of searchURL 
        let url = searchURL;
        for (let cuisine of cuisines) 
            url += `&cuisineType=${cuisine}`
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
            <label for="American">American</label>

            <input type="checkbox" id="Asian" onChange={(e) => addCuisine(e)} value="Asian" />
            <label for="Asian">Asian</label>

            <input type="checkbox" id="Mexican" onChange={(e) => addCuisine(e)} value="Mexican" />
            <label for="Mexican">Mexican</label>

            <button onClick={() => findRecipes()}>Find Recipes</button>
        </div>
    )
}

export default Home;