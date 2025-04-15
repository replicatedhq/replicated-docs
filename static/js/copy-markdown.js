(function() {
  // Wait for the DOM content to be fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    // Only run this script on documentation pages
    if (!document.querySelector('.theme-doc-markdown.markdown h1')) {
      return;
    }

    // Function to generate clean markdown
    function generateCleanMarkdown() {
      const content = document.querySelector('.theme-doc-markdown.markdown');
      if (!content) {
        return 'Could not find content to convert to markdown.';
      }

      // Clone the content to avoid modifying the original
      const contentClone = content.cloneNode(true);

      // Get the title
      const title = contentClone.querySelector('h1').textContent;
      
      // Remove elements we don't want in the markdown
      const elementsToRemove = contentClone.querySelectorAll('.theme-edit-this-page, .pagination-nav, .table-of-contents, #copy-markdown-container');
      elementsToRemove.forEach(el => el.remove());

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
    }

    // Helper function to process list items
    function processListItems(listElement, prefix) {
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
    }

    // Helper function to process tables
    function processTable(tableElement) {
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
    }

    // Find or create the target container for our dropdown
    function findOrCreateTargetContainer() {
      const title = document.querySelector('.theme-doc-markdown.markdown h1');
      if (!title) {
        console.error('Cannot find title element to add dropdown next to.');
        return null;
      }

      // Check if the title is already wrapped in a header element
      let header = title.parentElement;
      if (!header || !header.matches('.theme-doc-markdown.markdown > header')) {
        // Wrap the title in a header element
        header = document.createElement('header');
        title.parentNode.insertBefore(header, title);
        header.appendChild(title);
      }

      return header;
    }

    // Simple toast notification function
    function showToast(message, isError = false) {
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
    }

    // Create dropdown UI
    function createDropdown() {
      // Create container
      const container = document.createElement('div');
      container.id = 'copy-markdown-container';
      container.style.position = 'relative';
      container.style.display = 'inline-block';
      container.style.marginLeft = 'auto';

      // Create button
      const button = document.createElement('button');
      button.innerHTML = '<span>Copy page</span><svg style="width: 1rem; height: 1rem; margin-left: 0.5rem;" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>';
      button.style.display = 'flex';
      button.style.alignItems = 'center';
      button.style.gap = '0.5rem';
      button.style.fontSize = '0.875rem';
      button.style.fontWeight = '500';
      button.style.color = 'var(--ifm-color-primary)';
      button.style.backgroundColor = 'transparent';
      button.style.border = '2px solid var(--ifm-color-primary)';
      button.style.borderRadius = '8px';
      button.style.padding = '0.5rem 0.75rem';
      button.style.cursor = 'pointer';
      button.style.transition = 'all 0.2s ease';

      // Add button to container
      container.appendChild(button);

      // Dropdown menu (initially hidden)
      const dropdown = document.createElement('div');
      dropdown.style.display = 'none';
      dropdown.style.position = 'absolute';
      dropdown.style.top = '100%';
      dropdown.style.right = '0';
      dropdown.style.marginTop = '0.5rem';
      dropdown.style.minWidth = '240px';
      dropdown.style.backgroundColor = 'var(--ifm-background-color)';
      dropdown.style.border = '1px solid var(--ifm-color-emphasis-300)';
      dropdown.style.borderRadius = '8px';
      dropdown.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
      dropdown.style.zIndex = '1000';
      dropdown.style.overflow = 'hidden';
      container.appendChild(dropdown);

      // Create dropdown list
      const list = document.createElement('ul');
      list.style.listStyle = 'none';
      list.style.padding = '0';
      list.style.margin = '0';
      dropdown.appendChild(list);

      // Add dropdown items
      const items = [
        { text: 'Copy page as Markdown for LLMs', action: copyMarkdown },
        { text: 'View as plain text', action: viewAsMarkdown },
        { text: 'Open in ChatGPT', action: openInChatGpt }
      ];

      items.forEach((item, index) => {
        const li = document.createElement('li');
        li.style.borderBottom = index < items.length - 1 ? '1px solid var(--ifm-color-emphasis-200)' : 'none';
        
        const actionButton = document.createElement('button');
        actionButton.innerHTML = `<span>${item.text}</span>`;
        actionButton.style.display = 'block';
        actionButton.style.padding = '0.75rem 1rem';
        actionButton.style.width = '100%';
        actionButton.style.textAlign = 'left';
        actionButton.style.color = 'var(--ifm-font-color-base)';
        actionButton.style.background = 'none';
        actionButton.style.border = 'none';
        actionButton.style.cursor = 'pointer';
        actionButton.style.fontSize = '0.875rem';
        actionButton.style.transition = 'background-color 0.2s ease';
        
        actionButton.addEventListener('click', item.action);
        actionButton.addEventListener('mouseover', () => {
          actionButton.style.backgroundColor = 'var(--ifm-color-emphasis-100)';
          actionButton.style.color = 'var(--ifm-color-primary)';
        });
        actionButton.addEventListener('mouseout', () => {
          actionButton.style.backgroundColor = '';
          actionButton.style.color = 'var(--ifm-font-color-base)';
        });
        
        li.appendChild(actionButton);
        list.appendChild(li);
      });

      // Toggle dropdown on button click
      let isOpen = false;
      button.addEventListener('click', () => {
        isOpen = !isOpen;
        dropdown.style.display = isOpen ? 'block' : 'none';
        button.setAttribute('aria-expanded', isOpen);
      });

      // Close dropdown when clicking outside
      document.addEventListener('mousedown', (event) => {
        if (!container.contains(event.target) && isOpen) {
          isOpen = false;
          dropdown.style.display = 'none';
          button.setAttribute('aria-expanded', false);
        }
      });

      // Button hover effect
      button.addEventListener('mouseover', () => {
        button.style.backgroundColor = 'rgba(109, 210, 210, 0.1)';
      });
      button.addEventListener('mouseout', () => {
        button.style.backgroundColor = 'transparent';
      });

      // Action functions
      function copyMarkdown() {
        try {
          const markdownContent = generateCleanMarkdown();
          navigator.clipboard.writeText(markdownContent);
          isOpen = false;
          dropdown.style.display = 'none';
          showToast('Copied to clipboard');
        } catch (err) {
          console.error('Failed to copy: ', err);
          showToast('Failed to copy', true);
        }
      }

      function viewAsMarkdown() {
        try {
          const markdownContent = generateCleanMarkdown();
          const blob = new Blob([markdownContent], { type: 'text/markdown' });
          const url = URL.createObjectURL(blob);
          window.open(url, '_blank');
          isOpen = false;
          dropdown.style.display = 'none';
        } catch (err) {
          console.error('Failed to generate markdown: ', err);
          showToast('Failed to view as markdown', true);
        }
      }

      function openInChatGpt() {
        try {
          const markdownContent = generateCleanMarkdown();
          const url = `https://chat.openai.com/g?prompt=${encodeURIComponent(markdownContent)}`;
          window.open(url, '_blank');
          isOpen = false;
          dropdown.style.display = 'none';
        } catch (err) {
          console.error('Failed to open in ChatGPT: ', err);
          showToast('Failed to open in ChatGPT', true);
        }
      }

      return container;
    }

    // Add the component to the page
    const targetContainer = findOrCreateTargetContainer();
    if (targetContainer) {
      const dropdown = createDropdown();
      targetContainer.appendChild(dropdown);
      
      // Make sure the header is styled correctly
      targetContainer.style.display = 'flex';
      targetContainer.style.alignItems = 'flex-start';
      targetContainer.style.justifyContent = 'space-between';
      targetContainer.style.marginBottom = '1.5rem';
      
      // Make sure the title is styled correctly
      const title = targetContainer.querySelector('h1');
      if (title) {
        title.style.marginBottom = '0';
        title.style.marginRight = '1rem';
        title.style.flex = '1';
      }
      
      // Add responsive styles
      const styleSheet = document.createElement('style');
      styleSheet.textContent = `
        @media (max-width: 768px) {
          .theme-doc-markdown.markdown > header {
            flex-direction: column;
            align-items: flex-start;
          }
          
          #copy-markdown-container {
            margin-top: 1rem;
            margin-left: 0;
          }
        }
      `;
      document.head.appendChild(styleSheet);
    }
  });
})(); 