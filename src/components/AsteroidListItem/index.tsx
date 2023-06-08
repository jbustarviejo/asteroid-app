import React, { useState, useEffect } from 'react';
import Asteroid from '../../types/Asteroid'
import './style.css';
import axios from 'axios';

interface Props {
  asteroid: Asteroid;
  hideFavourite: boolean
}

// Component to show an asteroid
const AsteroidListItem: React.FC<Props> = ({ asteroid, hideFavourite }) => {
  const [isOpen, setIsOpen] = useState(false)

  const saveItemAsFavourite = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, asteroid:Asteroid) => {
    event.preventDefault();
    try{
      const response = await axios.post(
        `http://localhost:3000/asteroids`,
        {id: asteroid.id, data: asteroid}
      );
    }catch(e){
      alert("There was an error: "+e)
    }
  }

  return (
    <li className="asteroid-container" onClick={()=>setIsOpen(!isOpen)}>
      <p className="asteroid-container-explanation" >{isOpen ? "Click to see less" : "Click to see more"}</p>
      <p className="asteroid-container-title">Asteroid {asteroid.name}</p>
      {isOpen && (
        <div>
          <p className="information-head">Information:</p>
          <p className="information-line">
            ID: {asteroid.id}
          </p>
          <p className="information-line">
            Magnitude: {asteroid.magnitude}
          </p>
          <p className="information-line">
            Diameter (kilometers): {asteroid.diameter.kilometers}
          </p>
          <p className="information-line">
            Diameter (meters): {asteroid.diameter.meters}
          </p>
          <p className="information-line">
            Diameter (miles): {asteroid.diameter.miles}
          </p>
          <p className="information-line">
            Diameter (feet): {asteroid.diameter.feet}
          </p>
          <p className="information-line">
            Hazardous: {asteroid.hazardous ? 'Yes' : 'No'}
          </p>
          <p className="information-line">
            Close Approach Date: {asteroid.closeApproachDate}
          </p>
          <p className="information-line">
            Miss Distance (astronomical): {asteroid.missDistance.astronomical}
          </p>
          <p className="information-line">
            Miss Distance (lunar): {asteroid.missDistance.lunar}
          </p>
          <p className="information-line">
            Miss Distance (kilometers): {asteroid.missDistance.kilometers}
          </p>
          <p className="information-line">
            Miss Distance (miles): {asteroid.missDistance.miles}
          </p>
          {!hideFavourite && <button onClick={(e) => saveItemAsFavourite(e, asteroid)} className="save-as-favourite">
            Click here to save as favourite
          </button>}
        </div>
      )}
    </li>
  );
};

export default AsteroidListItem;
