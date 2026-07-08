export interface Stat {
  id: string;
  /** Display label (already localized by the backend). */
  label: string;
  /** Formatted metric value, e.g. "10K+" or "99.9%". */
  value: string;
}

export interface StatsResponse {
  stats: Stat[];
}
