// Browser-compatible version of the CopyMarkdown component
(function() {
  const React = window.React;
  const { useState, useRef, useEffect } = React;

  function CopyMarkdown() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && 
            !dropdownRef.current.contains(event.target) &&
            !buttonRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [dropdownRef]);

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

    const copyMarkdown = async () => {
      try {
        const markdownContent = await generateMarkdown();
        navigator.clipboard.writeText(markdownContent);
        setIsOpen(false);
        // Optional: Show a toast notification
        showToast('Copied to clipboard');
      } catch (err) {
        console.error('Failed to copy: ', err);
        showToast('Failed to copy', true);
      }
    };

    const viewAsMarkdown = async () => {
      try {
        const markdownContent = await generateMarkdown();
        const blob = new Blob([markdownContent], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
        setIsOpen(false);
      } catch (err) {
        console.error('Failed to generate markdown: ', err);
        showToast('Failed to view as markdown', true);
      }
    };

    const openInChatGpt = async () => {
      try {
        const markdownContent = await generateMarkdown();
        const url = `https://chat.openai.com/g?prompt=${encodeURIComponent(markdownContent)}`;
        window.open(url, '_blank');
        setIsOpen(false);
      } catch (err) {
        console.error('Failed to open in ChatGPT: ', err);
        showToast('Failed to open in ChatGPT', true);
      }
    };

    const generateMarkdown = async () => {
      return window.generateCleanMarkdown ? 
        window.generateCleanMarkdown() : 
        'Markdown content will be generated here';
    };

    // Simple toast notification
    const showToast = (message, isError = false) => {
      const toast = document.createElement('div');
      toast.textContent = message;
      toast.style.position = 'fixed';
      toast.style.bottom = '1rem';
      toast.style.right = '1rem';
      toast.style.backgroundColor = isError ? '#f44336' : '#4caf50';
      toast.style.color = 'white';
      toast.style.padding = '0.75rem 1.5rem';
      toast.style.borderRadius = '4px';
      toast.style.zIndex = '9999';
      toast.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
      
      document.body.appendChild(toast);
      
      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
          document.body.removeChild(toast);
        }, 500);
      }, 3000);
    };

    // CSS-in-JS styles for the component
    const styles = {
      container: {
        position: 'relative',
        display: 'inline-block',
        marginLeft: 'auto'
      },
      dropdownButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.875rem',
        fontWeight: '500',
        color: 'var(--ifm-color-primary)',
        backgroundColor: 'transparent',
        border: '2px solid var(--ifm-color-primary)',
        borderRadius: '8px',
        padding: '0.5rem 0.75rem',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
      },
      iconSvg: {
        width: '1rem',
        height: '1rem'
      },
      dropdownMenu: {
        position: 'absolute',
        top: '100%',
        right: '0',
        marginTop: '0.5rem',
        minWidth: '240px',
        backgroundColor: 'var(--ifm-background-color)',
        border: '1px solid var(--ifm-color-emphasis-300)',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        zIndex: '1000',
        overflow: 'hidden'
      },
      dropdownList: {
        listStyle: 'none',
        padding: '0',
        margin: '0'
      },
      dropdownItem: {
        borderBottom: '1px solid var(--ifm-color-emphasis-200)'
      },
      dropdownLink: {
        display: 'block',
        padding: '0.75rem 1rem',
        width: '100%',
        textAlign: 'left',
        color: 'var(--ifm-font-color-base)',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: '0.875rem',
        transition: 'background-color 0.2s ease'
      }
    };

    return React.createElement(
      'div',
      { style: styles.container },
      React.createElement(
        'button',
        {
          ref: buttonRef,
          style: styles.dropdownButton,
          onClick: toggleDropdown,
          'aria-haspopup': 'true',
          'aria-expanded': isOpen
        },
        React.createElement('span', null, 'Copy page'),
        React.createElement(
          'svg',
          {
            style: styles.iconSvg,
            viewBox: '0 0 20 20',
            fill: 'currentColor'
          },
          React.createElement('path', {
            fillRule: 'evenodd',
            d: 'M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z',
            clipRule: 'evenodd'
          })
        )
      ),
      isOpen && React.createElement(
        'div',
        {
          ref: dropdownRef,
          style: styles.dropdownMenu
        },
        React.createElement(
          'ul',
          { style: styles.dropdownList },
          React.createElement(
            'li',
            { style: styles.dropdownItem },
            React.createElement(
              'button',
              {
                onClick: copyMarkdown,
                style: styles.dropdownLink
              },
              React.createElement('span', null, 'Copy page as Markdown for LLMs')
            )
          ),
          React.createElement(
            'li',
            { style: styles.dropdownItem },
            React.createElement(
              'button',
              {
                onClick: viewAsMarkdown,
                style: styles.dropdownLink
              },
              React.createElement('span', null, 'View as plain text')
            )
          ),
          React.createElement(
            'li',
            { style: styles.dropdownItem },
            React.createElement(
              'button',
              {
                onClick: openInChatGpt,
                style: styles.dropdownLink
              },
              React.createElement('span', null, 'Open in ChatGPT')
            )
          )
        )
      )
    );
  }

  // Export the component
  window.CopyMarkdown = CopyMarkdown;
})();

// This is necessary to support ES module imports
export default window.CopyMarkdown; 