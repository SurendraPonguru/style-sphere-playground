
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  CSSVariable,
  CSSTheme,
  cssThemes,
  defaultCssVariables,
  updateCSSVariable,
  exportCSS,
  exportHTML,
  exportFullProject,
  copyToClipboard,
  generateCSS
} from "@/utils/cssPlaygroundUtils";
import { toast } from "sonner";

interface CSSControlPanelProps {
  onThemeChange: (theme: CSSTheme) => void;
  currentTheme: CSSTheme;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const CSSControlPanel: React.FC<CSSControlPanelProps> = ({
  onThemeChange,
  currentTheme,
  isDarkMode,
  onToggleDarkMode
}) => {
  const [variables, setVariables] = useState<CSSVariable[]>([...defaultCssVariables]);
  
  // Update CSS variable in the DOM and state
  const handleVariableChange = (index: number, value: string) => {
    const updatedVariables = [...variables];
    updatedVariables[index].value = value;
    
    // Update in DOM
    const variable = updatedVariables[index];
    const cssValue = variable.type === 'number' ? `${value}${variable.unit || ''}` : value;
    updateCSSVariable(variable.name, cssValue);
    
    setVariables(updatedVariables);
  };
  
  // Copy CSS to clipboard
  const handleCopyCSS = () => {
    const css = generateCSS(variables);
    copyToClipboard(css)
      .then(() => toast.success("CSS copied to clipboard!"))
      .catch(() => toast.error("Failed to copy CSS"));
  };
  
  // Export as files
  const handleExportCSS = () => {
    exportCSS(variables);
    toast.success("CSS file downloaded!");
  };
  
  const handleExportHTML = () => {
    exportHTML();
    toast.success("HTML file downloaded!");
  };
  
  const handleExportFullProject = () => {
    exportFullProject(variables);
    toast.success("Full project downloaded!");
  };
  
  return (
    <div className="bg-card border rounded-lg shadow-md h-full overflow-y-auto">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">CSS Playground Controls</h2>
      </div>
      
      <Tabs defaultValue="variables" className="p-4">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="variables">Variables</TabsTrigger>
          <TabsTrigger value="themes">Themes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="variables" className="space-y-6">
          <div className="space-y-4">
            {variables.map((variable, index) => (
              <div key={variable.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor={variable.name}>{variable.label}</Label>
                  {variable.type === 'color' && (
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-6 h-6 rounded-full border" 
                        style={{ backgroundColor: variable.value }}
                      />
                      <span className="text-xs text-muted-foreground">{variable.value}</span>
                    </div>
                  )}
                  
                  {variable.type === 'number' && (
                    <span className="text-xs text-muted-foreground">
                      {variable.value}{variable.unit}
                    </span>
                  )}
                </div>
                
                {variable.type === 'color' && (
                  <div className="flex space-x-2">
                    <Input
                      type="color"
                      id={variable.name}
                      value={variable.value}
                      onChange={(e) => handleVariableChange(index, e.target.value)}
                      className="w-12 h-10 p-1"
                    />
                    <Input
                      type="text"
                      value={variable.value}
                      onChange={(e) => handleVariableChange(index, e.target.value)}
                      className="flex-1"
                      placeholder="#RRGGBB"
                    />
                  </div>
                )}
                
                {variable.type === 'number' && (
                  <div className="flex items-center space-x-2">
                    <Slider
                      id={variable.name}
                      min={variable.min || 0}
                      max={variable.max || 10}
                      step={variable.step || 1}
                      value={[parseFloat(variable.value)]}
                      onValueChange={(value) => handleVariableChange(index, value[0].toString())}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      min={variable.min}
                      max={variable.max}
                      step={variable.step}
                      value={variable.value}
                      onChange={(e) => handleVariableChange(index, e.target.value)}
                      className="w-16"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="themes" className="space-y-6">
          <div>
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-medium">Theme Presets</h3>
              <Button 
                variant={isDarkMode ? "default" : "outline"}
                size="sm"
                onClick={onToggleDarkMode}
              >
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cssThemes.map((theme) => (
                <div
                  key={theme.name}
                  className={`border rounded-md p-4 cursor-pointer transition-all hover:shadow-md ${
                    currentTheme.name === theme.name ? "border-primary ring-2 ring-primary/20" : ""
                  }`}
                  onClick={() => onThemeChange(theme)}
                >
                  <h4 className="font-medium">{theme.label}</h4>
                  <p className="text-sm text-muted-foreground">{theme.description}</p>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="p-4 border-t bg-muted/20">
        <h3 className="font-medium mb-2">Export Options</h3>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={handleCopyCSS}>
            Copy CSS
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportCSS}>
            Export CSS
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportHTML}>
            Export HTML
          </Button>
          <Button variant="default" size="sm" onClick={handleExportFullProject}>
            Export Full Project
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CSSControlPanel;
