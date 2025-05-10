import { EmissionCategoryEnum } from "../shared/enums/emissions-enum";
import { IEmissionsData } from "../shared/interfaces/emission.interface";

export const mockEmissionData: IEmissionsData[] = [
  { year: 2022, value: 13500, businessUnit: 'bu1', category: EmissionCategoryEnum.SCOPE_1 },
  { year: 2022, value: 12500, businessUnit: 'bu2', category: EmissionCategoryEnum.SCOPE_2 },
  { year: 2022, value: 11500, businessUnit: 'bu3', category: EmissionCategoryEnum.SCOPE_3 },
  { year: 2022, value: 14500, businessUnit: 'bu4', category: EmissionCategoryEnum.SCOPE_1 },
  { year: 2022, value: 15500, businessUnit: 'bu5', category: EmissionCategoryEnum.SCOPE_2 },
  { year: 2023, value: 14000, businessUnit: 'bu1', category: EmissionCategoryEnum.SCOPE_1 },
  { year: 2023, value: 12000, businessUnit: 'bu2', category: EmissionCategoryEnum.SCOPE_2 },
  { year: 2023, value: 10000, businessUnit: 'bu3', category: EmissionCategoryEnum.SCOPE_3 },
  { year: 2023, value: 13000, businessUnit: 'bu4', category: EmissionCategoryEnum.SCOPE_2 },
  { year: 2023, value: 11000, businessUnit: 'bu5', category: EmissionCategoryEnum.SCOPE_3 },
  { year: 2024, value: 15000, businessUnit: 'bu1', category: EmissionCategoryEnum.SCOPE_1 },
  { year: 2024, value: 13000, businessUnit: 'bu2', category: EmissionCategoryEnum.SCOPE_2 },
  { year: 2024, value: 11000, businessUnit: 'bu3', category: EmissionCategoryEnum.SCOPE_3 },
  { year: 2024, value: 14000, businessUnit: 'bu4', category: EmissionCategoryEnum.SCOPE_2 },
  { year: 2024, value: 12000, businessUnit: 'bu5', category: EmissionCategoryEnum.SCOPE_3 },
  { year: 2025, value: 16000, businessUnit: 'bu1', category: EmissionCategoryEnum.SCOPE_1 },
  { year: 2025, value: 14000, businessUnit: 'bu2', category: EmissionCategoryEnum.SCOPE_2 },
  { year: 2025, value: 12000, businessUnit: 'bu3', category: EmissionCategoryEnum.SCOPE_3 },
  { year: 2025, value: 15000, businessUnit: 'bu4', category: EmissionCategoryEnum.SCOPE_2 },
  { year: 2025, value: 13000, businessUnit: 'bu5', category: EmissionCategoryEnum.SCOPE_3 },

];
