import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import {GEO_API_URL,geoAPIOptions} from "../api";

const Search = ({ onSearchChange }) => {
    const [search, setSearch] = useState(null);
    const handleOnchange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }
    const loadOptions = (inputValue) => {
        return fetch(`${GEO_API_URL}?countryIds=IN&sort=-population&namePrefix=${inputValue}`,geoAPIOptions)
        .then((response)=>response.json())
        .then((response)=>{
            return {
                options:response.data.map((city)=>{
                    return{
                        value:`${city.latitude} ${city.longitude}`,
                        label:`${city.name},${city.regionCode}, ${city.countryCode}`
                    }
                }),
            }

        })
        .catch(err=>console.error(err));
    }
    return(
    <AsyncPaginate
        placeholder="Enter City"
        debounceTimeout={600}
        value={search}
        onChange={handleOnchange}
        loadOptions={loadOptions}
    />
    )
}

export default Search;