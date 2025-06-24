export interface Meter {
  MeterSerial: string;
  MeterGUID: string;
  MeterState: string;
  CustomerId: number;
  CustomerGuid: string;
  PlantServerId: number | null;
  PlantId: number | null;
  PoleId: number | null;
  CustomerName: string | null;
  MeterReading: number | null;
  MeterReadingDate: string | null;
  TariffRate: number | null;
  PreviousMeterReading: number | null;
  PreviousMeterReadingDate: string | null;
  ConsumedEnergy: number | null;
}
export interface MeterInfoRowProps {
  label: string;
  value?: string;
  icon?: boolean;
}