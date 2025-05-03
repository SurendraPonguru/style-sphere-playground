
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

.preview-card {
  background-color: var(--css-background-color);
  color: var(--css-text-color);
  padding: var(--css-spacing);
  border-radius: var(--css-border-radius);
  box-shadow: var(--css-shadow);
  border: var(--css-border, 1px solid var(--css-primary-color));
  transition: var(--css-transition);
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
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0.7;
    transform: scale(0.97);
  }
}

@keyframes bounce {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-12px);
  }
}

.animation-pulse {
  animation: pulse var(--css-animation-duration) infinite alternate ease-in-out;
}

.animation-bounce {
  animation: bounce var(--css-animation-duration) infinite alternate ease-in-out;
}

/* Gradient text */
.gradient-text {
  background: var(--css-gradient-background);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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
    /* Include your CSS here */
  </style>
</head>
<body>
  <div class="preview-container">
    <button class="preview-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m5 9 4-4 4 4"/>
        <path d="M9 5v14"/>
      </svg>
      Button
    </button>
    
    <div class="preview-card">
      <h2>Card Title</h2>
      <p>This is some sample text in a card component.</p>
    </div>
    
    <input class="preview-input" type="text" placeholder="Input field">
    
    <button class="preview-button bg-gradient">Gradient Button</button>
    
    <!-- Add more components as needed -->
  </div>
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
  const html = generateHTML().replace('/* Include your CSS here */', css);
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
