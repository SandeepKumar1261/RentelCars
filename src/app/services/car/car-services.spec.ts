import { TestBed } from '@angular/core/testing';

import { CarServices } from './car-services';

describe('CarServices', () => {
  let service: CarServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
