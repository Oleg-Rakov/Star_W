import React, { useEffect, useState } from 'react';
import {
  Spin, Menu, Dropdown, Button,
} from 'antd';
import { useLocation, useHistory } from 'react-router';
import { IResident } from './IResidents';

import styles from './PlanetDetails.module.css';
import planetIMG from '../../assets/planet-img.jpg';
// import { convertToObject } from 'typescript';

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
  const history = useHistory();

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
    if (!url) {
      history.push('/');
    }
    getPlanetsAndResidents();
  }, []);

  return (
    <div className={styles.container}>
      {
        isDetailsLoaded
          ? (
            <div className={styles.details}>
              <div className={styles.title}>
                <img src={planetIMG} alt="" />
                <div>
                  <b>NAME</b>
                  :
                  {planetDetails.name}
                </div>
              </div>
              <div className={styles.info}>
                <b>ROTATION PERIOD</b>
                :
                {' '}
                {planetDetails.rotation_period}
              </div>
              <div className={styles.info}>
                <b>DIAMETR</b>
                :
                {' '}
                {planetDetails.diameter}
              </div>
              <div className={styles.info}>
                <b>CLIMATE</b>
                :
                {' '}
                {planetDetails.climate}
              </div>
              <div className={styles.info}>
                <b>GRAVITY</b>
                :
                {' '}
                {planetDetails.gravity}
              </div>
              <div className={styles.info}>
                <b>TERRAIN</b>
                :
                {' '}
                {planetDetails.terrain}
              </div>
              <div className={styles.info}>
                <b>POPULATION</b>
                :
                {' '}
                {planetDetails.population}
              </div>
              <div className={styles.residentsContainer}>
                {planetDetails.residents.length === 0 ? (
                  <div>NO RESIDENTS ON THIS PLANET</div>
                ) : (
                  planetDetails.residents.map((resident) => {
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
                        key={resident.name}
                        overlay={menu}
                        placement="bottomCenter"
                        arrow
                      >
                        <Button>{resident.name}</Button>
                      </Dropdown>
                    );
                  })
                )}
              </div>
            </div>
          )
          : <Spin />
      }
    </div>
  );
};

export default PlanetsDetails;
