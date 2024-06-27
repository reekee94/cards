export type ValueOf<T> = T[keyof T];

export const electronics = 'Electronics';
export const games = 'Games';
export const grocery = 'Grocery';
export const kids = 'Kids';
export const automotive = 'Automotive';

export const departments = {
  electronics,
  games,
  grocery,
  kids,
  automotive,
} as const;

export type DepartmentTypes = ValueOf<typeof departments>;

export const applicationName = 'Employee Management';

