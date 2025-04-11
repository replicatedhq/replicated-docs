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
      const normalizedPath = currentPath.endsWith('/') 
        ? currentPath.slice(0, -1) 
        : currentPath;
      
      // Construct the markdown URL
      const markdownUrl = `${normalizedPath}.md`;
      
      // Fetch the markdown content
      const response = await fetch(markdownUrl);
      
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
      showToast('Failed to copy. Please try again.', true);
    }
  }, []);

  // View as plain text
  const viewAsMarkdown = useCallback(() => {
    try {
      // Get the current page path
      const currentPath = window.location.pathname;
      
      // Remove trailing slash if it exists
      const normalizedPath = currentPath.endsWith('/') 
        ? currentPath.slice(0, -1) 
        : currentPath;
      
      // Construct the markdown URL
      const markdownUrl = `${normalizedPath}.md`;
      
      // Open in a new tab
      window.open(markdownUrl, '_blank');
      
      // Close dropdown
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to view markdown:', error);
      showToast('Failed to open view. Please try again.', true);
    }
  }, []);

  // Open in ChatGPT
  const openInChatGpt = useCallback(async () => {
    try {
      // Get the current page path
      const currentPath = window.location.pathname;
      
      // Remove trailing slash if it exists
      const normalizedPath = currentPath.endsWith('/') 
        ? currentPath.slice(0, -1) 
        : currentPath;
      
      // Construct the markdown URL
      const markdownUrl = `${normalizedPath}.md`;
      
      // Fetch the markdown content
      const response = await fetch(markdownUrl);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch markdown: ${response.status}`);
      }
      
      const markdown = await response.text();
      
      // Open ChatGPT
      const baseUrl = 'https://chat.openai.com/';
      const newWindow = window.open(baseUrl);
      
      if (newWindow) {
        // Copy to clipboard for pasting into ChatGPT
        await navigator.clipboard.writeText(markdown);
        setIsOpen(false);
        // No visual feedback for this option
      } else {
        showToast('Popup was blocked. Please allow popups for this site.', true);
      }
    } catch (error) {
      console.error('Failed to open ChatGPT:', error);
      showToast('Failed to open ChatGPT. Please try again.', true);
    }
  }, []);

  // Show toast notification
  const showToast = (message, isError = false) => {
    const toast = document.createElement('div');
    toast.className = styles.toast;
    if (isError) {
      toast.classList.add(styles.errorToast);
    }
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 500);
    }, 3000);
  };

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
                <span>Copy page as Markdown</span>
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