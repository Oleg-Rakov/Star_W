import React, { FC } from 'react';
import { IFooter } from './IFooter';

import styles from './Footer.module.css';

const Footer: FC<IFooter> = (props) => {
  const {
    pageCounter,
  } = props;
  return (
    <div className={styles.container}>
      <b>PAGES</b>
      :
      {' '}
      {pageCounter}
    </div>
  );
};

export default Footer;
