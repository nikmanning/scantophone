(function() {
  function init() {
    // Find the script tag itself.
    const currentScript = document.currentScript || document.querySelector('script[src*="widget.js"]:not([data-processed])');
    if (!currentScript) {
      console.error('QR Widget: Could not find the widget script tag.');
      return;
    }
    currentScript.setAttribute('data-processed', 'true');

    // Get config from data attributes
    const qrCodeId = currentScript.getAttribute('data-qr-id');
    const positionOverride = currentScript.getAttribute('data-position');
    const buttonShapeOverride = currentScript.getAttribute('data-button-shape');
    const displayTextOverride = currentScript.getAttribute('data-display-text');
    const buttonIconOverride = currentScript.getAttribute('data-button-icon');
    const showButtonOverride = currentScript.getAttribute('data-show-button');
    // Convert string attribute to boolean
    const showButtonValue = showButtonOverride !== null ? showButtonOverride !== 'false' : null;

    if (!qrCodeId) {
      console.error('QR Widget: The data-qr-id attribute is missing on the script tag.');
      return;
    }

    const baseUrl = new URL(currentScript.src).origin;
    
    // For test mode with current URL, skip API call and use default config
    if (qrCodeId === 'test-current-url' || qrCodeId === 'bd790426-38b5-4b83-b5cc-732ec3cec848') {
      console.log('QR Widget: Test mode - using current URL without API call');
      const testConfig = {
        url_type: 'current',
        custom_url: null,
        url: window.location.href,
        position: positionOverride || 'bottom-right',
        button_shape: buttonShapeOverride || 'rounded',
        display_text: displayTextOverride || 'View QR Code',
        button_color: '#007bff',
        qr_code_color: '#000000',
        background_color: '#ffffff',
        size: 150,
        margin_x: 20,
        margin_y: 20,
        show_button: showButtonValue !== null ? showButtonValue : true,
        start_collapsed: true,
        show_on_desktop: true,
        show_on_mobile: true,
        logo_url: null
      };
      createWidget(testConfig, positionOverride, buttonShapeOverride, displayTextOverride, buttonIconOverride, showButtonValue, baseUrl);
      return;
    }

    const apiUrl = `${baseUrl}/api/widget/${qrCodeId}`;

    console.log('Fetching QR code config from:', apiUrl);
    fetch(apiUrl)
      .then(response => {
        console.log('API response status:', response.status);
        if (!response.ok) {
          return response.text().then(text => {
            console.error('API error response:', text);
            throw new Error('Network response was not ok: ' + response.status);
          });
        }
        return response.json();
      })
      .then(config => {
        if ((!config.show_on_desktop && window.innerWidth >= 768) || (!config.show_on_mobile && window.innerWidth < 768)) {
            return; // Do not render widget based on device settings
        }
        // Always create the widget, but conditionally show the button
        createWidget(config, positionOverride, buttonShapeOverride, displayTextOverride, buttonIconOverride, showButtonValue, baseUrl);
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

  function createWidget(config, positionOverride, buttonShapeOverride, displayTextOverride, buttonIconOverride, showButtonValue, baseUrl) {
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
    qrCodeContainer.style.width = '150px';
    qrCodeContainer.style.height = '150px';
    qrCodeContainer.style.display = 'flex';
    qrCodeContainer.style.alignItems = 'center';
    qrCodeContainer.style.justifyContent = 'center';
    qrCodeContainer.style.backgroundColor = '#ffffff';
    qrCodeContainer.style.border = '1px solid #e0e0e0';
    qrCodeContainer.style.borderRadius = '8px';

    // Always dynamically generate QR code
    loadScript('https://unpkg.com/qr-code-styling@1.6.0/lib/qr-code-styling.js', () => {
      // Determine the URL to encode - current page URL or custom URL
      const qrCodeData = config.url_type === 'current' 
        ? window.location.href // Use the current page's URL
        : config.custom_url || config.url; // Use the custom URL if provided
      
      console.log(`QR Widget: Generating QR code for ${config.url_type === 'current' ? 'current page URL' : 'custom URL'}:`, qrCodeData);
      
      // Use logo_url from API response, fallback to default only if missing
      const defaultLogoUrl = `${baseUrl}/images/v-logo.png`;
      const logoUrl = config.logo_url || defaultLogoUrl;
      
      const qrCode = new QRCodeStyling({
        width: config.size || 150,
        height: config.size || 150,
        type: 'svg',
        data: qrCodeData,
        image: logoUrl,
        dotsOptions: { 
          color: config.qr_code_color || '#000000', 
          type: "dots" 
        },
        backgroundOptions: {
          color: config.background_color || '#ffffff'
        },
        imageOptions: { 
          crossOrigin: 'anonymous', 
          margin: 4,
          hideBackgroundDots: true
        },
        cornersSquareOptions: { 
          color: config.qr_code_color || '#000000', 
          type: "dot" 
        },
        cornersDotOptions: { 
          color: config.qr_code_color || '#000000', 
          type: "dot" 
        }
      });
      
      // Ensure the container is ready before appending
      setTimeout(() => {
        try {
          qrCode.append(qrCodeContainer);
          console.log('QR Widget: QR code successfully appended to container');
        } catch (error) {
          console.error('QR Widget: Error appending QR code:', error);
          // Fallback: create a simple text QR placeholder
          qrCodeContainer.innerHTML = `<div style="font-family: monospace; font-size: 12px; text-align: center; padding: 20px;">
            QR Code<br/>${qrCodeData.substring(0, 30)}...
          </div>`;
        }
      }, 100);
    });

    // Display Text
    const displayTextElement = document.createElement('p');
    displayTextElement.textContent = config.display_text || 'Scan me';
    displayTextElement.style.marginTop = '15px';
    displayTextElement.style.fontFamily = 'sans-serif';
    displayTextElement.style.color = config.qr_code_color || '#000000';
    displayTextElement.style.fontWeight = 'bold';
    displayTextElement.style.textAlign = 'center';

    content.appendChild(qrCodeContainer);
    content.appendChild(displayTextElement);

    // Toggle Button - only create and add if show_button is true
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
    // Use the data attribute override if provided, otherwise use the config value
    const showButton = showButtonValue !== null ? showButtonValue : config.show_button;
    toggleButton.style.display = showButton ? 'flex' : 'none'; // Hide button if show_button is false
    toggleButton.style.alignItems = 'center';
    toggleButton.style.justifyContent = 'center';
    toggleButton.style.fontSize = '18px';
    toggleButton.style.fontWeight = 'bold';
    toggleButton.style.float = position.includes('right') ? 'right' : 'left';
    
    // Add icon or text to the button
    const buttonIcon = buttonIconOverride || config.button_icon || 'none';
    
    if (buttonIcon === 'none') {
      // Use text for the button
      toggleButton.textContent = displayTextOverride || config.display_text || 'QR';
    } else {
      // Use SVG icon for the button - handle missing icons gracefully
      const iconUrl = `${baseUrl}/icons/${buttonIcon}.svg`;
      
      // Create a simple fallback text if icon fails to load
      toggleButton.textContent = 'QR';
      
      // Try to load the icon, but don't fail if it's missing
      fetch(iconUrl)
        .then(response => {
          if (!response.ok) {
            console.warn(`QR Widget: Icon not found: ${iconUrl}, using text fallback`);
            return null;
          }
          return response.text();
        })
        .then(svgText => {
          if (svgText) {
            // Create SVG element
            const iconContainer = document.createElement('div');
            iconContainer.innerHTML = svgText;
            
            // Extract the SVG element
            const svgElement = iconContainer.querySelector('svg');
            if (svgElement) {
              svgElement.style.width = '24px';
              svgElement.style.height = '24px';
              svgElement.style.fill = 'currentColor';
              toggleButton.innerHTML = '';
              toggleButton.appendChild(svgElement);
            }
          }
        })
        .catch(() => {
          // Fallback to text if any error occurs
          console.warn('QR Widget: Failed to load icon, using text fallback');
        });
    }

    widgetContainer.appendChild(content);
    widgetContainer.appendChild(toggleButton);
    document.body.appendChild(widgetContainer);

    // When show_button is false, show the content immediately and don't add toggle logic
    if (!showButton) {
      content.style.display = 'flex';
      widgetContainer.style.transform = 'scale(1)';
      widgetContainer.style.opacity = '1';
    } else {
      // Only add toggle logic when button is visible
      toggleButton.addEventListener('click', () => {
        const isHidden = content.style.display === 'none';
        if (isHidden) {
          content.style.display = 'flex';
          widgetContainer.style.transform = 'scale(1)';
          widgetContainer.style.opacity = '1';
        } else {
          content.style.display = 'none';
        }
      });
    }

    // Auto-show on scroll
    if (config.auto_show_on_scroll) {
        let hasScrolled = false;
        window.addEventListener('scroll', () => {
            if (!hasScrolled && window.scrollY > 200) { // Show after scrolling 200px
                hasScrolled = true;
                if (content.style.display === 'none') {
                    toggleButton.click();
                }
            }
        });
    }
  }

  function loadScript(src, callback) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    script.onload = callback;
    document.head.appendChild(script);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
