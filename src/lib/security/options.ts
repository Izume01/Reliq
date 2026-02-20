export const TTL_OPTIONS = [
  { value: 60, label: "1 minute" },
  { value: 300, label: "5 minutes" },
  { value: 600, label: "10 minutes" },
  { value: 1800, label: "30 minutes" },
  { value: 3600, label: "1 hour" },
  { value: 21600, label: "6 hours" },
  { value: 43200, label: "12 hours" },
  { value: 86400, label: "24 hours" },
  { value: 259200, label: "3 days" },
  { value: 604800, label: "7 days" },
] as const;

export type SupportedTTL = (typeof TTL_OPTIONS)[number]["value"];

const ttlSet = new Set<number>(TTL_OPTIONS.map((option) => option.value));

export const DEFAULT_TTL: SupportedTTL = 300;

export const isSupportedTTL = (value: number): value is SupportedTTL => {
  return ttlSet.has(value);
};

export const MAX_FAILED_ATTEMPT_OPTIONS = [3, 5, 10] as const;
export type MaxFailedAttempts = (typeof MAX_FAILED_ATTEMPT_OPTIONS)[number];

const maxFailedAttemptsSet = new Set<number>(MAX_FAILED_ATTEMPT_OPTIONS);

export const DEFAULT_MAX_FAILED_ATTEMPTS: MaxFailedAttempts = 5;

export const isSupportedMaxFailedAttempts = (
  value: number
): value is MaxFailedAttempts => {
  return maxFailedAttemptsSet.has(value);
};

export const MAX_VIEW_OPTIONS = [1, 2, 3, 5, 10, 25] as const;
export type MaxViews = (typeof MAX_VIEW_OPTIONS)[number];

const maxViewsSet = new Set<number>(MAX_VIEW_OPTIONS);

export const DEFAULT_MAX_VIEWS: MaxViews = 1;

export const isSupportedMaxViews = (value: number): value is MaxViews => {
  return maxViewsSet.has(value);
};

export const PASSWORD_MIN_LENGTH = 8;
