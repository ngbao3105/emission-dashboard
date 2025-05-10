import { EmissionsStore } from './emissions.store';
import { mockEmissionData } from '../mocks/emission-mock-data';
import { EmissionCategoryEnum } from '../shared/enums/emissions-enum';
import { TestBed } from '@angular/core/testing';

describe('EmissionsStore', () => {
  let store: any;

  beforeEach(() => {
    // Create a new instance of the store for each test
    TestBed.configureTestingModule({
      providers: [EmissionsStore]
    });
    store = TestBed.inject(EmissionsStore);
  });

  it('should create the store', () => {
    expect(store).toBeTruthy();
  });

  it('should set and get emissions correctly with mock data', () => {
    // Set emissions with mock data
    store.setEmissions(mockEmissionData);

    // Get emissions from the store
    const emissions = store.emissions();

    expect(emissions).toEqual(mockEmissionData);
    expect(emissions.length).toBe(mockEmissionData.length);

    // Check a specific value
    expect(emissions[0].year).toBe(2022);
    expect(emissions[0].category).toBe(EmissionCategoryEnum.SCOPE_1);
    expect(emissions[0].value).toBe(13500);
  });



  it('should calculate annual total emissions and energy consumption', async () => {
    // Set emissions with mock data
    const year = 2025;
    await store.loadEmissions(year).toPromise();
    expect(store.annualTotal()).toBe(70000);
    expect(store.getTotalEnergyConsumption()).toBe(29000);
  })



});
