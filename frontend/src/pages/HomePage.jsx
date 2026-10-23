
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Leaf,
  ScanLine,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import heroBackground from '../assets/HeroSection.png';
import { useLanguage } from '../languageContext';

const steps = [
  {
    number: '01',
    title: 'Take a crop photo',
    description:
      'Choose a clear photo of the leaf, fruit, or stem you want to check.',
  },
  {
    number: '02',
    title: 'See what to look for',
    description:
      'Review the model prediction, available severity details, and crop-care suggestions.',
  },
  {
    number: '03',
    title: 'Choose your next step',
    description:
      'Use the information as a starting point for checking with a local agriculture expert.',
  },
];

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="home-page">
      <section
        className="hero hero--landing"
        style={{
          backgroundImage: `url("${heroBackground}")`,
        }}
      >
        <motion.div
          className="hero__copy hero__copy--center"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <div className="eyebrow">
            <Sparkles size={14} />
            {t('A HEALTHIER HARVEST STARTS HERE')}
          </div>

          <h1>
            {t('Where nature meets')}
            <br />
            <span>{t('healthier harvests.')}</span>
          </h1>

          <p className="hero__intro">
            {t('Check crop health, learn what to look for, and get practical ideas to help care for your field.')}
          </p>

          <div className="hero__actions hero__actions--center">
            <Link
              className="button button--primary"
              to="/analyze"
            >
              {t('Check your crop')} <ArrowRight size={17} />
            </Link>

            <a
              className="button button--light"
              href="#how-it-works"
            >
              {t('How it works')} <ArrowDown size={15} />
            </a>
          </div>
        </motion.div>
      </section>

      <section
        className="home-highlights"
        aria-label={t('AgriGrade highlights')}
      >
        <div className="page-shell home-highlights__inner">
          <div className="home-highlights__statement">
            <p>
              {t("We're here to make crop health checks")}{' '}
              <strong>
                {t('clearer, calmer, and more useful')}
              </strong>{' '}
              {t('for every grower.')}
            </p>
          </div>

          <div className="home-highlights__items">
            <div>
              <strong>
                <ShieldCheck size={19} />
                {t('Practical guidance')}
              </strong>
              <span>
                {t('Simple steps for your next field check')}
              </span>
            </div>

            <div>
              <strong>
                <ScanLine size={19} />
                {t('Photo-first checks')}
              </strong>
              <span>
                {t('Start with a crop photo, right here')}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section
        className="steps-section"
        id="how-it-works"
      >
        <div className="page-shell">
          <div className="section-heading">
            <span className="eyebrow">
              <Leaf size={14} />
              {t('SIMPLE STEPS, USEFUL INSIGHTS')}
            </span>

            <h2>
              {t('From a field photo to a clearer next step.')}
            </h2>

            <p>
              {t('Easy to follow, with no complicated reports or hard-to-read charts.')}
            </p>
          </div>

          <div className="steps-grid">
            {steps.map(
              ({ number, title, description }) => (
                <article
                  className="step-card"
                  key={number}
                >
                  <span className="step-card__number">
                    {number}
                  </span>

                  <h3>{t(title)}</h3>
                  <p>{t(description)}</p>
                </article>
              ),
            )}
          </div>

          <Link
            className="button button--outline"
            to="/analyze"
          >
            {t('Check a crop')} <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
