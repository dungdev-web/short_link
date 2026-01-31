// mocks/locationData.ts
export interface LocationData {
  id: string;
  value: number;
}

const locationData: LocationData[] = [
  { id: "USA", value: 120 },
  { id: "GBR", value: 85 },
  { id: "AUS", value: 50 },
  { id: "VNM", value: 200 },
  { id: "FRA", value: 75 },
  { id: "DEU", value: 95 },
  { id: "JPN", value: 60 },
  { id: "BRA", value: 40 },
  { id: "IND", value: 1100 },
  { id: "CAN", value: 100 },
  { id: "RUS", value: 45 },
  { id: "CHN", value: 90 },
  { id: "ESP", value: 55 },
  { id: "ITA", value: 65 },
  { id: "KOR", value: 35 },
];

export default locationData;
