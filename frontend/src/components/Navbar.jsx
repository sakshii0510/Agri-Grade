import { ChevronDown, Languages, Leaf, MoveUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../languageContext';

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="site-header">
      <nav className="site-nav page-shell" aria-label={t('Main navigation')}>
        <Link to="/" className="brand" aria-label={t('AgriGrade home')}>
          <span className="brand__mark"><Leaf size={18} /></span>
          <span>Agri<span>Grade</span></span>
        </Link>
        <div className="site-nav__links">
          <Link to="/#how-it-works">{t('How it works')}</Link>
          <Link className="site-nav__cta" to="/analyze">{t('Check a crop')} <MoveUpRight size={15} /></Link>
          <label className="language-switch">
            <span className="visually-hidden">{t('Switch language')}</span>
            <Languages className="language-switch__icon" size={17} aria-hidden="true" />
            <select
              value={language}
              aria-label={t('Switch language')}
              onChange={(event) => setLanguage(event.target.value)}
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
            </select>
            <ChevronDown className="language-switch__chevron" size={14} aria-hidden="true" />
          </label>
        </div>
      </nav>
    </header>
  );
}
