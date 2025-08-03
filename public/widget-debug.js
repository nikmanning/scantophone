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
        
        // Force show_button to true for debugging
        config.show_button = true;
        
        if ((!config.show_on_desktop && window.innerWidth >= 768) || (!config.show_on_mobile && window.innerWidth < 768)) {
            console.log('Widget not shown due to device settings:', {
              show_on_desktop: config.show_on_desktop,
              show_on_mobile: config.show_on_mobile,
              windowWidth: window.innerWidth
            });
            return; // Do not render widget based on device settings
        }
        
        if (!config.show_button) {
            console.log('Widget not shown because show_button is false');
            return; // Do not render widget if show_button is false
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

    // Dynamically generate QR code if set to current page URL
    if (config.url_type === 'current') {
      loadScript('https://unpkg.com/qr-code-styling@1.6.0/lib/qr-code-styling.js', () => {
        console.log('QR code styling library loaded');
        const qrCode = new QRCodeStyling({
          width: config.size || 150,
          height: config.size || 150,
          type: 'svg',
          data: window.location.href, // Use the current page's URL
          image: config.logo_url,
          dotsOptions: { color: config.qr_code_color, type: "dots" },
          backgroundOptions: {
            color: config.background_color || '#ffffff'
          },
          imageOptions: { crossOrigin: 'anonymous', margin: 4 },
          cornersSquareOptions: { color: config.qr_code_color, type: "dot" },
          cornersDotOptions: { color: config.qr_code_color, type: "dot" }
        });
        qrCode.append(qrCodeContainer);
      });
    } else {
      // Otherwise, use the pre-generated image
      console.log('Using pre-generated QR image:', config.qr_image_url);
      const qrImage = document.createElement('img');
      qrImage.src = config.qr_image_url;
      qrImage.style.width = `${config.size || 150}px`;
      qrImage.style.height = `${config.size || 150}px`;
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
    
    if (buttonIcon === 'none') {
      // Use text for the button
      console.log('Using text for button:', displayTextOverride || config.display_text || 'QR');
      toggleButton.textContent = displayTextOverride || config.display_text || 'QR';
    } else {
      // Use SVG icon for the button
      const iconUrl = `${baseUrl}/icons/${buttonIcon}.svg`;
      console.log('Loading icon from:', iconUrl);
      
      // Create SVG element
      fetch(iconUrl)
        .then(response => {
          console.log('Icon fetch response:', response.status);
          return response.text();
        })
        .then(svgText => {
          console.log('SVG text received, length:', svgText.length);
          // Create a container for the SVG
          const iconContainer = document.createElement('div');
          iconContainer.innerHTML = svgText;
          
          // Extract the SVG element
          const svgElement = iconContainer.querySelector('svg');
          if (svgElement) {
            console.log('SVG element found and being added to button');
            // Style the SVG
            svgElement.setAttribute('width', '24');
            svgElement.setAttribute('height', '24');
            svgElement.style.color = 'white';
            svgElement.style.fill = 'none';
            svgElement.style.stroke = 'currentColor';
            
            // Clear button content and append SVG
            toggleButton.innerHTML = '';
            toggleButton.appendChild(svgElement);
          } else {
            console.warn('No SVG element found in response, using text fallback');
            // Fallback to text if SVG loading fails
            toggleButton.textContent = displayTextOverride || config.display_text || 'QR';
          }
        })
        .catch(error => {
          console.error('Error loading SVG icon:', error);
          // Fallback to text
          toggleButton.textContent = displayTextOverride || config.display_text || 'QR';
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
