import React, { FC } from 'react';
import { IFooter } from './IFooter';

const Footer: FC<IFooter> = (props) => {
  const {
    pageCounter,
  } = props;
  console.log('pageCounter', pageCounter);
  return (
    <div>
      footer
    </div>
  );
};

export default Footer;
