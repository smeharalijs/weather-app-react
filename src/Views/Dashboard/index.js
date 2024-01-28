import React, { useState, useEffect } from 'react';
import SearchHistory from '../History';

function Dashbord() {
    const [search, setSearch] = useState('');
    const [city, setCity] = useState(null);
    const [searchHistory, setSearchHistory] = useState([]);

    useEffect(() => {
        const LocalSearchHistory = localStorage.getItem('SearchHistory');
        if (LocalSearchHistory) {
            setSearchHistory(JSON.parse(LocalSearchHistory));
        }
    }, []);

    const apiKey = '8a13df165f9099bdd3008e66764b2a56';

    const getWeatherData = () => {
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${search},pakistan&units=metric&appid=${apiKey}`)
            .then((res) => res.json())
            .then((res) => {
                setCity(res);
                console.log(res);

            })
            .catch((error) => {
                console.error(error);
            });

        const SearchHistory = [...searchHistory, search];
        setSearchHistory(SearchHistory);
        localStorage.setItem('SearchHistory', JSON.stringify(SearchHistory));
    };

    if(city){
        return(
            <div>
                <h1>loading...</h1>
            </div>
        )
    }

    return (
        <div className="bg-blue-200 p-8 min-h-screen">
            <h1 className="text-5xl font-bold mb-4 text-center">Weather App</h1>
            <div className="flex items-center space-x-2 mb-4 justify-center">
                <input
                    type="text"
                    placeholder="Enter city"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="p-2 border rounded"  
                />
                <button onClick={getWeatherData} className="bg-blue-500 text-white p-2 rounded">
                    Search
                </button>
            </div>
            {city && (
                <div className="bg-white p-32 rounded shadow-md mb-4 w-[100%]  text-center ">
                    <h2 className="text-xl font-bold mb-2">Weather: {city.main.temp} °C</h2>
                    <p>Humidity: {city.main.humidity}%</p>
                    <p>Min Temperature: {city.main.temp_min} °C</p>
                    <p>Max Temperature: {city.main.temp_max} °C</p>
                </div>
            )}

            <SearchHistory searchHistory={searchHistory} />
        </div>
    );
}

export default Dashbord;
