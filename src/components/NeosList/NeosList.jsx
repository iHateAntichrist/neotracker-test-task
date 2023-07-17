/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { getNeos } from "../../services/neo";
import { Loader } from "../Loader";

export const NeosList = () => {
  const [neos, setNeos] = useState([]);
  const [currentDay, setCurrentDay] = useState(1);

  const loadNeosFromServer = async () => {
    try {
      const neosData = await getNeos(currentDay); 
      const newNeo = {
        date: neosData.date,
        maxDiameter: neosData.maxDiameter,
        hazardousCount: neosData.hazardousCount,
        closestNeo: neosData.closestNeo,
        fastestNeo: neosData.fastestNeo,
      };

      setNeos((prevNeos) => {
        let updatedNeos = [...prevNeos];

        updatedNeos.push(newNeo);

        if (updatedNeos.length > 6) {
          updatedNeos.shift();
        }

        return updatedNeos;
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const updateCurrentDay = (prevDay) => {
      if (prevDay >= new Date().getDate()) {
        return 1;
      } else {
        return prevDay + 1;
      }
    };
  
    const interval = setInterval(async () => {
      await loadNeosFromServer();
      setCurrentDay(updateCurrentDay);
    }, 5000);
  
    return () => {
      clearInterval(interval);
    };
  }, [currentDay]);
  

  return (
    <div>
      <h1>Near Orbital Objects (NEO)</h1>
  
      <ul>
        {neos.length === 0 ? (
          <Loader />
        ) : (
          neos.map(({ 
            date, 
            maxDiameter, 
            hazardousCount, 
            closestNeo, 
            fastestNeo 
          }) => (
            <li 
              key={Math.random()}
              className="card"
            >
              <h2 className="card__Item">
                Date: {date}</h2>
              <p className="card__Item">
                Max Estimated Diameter (km): {maxDiameter}</p>
              <p className="card__Item">
                Potentially Hazardous NEOs: {hazardousCount}</p>
              <p className="card__Item">
                Closest NEO (km): {closestNeo}</p>
              <p className="card__Item">
                Fastest NEO (kph): {fastestNeo}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
