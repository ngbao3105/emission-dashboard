import { EmissionCategoryEnum } from "../enums/emissions-enum";

export interface IEmissionsData {
  year: number;
  category: EmissionCategoryEnum;
  value: number;
  businessUnit: string;
}
