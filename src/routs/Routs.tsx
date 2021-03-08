import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { Switch, Route, HashRouter } from 'react-router-dom';
import Planets from '../layouts/Planets/Planets';
import PlanetsDetails from '../layouts/PlanetDetails/PlanetsDetails';
import Footer from '../components/Footer/Footer';

const Routs = () => {
  const [pageCounter, setPageCounter] = useState(0);

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
      const response = await fetch(`https://swapi.dev/api/planets/?page=${pageCounter + 1}`);

      if (response.ok) {
        const { results } = await response.json();
        setPlanets([...results]);
        setPageCounter(pageCounter + 1);
        setIsPlanetsLoaded(true);
      }
    } catch (err) {
      console.error(err);
      setIsPlanetsLoaded(true);
    }
  }

  async function getMorePlanets() {
    try {
      const response = await fetch(`https://swapi.dev/api/planets/?page=${pageCounter + 1}`);

      if (response.status === 404) {
        message.error('Sorry I cannot load more pages');
      } else if (response.ok) {
        const { results } = await response.json();
        setPlanets([...planets, ...results]);
        setPageCounter(pageCounter + 1);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (planets.length < 2) {
      getPlanets();
    }
  }, []);

  return (
    <HashRouter>
      <Footer pageCounter={pageCounter} />
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <Planets
              planets={planets}
              getMorePlanets={getMorePlanets}
              isPlanetsLoaded={isPlanetsLoaded}
            />
          )}
        />
        <Route exact path="/planet/:name" component={PlanetsDetails} />
      </Switch>
    </HashRouter>
  );
};

export default Routs;
