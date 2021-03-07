import React, { FC, useState, useEffect } from 'react';
import { Spin } from 'antd';
import { IPlanets } from './IPlanets';

import styles from './Planets.module.css';

const Planets: FC<IPlanets> = (props) => {
  const {
    pageCounter = 0,
    setPageCounter,
  } = props;

  const [planet, setPlanets] = useState([]);
  const [isPlanetsLoaded, setIsPlanetsLoaded] = useState(false);

  async function getPlanets() {
    try {
      setIsPlanetsLoaded(false);
      const response = await fetch(`http://swapi.dev/api/planets/?page=${pageCounter + 1}`);

      if (response.ok) {
        const { results } = await response.json();
        setPlanets(results);
        setIsPlanetsLoaded(true);
      }
    } catch (err) {
      console.error(err);
      setIsPlanetsLoaded(true);
    }
  }

  useEffect(() => {
    getPlanets();
  }, []);

  console.log({
    pageCounter,
    setPageCounter,
  });

  console.log('planet', planet);

  return (
    <div className={styles.container}>
      {
        isPlanetsLoaded
          ? (
            <div>Content</div>
          )
          : <Spin />
      }
    </div>
  );
};

export default Planets;
