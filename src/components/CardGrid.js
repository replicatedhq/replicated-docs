import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useColorMode } from '@docusaurus/theme-common';
import styles from './CardGrid.module.css';

// Individual Card component
function Card({ header, description, links, id }) {
  const { colorMode } = useColorMode();
  const isDarkTheme = colorMode === 'dark';
  
  // Determine which icon source to use based on the theme
  const iconSrc = isDarkTheme && header.icon.darkModeSrc 
    ? header.icon.darkModeSrc 
    : header.icon.src;

  return (
    <ul className={styles.card} id={id}>
      <li className={styles.cardHeader}>
        {header.icon && (
          <img 
            src={iconSrc}
            alt={header.icon.alt || "icon"} 
            width={header.icon.width || "55px"} 
            height={header.icon.height || "55px"} 
            className={header.icon.className}
          />
        )}
        <p>{header.title}</p>
      </li>
      
      {header.subtitle && (
        <li>
          <h3>{header.subtitle}</h3>
          <p>{description}</p>
        </li>
      )}
      
      {!header.subtitle && (
        <li>
          <p>{description}</p>
        </li>
      )}
      
      {links && links.length > 0 && links.map((link, idx) => (
        <li key={idx}>
          <Link to={link.url}>{link.text}</Link>
        </li>
      ))}
    </ul>
  );
}

// CardGrid component that renders multiple cards in a container
export default function CardGrid({ cards }) {
  return (
    <section className={styles.cardGrid}>
      <div className={styles.cardContainer}>
        {cards.map((card, idx) => (
          <Card 
            key={idx}
            header={card.header}
            description={card.description}
            links={card.links}
            id={card.id}
          />
        ))}
      </div>
    </section>
  );
} 