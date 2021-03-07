import React, { FC } from 'react';
import { ICard } from './ICard';

import styles from './Card.module.css';

const Card: FC<ICard> = (props) => {
  const {
    name,
    climate,
    population,
    onClick,
    url,
  } = props;

  console.log({
    name,
    climate,
    population,
    onClick,
    url,
  });

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>{name}</div>
      <div className={styles.content}>
        <div>
          climate:
          {' '}
          {climate}
        </div>
        <div>
          population:
          {' '}
          {population}
        </div>
      </div>
    </div>
  );
};

export default Card;
