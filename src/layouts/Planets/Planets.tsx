import React, { FC } from 'react';
import { useHistory } from 'react-router';
import { Spin, Button } from 'antd';
import Card from '../../components/Card/Card';
import yoda from './img/yoo.png';

import { IPlanets } from './IPlanets';

import styles from './Planets.module.css';

const Planets: FC<IPlanets> = (props) => {
  const {
    planets,
    getMorePlanets,
    isPlanetsLoaded,
  } = props;

  const history = useHistory();

  const navigateToPlanetDetails = (url: string | undefined, pathname: string) => {
    history.push({
      pathname,
      state: {
        url,
      },
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.yodaContainer}>
        <img
          src={yoda}
          alt="master"
        />
        <div className={styles.quote}>
          “The dark side clouds everything. Impossible to see the light, the future is.” – Yoda
        </div>
      </div>
      {
        isPlanetsLoaded
          ? (
            <div className={styles.listContainer}>
              {planets.map((planet) => (
                <Card
                  onClick={() => navigateToPlanetDetails(planet.url, `/planet/${planet.name}`)}
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
      <div className={styles.buttonContainer}>
        <Button
          onClick={getMorePlanets}
          type="primary"
            // loading={!isPlanetsLoaded}
        >
          Load more
        </Button>
      </div>
    </div>
  );
};

export default Planets;
