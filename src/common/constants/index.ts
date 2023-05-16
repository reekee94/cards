export type ValueOf<T> = T[keyof T];

export const applicationName = 'Cards';

export const gold = 'Gold';
export const silver = 'Silver';
export const iron = 'Iron';
export const composite = 'Composite';

export const cardTypes = {
  gold,
  silver,
  iron,
  composite,
} as const;

export type CardTypesType = ValueOf<typeof cardTypes>;
