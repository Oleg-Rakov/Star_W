import React, { useState } from 'react';

import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Planets from '../layouts/Planets/Planets';
import PlanetsDetails from '../layouts/PlanetDetails/PlanetsDetails';
import Footer from '../components/Footer/Footer';

const Routs = () => {
  const [pageCounter, setPageCounter] = useState(1);

  return (
    <BrowserRouter>
      <Footer pageCounter={pageCounter} />
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <Planets
              pageCounter={pageCounter}
              setPageCounter={setPageCounter}
            />
          )}
        />
        <Route exact path="/planet/:name" component={PlanetsDetails} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routs;
