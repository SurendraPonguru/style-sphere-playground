
// CSS Variable types
export type CSSVariable = {
  name: string;
  label: string;
  value: string;
  type: 'color' | 'size' | 'text' | 'time' | 'number';
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
};

export type CSSTheme = {
  name: string;
  label: string;
  className: string;
  description: string;
};

// Default CSS variables 
export const defaultCssVariables: CSSVariable[] = [
  { name: '--css-primary-color', label: 'Primary Color', value: '#4f46e5', type: 'color' },
  { name: '--css-secondary-color', label: 'Secondary Color', value: '#ec4899', type: 'color' },
  { name: '--css-accent-color', label: 'Accent Color', value: '#10b981', type: 'color' },
  { name: '--css-background-color', label: 'Background Color', value: '#ffffff', type: 'color' },
  { name: '--css-text-color', label: 'Text Color', value: '#1f2937', type: 'color' },
  { name: '--css-border-radius', label: 'Border Radius', value: '0.5', type: 'number', min: 0, max: 2, step: 0.1, unit: 'rem' },
  { name: '--css-spacing', label: 'Spacing', value: '1', type: 'number', min: 0, max: 3, step: 0.25, unit: 'rem' },
  { name: '--css-font-size', label: 'Font Size', value: '1', type: 'number', min: 0.5, max: 2, step: 0.1, unit: 'rem' },
  { name: '--css-animation-duration', label: 'Animation Duration', value: '0.3', type: 'number', min: 0, max: 2, step: 0.1, unit: 's' },
  { name: '--css-gradient-background', label: 'Gradient Background', value: 'linear-gradient(90deg, #4f46e5, #ec4899)', type: 'text' },
];

// Available themes
export const cssThemes: CSSTheme[] = [
  { 
    name: 'default', 
    label: 'Default', 
    className: '', 
    description: 'Clean and minimal design with modern aesthetics'
  },
  { 
    name: 'glassmorphism', 
    label: 'Glassmorphism', 
    className: 'theme-glassmorphism',
    description: 'Transparent, blurred glass effect with elegant borders'
  },
  { 
    name: 'neumorphism', 
    label: 'Neumorphism', 
    className: 'theme-neumorphism',
    description: 'Soft UI with subtle shadows and highlights'
  },
  { 
    name: 'brutalist', 
    label: 'Brutalist', 
    className: 'theme-brutalist',
    description: 'Bold, raw design with sharp edges and high contrast'
  },
  { 
    name: 'modern', 
    label: 'Modern', 
    className: 'theme-modern',
    description: 'Contemporary design with smooth gradients and refined interactions'
  }
];

// Update CSS variable in document
export const updateCSSVariable = (name: string, value: string): void => {
  document.documentElement.style.setProperty(name, value);
};

// Get computed CSS variable value
export const getCSSVariableValue = (name: string): string => {
  return getComputedStyle(document.documentElement).getPropertyValue(name);
};

// Reset CSS variables to theme defaults
export const resetCSSVariables = (): void => {
  defaultCssVariables.forEach(variable => {
    const computedValue = getCSSVariableValue(variable.name);
    updateCSSVariable(variable.name, computedValue);
  });
};

// Generate exportable CSS with enhanced features
export const generateCSS = (variables: CSSVariable[]): string => {
  let css = `:root {\n`;
  
  variables.forEach(variable => {
    const value = variable.type === 'number' ? `${variable.value}${variable.unit || ''}` : variable.value;
    css += `  ${variable.name}: ${value};\n`;
  });
  
  css += `  --css-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n`;
  css += `  --css-shadow: 0 4px 15px -3px rgba(0, 0, 0, 0.1), 0 2px 6px -4px rgba(0, 0, 0, 0.1);\n`;
  css += `  --css-backdrop-filter: blur(10px);\n`;
  css += `  --css-border: 1px solid rgba(0, 0, 0, 0.1);\n`;
  css += `}\n\n`;
  
  // Dark mode support for exported CSS
  css += `@media (prefers-color-scheme: dark) {\n`;
  css += `  :root {\n`;
  css += `    --css-text-color: #f3f4f6;\n`;
  css += `    --css-background-color: #1f2937;\n`;
  css += `    --css-shadow: 0 4px 15px -3px rgba(0, 0, 0, 0.5), 0 2px 6px -4px rgba(0, 0, 0, 0.5);\n`;
  css += `    --css-border: 1px solid rgba(255, 255, 255, 0.1);\n`;
  css += `  }\n`;
  css += `}\n\n`;
  
  // Add utility classes with enhanced styles including gradients
  css += `.preview-button {
  background-color: var(--css-primary-color);
  color: white;
  padding: calc(var(--css-spacing) * 0.5) var(--css-spacing);
  border-radius: var(--css-border-radius);
  font-size: var(--css-font-size);
  box-shadow: var(--css-shadow);
  border: var(--css-border, none);
  transition: var(--css-transition);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  position: relative;
  overflow: hidden;
}

.preview-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.preview-button:active {
  transform: translateY(0);
}

.preview-button.bg-gradient {
  background: var(--css-gradient-background);
}

.preview-button.interactive::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transition: left 0.6s;
}

.preview-button.interactive:hover::before {
  left: 100%;
}

.preview-card {
  background-color: var(--css-background-color);
  color: var(--css-text-color);
  padding: var(--css-spacing);
  border-radius: var(--css-border-radius);
  box-shadow: var(--css-shadow);
  border: var(--css-border, 1px solid var(--css-primary-color));
  transition: var(--css-transition);
  backdrop-filter: var(--css-backdrop-filter, none);
}

.preview-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.preview-input {
  background-color: var(--css-background-color);
  color: var(--css-text-color);
  padding: calc(var(--css-spacing) * 0.5);
  border-radius: var(--css-border-radius);
  font-size: var(--css-font-size);
  border: var(--css-border, 1px solid var(--css-primary-color));
  transition: var(--css-transition);
  display: inline-flex;
  align-items: center;
}

.preview-input:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--css-primary-color);
}

/* Modal styles */
.preview-modal-backdrop {
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: var(--css-backdrop-filter, blur(4px));
  position: fixed;
  inset: 0;
  z-index: 50;
}

.preview-modal {
  background-color: var(--css-background-color);
  color: var(--css-text-color);
  padding: var(--css-spacing);
  border-radius: var(--css-border-radius);
  box-shadow: var(--css-shadow);
  border: var(--css-border, none);
  max-width: 500px;
  width: 100%;
  margin: auto;
  position: relative;
  z-index: 51;
  animation: modal-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Draggable elements */
.draggable {
  cursor: move;
  user-select: none;
}

.drag-ghost {
  opacity: 0.5;
}

.drag-over {
  border: 2px dashed var(--css-primary-color);
  background-color: var(--css-background-color);
}

/* Animation keyframes */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(0.97);
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-12px);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes float {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

@keyframes reveal {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes modal-in {
  0% {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Animation classes */
.animation-pulse {
  animation: pulse var(--css-animation-duration) infinite alternate ease-in-out;
}

.animation-bounce {
  animation: bounce var(--css-animation-duration) infinite alternate ease-in-out;
}

.animation-spin {
  animation: spin var(--css-animation-duration) linear infinite;
}

.animation-fade-in {
  animation: fade-in var(--css-animation-duration) ease-out;
}

.animation-float {
  animation: float calc(var(--css-animation-duration) * 3) ease-in-out infinite;
}

.animation-shimmer {
  animation: shimmer var(--css-animation-duration) linear infinite;
  background: linear-gradient(
    90deg,
    var(--css-background-color) 0%,
    rgba(255, 255, 255, 0.15) 50%,
    var(--css-background-color) 100%
  );
  background-size: 200% 100%;
}

.animation-reveal {
  animation: reveal var(--css-animation-duration) ease-out forwards;
}

/* Gradient text */
.gradient-text {
  background: var(--css-gradient-background);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* UI helper classes */
.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip:hover::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.25rem 0.5rem;
  background-color: var(--css-text-color);
  color: var(--css-background-color);
  border-radius: var(--css-border-radius);
  font-size: 0.85em;
  white-space: nowrap;
  z-index: 10;
  animation: fade-in 0.2s ease-out;
}

.interactive-hint {
  position: relative;
}

.interactive-hint::before {
  content: "Click me";
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--css-primary-color);
  color: white;
  padding: 2px 6px;
  border-radius: var(--css-border-radius);
  font-size: 0.7em;
  opacity: 0;
  transition: opacity 0.3s;
}

.interactive-hint:hover::before {
  opacity: 1;
}

/* Container for all components */
.css-playground-container {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  max-width: 100%;
  margin: 0 auto;
  color: var(--css-text-color);
  background-color: var(--css-background-color);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  padding: 1rem;
  margin-bottom: 1rem;
  background: var(--css-primary-color);
  color: white;
  text-align: center;
  border-radius: var(--css-border-radius);
}

.main-content {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
}

.sidebar {
  flex: 1;
  min-width: 250px;
}

.preview {
  flex: 2;
  min-width: 300px;
  height: 500px;
  border: var(--css-border);
  border-radius: var(--css-border-radius);
  overflow: auto;
}

.footer {
  margin-top: auto;
  padding: 1rem;
  text-align: center;
  font-size: 0.875rem;
  border-top: var(--css-border);
}`;

  return css;
};

// Generate exportable HTML with enhanced components
export const generateHTML = (): string => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CSS Playground Export</title>
  <style>
    /* CSS will be inserted here from generateCSS() */
  </style>
</head>
<body>
  <div class="css-playground-container animation-fade-in">
    <header class="header">
      <h1>CSS Playground Export</h1>
      <p>Custom design created with CSS Playground</p>
    </header>
    
    <div class="main-content">
      <div class="sidebar">
        <div class="preview-card">
          <h2>Navigation</h2>
          <ul style="list-style: none; padding: 0; margin-top: 1rem;">
            <li style="margin-bottom: 0.5rem;"><a href="#" class="preview-button" style="width: 100%; justify-content: flex-start;">Home</a></li>
            <li style="margin-bottom: 0.5rem;"><a href="#" class="preview-button bg-gradient" style="width: 100%; justify-content: flex-start;">Projects</a></li>
            <li style="margin-bottom: 0.5rem;"><a href="#" class="preview-button" style="width: 100%; justify-content: flex-start;">Contact</a></li>
          </ul>
        </div>
      </div>
      
      <div class="preview">
        <div class="preview-card">
          <h2>Button Components</h2>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 1rem 0;">
            <button class="preview-button">Button</button>
            <button class="preview-button bg-gradient">Gradient</button>
            <button class="preview-button interactive">Interactive</button>
            <button class="preview-button" disabled style="opacity: 0.6; cursor: not-allowed;">Disabled</button>
          </div>
          
          <h2>Card Components</h2>
          <div class="preview-card" style="margin: 1rem 0; border: 1px solid var(--css-secondary-color);">
            <h3>Nested Card</h3>
            <p>This is a card inside another card component.</p>
          </div>
          
          <h2>Form Components</h2>
          <div style="margin: 1rem 0;">
            <div style="margin-bottom: 0.5rem;">
              <label style="display: block; margin-bottom: 0.25rem;">Text Input</label>
              <input type="text" class="preview-input" style="width: 100%;" placeholder="Enter text here">
            </div>
            <div style="margin-bottom: 0.5rem;">
              <label style="display: block; margin-bottom: 0.25rem;">Email Input</label>
              <input type="email" class="preview-input" style="width: 100%;" placeholder="Enter email here">
            </div>
            <button class="preview-button" style="margin-top: 1rem;">Submit</button>
          </div>
          
          <h2>Animation Examples</h2>
          <div style="display: flex; flex-wrap: wrap; gap: 1rem; margin: 1rem 0;">
            <div class="preview-card animation-pulse" style="width: 80px; height: 80px; display: flex; align-items: center; justify-content: center;">
              Pulse
            </div>
            <div class="preview-card animation-bounce" style="width: 80px; height: 80px; display: flex; align-items: center; justify-content: center;">
              Bounce
            </div>
            <div class="preview-card animation-float" style="width: 80px; height: 80px; display: flex; align-items: center; justify-content: center;">
              Float
            </div>
            <div class="preview-card animation-spin" style="width: 80px; height: 80px; display: flex; align-items: center; justify-content: center;">
              Spin
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <footer class="footer">
      <p>Created with CSS Playground &copy; 2025</p>
      <p><small>Variables and styles can be customized in the CSS</small></p>
    </footer>
  </div>

  <script>
    // Initialize interactive elements
    document.querySelectorAll('.interactive').forEach(el => {
      el.addEventListener('click', function() {
        alert('You clicked an interactive element!');
      });
    });
    
    // Demo modal functionality
    function openModal() {
      const backdrop = document.createElement('div');
      backdrop.className = 'preview-modal-backdrop';
      
      const modal = document.createElement('div');
      modal.className = 'preview-modal';
      modal.innerHTML = \`
        <h3>Modal Title</h3>
        <p>This is a modal dialog created with the exported CSS.</p>
        <div style="display: flex; justify-content: flex-end; margin-top: 1rem;">
          <button class="preview-button" onclick="closeModal()">Close</button>
        </div>
      \`;
      
      backdrop.appendChild(modal);
      document.body.appendChild(backdrop);
      
      backdrop.addEventListener('click', function(e) {
        if (e.target === backdrop) closeModal();
      });
    }
    
    function closeModal() {
      const backdrop = document.querySelector('.preview-modal-backdrop');
      if (backdrop) backdrop.remove();
    }
    
    // Add modal open button after load
    window.addEventListener('DOMContentLoaded', () => {
      const container = document.querySelector('.preview-card');
      if (container) {
        const modalSection = document.createElement('div');
        modalSection.innerHTML = \`
          <h2>Modal Example</h2>
          <button onclick="openModal()" class="preview-button interactive">Open Modal</button>
        \`;
        container.appendChild(modalSection);
      }
    });
  </script>
</body>
</html>`;
};

// Copy text to clipboard
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy: ', err);
    return false;
  }
};

// Download text as file
export const downloadFile = (content: string, filename: string, contentType: string): void => {
  const a = document.createElement('a');
  const file = new Blob([content], { type: contentType });
  
  a.href = URL.createObjectURL(file);
  a.download = filename;
  a.click();
  
  URL.revokeObjectURL(a.href);
};

// Export functions
export const exportCSS = (variables: CSSVariable[]): void => {
  const css = generateCSS(variables);
  downloadFile(css, 'styles.css', 'text/css');
};

export const exportHTML = (): void => {
  const html = generateHTML();
  downloadFile(html, 'index.html', 'text/html');
};

export const exportFullProject = (variables: CSSVariable[]): void => {
  const css = generateCSS(variables);
  const html = generateHTML().replace('/* CSS will be inserted here from generateCSS() */', css);
  downloadFile(html, 'playground-export.html', 'text/html');
};

// Import design (stub implementation - would be expanded for actual functionality)
export const importDesign = (designJSON: string): boolean => {
  try {
    const design = JSON.parse(designJSON);
    
    // Apply the variables from the imported design
    if (design.variables && Array.isArray(design.variables)) {
      design.variables.forEach((variable: any) => {
        if (variable.name && variable.value) {
          updateCSSVariable(variable.name, variable.value);
        }
      });
    }
    
    return true;
  } catch (error) {
    console.error('Failed to import design:', error);
    return false;
  }
};

