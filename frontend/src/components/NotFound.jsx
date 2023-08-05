import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import imagePath from '../assets/notFound.svg';

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center">
      <img className="img-fluid h-25" alt="Страница не найдена" src={imagePath} />
      <h1 className="h4 text-muted">{t('notFound.header')}</h1>
      <p className="text-muted">
        {t('notFound.message')}
        <Link to="/">
          {' '}
          {t('notFound.linkText')}
        </Link>
      </p>
    </div>
  );
}

export default NotFound;
