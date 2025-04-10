import React, { useState, useEffect, useCallback, useRef } from 'react';
import styles from './CopyMarkdown.module.css';

function CopyMarkdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasContent, setHasContent] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  // Generate clean markdown from the page content
  const generateCleanMarkdown = useCallback(() => {
    const content = document.querySelector('.theme-doc-markdown.markdown');
    if (!content) {
      return 'Could not find content to convert to markdown.';
    }

    // Clone the content to avoid modifying the original
    const contentClone = content.cloneNode(true);

    // Get the title
    const title = contentClone.querySelector('h1')?.textContent || 'Untitled';
    
    // Remove elements we don't want in the markdown
    const elementsToRemove = contentClone.querySelectorAll('.theme-edit-this-page, .pagination-nav, .table-of-contents');
    elementsToRemove.forEach(el => el?.remove());

    // Convert the HTML content to markdown
    let markdown = `# ${title}\n\n`;
    
    // Process paragraphs, headers, lists, etc.
    const elements = contentClone.querySelectorAll('p, h2, h3, h4, h5, h6, ul, ol, pre, blockquote, table');
    elements.forEach(el => {
      // Skip the title as we've already added it
      if (el.tagName === 'H1') return;
      
      // Process different element types
      switch (el.tagName) {
        case 'H2':
          markdown += `\n## ${el.textContent}\n\n`;
          break;
        case 'H3':
          markdown += `\n### ${el.textContent}\n\n`;
          break;
        case 'H4':
          markdown += `\n#### ${el.textContent}\n\n`;
          break;
        case 'H5':
          markdown += `\n##### ${el.textContent}\n\n`;
          break;
        case 'H6':
          markdown += `\n###### ${el.textContent}\n\n`;
          break;
        case 'P':
          markdown += `${el.textContent}\n\n`;
          break;
        case 'UL':
          markdown += processListItems(el, '- ');
          break;
        case 'OL':
          markdown += processListItems(el, (i) => `${i+1}. `);
          break;
        case 'PRE':
          const codeElement = el.querySelector('code');
          const codeClass = codeElement?.className?.match(/language-(\w+)/)?.[1] || '';
          const codeContent = codeElement?.textContent || el.textContent;
          markdown += `\`\`\`${codeClass}\n${codeContent}\n\`\`\`\n\n`;
          break;
        case 'BLOCKQUOTE':
          const blockquoteLines = el.textContent.split('\n').map(line => `> ${line}`).join('\n');
          markdown += `${blockquoteLines}\n\n`;
          break;
        case 'TABLE':
          markdown += processTable(el);
          break;
        default:
          markdown += `${el.textContent}\n\n`;
      }
    });

    return markdown.trim();
  }, []);

  // Helper function to process list items
  const processListItems = (listElement, prefix) => {
    let result = '\n';
    const items = listElement.querySelectorAll('li');
    items.forEach((item, index) => {
      // If prefix is a function, call it with the index
      const prefixText = typeof prefix === 'function' ? prefix(index) : prefix;
      result += `${prefixText}${item.textContent}\n`;
      
      // Process any nested lists
      const nestedLists = item.querySelectorAll('ul, ol');
      if (nestedLists.length > 0) {
        nestedLists.forEach(nestedList => {
          const nestedPrefix = nestedList.tagName === 'UL' ? '  - ' : (i) => `  ${i+1}. `;
          result += processListItems(nestedList, nestedPrefix);
        });
      }
    });
    return result + '\n';
  };

  // Helper function to process tables
  const processTable = (tableElement) => {
    let result = '\n';
    const rows = tableElement.querySelectorAll('tr');
    
    // Process header row
    const headerCells = rows[0]?.querySelectorAll('th') || [];
    if (headerCells.length > 0) {
      result += '| ' + Array.from(headerCells).map(cell => cell.textContent).join(' | ') + ' |\n';
      result += '| ' + Array.from(headerCells).map(() => '---').join(' | ') + ' |\n';
    }
    
    // Process data rows
    for (let i = headerCells.length > 0 ? 1 : 0; i < rows.length; i++) {
      const cells = rows[i].querySelectorAll('td');
      result += '| ' + Array.from(cells).map(cell => cell.textContent).join(' | ') + ' |\n';
    }
    
    return result + '\n';
  };

  // Toggle dropdown
  const toggleDropdown = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  // Copy markdown to clipboard
  const copyMarkdown = useCallback(async () => {
    try {
      const markdown = generateCleanMarkdown();
      await navigator.clipboard.writeText(markdown);
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
  }, [generateCleanMarkdown]);

  // View as plain text
  const viewAsMarkdown = useCallback(() => {
    try {
      const markdown = generateCleanMarkdown();
      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.write(`<html><head><title>Markdown Content</title></head><body><pre>${markdown}</pre></body></html>`);
        newWindow.document.close();
      } else {
        showToast('Popup was blocked. Please allow popups for this site.', true);
      }
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to view markdown:', error);
      showToast('Failed to open view. Please try again.', true);
    }
  }, [generateCleanMarkdown]);

  // Open in ChatGPT
  const openInChatGpt = useCallback(() => {
    try {
      const markdown = generateCleanMarkdown();
      const baseUrl = 'https://chat.openai.com/';
      const newWindow = window.open(baseUrl);
      if (newWindow) {
        // Also copy to clipboard
        navigator.clipboard.writeText(markdown);
        showToast("ChatGPT opened. Please paste the copied markdown there.");
      } else {
        showToast('Popup was blocked. Please allow popups for this site.', true);
      }
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to open ChatGPT:', error);
      showToast('Failed to open ChatGPT. Please try again.', true);
    }
  }, [generateCleanMarkdown]);

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