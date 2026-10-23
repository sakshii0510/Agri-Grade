
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Check,
  ImagePlus,
  LoaderCircle,
  ScanLine,
  ShieldCheck,
  UploadCloud,
  X,
} from 'lucide-react';
import { useLanguage } from '../languageContext';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '');
const API_URL = `${API_BASE_URL}/api/predict`;

export default function AnalyzePage({ onAnalysisComplete }) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const fileInputRef = useRef(null);

  const [image, setImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    return () => {
      if (image?.preview?.startsWith('blob:')) {
        URL.revokeObjectURL(image.preview);
      }
    };
  }, [image]);

  const readImage = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => resolve(reader.result);
      reader.onerror = () =>
        reject(        new Error(t('Could not read the selected image.')));

      reader.readAsDataURL(file);
    });

  const selectFile = (file) => {
    if (!file) return;
    setError('');

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
    ];

    if (!allowedTypes.includes(file.type)) {
      setError(t('Please select a JPG, PNG, or WEBP image.'));
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError(t('Image size must not exceed 10 MB.'));
      return;
    }

    setImage({
      file,
      preview: URL.createObjectURL(file),
      fileName: file.name,
    });
  };

  const clearImage = () => {
    setImage(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileInput = (event) => {
    selectFile(event.target.files?.[0]);
    event.target.value = '';
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    selectFile(event.dataTransfer.files?.[0]);
  };

  const analyze = async () => {
    if (!image?.file || analyzing) return;

    setError('');
    setAnalyzing(true);
    setProgress(10);

    try {
      const formData = new FormData();
      formData.append('file', image.file);

      setProgress(30);

      let response;

      try {
        response = await fetch(API_URL, {
          method: 'POST',
          body: formData,
        });
      } catch {
        throw new Error(
          t('Cannot connect to the backend. Start FastAPI on port 8000 and check the API URL.')
        );
      }

      setProgress(60);

      let data;

      try {
        data = await response.json();
      } catch {
        throw new Error(
          t('The backend returned an invalid response. Check the backend terminal.')
        );
      }

      if (!response.ok) {
        const detail =
          typeof data.detail === 'string'
            ? data.detail
            : t('Crop analysis failed. Please try again.');

        throw new Error(t(detail));
      }

      if (
        data.success !== true ||
        typeof data.class_name !== 'string' ||
        !data.class_name.includes('___')
      ) {
        throw new Error(
          t('The AI model did not return a valid crop prediction.')
        );
      }

      const imageDataUrl = await readImage(image.file);

      const [rawCrop, ...diseaseParts] = data.class_name.split('___');

      const rawDisease = diseaseParts.join('___');

      const cropName = rawCrop.replaceAll('_', ' ').trim();
      const diseaseName = rawDisease.replaceAll('_', ' ').trim();

      const isHealthy = rawDisease.toLowerCase() === 'healthy';

      const severityMap = {
        Low: 'Mild',
        Moderate: 'Moderate',
        High: 'Severe',
        Mild: 'Mild',
        Severe: 'Severe',
      };

      const backendSeverity = data.severity?.severity_level;

      const severityLevel = isHealthy
        ? 'Mild'
        : typeof backendSeverity === 'string'
          ? severityMap[backendSeverity] || backendSeverity
          : 'Not assessed';

      const confidence =
        typeof data.confidence === 'number' &&
        Number.isFinite(data.confidence) &&
        data.confidence >= 0 &&
        data.confidence <= 1
          ? Number((data.confidence * 100).toFixed(2))
          : null;

      const recommendations = Array.isArray(
        data.advisory?.recommendations
      )
        ? data.advisory.recommendations
            .map((item) => {
              if (typeof item === 'string') return item;

              if (item && typeof item.description === 'string') {
                return item.description;
              }

              if (item && typeof item.message === 'string') {
                return item.message;
              }

              return null;
            })
            .filter(Boolean)
        : [];

      const symptomsSource =
        data.advisory?.symptoms ??
        data.advisory?.observed_symptoms ??
        data.advisory?.symptom_guidance ??
        [];

      const symptoms = Array.isArray(symptomsSource)
        ? symptomsSource.filter(
            (item) => typeof item === 'string' && item.trim()
          )
        : typeof symptomsSource === 'string' && symptomsSource.trim()
          ? [symptomsSource]
          : [];

      const result = {
        cropName,
        diseaseName: isHealthy ? 'Healthy' : diseaseName,
        scientificName: '',
        severityLevel,
        confidenceScore: confidence,
        affectedArea: 'Not measured',
        description:
          data.severity?.basis ||
          data.severity?.description ||
          data.advisory?.notice ||
          t('This is a preliminary model prediction, not a confirmed field diagnosis.'),
        symptoms,
        treatmentRecommendations: [
          {
            category: 'Crop care recommendations',
            icon: '🌱',
            steps: recommendations,
          },
        ],
      };

      const report = {
        result,
        imageDataUrl,
        fileName: image.fileName,
        rawPrediction: data,
      };

      setProgress(100);

      if (typeof onAnalysisComplete === 'function') {
        onAnalysisComplete(report);
      }

      navigate('/results', {
        state: report,
      });
    } catch (analysisError) {
      console.error('AgriGrade analysis error:', analysisError);

      setError(
        analysisError instanceof Error
          ? analysisError.message
          : t('Unable to analyze the crop image.')
      );
    } finally {
      setAnalyzing(false);
      setProgress(0);
    }
  };

  return (
    <main className="analyze-section">
      <div className="analyze-layout">
          <div className="analyze-copy">
            <span className="eyebrow">
              <ScanLine size={15} />               {t('YOUR CROP CHECK')}
            </span>

            <h1>{t('A closer look starts with one photo.')}</h1>

            <p>
              {t('Upload a clear crop photo to get an AI-powered health assessment and practical care suggestions.')}
            </p>

            <ul className="analyze-benefits">
              <li><Check size={17} /> {t('Clear, step-by-step results')}</li>
              <li><Check size={17} /> {t('Crop health and severity overview')}</li>
              <li><Check size={17} /> {t('Actionable care suggestions')}</li>
            </ul>
          </div>

          <div className="upload-card">
            <div className="upload-card__head">
              <span className="upload-card__icon">
                <ImagePlus size={21} />
              </span>
              <div>
                <h2>{t('Upload crop photo')}</h2>
                <p>{t('JPG, PNG or WebP · up to 10 MB')}</p>
              </div>
            </div>

            {image ? (
              <div className="image-preview">
                <img src={image.preview}                 alt={t('Selected crop leaf')} />
                <span className="image-preview__label">
                  {image.fileName}
                </span>
                <button
                  type="button"
                  className="image-preview__remove"
                  onClick={clearImage}
                  disabled={analyzing}
                  aria-label={t('Remove selected image')}
                >
                  <X size={17} />
                </button>
              </div>
            ) : (
              <label
                className={`upload-drop${isDragging ? ' upload-drop--active' : ''}`}
                onDragOver={(event) => {
                  event.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  className="visually-hidden"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileInput}
                  disabled={analyzing}
                  aria-label={t('Choose a crop photo')}
                />

                <span className="upload-drop__icon" aria-hidden="true">
                  <UploadCloud size={26} />
                </span>
                <strong>{t('Drag a photo here')}</strong>
                <span>
                  {t('or ')}<span className="upload-drop__browse">{t('browse files')}</span>{t(' on your device')}
                </span>
                <small>{t('For best results, use a well-lit close-up photo')}</small>
              </label>
            )}

            {error && (
              <p className="form-error" role="alert">{error}</p>
            )}

            {analyzing && (
              <div className="analysis-progress" aria-live="polite">
                <div className="analysis-progress__label">
                  <LoaderCircle className="spin" size={16} />
                  {t('Analyzing your crop')}
                  <span>{progress}%</span>
                </div>
                <div
                  className="analysis-progress__track"
                  role="progressbar"
                  aria-label={t('Analysis progress')}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-valuenow={progress}
                >
                  <span style={{ width: `${progress}%` }} />
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={analyze}
              disabled={!image || analyzing}
              className="button button--primary upload-submit"
            >
              {analyzing ? t('Analyzing crop...') : t('Analyze crop')}
              {!analyzing && <ArrowRight size={17} />}
            </button>

            <p className="upload-privacy">
              <ShieldCheck size={15} />
              {t('Your photo is analyzed by the AgriGrade crop health service.')}
            </p>
          </div>
      </div>
    </main>
  );
}
