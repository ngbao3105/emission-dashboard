import { EmissionCategoryEnum } from "../enums/emissions-enum";

export const EMISSIONS_CATEGORY = {
  [EmissionCategoryEnum.SCOPE_1]: {
    title: "Scope 1 (tCo2e)",
    color: "#0077CC"
  },
  [EmissionCategoryEnum.SCOPE_2]: {
    title: "Scope 2 (tCo2e)",
    color: "#3399FF"
  },
  [EmissionCategoryEnum.SCOPE_3]: {
    title: "Scope 3 (tCo2e)",
    color: "#66CCFF"
  },
}
