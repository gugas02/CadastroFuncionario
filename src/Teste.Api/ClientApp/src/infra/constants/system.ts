import { environment } from 'src/environments/environment';

export const BASE_URL_FRONT = environment.baseUrlFront;
export const BASE_URL_API = environment.baseUrlApi;

export class HeadTitle {
  public static readonly BACKOFFICE = 'Back Office';
}

export class Employee {
  public static readonly EMPLOYEE_URI = `${BASE_URL_API}/api/Employee`;
  public static readonly EMPLOYEE_PAGINATION_URI = `${Employee.EMPLOYEE_URI}/pagination`;
  public static readonly EMPLOYEE_TOGGLE_URI = `${Employee.EMPLOYEE_URI}/toggle`;
  public static readonly EMPLOYEE_NAMES_URI = `${Employee.EMPLOYEE_URI}/nomes`;
}