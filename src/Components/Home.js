import {useState, useEffect} from "react"
import axios from "axios"

function Home() { 
    const searchURL = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${process.env.REACT_APP_API_ID}&app_key=${process.env.REACT_APP_API_KEY}`;
    const [filters, setFilters] = useState(new Set());
    const [searchTerm, setSearchTerm] = useState("");

    function setSearch(e) { 
        let term = "";
        if (e.target.value !== "") term = "&q="; 
        term += e.target.value;
        setSearchTerm(term); 
    }

    function getSearchURL() { 
        return searchURL + searchTerm;
    }

    async function findRecipes() { 
        let result = await axios.get(getSearchURL()); 
        console.log(result)
    }

    return( 
        <div> 
            <h1>Search</h1>
            <p>{process.env.REACT_APP_API_KEY}</p>
            <input type="text" onChange={(e) => setSearch(e)} /> 
            <p>Search term: {searchTerm}</p>
            <p>URL: {getSearchURL()} </p>

            <button onClick={() => findRecipes()}>Find Recipes</button>
        </div>
    )
}

export default Home;