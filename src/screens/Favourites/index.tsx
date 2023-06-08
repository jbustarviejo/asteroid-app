import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Asteroid from '../../types/Asteroid'
import './style.css';

import AsteroidListItem from '../../components/AsteroidListItem'
import Loading from '../../components/Loading'

const Favourites: React.FC = () => {
  const [asteroids, setAsteroids] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Call on loaded screen
    fetchAsteroids();
  }, []);

  const fetchAsteroids = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(
        `http://localhost:3000/asteroids`
      );

      // Extract the asteroid data from the API response
      let asteroidData:Asteroid[] = Object.values(response.data).flat().map((asteroidDataItem: any) => ({
        id: asteroidDataItem.id,
        name: asteroidDataItem.data.name,
        magnitude: asteroidDataItem.data.absolute_magnitude_h,
        diameter: {
          kilometers: asteroidDataItem.data.diameter.kilometers,
          meters: asteroidDataItem.data.diameter.meters,
          miles: asteroidDataItem.data.diameter.miles,
          feet: asteroidDataItem.data.diameter.feet,
        },
        hazardous: asteroidDataItem.data.isPotentiallyHazardousAsteroid,
        closeApproachDate: asteroidDataItem.data.closeApproachData,
        missDistance: {
          astronomical: asteroidDataItem.data.missDistance.astronomical,
          lunar: asteroidDataItem.data.missDistance.lunar,
          kilometers: asteroidDataItem.data.missDistance.kilometers,
          miles: asteroidDataItem.data.missDistance.miles,
        },
      }));

      setAsteroids(asteroidData);
    } catch (error) {
      alert('Error fetching asteroids: ' + error);
    }
    setIsLoading(false)
  };

  return (
    <div>
      <h1 className="main-title">My favourites asteroids</h1>
      {/* Element list */}
      <ul className='asteroid-list'>
        {asteroids.map((asteroid) => (
            <AsteroidListItem key={asteroid.id} asteroid={asteroid} hideFavourite={true}/>
        ))}
        {(!asteroids || asteroids.length == 0) && <p className="no-data">- No data -</p>}
      </ul>
      {isLoading && <Loading/>}
    </div>
  );
};

export default Favourites;
