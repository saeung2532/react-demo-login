// LOGIN
export const HTTP_LOGIN_FETCHING = "HTTP_LOGIN_FETCHING";
export const HTTP_LOGIN_FAILED = "HTTP_LOGIN_FAILED";
export const HTTP_LOGIN_SUCCESS = "HTTP_LOGIN_SUCCESS";
export const HTTP_LOGIN_LOGOUT = "HTTP_LOGIN_LOGOUT";

// COMPANY
export const HTTP_COMPANY_FETCHING = "HTTP_COMPANY_FETCHING";
export const HTTP_COMPANY_FAILED = "HTTP_COMPANY_FAILED";
export const HTTP_COMPANY_SUCCESS = "HTTP_COMPANY_SUCCESS";
export const HTTP_COMPANY_CLEAR = "HTTP_COMPANY_CLEAR";

// WAREHOUSE
export const HTTP_WAREHOUSE_FETCHING = "HTTP_WAREHOUSE_FETCHING";
export const HTTP_WAREHOUSE_FAILED = "HTTP_WAREHOUSE_FAILED";
export const HTTP_WAREHOUSE_SUCCESS = "HTTP_WAREHOUSE_SUCCESS";
export const HTTP_WAREHOUSE_CLEAR = "HTTP_WAREHOUSE_CLEAR";

// DEPTANDCOST
export const HTTP_DEPTANDCOST_FETCHING = "HTTP_DEPTANDCOST_FETCHING";
export const HTTP_DEPTANDCOST_FAILED = "HTTP_DEPTANDCOST_FAILED";
export const HTTP_DEPTANDCOST_SUCCESS = "HTTP_DEPTANDCOST_SUCCESS";
export const HTTP_DEPTANDCOST_CLEAR = "HTTP_DEPTANDCOST_CLEAR";

// Error Code
export const E_PICKER_CANCELLED = "E_PICKER_CANCELLED";
export const E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR =
  "E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR";
export const E_PERMISSION_MISSING = "E_PERMISSION_MISSING";
export const E_PICKER_NO_CAMERA_PERMISSION = "E_PICKER_NO_CAMERA_PERMISSION";
export const E_USER_CANCELLED = "E_USER_CANCELLED";
export const E_UNKNOWN = "E_UNKNOWN";
export const E_DEVELOPER_ERROR = "E_DEVELOPER_ERROR";
export const TIMEOUT_NETWORK = "ECONNABORTED"; // request service timeout
export const NOT_CONNECT_NETWORK = "NOT_CONNECT_NETWORK";

//////////////// Localization Begin ////////////////
export const NETWORK_CONNECTION_MESSAGE =
  "Cannot connect to server, Please try again.";
export const NETWORK_TIMEOUT_MESSAGE =
  "A network timeout has occurred, Please try again.";
export const UPLOAD_PHOTO_FAIL_MESSAGE =
  "An error has occurred. The photo was unable to upload.";

// export const apiUrl = "http://localhost:8080/";
export const apiUrl = `${process.env.REACT_APP_API_URL}`;
export const imageUrl = "http://localhost:8080";

export const server = {
  // Login API
  LOGIN_URL: `authen_api/auth/login`,
  CHECKTOKEN_URL: `authen_api/auth/checktoken`,
  COMPANY_URL: `authen_api/data/company`,
  WAREHOUSE_URL: `authen_api/data/warehouse`,

  // Token
  TOKEN_KEY: `token`,
  REFRESH_TOKEN_KEY: `refresh/token`,
};
