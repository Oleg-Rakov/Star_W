import React, { FC, useState, useEffect } from 'react';
import { Spin, Button } from 'antd';
import Card from '../../components/Card/Card';

import { IPlanets } from './IPlanets';

import styles from './Planets.module.css';

const Planets: FC<IPlanets> = (props) => {
  const {
    pageCounter = 0,
    setPageCounter,
  } = props;

  const [planets, setPlanets] = useState([{
    name: '',
    url: '',
    climate: '',
    population: '',
  }]);
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

  console.log('planet', planets);

  return (
    <div className={styles.container}>
      {
        isPlanetsLoaded
          ? (
            <div className={styles.listContainer}>
              {planets.map((planet) => (
                <Card
                      // onClick={() => navigateToPlanetDetails(planet.url, `/planet/${planet.name}`)}
                  onClick={() => {}}
                  key={planet.name}
                  name={planet.name}
                  climate={planet.climate}
                  population={planet.population}
                />
              ))}
            </div>
          )
          : <Spin />
      }
      <Button
        type="primary"
        // loading={!isPlanetsLoaded}
      >
        Load more
      </Button>
    </div>
  );
};

export default Planets;
