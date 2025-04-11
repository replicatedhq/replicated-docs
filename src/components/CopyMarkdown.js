import React, { useState, useEffect, useCallback, useRef } from 'react';
import styles from './CopyMarkdown.module.css';

function CopyMarkdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasContent, setHasContent] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  // Toggle dropdown
  const toggleDropdown = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  // Copy markdown to clipboard
  const copyMarkdown = useCallback(async () => {
    try {
      // Get the current page path
      const currentPath = window.location.pathname;
      
      // Remove trailing slash if it exists
      const normalizedPath = currentPath.endsWith('/') && currentPath !== '/'
        ? currentPath.slice(0, -1) 
        : currentPath;
      
      // For the homepage/intro, use /intro.md specifically
      const markdownPath = normalizedPath === '/' ? '/intro.md' : `${normalizedPath}.md`;
      
      // Fetch the markdown content
      const response = await fetch(markdownPath);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch markdown: ${response.status}`);
      }
      
      const markdown = await response.text();
      
      // Copy to clipboard
      await navigator.clipboard.writeText(markdown);
      
      // Close dropdown and show copied feedback
      setIsOpen(false);
      setIsCopied(true);
      
      // Reset the button state after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to copy markdown:', error);
    }
  }, []);

  // View as plain text
  const viewAsMarkdown = useCallback(() => {
    try {
      // Get the current page path
      const currentPath = window.location.pathname;
      
      // Remove trailing slash if it exists
      const normalizedPath = currentPath.endsWith('/') && currentPath !== '/'
        ? currentPath.slice(0, -1) 
        : currentPath;
      
      // For the homepage/intro, use /intro.md specifically
      const markdownPath = normalizedPath === '/' ? '/intro.md' : `${normalizedPath}.md`;
      
      // Open in a new tab
      window.open(markdownPath, '_blank');
      
      // Close dropdown
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to view markdown:', error);
    }
  }, []);

  // Open in ChatGPT
  const openInChatGpt = useCallback(async () => {
    try {
      // Get the current page path
      const currentPath = window.location.pathname;
      
      // Remove trailing slash if it exists
      const normalizedPath = currentPath.endsWith('/') && currentPath !== '/'
        ? currentPath.slice(0, -1) 
        : currentPath;
      
      // For the homepage/intro, use /intro specifically
      const docPath = normalizedPath === '/' ? '/intro' : normalizedPath;
      
      // Construct the full markdown URL with domain
      const fullMarkdownUrl = `https://docs.replicated.com${docPath}.md`;
      
      // Create the prompt to send to ChatGPT
      const prompt = `Read ${fullMarkdownUrl} so I can ask questions about it`;
      
      // URL encode the prompt for the ChatGPT URL
      const encodedPrompt = encodeURIComponent(prompt);
      
      // Create the ChatGPT URL with the prompt
      const chatGptUrl = `https://chat.openai.com/?prompt=${encodedPrompt}`;
      
      // Open ChatGPT with the prompt
      window.open(chatGptUrl, '_blank');
      
      // Close the dropdown
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to open ChatGPT:', error);
    }
  }, []);

  // Handle click outside to close dropdown
  const handleClickOutside = useCallback((event) => {
    // Only close if clicking outside both the button and dropdown
    if (
      buttonRef.current && 
      !buttonRef.current.contains(event.target) &&
      dropdownRef.current && 
      !dropdownRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  }, []);

  // Initialize on client side
  useEffect(() => {
    // Check if we have markdown content
    const hasMarkdownContent = !!document.querySelector('.theme-doc-markdown.markdown h1');
    setHasContent(hasMarkdownContent);

    // Set up click outside handler
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      // Clean up event listener
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  // Check for dark theme
  useEffect(() => {
    const checkTheme = () => {
      setIsDarkTheme(document.documentElement.getAttribute('data-theme') === 'dark');
    };
    
    checkTheme();
    
    // Listen for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
    
    return () => observer.disconnect();
  }, []);

  // Don't render on pages that don't have markdown content
  if (!hasContent) {
    return null;
  }

  return (
    <div className={styles.container}>
      <button 
        ref={buttonRef}
        className={`${styles.button} ${isCopied ? styles.copied : ''}`}
        onClick={!isCopied ? toggleDropdown : undefined}
        aria-expanded={isOpen}
        aria-haspopup="true"
        disabled={isCopied}
      >
        {isCopied ? (
          <span className={styles.buttonText}>Copied!</span>
        ) : (
          <>
            <img 
              src={isDarkTheme ? "/images/icons/copy-white.svg" : "/images/icons/copy.svg"} 
              alt="Copy" 
              className={styles.copyIcon} 
            />
            <span className={styles.buttonText}>Copy page</span>
            <svg className={styles.icon} viewBox="0 0 20 20" fill="currentColor">
              <path 
                fillRule="evenodd" 
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
                clipRule="evenodd" 
              />
            </svg>
          </>
        )}
      </button>
      
      {isOpen && (
        <div 
          ref={dropdownRef}
          className={styles.dropdown} 
          role="menu"
          aria-orientation="vertical"
        >
          <ul className={styles.list}>
            <li className={styles.item}>
              <button 
                className={styles.actionButton} 
                onClick={copyMarkdown}
                role="menuitem"
              >
                <span>Copy as plain text</span>
              </button>
            </li>
            <li className={styles.item}>
              <button 
                className={styles.actionButton} 
                onClick={viewAsMarkdown}
                role="menuitem"
              >
                <span>View as plain text</span>
              </button>
            </li>
            <li className={styles.item}>
              <button 
                className={styles.actionButton} 
                onClick={openInChatGpt}
                role="menuitem"
              >
                <span>Open in ChatGPT</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default CopyMarkdown; 