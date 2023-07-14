import { useEffect, useState } from "react";
import { getNeos } from "../services/neo";

export const NeosList = () => {
  const [neos, setNeos] = useState([]);

  const loadNeosFromServer = async () => {
    try {
      const neosData = await getNeos();
      setNeos(neosData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadNeosFromServer();
  }, []);

  console.log(neos);

  return (
    <h1>test</h1>
  )
}