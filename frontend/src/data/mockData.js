export const supportedCrops = [
  { value: "tomato", label: "Tomato" },
  { value: "potato", label: "Potato" },
  { value: "maize", label: "Maize (Corn)" },
  { value: "wheat", label: "Wheat" },
  { value: "rice", label: "Rice" },
  { value: "cassava", label: "Cassava" },
  { value: "soybean", label: "Soybean" },
  { value: "groundnut", label: "Groundnut (Peanut)" },
  { value: "sugarcane", label: "Sugarcane" },
  { value: "cotton", label: "Cotton" },
];

// ─── Weather Mock Data ─────────────────────────────────────────────────────────
export const mockWeatherData = {
  isMock: true,
  location: "Nairobi, Kenya",
  current: {
    temperature: 22,
    feelsLike: 20,
    humidity: 68,
    windSpeed: 14,
    windDirection: "NE",
    rainfall: 0,
    condition: "Partly Cloudy",
    icon: "⛅",
    uvIndex: 6,
    visibility: 12,
  },
  forecast: [
    { day: "Today", high: 24, low: 16, condition: "Partly Cloudy", icon: "⛅", rainfall: 0 },
    { day: "Tomorrow", high: 21, low: 15, condition: "Light Rain", icon: "🌦️", rainfall: 8 },
    { day: "Wednesday", high: 19, low: 14, condition: "Heavy Rain", icon: "🌧️", rainfall: 22 },
    { day: "Thursday", high: 23, low: 16, condition: "Sunny", icon: "☀️", rainfall: 0 },
    { day: "Friday", high: 25, low: 17, condition: "Mostly Sunny", icon: "🌤️", rainfall: 0 },
  ],
  farmingInsights: [
    {
      icon: "💧",
      title: "Irrigation Advisory",
      message: "Rainfall expected tomorrow. Consider delaying irrigation by 24–48 hours.",
      type: "info",
    },
    {
      icon: "🌱",
      title: "Planting Conditions",
      message: "Soil moisture levels are optimal for planting leafy greens this week.",
      type: "success",
    },
    {
      icon: "⚠️",
      title: "Disease Alert",
      message: "High humidity levels increase risk of fungal diseases. Inspect crops closely.",
      type: "warning",
    },
    {
      icon: "🌬️",
      title: "Spray Window",
      message: "Wind speeds are suitable for pesticide application today before 10 AM.",
      type: "success",
    },
  ],
};

export const kenyanLocations = [
  "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret",
  "Thika", "Machakos", "Kitale", "Meru", "Nyeri",
  "Kakamega", "Kericho", "Embu", "Garissa", "Malindi",
];

// ─── Market Prices Mock Data ───────────────────────────────────────────────────
export const mockMarketPrices = {
  isMock: true,
  lastUpdated: "2026-10-11",
  currency: "KES",
  entries: [
    { id: 1, crop: "Tomato", market: "Wakulima Market", price: 4500, unit: "90 kg bag", date: "2026-10-11", trend: "up", change: "+8%" },
    { id: 2, crop: "Tomato", market: "City Market", price: 4800, unit: "90 kg bag", date: "2026-10-11", trend: "up", change: "+5%" },
    { id: 3, crop: "Potato", market: "Githurai Market", price: 3200, unit: "90 kg bag", date: "2026-10-11", trend: "down", change: "-3%" },
    { id: 4, crop: "Potato", market: "Wakulima Market", price: 3000, unit: "90 kg bag", date: "2026-10-11", trend: "stable", change: "0%" },
    { id: 5, crop: "Maize", market: "Eldoret Grain Market", price: 5500, unit: "90 kg bag", date: "2026-10-10", trend: "up", change: "+12%" },
    { id: 6, crop: "Maize", market: "Nakuru Market", price: 5200, unit: "90 kg bag", date: "2026-10-10", trend: "up", change: "+9%" },
    { id: 7, crop: "Wheat", market: "Nakuru Grain", price: 6000, unit: "90 kg bag", date: "2026-10-10", trend: "stable", change: "0%" },
    { id: 8, crop: "Kale (Sukuma)", market: "City Market", price: 150, unit: "kg", date: "2026-10-11", trend: "down", change: "-5%" },
    { id: 9, crop: "Kale (Sukuma)", market: "Westlands Market", price: 180, unit: "kg", date: "2026-10-11", trend: "stable", change: "0%" },
    { id: 10, crop: "Onion", market: "Wakulima Market", price: 8000, unit: "90 kg bag", date: "2026-10-09", trend: "up", change: "+15%" },
    { id: 11, crop: "Cabbage", market: "City Market", price: 2800, unit: "90 kg bag", date: "2026-10-11", trend: "down", change: "-7%" },
    { id: 12, crop: "Beans", market: "Meru Market", price: 12000, unit: "90 kg bag", date: "2026-10-10", trend: "up", change: "+4%" },
  ],
};

export const cropFilterOptions = [
  "All Crops", "Tomato", "Potato", "Maize", "Wheat", "Kale (Sukuma)", "Onion", "Cabbage", "Beans",
];

export const marketFilterOptions = [
  "All Markets", "Wakulima Market", "City Market", "Githurai Market", "Eldoret Grain Market",
  "Nakuru Market", "Nakuru Grain", "Westlands Market", "Meru Market",
];

// ─── Treatment Advice Mock Data ────────────────────────────────────────────────
export const diseaseLibrary = [
  {
    id: 1,
    crop: "Tomato",
    disease: "Early Blight",
    pathogen: "Alternaria solani",
    severity: "Moderate",
    overview: "A fungal disease causing characteristic target-spot lesions on older leaves, stems, and fruit.",
    symptoms: ["Brown spots with concentric rings", "Yellow halo around lesions", "Premature defoliation"],
    prevention: [
      "Use certified disease-free seeds",
      "Practice crop rotation (3-year cycle)",
      "Stake plants to improve air circulation",
      "Remove crop debris promptly after harvest",
    ],
    treatment: [
      "Apply copper hydroxide or mancozeb fungicide",
      "Spray every 7–10 days in wet conditions",
      "Remove heavily infected leaves and dispose safely",
      "Switch fungicide class to avoid resistance",
    ],
    organicOptions: [
      "Neem oil spray (2% solution)",
      "Bacillus subtilis biopesticide",
      "Potassium bicarbonate solution",
    ],
  },
  {
    id: 2,
    crop: "Potato",
    disease: "Late Blight",
    pathogen: "Phytophthora infestans",
    severity: "Severe",
    overview: "One of the most destructive potato diseases, capable of wiping out entire crops within days under favorable conditions.",
    symptoms: ["Water-soaked dark lesions on leaves", "White mold on underside of leaves", "Tuber rot with reddish-brown discoloration"],
    prevention: [
      "Plant resistant varieties",
      "Avoid fields with poor drainage",
      "Apply preventive fungicides before symptoms appear",
      "Destroy volunteer potato plants",
    ],
    treatment: [
      "Apply metalaxyl + mancozeb at first sign",
      "Use dimethomorph or fluopicolide for resistance management",
      "Destroy severely infected plants",
      "Harvest tubers early if blight is severe",
    ],
    organicOptions: [
      "Copper-based fungicides (approved for organic use)",
      "Remove and destroy infected plant tissue",
    ],
  },
  {
    id: 3,
    crop: "Maize",
    disease: "Maize Streak Virus",
    pathogen: "Maize streak virus (MSV)",
    severity: "Mild",
    overview: "A viral disease transmitted by leafhoppers, causing characteristic streaking on leaves and stunted growth.",
    symptoms: ["Yellow/white streaks parallel to leaf veins", "Stunted plant growth", "Reduced grain fill"],
    prevention: [
      "Plant MSV-resistant varieties",
      "Control leafhopper populations with insecticides",
      "Early planting to avoid peak leafhopper season",
      "Remove and destroy infected plants",
    ],
    treatment: [
      "No direct cure — focus on vector control",
      "Apply systemic insecticides to control leafhoppers",
      "Remove infected plants to reduce spread",
    ],
    organicOptions: [
      "Reflective mulches to deter leafhoppers",
      "Neem-based insecticides for leafhopper control",
    ],
  },
];
