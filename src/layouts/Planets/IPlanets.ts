interface IPlanet {
    name: string,
    url: string,
    climate: string,
    population: string
}

export interface IPlanets {
    isPlanetsLoaded: boolean,
    planets : IPlanet[],
    getMorePlanets: () => void,
}
