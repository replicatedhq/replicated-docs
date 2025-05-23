import React from 'react';
import DocItem from '@theme-original/DocItem';
import CopyMarkdown from '../../components/CopyMarkdown';
import styles from './styles.module.css';

export default function DocItemWrapper(props) {
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h1>{props.content.metadata.title}</h1>
        <CopyMarkdown />
      </div>
      <div className={styles.contentContainer}>
        <DocItem {...props} />
      </div>
    </div>
  );
}
