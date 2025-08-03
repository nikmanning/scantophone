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

    if (!qrCodeId) {
      console.error('QR Widget: The data-qr-id attribute is missing on the script tag.');
      return;
    }

    const baseUrl = new URL(currentScript.src).origin;
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
        if (!config.show_button) {
            return; // Do not render widget if show_button is false
        }
        createWidget(config, positionOverride, buttonShapeOverride, displayTextOverride, buttonIconOverride, baseUrl);
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

  function createWidget(config, positionOverride, buttonShapeOverride, displayTextOverride, buttonIconOverride, baseUrl) {
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
      const qrImage = document.createElement('img');
      qrImage.src = config.qr_image_url;
      qrImage.style.width = `${config.size || 150}px`;
      qrImage.style.height = `${config.size || 150}px`;
      qrCodeContainer.appendChild(qrImage);
    }

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
    
    if (buttonIcon === 'none') {
      // Use text for the button
      toggleButton.textContent = displayTextOverride || config.display_text || 'QR';
    } else {
      // Use SVG icon for the button
      const iconUrl = `${baseUrl}/icons/${buttonIcon}.svg`;
      
      // Create SVG element
      fetch(iconUrl)
        .then(response => response.text())
        .then(svgText => {
          // Create a container for the SVG
          const iconContainer = document.createElement('div');
          iconContainer.innerHTML = svgText;
          
          // Extract the SVG element
          const svgElement = iconContainer.querySelector('svg');
          if (svgElement) {
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

    // Toggle logic
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
