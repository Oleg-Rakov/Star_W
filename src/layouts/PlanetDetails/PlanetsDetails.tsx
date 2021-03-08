import React, { useEffect, useState } from 'react';
import {
  Spin, Menu, Dropdown, Button,
} from 'antd';
import { useLocation } from 'react-router';
import { IResident } from './IResidents';

import styles from './PlanetDetails.module.css';

 interface IUseLocation {
    url: string;
}

const PlanetsDetails = () => {
  const [planetDetails, setPlanetDetails] = useState({
    name: '',
    rotation_period: '',
    diameter: '',
    climate: '',
    gravity: '',
    terrain: '',
    population: '',
    residents: [{
      name: '',
      height: '',
      mass: '',
      gender: '',
    }],
  });
  const [isDetailsLoaded, setIsDetailsLoaded] = useState(false);
  const location = useLocation<IUseLocation>();
  const url = location.state?.url;

  async function getPlanetsAndResidents() {
    try {
      setIsDetailsLoaded(false);
      const planet = await getPlanet();
      let residents: Array<IResident> = [];
      if (planet.residents.length !== 0) {
        residents = await Promise.all(
          planet.residents.map((residentUrl: string) => getResidentsOfPlanet(residentUrl)),
        );
      }

      const details = {
        name: planet.name,
        rotation_period: planet.rotation_period,
        diameter: planet.diameter,
        climate: planet.climate,
        gravity: planet.gravity,
        terrain: planet.terrain,
        population: planet.population,
        residents,
      };

      setPlanetDetails(details);
      setIsDetailsLoaded(true);
    } catch (err) {
      console.error(err);
    }
  }

  async function getPlanet() {
    const planetResponse = await fetch(url);
    const planet = await planetResponse.json();

    return planet;
  }

  async function getResidentsOfPlanet(residentsUrl: string) {
    const response = await fetch(residentsUrl);
    const resident = await response.json();

    return resident;
  }

  useEffect(() => {
    getPlanetsAndResidents();
  }, []);

  return (
    <div className={styles.container}>
      {
        isDetailsLoaded
          ? (
            <div className={styles.details}>
              <div className={styles.title}>
                {planetDetails.name}
              </div>
              <div className={styles.info}>
                rotation period:
                {' '}
                {planetDetails.rotation_period}
              </div>
              <div className={styles.info}>
                diameter:
                {' '}
                {planetDetails.diameter}
              </div>
              <div className={styles.info}>
                climate:
                {' '}
                {planetDetails.climate}
              </div>
              <div className={styles.info}>
                gravity:
                {' '}
                {planetDetails.gravity}
              </div>
              <div className={styles.info}>
                terrain:
                {' '}
                {planetDetails.terrain}
              </div>
              <div className={styles.info}>
                population:
                {' '}
                {planetDetails.population}
              </div>
              <div className={styles.residentsContainer}>
                {planetDetails.residents.map((resident) => {
                  const menu = (
                    <Menu>
                      <Menu.Item>
                        gender:
                        {' '}
                        {resident.gender}
                      </Menu.Item>
                      <Menu.Item>
                        height:
                        {' '}
                        {resident.height}
                      </Menu.Item>
                      <Menu.Item>
                        mass:
                        {' '}
                        {resident.mass}
                      </Menu.Item>
                    </Menu>
                  );

                  return (
                    <Dropdown
                      overlay={menu}
                      placement="bottomCenter"
                      arrow
                    >
                      <Button>{resident.name}</Button>
                    </Dropdown>
                  );
                })}
              </div>
            </div>
          )
          : <Spin />
      }
    </div>
  );
};

export default PlanetsDetails;
