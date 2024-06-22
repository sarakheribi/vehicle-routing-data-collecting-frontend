export interface Vehicle {
  id:number;
  user:any;
  companyName?: string;
  vehicleType: string;
  vehicleDescription: string;
  canTransportWheelchairs: boolean;
  seatingPlaces: number;
  startCoordinate: {
    streetName: string;
    doorNumber: number;
    zipcode: number;
    city: string;
  }
  endCoordinate: {
    streetName: string;
    doorNumber: number;
    zipcode: number;
    city: string;
  }
}
