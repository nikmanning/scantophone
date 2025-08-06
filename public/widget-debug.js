(function() {
  function init() {
    console.log('Widget initialization started');
    
    // Find the script tag itself.
    const currentScript = document.currentScript || document.querySelector('script[src*="widget-debug.js"]:not([data-processed])');
    if (!currentScript) {
      console.error('QR Widget: Could not find the widget script tag.');
      return;
    }
    console.log('Found script tag:', currentScript);
    currentScript.setAttribute('data-processed', 'true');

    // Get config from data attributes
    const qrCodeId = currentScript.getAttribute('data-qr-id');
    const positionOverride = currentScript.getAttribute('data-position');
    const buttonShapeOverride = currentScript.getAttribute('data-button-shape');
    const displayTextOverride = currentScript.getAttribute('data-display-text');
    const buttonIconOverride = currentScript.getAttribute('data-button-icon');
    
    console.log('Config from attributes:', {
      qrCodeId,
      positionOverride,
      buttonShapeOverride,
      displayTextOverride,
      buttonIconOverride
    });

    if (!qrCodeId) {
      console.error('QR Widget: The data-qr-id attribute is missing on the script tag.');
      return;
    }

    const baseUrl = new URL(currentScript.src).origin;
    const apiUrl = `${baseUrl}/api/widget/${qrCodeId}`;
    console.log('API URL:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        console.log('API response status:', response.status);
        if (!response.ok) {
          return response.json().then(err => { 
            console.error('API error response:', err);
            throw new Error(err.error || 'Network response was not ok');
          });
        }
        return response.json();
      })
      .then(config => {
        console.log('API config received:', config);
        
        // Check if widget should be shown based on settings
        if (config.show_button === false) {
            console.log('Widget not shown because show_button is false');
            return; // Do not render widget if show_button is false
        }
        
        // Check device visibility settings
        if ((!config.show_on_desktop && window.innerWidth >= 768) || 
            (!config.show_on_mobile && window.innerWidth < 768)) {
            console.log('Widget not shown due to device settings:', {
              show_on_desktop: config.show_on_desktop,
              show_on_mobile: config.show_on_mobile,
              windowWidth: window.innerWidth
            });
            return; // Do not render widget based on device settings
        }
        
        console.log('Creating widget with config:', config);
        createWidget(config, positionOverride, buttonShapeOverride, displayTextOverride, buttonIconOverride);
      })
      .catch(error => {
        console.error('QR Widget Error:', error.message);
        const errorDiv = document.createElement('div');
        errorDiv.id = 'qr-widget-error';
        errorDiv.style.position = 'fixed';
        errorDiv.style.bottom = '20px';
        errorDiv.style.left = '20px';
        errorDiv.style.padding = '1em';
        errorDiv.style.backgroundColor = '#ff4d4d';
        errorDiv.style.color = 'white';
        errorDiv.style.zIndex = '10000';
        errorDiv.style.borderRadius = '8px';
        errorDiv.style.fontFamily = 'sans-serif';
        errorDiv.textContent = `QR Widget Error: ${error.message}`;
        document.body.appendChild(errorDiv);
      });
  }

  function createWidget(config, positionOverride, buttonShapeOverride, displayTextOverride, buttonIconOverride) {
    console.log('Creating widget elements');
    const widgetContainer = document.createElement('div');
    widgetContainer.id = 'qr-widget-container';
    widgetContainer.style.position = 'fixed';
    widgetContainer.style.zIndex = '9999';
    widgetContainer.style.transition = 'all 0.3s ease-in-out';

    const position = positionOverride || config.position || 'bottom-right';
    if (position.includes('bottom')) widgetContainer.style.bottom = `${config.margin_y || 20}px`;
    if (position.includes('top')) widgetContainer.style.top = `${config.margin_y || 20}px`;
    if (position.includes('right')) widgetContainer.style.right = `${config.margin_x || 20}px`;
    if (position.includes('left')) widgetContainer.style.left = `${config.margin_x || 20}px`;

    // Inner content container
    const content = document.createElement('div');
    content.id = 'qr-widget-content';
    content.style.display = config.start_collapsed ? 'none' : 'flex';
    content.style.flexDirection = 'column';
    content.style.alignItems = 'center';
    content.style.padding = '20px';
    content.style.backgroundColor = config.background_color || '#ffffff';
    content.style.borderRadius = '12px';
    content.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
    content.style.marginBottom = '10px';

    // QR Code Container
    const qrCodeContainer = document.createElement('div');
    qrCodeContainer.id = 'qr-code-image-container';

    // Function to generate QR code with current page URL
    const generateQRCode = () => {
      const qrData = config.url_type === 'current' ? window.location.href : config.url;
      console.log('[Widget] Generating QR code with settings:', {
        url_type: config.url_type,
        data: qrData,
        size: config.size || 150,
        color: config.qr_code_color,
        backgroundColor: config.background_color || '#ffffff',
        logo: config.logo_url ? 'Yes' : 'No',
        eyeStyle: 'extra-rounded'
      });
      
      // Clear previous QR code if any
      qrCodeContainer.innerHTML = '';
      
      // Add loading indicator
      const loadingDiv = document.createElement('div');
      loadingDiv.textContent = 'Loading QR code...';
      loadingDiv.style.textAlign = 'center';
      loadingDiv.style.padding = '10px';
      qrCodeContainer.appendChild(loadingDiv);
      
      // Load QR code library and generate
      loadScript('https://unpkg.com/qr-code-styling@1.6.0/lib/qr-code-styling.js', () => {
        console.log('[Widget] QR code styling library loaded');
        
        // Remove loading indicator
        qrCodeContainer.innerHTML = '';
        
        // Generate QR code with current page URL
        const qrCode = new QRCodeStyling({
          width: config.size || 150,
          height: config.size || 150,
          type: 'svg',
          data: qrData,
          image: config.logo_url,
          dotsOptions: { 
            color: config.qr_code_color, 
            type: "dots" 
          },
          backgroundOptions: {
            color: config.background_color || '#ffffff'
          },
          imageOptions: { 
            crossOrigin: 'anonymous', 
            margin: 4,
            imageSize: 0.2
          },
          cornersSquareOptions: { 
            color: config.qr_code_color, 
            type: "extra-rounded" 
          },
          cornersDotOptions: { 
            color: config.qr_code_color, 
            type: "dot" 
          }
        });
        
        qrCode.append(qrCodeContainer);
        console.log('[Widget] QR code generated with settings:', {
          size: config.size || 150,
          color: config.qr_code_color,
          backgroundColor: config.background_color || '#ffffff',
          eyeStyle: 'extra-rounded',
          hasLogo: !!config.logo_url
        });
      });
    };
    
    // Check if we should use current page URL
    if (config.url_type === 'current' || !config.qr_image_url) {
      console.log('Using current page URL for QR code');
      generateQRCode();
      
      // Update QR code if URL changes (like in SPA navigation)
      let lastHref = window.location.href;
      const observer = new MutationObserver(() => {
        if (window.location.href !== lastHref) {
          lastHref = window.location.href;
          console.log('URL changed, updating QR code:', lastHref);
          generateQRCode();
        }
      });
      
      // Start observing the document with the configured parameters
      observer.observe(document, { childList: true, subtree: true });
    } else {
      // Use pre-generated image for custom URLs
      console.log('Using pre-generated QR image:', config.qr_image_url);
      const qrImage = document.createElement('img');
      qrImage.src = config.qr_image_url;
      qrImage.style.width = `${config.size || 150}px`;
      qrImage.style.height = `${config.size || 150}px`;
      qrImage.onerror = () => {
        console.error('Failed to load QR image, falling back to dynamic generation');
        generateQRCode();
      };
      qrCodeContainer.appendChild(qrImage);
    }

    // Display Text
    const displayTextElement = document.createElement('p');
    displayTextElement.textContent = displayTextOverride || config.display_text || 'Scan me';
    displayTextElement.style.marginTop = '15px';
    displayTextElement.style.fontFamily = 'sans-serif';
    displayTextElement.style.color = config.qr_code_color || '#000000';
    displayTextElement.style.fontWeight = 'bold';
    displayTextElement.style.textAlign = 'center';

    content.appendChild(qrCodeContainer);
    content.appendChild(displayTextElement);

    // Toggle Button
    const toggleButton = document.createElement('button');
    toggleButton.id = 'qr-widget-toggle';
    toggleButton.style.width = '60px';
    toggleButton.style.height = '60px';
    toggleButton.style.backgroundColor = config.button_color || '#007bff';
    toggleButton.style.color = config.qr_code_color || '#ffffff';
    toggleButton.style.border = 'none';
    const buttonShape = buttonShapeOverride || config.button_shape;
    toggleButton.style.borderRadius = buttonShape === 'rounded' ? '50%' : '12px';
    toggleButton.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    toggleButton.style.cursor = 'pointer';
    toggleButton.style.display = 'flex';
    toggleButton.style.alignItems = 'center';
    toggleButton.style.justifyContent = 'center';
    toggleButton.style.fontSize = '18px';
    toggleButton.style.fontWeight = 'bold';
    toggleButton.style.float = position.includes('right') ? 'right' : 'left';
    
    // Add icon or text to the button
    const buttonIcon = buttonIconOverride || config.button_icon || 'none';
    console.log('Button icon:', buttonIcon);
    
    if (buttonIcon === 'none' || !buttonIcon) {
      // Use text for the button
      const buttonText = displayTextOverride || config.display_text || 'QR';
      console.log('Using text for button:', buttonText);
      toggleButton.textContent = buttonText;
      
      // Apply text styling
      toggleButton.style.display = 'flex';
      toggleButton.style.alignItems = 'center';
      toggleButton.style.justifyContent = 'center';
      toggleButton.style.padding = '0 10px';
      toggleButton.style.whiteSpace = 'nowrap';
      toggleButton.style.overflow = 'hidden';
      toggleButton.style.textOverflow = 'ellipsis';
    } else {
      // Try to use an emoji as fallback if the icon doesn't exist
      const emojiMap = {
        'qr-code': '🔲',
        'link': '🔗',
        'share': '↗️',
        'scan': '📱',
        'default': '❓'
      };
      
      // Set a default emoji
      let buttonContent = emojiMap[buttonIcon] || emojiMap['default'];
      
      // Try to use the specified icon if it exists
      const iconUrl = `${window.location.origin}/icons/${buttonIcon}.svg`;
      console.log('Attempting to load icon from:', iconUrl);
      
      // Create a temporary div to hold the SVG
      const iconContainer = document.createElement('div');
      
      // Set a timeout for the fetch request
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Icon load timeout')), 2000)
      );
      
      // Try to fetch the icon, but fall back to emoji if it fails
      Promise.race([
        fetch(iconUrl).then(response => {
          if (!response.ok) throw new Error('Icon not found');
          return response.text();
        }),
        timeoutPromise
      ])
      .then(svgText => {
        console.log('SVG icon loaded successfully');
        iconContainer.innerHTML = svgText;
        const svgElement = iconContainer.querySelector('svg');
          if (svgElement) {
            console.log('SVG element found and being added to button');
            // Style the SVG
            svgElement.style.width = '24px';
            svgElement.style.height = '24px';
            svgElement.style.fill = config.qr_code_color || '#ffffff';
            
            // Clear any existing content and add the SVG
            toggleButton.innerHTML = '';
            toggleButton.appendChild(svgElement);
            return; // Success, exit early
          }
          throw new Error('No SVG element found in the response');
        })
        .catch(error => {
          console.warn('Could not load icon, using emoji fallback:', error.message);
          // Use emoji as fallback
          toggleButton.textContent = buttonContent;
          toggleButton.style.fontSize = '24px'; // Make emoji larger
        });
    }

    widgetContainer.appendChild(content);
    widgetContainer.appendChild(toggleButton);
    document.body.appendChild(widgetContainer);
    console.log('Widget added to document body');

    // Toggle logic
    toggleButton.addEventListener('click', () => {
        const isHidden = content.style.display === 'none';
        if (isHidden) {
            content.style.display = 'flex';
            widgetContainer.style.transform = 'scale(1)';
        } else {
            content.style.display = 'none';
            widgetContainer.style.transform = 'scale(0.95)';
        }
    });
  }

  function loadScript(url, callback) {
    console.log('Loading script:', url);
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.onload = callback;
    script.onerror = (error) => {
      console.error('Error loading script:', url, error);
    };
    document.head.appendChild(script);
  }

  // Initialize when DOM is fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
