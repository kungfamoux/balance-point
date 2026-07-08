export const MAINTENANCE_RELEASE_AT = "2026-07-15T00:00:00+01:00";

export function isMaintenanceActive(now = Date.now()) {
  return now < new Date(MAINTENANCE_RELEASE_AT).getTime();
}
