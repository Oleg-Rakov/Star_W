import React, { FC } from 'react';
import { IFooter } from './IFooter';

import styles from './Footer.module.css';

const Footer: FC<IFooter> = (props) => {
  const {
    pageCounter,
  } = props;
  console.log('pageCounter', pageCounter);
  return (
    <div className={styles.container}>
      Pages:
      {' '}
      {pageCounter}
    </div>
  );
};

export default Footer;
