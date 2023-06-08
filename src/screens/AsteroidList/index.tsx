import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Asteroid from '../../types/Asteroid'
import './style.css';

import AsteroidListItem from '../../components/AsteroidListItem'
import Loading from '../../components/Loading'

const AsteroidList: React.FC = () => {
  const [asteroids, setAsteroids] = useState<any[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isOrderDesc, setIsOrderDesc] = useState(true);

  useEffect(() => {
    // Call on load 
    fetchAsteroids();
  }, []);

  const fetchAsteroids = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=DEMO_KEY`
      );
      const { near_earth_objects } = response.data;

      // Extract the asteroid data from the API response
      let asteroidData:Asteroid[] = Object.values(near_earth_objects).flat().map((asteroidDataItem: any) => ({
        id: asteroidDataItem.id,
        name: asteroidDataItem.name,
        magnitude: asteroidDataItem.absolute_magnitude_h,
        diameter: {
          kilometers: asteroidDataItem.estimated_diameter.kilometers.estimated_diameter_max,
          meters: asteroidDataItem.estimated_diameter.meters.estimated_diameter_max,
          miles: asteroidDataItem.estimated_diameter.miles.estimated_diameter_max,
          feet: asteroidDataItem.estimated_diameter.feet.estimated_diameter_max,
        },
        hazardous: asteroidDataItem.is_potentially_hazardous_asteroid,
        closeApproachDate: asteroidDataItem.close_approach_data[0].close_approach_date,
        missDistance: {
          astronomical: asteroidDataItem.close_approach_data[0].miss_distance.astronomical,
          lunar: asteroidDataItem.close_approach_data[0].miss_distance.lunar,
          kilometers: asteroidDataItem.close_approach_data[0].miss_distance.kilometers,
          miles: asteroidDataItem.close_approach_data[0].miss_distance.miles,
        },
      }));

      // Sort by name by default
      asteroidData = asteroidData.sort((a, b) => (a.name as any).localeCompare(b.name));
      setAsteroids(asteroidData);
    } catch (error) {
      alert('Error fetching asteroids: ' + error);
    }
    setIsLoading(false)
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Prevent that only one date is defined
    if((startDate != "" && endDate == "") || (startDate == "" && endDate != "")){
      setErrorMessage("Set the start and the end date to search by date range")
      return
    }
    if(startDate != "" && endDate != ""){
      try{
        const difference = new Date(endDate).getTime() - new Date(startDate).getTime();
        const TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
        console.log(TotalDays)
        // Prevent over the range dates
        if(TotalDays>7){
          setErrorMessage("The maximun search range is 7 days");
          return
        }
        // Prevent end date to be after start date 
        if(TotalDays<0){
          setErrorMessage("The end date must be later than the start date");
          return
        }
      }catch{
        // Invalid dates
        setErrorMessage("Set valid dates to continue")
      }
    }
    fetchAsteroids();
  };

  // Reorder data once the button is pressed
  const reorderData = () =>{
    let orderDesc = isOrderDesc
    setIsOrderDesc(!isOrderDesc)
    if (!orderDesc){
      setAsteroids(asteroids.sort((a, b) => (a.name as any).localeCompare(b.name)));
    }else{
      setAsteroids(asteroids.sort((a, b) => (b.name as any).localeCompare(a.name)));
    }
  }

  return (
    <div>
      <h1 className="main-title">Asteroid List</h1>

      {/* Search box */}
      <form onSubmit={handleSearch} className="search-box">
        <label className='search-box-instructions'>Search by a specific range:</label>

        <label htmlFor="startDate" className='search-box-input-label'>Start Date:</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(event) => setStartDate(event.target.value)}
        />

        <label htmlFor="endDate" className='search-box-input-label'>End Date:</label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(event) => setEndDate(event.target.value)}
        />

        <button type="submit" className='search-box-button'>Search</button>
        <p className="error">{errorMessage}</p>
      </form>

      {/* Reorder button */}
      <button onClick={()=>{reorderData()}} type="submit" className='order-button'>Press to order by name {isOrderDesc ? "asc" : "desc"}</button>

      {/* Element list */}
      <ul className='asteroid-list'>
        {asteroids.map((asteroid) => (
            <AsteroidListItem key={asteroid.id} asteroid={asteroid} hideFavourite={false}/>
        ))}
        {(!asteroids || asteroids.length == 0) && <p className="no-data">- No data -</p>}
      </ul>
      {isLoading && <Loading/>}
    </div>
  );
};

export default AsteroidList;
