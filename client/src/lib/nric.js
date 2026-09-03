const NRIC_PATTERN = /^[STFG]\d{7}[A-Z]$/;

export function isValidWorkshopNric(value) {
  return NRIC_PATTERN.test(value.trim().toUpperCase());
}
