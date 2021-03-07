import React from 'react';
import { useLocation } from 'react-router';

 interface IUseLocation {
    url: string;
}

const PlanetsDetails = () => {
  const location = useLocation<IUseLocation>();
  const url = location.state?.url;

  async function getPlanet() {
    const planetResponse = await fetch(url);
    const planet = await planetResponse.json();

    return planet;
  };

  async function getResidentsOfPlanet(residentsUrl: string) {
    const response = await fetch(residentsUrl);
    const resident = await response.json();

    return resident;
  }

  return (
    <div>
      Planet Details
    </div>
  );
};

export default PlanetsDetails;
