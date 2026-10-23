import { Leaf, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../languageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="page-shell">
        <div className="footer-main">
          <div className="footer-brand">
            <Link to="/" className="brand brand--footer">
              <span className="brand__mark"><Leaf size={18} /></span>
              <span>Agri<span>Grade</span></span>
            </Link>
            <p>{t('Clearer crop insights for healthier harvests. Designed to make a useful first check feel simple.')}</p>
          </div>
          <div className="footer-nav">
            <span className="footer-label">{t('EXPLORE')}</span>
            <Link to="/analyze">{t('Crop check')}</Link>
            <Link to="/#how-it-works">{t('How it works')}</Link>
          </div>
          <div className="footer-contact">
            <span className="footer-label">{t('GET IN TOUCH')}</span>
            <a href="mailto:hello@agrigrade.io"><Mail size={15} /> hello@agrigrade.io</a>
            <span><MapPin size={15} /> {t('Built for growers, everywhere')}</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 AgriGrade</span>
          <span>{t('AI predictions are a helpful starting point, not a substitute for professional agronomic advice.')}</span>
        </div>
      </div>
    </footer>
  );
}
