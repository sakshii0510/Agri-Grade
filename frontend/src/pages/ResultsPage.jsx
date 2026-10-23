import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowUpRight,
  BadgeCheck,
  Ban,
  CheckCircle2,
  CloudSun,
  Coins,
  Droplets,
  Leaf,
  LayoutDashboard,
  MapPin,
  ScanLine,
  Sparkles,
  Wind,
} from 'lucide-react';
import { useLanguage } from '../languageContext';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '');
const MARKET_API_URL = `${API_BASE_URL}/api/market-prices`;

const severityColors = {
  Mild: {
    foreground: '#397856',
    background: '#e8f3e9',
    description: 'Monitor the plant and check whether symptoms change.',
  },
  Moderate: {
    foreground: '#a66a1f',
    background: '#fff2da',
    description: 'Inspect the plant carefully and consider seeking local expert advice.',
  },
  Severe: {
    foreground: '#a9433e',
    background: '#fde9e7',
    description: 'Seek advice from a qualified local agricultural expert promptly.',
  },
  Healthy: {
    foreground: '#397856',
    background: '#e8f3e9',
    description: 'Continue monitoring the plant and maintain good crop care.',
  },
  'Not assessed': {
    foreground: '#777777',
    background: '#eeeeee',
    description: 'Disease severity has not been established.',
  },
};

function normalizeSeverity(value) {
  if (typeof value !== 'string') return 'Not assessed';

  const normalized = value.trim().toLowerCase();

  if (normalized === 'low' || normalized === 'mild') return 'Mild';
  if (normalized === 'moderate' || normalized === 'medium') return 'Moderate';
  if (normalized === 'high' || normalized === 'severe') return 'Severe';
  if (normalized === 'healthy') return 'Healthy';

  return 'Not assessed';
}

function getCropAndDisease(className, fallbackCrop, fallbackDisease) {
  if (typeof className === 'string' && className.includes('___')) {
    const [crop, ...diseaseParts] = className.split('___');

    return {
      cropName: crop.replaceAll('_', ' ').trim(),
      diseaseName: diseaseParts.join('___').replaceAll('_', ' ').trim(),
    };
  }

  return {
    cropName: fallbackCrop || 'Unknown crop',
    diseaseName: fallbackDisease || 'Prediction unavailable',
  };
}

function getStringList(value) {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      if (typeof item === 'string') return item;
      if (item && typeof item.text === 'string') return item.text;
      if (item && typeof item.description === 'string') return item.description;
      return '';
    })
    .filter(Boolean);
}

function AffectedCropImage({ imageDataUrl, fileName }) {
  const { t } = useLanguage();

  return (
    <div className="affected-photo-card">
      <div className="affected-photo">
        {imageDataUrl ? (
          <img
            src={imageDataUrl}
            alt={fileName
              ? t('Uploaded crop image: {fileName}', { fileName })
              : t('Uploaded crop image')}
          />
        ) : (
          <div className="market-empty">{t('No crop image available.')}</div>
        )}

        <span className="result-photo__tag">
          <Leaf size={14} /> {t('CROP PHOTO')}
        </span>
      </div>

      <div className="affected-photo__legend">
        <span>{t('Uploaded image')}</span>
        <small>
          {t('Disease regions have not been individually segmented or detected.')}
        </small>
      </div>
    </div>
  );
}

function MarketPriceCard({ cropName }) {
  const { t, language } = useLanguage();
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [priceUnit, setPriceUnit] = useState('');
  const [selectedMarketIndex, setSelectedMarketIndex] = useState(0);
  const [farmArea, setFarmArea] = useState('');
  const [currentYield, setCurrentYield] = useState('');
  const [healthyYield, setHealthyYield] = useState('');

  const selectedMarket = prices[selectedMarketIndex];
  const modalPrice = Number(selectedMarket?.modal_price);
  const areaValue = Number(farmArea);
  const currentYieldValue = Number(currentYield);
  const healthyYieldValue = Number(healthyYield);
  const hasProjectionInputs =
    farmArea !== '' &&
    currentYield !== '' &&
    healthyYield !== '' &&
    Number.isFinite(areaValue) &&
    areaValue > 0 &&
    Number.isFinite(currentYieldValue) &&
    currentYieldValue > 0 &&
    Number.isFinite(healthyYieldValue) &&
    healthyYieldValue >= 0 &&
    Number.isFinite(modalPrice) &&
    modalPrice > 0;
  const yieldChangePercent = hasProjectionInputs
    ? ((healthyYieldValue - currentYieldValue) / currentYieldValue) * 100
    : null;
  const grossRevenueChange = hasProjectionInputs
    ? (healthyYieldValue - currentYieldValue) * areaValue * modalPrice
    : null;
  const currentGrossRevenue = hasProjectionInputs
    ? currentYieldValue * areaValue * modalPrice
    : null;
  const healthyGrossRevenue = hasProjectionInputs
    ? healthyYieldValue * areaValue * modalPrice
    : null;
  const formatRupees = (amount) =>
    new Intl.NumberFormat(language === 'hi' ? 'hi-IN' : 'en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);

  useEffect(() => {
    const controller = new AbortController();

    const fetchMarketPrices = async () => {
      setLoading(true);
      setError('');
      setPrices([]);
      setPriceUnit('');
      setSelectedMarketIndex(0);

      try {
        const params = new URLSearchParams({
          crop: cropName,
          limit: '10',
        });
        const response = await fetch(`${MARKET_API_URL}?${params}`, {
          signal: controller.signal,
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            typeof data.detail === 'string'
              ? data.detail
              : 'Market prices could not be loaded.'
          );
        }

        if (data.available !== true || !Array.isArray(data.prices)) {
          throw new Error(
            typeof data.message === 'string'
              ? data.message
              : 'Market prices are not currently available.'
          );
        }

        setPrices(data.prices);
        setPriceUnit(
          typeof data.price_unit === 'string' ? data.price_unit : ''
        );
      } catch (marketError) {
        if (marketError.name !== 'AbortError') {
          setError(
            marketError instanceof Error
              ? marketError.message
              : 'Market prices could not be loaded.'
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchMarketPrices();

    return () => controller.abort();
  }, [cropName]);

  return (
    <section className="market-card market-tab-card">
      <div className="market-card__heading">
        <div className="detail-card__title">
          <span className="detail-card__icon">
            <Coins size={21} />
          </span>
          <div>
            <span className="eyebrow">{t('LOCAL MARKET SNAPSHOT')}</span>
            <h3>{t('{cropName} prices', { cropName: t(cropName) })}</h3>
          </div>
        </div>

        <span className="market-card__currency">
          {t('Government mandi data')}
        </span>
      </div>

      {loading ? (
        <p className="market-empty" role="status">
          {t('Loading current mandi prices…')}
        </p>
      ) : error ? (
        <p className="market-empty" role="status">{t(error)}</p>
      ) : prices.length > 0 ? (
        <div className="market-price-list">
          {prices.map((entry, index) => {
            const rowPrice = Number(entry.modal_price);

            return (
              <button
                type="button"
                className="market-price-row"
                key={`${entry.state}-${entry.market}-${entry.arrival_date}-${index}`}
                aria-pressed={selectedMarketIndex === index}
                onClick={() => setSelectedMarketIndex(index)}
              >
                <span className="market-price-row__icon">
                  <MapPin size={16} />
                </span>

                <div className="market-price-row__place">
                  <strong>{entry.market || entry.district || entry.state}</strong>
                  <small>
                    {[entry.district, entry.state, entry.arrival_date]
                      .filter(Boolean)
                      .join(' · ')}
                  </small>
                </div>

                <strong className="market-price-row__price">
                  {Number.isFinite(rowPrice)
                    ? `₹${rowPrice.toLocaleString('en-IN')}`
                    : 'Not available'}
                </strong>
              </button>
            );
          })}
        </div>
      ) : (
        <p className="market-empty">
          {t('No current mandi prices were found for {cropName}.', { cropName: t(cropName) })}
        </p>
      )}

      <p className="market-card__disclaimer">
        {prices.length > 0
          ? t('Prices are from the Government of India Open Government Data service, {priceUnit} Confirm local rates before making sales decisions.', { priceUnit: t(priceUnit) })
          : t('Prices are supplied by the Government of India Open Government Data service when available.')}
      </p>

      <div className="market-estimator">
        <div className="market-estimator__heading">
          <span className="eyebrow">{t('OPTIONAL GROSS-REVENUE ESTIMATE')}</span>
          <h4>{t('What if your crop recovers?')}</h4>
          <p>
            {t('Enter your own yield estimates to compare current and healthy-crop scenarios at the selected mandi rate.')}
          </p>
        </div>

        <div className="market-estimator__fields">
          <label>
            {t('Farm area (acres)')}
            <input
              type="number"
              min="0.01"
              step="any"
              inputMode="decimal"
              value={farmArea}
              onChange={(event) => setFarmArea(event.target.value)}
              placeholder={t('e.g. 2')}
            />
          </label>
          <label>
            {t('Current expected yield (quintals/acre)')}
            <input
              type="number"
              min="0.01"
              step="any"
              inputMode="decimal"
              value={currentYield}
              onChange={(event) => setCurrentYield(event.target.value)}
              placeholder={t('e.g. 8')}
            />
          </label>
          <label>
            {t('Expected healthy yield (quintals/acre)')}
            <input
              type="number"
              min="0"
              step="any"
              inputMode="decimal"
              value={healthyYield}
              onChange={(event) => setHealthyYield(event.target.value)}
              placeholder={t('e.g. 12')}
            />
          </label>
        </div>

        {hasProjectionInputs ? (
          <div className="market-estimator__result" aria-live="polite">
            <div>
              <span>{t('Gross revenue at current yield')}</span>
              <strong>{formatRupees(currentGrossRevenue)}</strong>
            </div>
            <div>
              <span>{t('Gross revenue at healthy yield')}</span>
              <strong>{formatRupees(healthyGrossRevenue)}</strong>
            </div>
            <div>
              <span>{t('Gross-revenue difference')}</span>
              <strong>
                {grossRevenueChange > 0 ? '+' : ''}
                {formatRupees(grossRevenueChange)}
              </strong>
            </div>
            <div>
              <span>{t('Estimated yield change')}</span>
              <strong>
                {yieldChangePercent >= 0 ? '+' : ''}
                {yieldChangePercent.toFixed(1)}%
              </strong>
            </div>
            <p>
              {t('Estimate uses the selected mandi modal price and your yield inputs. It is not a profit forecast or guaranteed outcome; growing costs, actual yield and future prices can change the result.')}
            </p>
          </div>
        ) : (
          <p className="market-estimator__hint" role="status">
            {t('Add all three inputs and select an available mandi rate to see an estimate. The AI prediction does not estimate crop yield.')}
          </p>
        )}
      </div>
    </section>
  );
}

function WeatherCard({ cropName }) {
  const { t } = useLanguage();
  const [city, setCity] = useState('New Delhi');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadWeather = async (event) => {
    event?.preventDefault();
    const cityName = city.trim();

    if (!cityName) {
      setError(t('Enter a city to check local weather.'));
      setWeather(null);
      return;
    }

    setLoading(true);
    setError('');
    setWeather(null);

    try {
      const params = new URLSearchParams({
        city: cityName,
        country_code: 'IN',
      });
      const response = await fetch(`${API_BASE_URL}/api/weather?${params}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          typeof data.detail === 'string'
            ? data.detail
            : t('Weather information could not be loaded.')
        );
      }

      if (data.available !== true) {
        throw new Error(
          typeof data.message === 'string'
            ? data.message
            : t('Weather information is not currently available.')
        );
      }

      setWeather(data);
    } catch (weatherError) {
      setError(
        weatherError instanceof Error
          ? weatherError.message
          : t('Weather information could not be loaded.')
      );
    } finally {
      setLoading(false);
    }
  };

  const humidity = Number(weather?.humidity_percent);
  const temperature = Number(weather?.temperature_c);
  const windSpeed = Number(weather?.wind_speed_mps);
  const condition = weather?.weather_condition?.toLowerCase() || '';
  const doSuggestions = [];
  const dontSuggestions = [];

  if (Number.isFinite(humidity) && humidity >= 80) {
    doSuggestions.push(
      t('Inspect {cropName} leaves for new spots or other changes.', { cropName: t(cropName) })
    );
    dontSuggestions.push(
      t('Avoid wetting foliage while watering; high humidity can slow leaf drying.')
    );
  } else if (Number.isFinite(humidity) && humidity <= 35) {
    doSuggestions.push(
      t('Check soil moisture around {cropName} before adjusting irrigation.', { cropName: t(cropName) })
    );
    dontSuggestions.push(
      t('Do not increase watering based on humidity alone; check soil and crop needs first.')
    );
  }

  if (Number.isFinite(temperature) && temperature >= 35) {
    doSuggestions.push(
      t('Check {cropName} for wilting and, if watering is needed, choose cooler hours.', { cropName: t(cropName) })
    );
    dontSuggestions.push(
      t('Avoid unnecessary field work during the hottest part of the day.')
    );
  } else if (Number.isFinite(temperature) && temperature <= 10) {
    doSuggestions.push(
      t('Monitor {cropName} for signs of cold stress while temperatures are low.', { cropName: t(cropName) })
    );
  }

  if (/(rain|drizzle|thunderstorm)/.test(condition)) {
    doSuggestions.push(
      t('Check that field drains are clear while rain is reported.')
    );
    dontSuggestions.push(
      t('Avoid spraying while it is raining; treatment may wash off.')
    );
  }

  if (Number.isFinite(windSpeed) && windSpeed >= 8) {
    doSuggestions.push(
      t('Support exposed young plants if they are being affected by the wind.')
    );
    dontSuggestions.push(
      t('Avoid spraying in strong winds, which can cause drift.')
    );
  }

  if (doSuggestions.length === 0 && weather) {
    doSuggestions.push(
      t('Keep monitoring {cropName} and follow your local crop-care guidance. No elevated heat, humidity, or wind threshold was detected in this snapshot.', { cropName: t(cropName) })
    );
  }

  if (dontSuggestions.length === 0 && weather) {
    dontSuggestions.push(
      t('Do not make major irrigation or treatment changes based on one weather snapshot alone.')
    );
  }

  return (
    <section className="weather-card">
      <div className="weather-card__heading">
        <span className="detail-card__icon"><CloudSun size={22} /></span>
        <div>
          <span className="eyebrow">{t('LOCAL WEATHER CHECK')}</span>
          <h2>{t('Weather & crop suggestions')}</h2>
          <p>
            {t('Current conditions can highlight risks, but are not a weather forecast or a diagnosis.')}
          </p>
        </div>
      </div>

      <form className="weather-location-form" onSubmit={loadWeather}>
        <label htmlFor="weather-city">{t('City in India')}</label>
        <input
          id="weather-city"
          type="text"
          value={city}
          onChange={(event) => setCity(event.target.value)}
          placeholder={t('e.g. New Delhi')}
        />
        <button
          className="button button--primary"
          type="submit"
          disabled={loading}
        >
          {loading ? t('Checking…') : t('Check weather')}
        </button>
      </form>

      {error && <p className="weather-message" role="alert">{t(error)}</p>}
      {loading && <p className="weather-message" role="status">{t('Loading current weather…')}</p>}

      {weather && (
        <div className="weather-details" aria-live="polite">
          <div className="weather-summary">
            <div>
              <span><MapPin size={16} /> {weather.city}, {weather.country}</span>
              <strong>{Math.round(Number(weather.temperature_c))}°C</strong>
              <small>{t(weather.weather_description || weather.weather_condition)}</small>
            </div>
            <div className="weather-summary__metrics">
              <span><Droplets size={17} /> {t('Humidity')} <strong>{weather.humidity_percent}%</strong></span>
              <span><Wind size={17} /> {t('Wind')} <strong>{weather.wind_speed_mps} m/s</strong></span>
            </div>
          </div>

          <div className="weather-guidance">
            <div className="weather-actions-grid">
              <article className="weather-action-card weather-action-card--do">
                <div className="weather-action-card__heading">
                  <span className="weather-action-card__icon">
                    <CheckCircle2 size={20} />
                  </span>
                  <div>
                    <span className="eyebrow">{t('WEATHER-BASED')}</span>
                    <h3>{t('What to do')}</h3>
                  </div>
                </div>
                <ul>
                  {doSuggestions.map((suggestion) => (
                    <li key={suggestion}>
                      <CheckCircle2 size={17} /> {suggestion}
                    </li>
                  ))}
                </ul>
              </article>

              <article className="weather-action-card weather-action-card--dont">
                <div className="weather-action-card__heading">
                  <span className="weather-action-card__icon">
                    <Ban size={20} />
                  </span>
                  <div>
                    <span className="eyebrow">{t('PRECAUTIONS')}</span>
                    <h3>{t('What to avoid')}</h3>
                  </div>
                </div>
                <ul>
                  {dontSuggestions.map((suggestion) => (
                    <li key={suggestion}>
                      <Ban size={17} /> {suggestion}
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
          <p className="market-card__disclaimer">
            {t('Live conditions from OpenWeather. Suggestions are general precautions based on current conditions—not a forecast or guaranteed crop outcome.')}
          </p>
        </div>
      )}
    </section>
  );
}

export default function ResultsPage({ analysisResult }) {
  const { t } = useLanguage();
  const { state } = useLocation();
  const [activeTab, setActiveTab] = useState('overview');
  const report = analysisResult ?? state;

  if (!report?.result && !report?.rawPrediction) {
    return (
      <main className="results-page">
        <div className="page-shell results-shell results-empty">
          <span className="eyebrow">
            <Sparkles size={14} /> {t('CROP HEALTH CHECK')}
          </span>

          <h1>{t('No crop report yet.')}</h1>
          <p>{t('Choose a crop photo first to prepare your assessment.')}</p>

          <Link className="button button--primary" to="/analyze">
            <ArrowLeft size={16} /> {t('Go to crop check')}
          </Link>
        </div>
      </main>
    );
  }

  const result = report.result ?? {};
  const raw = report.rawPrediction ?? {};

  const apiSeverity = raw.severity ?? {};
  const advisory = raw.advisory ?? {};

  const parsed = getCropAndDisease(
    raw.class_name,
    result.cropName,
    result.diseaseName
  );

  const cropName = t(parsed.cropName);
  const diseaseName = t(parsed.diseaseName);

  // Read the confidence returned by the backend.
  const rawConfidence =
    typeof raw.confidence === 'number'
      ? raw.confidence
      : typeof result.confidenceScore === 'number'
        ? result.confidenceScore / 100
        : null;

  const confidence =
    rawConfidence !== null &&
    Number.isFinite(rawConfidence) &&
    rawConfidence >= 0 &&
    rawConfidence <= 1
      ? Number((rawConfidence * 100).toFixed(2))
      : null;

  // Read the actual severity returned by the backend.
  const severityLevel = normalizeSeverity(apiSeverity.severity_level);
  const displaySeverity = t(severityLevel);

  const severity =
    severityColors[severityLevel] ?? severityColors['Not assessed'];

  // FIX: Read the affected-area percentage from the API response.
  const rawAffectedArea = apiSeverity.measured_affected_leaf_area_percent;

  const affectedAreaPercent =
    typeof rawAffectedArea === 'number' &&
        Number.isFinite(rawAffectedArea) &&
        rawAffectedArea >= 0 &&
        rawAffectedArea <= 100
      ? rawAffectedArea
      : null;

  const affectedArea =
    affectedAreaPercent !== null
      ? `${affectedAreaPercent.toFixed(1)}%`
      : 'Not measured';

  const recommendations = getStringList(advisory.recommendations).map((text) =>
    t(text)
  );

  const symptoms = getStringList(
    advisory.symptoms ??
      advisory.observed_symptoms ??
      advisory.symptom_guidance
  ).map((text) => t(text));

  const description = t(
    advisory.description ||
    result.description ||
    `The model predicted ${diseaseName} in ${cropName}. Disease-specific information is unavailable.`
  );

  const circumference = 2 * Math.PI * 43;

  return (
    <motion.main
      className="results-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <div className="page-shell results-shell">
        <Link className="back-link" to="/analyze">
          <ArrowLeft size={16} /> {t('Back to crop check')}
        </Link>

        <div className="results-intro">
          <span className="eyebrow">
            <Sparkles size={14} /> {t('YOUR CROP CHECK')}
          </span>
          <h1>{t('Here’s your crop overview.')}</h1>
          <p>
            {t('Review the model prediction and available guidance. Classification is not a confirmed field diagnosis.')}
          </p>
        </div>

        <div className="results-tabs" role="tablist" aria-label={t('Crop report sections')}>
          <button
            id="results-tab-overview"
            type="button"
            role="tab"
            aria-selected={activeTab === 'overview'}
            aria-controls="results-tab-panel"
            className={activeTab === 'overview' ? 'is-active' : ''}
            onClick={() => setActiveTab('overview')}
          >
            <LayoutDashboard size={17} /> {t('Overview')}
          </button>
          <button
            id="results-tab-market"
            type="button"
            role="tab"
            aria-selected={activeTab === 'market'}
            aria-controls="results-tab-panel"
            className={activeTab === 'market' ? 'is-active' : ''}
            onClick={() => setActiveTab('market')}
          >
            <Coins size={17} /> {t('Market prices')}
          </button>
          <button
            id="results-tab-weather"
            type="button"
            role="tab"
            aria-selected={activeTab === 'weather'}
            aria-controls="results-tab-panel"
            className={activeTab === 'weather' ? 'is-active' : ''}
            onClick={() => setActiveTab('weather')}
          >
            <CloudSun size={17} /> {t('Weather')}
          </button>
        </div>

        <div
          id="results-tab-panel"
          className="results-tab-panel"
          role="tabpanel"
          aria-labelledby={`results-tab-${activeTab}`}
          tabIndex="0"
        >
        {activeTab === 'overview' ? (
        <section
          className="results-dashboard"
          aria-label={t('Crop assessment dashboard')}
        >
          <div className="dashboard-card dashboard-photo">
            <AffectedCropImage
              imageDataUrl={report.imageDataUrl}
              fileName={report.fileName}
            />
          </div>

          <article className="result-summary dashboard-card dashboard-diagnosis">
            <div className="result-summary__top">
              <span className="eyebrow">
                {t('MODEL PREDICTION')}
              </span>

              <span
                className="severity-pill"
                style={{
                  color: severity.foreground,
                  backgroundColor: severity.background,
                }}
              >
                <span />                 {displaySeverity}
              </span>
            </div>

            <h2>{diseaseName}</h2>
            <p className="result-scientific">{cropName}</p>
            <p className="result-description">{description}</p>

            <p className="severity-explainer">
              <strong>{t('Suggested next step:')}</strong> {t(severity.description)}
            </p>
          </article>

          <article className="dashboard-card dashboard-metric dashboard-metric-card dashboard-confidence">
            <div className="dashboard-metric-card__heading">
              <span className="eyebrow">{t('MODEL CONFIDENCE')}</span>
              <span
                className="metric-icon"
                aria-hidden="true"
              >
                <Sparkles size={18} />
              </span>
            </div>
            <div
              className="confidence-ring"
              aria-label={
                confidence === null
                  ? t('Confidence unavailable')
                  : t('Model confidence {confidence}%', { confidence })
              }
            >
              <svg viewBox="0 0 100 100" aria-hidden="true">
                <circle
                  cx="50"
                  cy="50"
                  r="43"
                  className="confidence-ring__track"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="43"
                  className="confidence-ring__value"
                  style={{
                    strokeDasharray: circumference,
                    strokeDashoffset:
                      circumference * (1 - (confidence ?? 0) / 100),
                  }}
                />
              </svg>
              <span>{confidence === null ? '—' : `${confidence}%`}</span>
            </div>
            <span className="dashboard-metric__note dashboard-metric__note--bottom">
              {t(confidence === null
                ? 'Predicted-class confidence was not provided by the API.'
                : 'Probability assigned to the predicted crop condition.')}
            </span>
          </article>

          <article className="dashboard-card dashboard-metric dashboard-metric-card dashboard-area">
            <div className="dashboard-metric-card__heading">
              <span className="eyebrow">{t('AFFECTED AREA')}</span>
              <span className="metric-icon" aria-hidden="true">
                <ScanLine size={18} />
              </span>
            </div>
            <strong className="dashboard-area__value">{affectedArea}</strong>
            <div
              className="area-progress"
              role="img"
              aria-label={
                affectedAreaPercent !== null
                  ? t('Estimated affected leaf area: {percent}%', { percent: affectedAreaPercent.toFixed(1) })
                  : t('Affected leaf area is not available')
              }
            >
              <span
                style={{
                  width:
                    affectedAreaPercent !== null
                      ? `${affectedAreaPercent}%`
                      : '0%',
                }}
              />
            </div>

            <span className="dashboard-metric__note dashboard-metric__note--bottom">
              {t(affectedAreaPercent !== null
                ? 'Estimated affected leaf area from the trained severity model. This is not a validated physical measurement.'
                : 'Affected leaf area is not available.')}
            </span>
          </article>

          <article className="dashboard-card dashboard-metric dashboard-metric-card dashboard-severity">
            <div className="dashboard-metric-card__heading">
              <span className="eyebrow">{t('FIELD HEALTH')}</span>
              <span className="metric-icon" aria-hidden="true">
                <Leaf size={18} />
              </span>
            </div>
            <strong
              className="dashboard-area__value"
              style={{ color: severity.foreground }}
            >
              {displaySeverity}
            </strong>
            <div
              className="severity-scale"
              role="img"
              aria-label={t('Severity assessment: {severityLevel}', { severityLevel: displaySeverity })}
            >
              {['Mild', 'Moderate', 'Severe'].map((level) => (
                <span
                  key={level}
                  className={severityLevel === level ? 'is-active' : ''}
                  style={
                    severityLevel === level
                      ? { '--severity-color': severity.foreground }
                      : undefined
                  }
                />
              ))}
            </div>

            <span className="dashboard-metric__note dashboard-metric__note--bottom">
              {t(apiSeverity.basis ||
                'A validated field-severity assessment is not available.')}
            </span>
          </article>

          <article className="detail-card dashboard-card dashboard-detail-card dashboard-symptoms">
            <div className="detail-card__title">
              <span className="detail-card__icon">
                <BadgeCheck size={21} />
              </span>
              <div>
                <span className="eyebrow">{t('WHAT TO LOOK FOR')}</span>
                <h3>{t('Symptoms to look for')}</h3>
              </div>
            </div>

            <div className="care-group">
              <h4><span>🔎</span> {t('Symptoms to look for')}</h4>
              {symptoms.length > 0 ? (
                <ul>
                  {symptoms.map((symptom, index) => (
                    <li key={`${symptom}-${index}`}>{t(symptom)}</li>
                  ))}
                </ul>
              ) : (
                <p>
                  {t('No symptom details were supplied by the API. Inspect the affected leaves and consult a local agricultural expert to confirm the symptoms.')}
                </p>
              )}
            </div>
          </article>

          <article className="detail-card dashboard-card dashboard-detail-card dashboard-care">
            <div className="detail-card__title">
              <span className="detail-card__icon">
                <Leaf size={21} />
              </span>
              <div>
                <span className="eyebrow">{t('PRACTICAL NEXT STEPS')}</span>
                <h3>{t('Care suggestions')}</h3>
              </div>
            </div>

            {recommendations.length > 0 ? (
              <div className="care-group">
                <h4><span>🌱</span> {t('Crop care recommendations')}</h4>
                <ul>
                  {recommendations.map((step, index) => (
                    <li key={`${step}-${index}`}>{t(step)}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>
                {t('No disease-specific recommendations were returned by the API. Confirm the diagnosis before choosing a treatment.')}
              </p>
            )}

            {advisory.notice && (
              <p className="market-card__disclaimer">
                {t(advisory.notice)}
              </p>
            )}
          </article>

        </section>
        ) : activeTab === 'market' ? (
          <MarketPriceCard cropName={cropName} />
        ) : (
          <WeatherCard cropName={cropName} />
        )}
        </div>

        <div className="results-actions">
          <p>{t('Want to check another photo?')}</p>
          <Link className="button button--primary" to="/analyze">
            {t('Analyze another crop')} <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </motion.main>
  );
}
