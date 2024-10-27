import { BACKEND_URL } from "../ui/Login";

export const desktopOS = [
  {
    label: "BA Trips Daily",
    value: 100, // Initialize with a default value
    color: "#a1a1aa", // Custom color for this label
  },
  {
    label: "BA Trips Weekly",
    value: 600, // Static value
    color: "#4d4c5c", // Custom color for this label
  },
  {
    label: "BA Trips Monthly",
    value: 3000, // Initialize with a default value
    color: "#787276", // Custom color for this label
  },
  {
    label: "BA Trips Yearly",
    value: 12000, // Initialize with a default value
    color: "#2e3940", // Custom color for this label
  },
];


async function fetchDailyBATripsStats() {
  try {
    const response = await fetch(`${BACKEND_URL}/daily_batrips`);
    const result = await response.json();
    desktopOS[0].value = result.data; // Update the desktopOS array with the fetched value
  } catch (error) {
    console.error("Error fetching daily BA trips stats:", error);
  }
}

async function fetchWeeklyBATripsStats() {
  try {
    const response = await fetch(`${BACKEND_URL}/weekly_batrips`);
    const result = await response.json();
    desktopOS[1].value = result.data; // Update the desktopOS array with the fetched value
  } catch (error) {
    console.error("Error fetching weekly BA trips stats:", error);
  }
}

async function fetchMonthlyBATripsStats() {
  try {
    const response = await fetch(`${BACKEND_URL}/monthly_batrips`);
    const result = await response.json();
    desktopOS[2].value = result.data; // Update the desktopOS array with the fetched value
  } catch (error) {
    console.error("Error fetching monthly BA trips stats:", error);
  }
}

async function fetchYearlyBATripsStats() {
  try {
    const response = await fetch(`${BACKEND_URL}/yearly_batrips`);
    const result = await response.json();
    desktopOS[3].value = result.data; // Update the desktopOS array with the fetched value
  } catch (error) {
    console.error("Error fetching yearly BA trips stats:", error);
  }
}

// Fetch all stats and update the desktopOS array
async function fetchAllStats() {
  await Promise.all([
    fetchDailyBATripsStats(),
    fetchWeeklyBATripsStats(),
    fetchMonthlyBATripsStats(),
    fetchYearlyBATripsStats(),

  ]);
}

fetchAllStats(); // Trigger the fetch on script load

export const mobileOS = [
  {
    label: "BA Trips Daily",
    value: 72.72,
  },
  {
    label: "BA Trips Weekly",
    value: 16.38,
  },
  {
    label: "BA Trips Monthly",
    value: 3.83,
  },
  {
    label: "BA Trips Yearly",
    value: 2.42,
  },
];

export const platforms = [
  {
    label: "Mobile",
    value: 59.12,
  },
  {
    label: "Desktop",
    value: 40.88,
  },
];

const normalize = (v, v2) => Number.parseFloat(((v * v2) / 100).toFixed(2));

export const mobileAndDesktopOS = [
  ...mobileOS.map((v) => ({
    ...v,
    label: v.label === "Other" ? "Other (Mobile)" : v.label,
    value: normalize(v.value, platforms[0].value),
  })),
  ...desktopOS.map((v) => ({
    ...v,
    label: v.label === "Other" ? "Other (Desktop)" : v.label,
    value: normalize(v.value, platforms[1].value),
  })),
];

export const valueFormatter = (item) => `${item.value}%`;
