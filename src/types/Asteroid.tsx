export default interface Asteroid {
    id: string;
    name: string;
    magnitude: number;
    diameter: {
      kilometers: number;
      meters: number;
      miles: number;
      feet: number;
    };
    hazardous: boolean;
    closeApproachDate: string;
    missDistance: {
      astronomical: number;
      lunar: number;
      kilometers: number;
      miles: number;
    }
  }