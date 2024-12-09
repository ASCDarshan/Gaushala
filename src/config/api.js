// Create an API configuration file (src/config/api.js)
export const API_BASE_URL = 'https://gocrm.one/gaushala/api';

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/login/`,
  COWS: `${API_BASE_URL}/cow_management/cows/`,
  VACCINATIONS: `${API_BASE_URL}/cow_management/vaccinations/`,
  MEDICAL_RECORDS: `${API_BASE_URL}/cow_management/medical-records/`,
  PREGNANCY_RECORDS: `${API_BASE_URL}/cow_management/pregnancy-records/`,
  MILK_PRODUCTIONS: `${API_BASE_URL}/cow_management/milk-productions/`,
  FEEDINGS: `${API_BASE_URL}/cow_management/feedings/`,
  OWNERSHIP_CHANGES: `${API_BASE_URL}/cow_management/ownership-changes/`
};