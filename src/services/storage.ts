export interface WeightEntry {
  date: string; // ISO date string YYYY-MM-DD
  weight: number;
}

const STORAGE_KEY = 'weight_monitor_data';

export const getWeights = (): WeightEntry[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveWeight = (entry: WeightEntry): WeightEntry[] => {
  const weights = getWeights();
  // Check if entry for date exists, update it if so, otherwise add new
  const existingIndex = weights.findIndex((w) => w.date === entry.date);

  if (existingIndex >= 0) {
    weights[existingIndex] = entry;
  } else {
    weights.push(entry);
  }

  // Sort by date
  weights.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  localStorage.setItem(STORAGE_KEY, JSON.stringify(weights));
  return weights;
};

export interface BodyFatEntry {
  date: string; // ISO date string YYYY-MM-DD
  percentage: number;
}

const FAT_STORAGE_KEY = 'body_fat_monitor_data';

export const getBodyFatEntries = (): BodyFatEntry[] => {
  const data = localStorage.getItem(FAT_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveBodyFatEntry = (entry: BodyFatEntry): BodyFatEntry[] => {
  const entries = getBodyFatEntries();
  const existingIndex = entries.findIndex((e) => e.date === entry.date);

  if (existingIndex >= 0) {
    entries[existingIndex] = entry;
  } else {
    entries.push(entry);
  }

  entries.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  localStorage.setItem(FAT_STORAGE_KEY, JSON.stringify(entries));
  return entries;
};
