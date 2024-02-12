export type userDto = {
  firstName: string;
  lastname: string;
  email: string;
  isActive: boolean;
}

export type employeeDto = userDto & {
  area: string;
  rol: string;
  reportsTo: string;
}
