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

// Default CSS variables with enhanced values
export const defaultCssVariables: CSSVariable[] = [
  { name: '--css-primary-color', label: 'Primary Color', value: '#4f46e5', type: 'color' },
  { name: '--css-secondary-color', label: 'Secondary Color', value: '#ec4899', type: 'color' },
  { name: '--css-accent-color', label: 'Accent Color', value: '#10b981', type: 'color' },
  { name: '--css-background-color', label: 'Background Color', value: '#ffffff', type: 'color' },
  { name: '--css-text-color', label: 'Text Color', value: '#1f2937', type: 'color' },
  { name: '--css-border-radius', label: 'Border Radius', value: '0.75', type: 'number', min: 0, max: 2, step: 0.1, unit: 'rem' },
  { name: '--css-spacing', label: 'Spacing', value: '1', type: 'number', min: 0, max: 3, step: 0.25, unit: 'rem' },
  { name: '--css-font-size', label: 'Font Size', value: '1', type: 'number', min: 0.5, max: 2, step: 0.1, unit: 'rem' },
  { name: '--css-animation-duration', label: 'Animation Duration', value: '0.3', type: 'number', min: 0, max: 2, step: 0.1, unit: 's' },
  { name: '--css-gradient-background', label: 'Gradient Background', value: 'linear-gradient(135deg, #4f46e5, #ec4899)', type: 'text' },
];

// Enhanced themes
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
  },
  { 
    name: 'candy', 
    label: 'Candy', 
    className: 'theme-candy',
    description: 'Vibrant colors and playful elements with rounded corners'
  },
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
  css += `  font-family: 'Inter', system-ui, sans-serif;\n`;
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
  font-weight: 500;
  letter-spacing: 0.01em;
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
  width: 100%;
}

.preview-input:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--css-primary-color);
}

/* Enhanced Modal styles */
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

/* Animation keyframes - with enhanced animations */
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

/* Animation classes with enhanced effects */
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

/* Enhanced gradient text */
.gradient-text {
  background: var(--css-gradient-background);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
}

/* UI helper classes with better accessibility */
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
  box-shadow: var(--css-shadow);
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

/* Container for all components with improved styling */
.css-playground-container {
  font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  max-width: 100%;
  margin: 0 auto;
  color: var(--css-text-color);
  background-color: var(--css-background-color);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  padding: 1.5rem;
  margin-bottom: 1rem;
  background: var(--css-gradient-background);
  color: white;
  text-align: center;
  border-radius: var(--css-border-radius);
  box-shadow: var(--css-shadow);
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
  height: 100%;
  min-height: 600px;
  border: var(--css-border);
  border-radius: var(--css-border-radius);
  overflow: auto;
  box-shadow: var(--css-shadow);
}

.footer {
  margin-top: auto;
  padding: 1rem;
  text-align: center;
  font-size: 0.875rem;
  border-top: var(--css-border);
  background-color: rgba(var(--css-background-color), 0.8);
  backdrop-filter: blur(5px);
}

/* Theme specific styles */
.theme-glassmorphism .preview-card {
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.theme-neumorphism .preview-card {
  background-color: #e0e5ec;
  box-shadow: 8px 8px 15px #a3b1c6, -8px -8px 15px #ffffff;
  border: none;
}

.theme-brutalist .preview-card {
  background-color: #ffffff;
  border: 3px solid #000000;
  box-shadow: 5px 5px 0px #000000;
  border-radius: 0;
}

.theme-modern .preview-button {
  background: var(--css-gradient-background);
  border: none;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.theme-candy .preview-button {
  background-color: #ff85a2;
  border-radius: 999px;
  box-shadow: 0 5px 15px rgba(255, 133, 162, 0.4);
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
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap">
  <style>
    /* CSS will be inserted here from generateCSS() */
    
    /* Additional styles to ensure full height */
    html, body {
      height: 100%;
      margin: 0;
      padding: 0;
      overflow-x: hidden;
      font-family: 'Inter', system-ui, sans-serif;
    }
    
    /* Make sure content fills the height */
    .css-playground-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    
    .main-content {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
    }
    
    /* Ensure preview panel has appropriate height */
    .preview {
      min-height: 600px;
      height: 100%;
      overflow: auto;
      flex: 1;
    }
    
    /* Tab content should also maintain height */
    .tab-content {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    
    /* Animation demos should be consistent with playground */
    .animation-showcase {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
      gap: 1rem;
      margin: 1rem 0;
    }
    
    .animation-item {
      aspect-ratio: 1/1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  </style>
</head>
<body>
  <div class="css-playground-container animation-fade-in">
    <header class="header">
      <h1>Style Sphere Playground</h1>
      <p>Beautifully crafted UI components with customizable styles</p>
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
        <div class="preview-card" style="height: 100%; overflow-y: auto;">
          <div class="tab-content">
            <h2 class="gradient-text">Style Components</h2>
            
            <h3>Button Components</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 1rem 0;">
              <button class="preview-button">Button</button>
              <button class="preview-button bg-gradient">Gradient</button>
              <button class="preview-button interactive">Interactive</button>
              <button class="preview-button" disabled style="opacity: 0.6; cursor: not-allowed;">Disabled</button>
            </div>
            
            <h3>Card Components</h3>
            <div class="preview-card" style="margin: 1rem 0; border: 1px solid var(--css-secondary-color);">
              <h4 style="color: var(--css-secondary-color);">Featured Card</h4>
              <p>This is a card inside another card component with custom styling.</p>
              <button class="preview-button interactive" style="margin-top: 1rem; background-color: var(--css-secondary-color);">Learn More</button>
            </div>
            
            <h3>Form Components</h3>
            <div style="margin: 1rem 0;">
              <div style="margin-bottom: 0.5rem;">
                <label style="display: block; margin-bottom: 0.25rem; font-weight: 500;">Full Name</label>
                <input type="text" class="preview-input" style="width: 100%;" placeholder="Enter your name">
              </div>
              <div style="margin-bottom: 0.5rem;">
                <label style="display: block; margin-bottom: 0.25rem; font-weight: 500;">Email Address</label>
                <input type="email" class="preview-input" style="width: 100%;" placeholder="Enter your email">
              </div>
              <div style="margin-bottom: 0.5rem;">
                <label style="display: block; margin-bottom: 0.25rem; font-weight: 500;">Message</label>
                <textarea class="preview-input" style="width: 100%; min-height: 100px; resize: vertical;" placeholder="Type your message here"></textarea>
              </div>
              <button class="preview-button bg-gradient" style="margin-top: 1rem; width: 100%;">Submit</button>
            </div>
            
            <h3>Animation Examples</h3>
            <div class="animation-showcase">
              <div class="preview-card animation-pulse animation-item">
                <span style="font-weight: 500;">Pulse</span>
              </div>
              <div class="preview-card animation-bounce animation-item">
                <span style="font-weight: 500;">Bounce</span>
              </div>
              <div class="preview-card animation-float animation-item">
                <span style="font-weight: 500;">Float</span>
              </div>
              <div class="preview-card animation-spin animation-item">
                <span style="font-weight: 500;">Spin</span>
              </div>
            </div>
            
            <h3>Modal Example</h3>
            <button onclick="openModal()" class="preview-button interactive">Open Modal</button>
            
            <h3>Interactive Elements</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 1rem; margin: 1rem 0;">
              <div class="tooltip" data-tooltip="This is a tooltip">
                <button class="preview-button">Hover for tooltip</button>
              </div>
              <button class="preview-button animation-shimmer">Shimmer Effect</button>
            </div>
            
            <h3>Color Showcase</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(80px, 1fr)); gap: 1rem; margin: 1rem 0;">
              <div style="background-color: var(--css-primary-color); height: 60px; border-radius: var(--css-border-radius); display: flex; align-items: center; justify-content: center; color: white; font-weight: 500;">Primary</div>
              <div style="background-color: var(--css-secondary-color); height: 60px; border-radius: var(--css-border-radius); display: flex; align-items: center; justify-content: center; color: white; font-weight: 500;">Secondary</div>
              <div style="background-color: var(--css-accent-color); height: 60px; border-radius: var(--css-border-radius); display: flex; align-items: center; justify-content: center; color: white; font-weight: 500;">Accent</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <footer class="footer">
      <p>Created with Style Sphere Playground &copy; 2025</p>
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
        <h3 style="color: var(--css-primary-color); margin-top: 0;">Modal Title</h3>
        <p>This is a modal dialog created with the exported CSS. It demonstrates how components can be combined to create interactive interfaces.</p>
        <div style="display: flex; justify-content: flex-end; margin-top: 1.5rem; gap: 0.5rem;">
          <button class="preview-button" style="background-color: var(--css-accent-color);" onclick="closeModal()">Confirm</button>
          <button class="preview-button" style="background-color: transparent; border: 1px solid var(--css-primary-color); color: var(--css-primary-color);" onclick="closeModal()">Cancel</button>
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
    
    // Add animation demo interactive controls
    window.addEventListener('DOMContentLoaded', () => {
      // Toggle animations on click
      document.querySelectorAll('.animation-item').forEach(item => {
        item.addEventListener('click', function() {
          const animations = ['animation-pulse', 'animation-bounce', 'animation-float', 'animation-spin'];
          const currentClass = animations.find(cls => this.classList.contains(cls));
          
          if (currentClass) {
            const currentIndex = animations.indexOf(currentClass);
            const nextIndex = (currentIndex + 1) % animations.length;
            
            this.classList.remove(currentClass);
            this.classList.add(animations[nextIndex]);
            
            // Update text to match animation
            const textElement = this.querySelector('span');
            if (textElement) {
              textElement.textContent = animations[nextIndex].replace('animation-', '');
              textElement.textContent = textElement.textContent.charAt(0).toUpperCase() + textElement.textContent.slice(1);
            }
          }
        });
      });
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
