
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
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
import { 
  Copy, 
  Download, 
  FileText, 
  Code, 
  Palette, 
  PaintBucket, 
  Plus, 
  Trash,
  PaintBucket as GradientIcon
} from "lucide-react";

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
  const [useGradients, setUseGradients] = useState<boolean>(false);
  const [gradientStart, setGradientStart] = useState<string>("#4f46e5");
  const [gradientEnd, setGradientEnd] = useState<string>("#ec4899");
  const [gradientDirection, setGradientDirection] = useState<string>("90deg");
  
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

  // Add a new custom variable
  const handleAddVariable = () => {
    const newVar: CSSVariable = {
      name: `--css-custom-color-${variables.length}`,
      label: `Custom Color ${variables.length}`,
      value: "#3b82f6",
      type: "color"
    };
    
    setVariables([...variables, newVar]);
    updateCSSVariable(newVar.name, newVar.value);
    
    toast.success("Custom variable added", {
      description: `New variable ${newVar.label} has been added`,
    });
  };

  // Remove a custom variable
  const handleRemoveVariable = (index: number) => {
    if (index < defaultCssVariables.length) {
      toast.error("Cannot remove default variables");
      return;
    }
    
    const updatedVariables = [...variables];
    const removedVariable = updatedVariables.splice(index, 1)[0];
    
    setVariables(updatedVariables);
    
    toast.success("Variable removed", {
      description: `${removedVariable.label} has been removed`,
    });
  };

  // Apply gradient as background
  const handleApplyGradient = () => {
    const gradientValue = `linear-gradient(${gradientDirection}, ${gradientStart}, ${gradientEnd})`;
    document.documentElement.style.setProperty('--css-gradient-background', gradientValue);
    
    // Add a class to preview elements with gradient
    const previewButtons = document.querySelectorAll('.bg-gradient');
    previewButtons.forEach(button => {
      (button as HTMLElement).style.background = gradientValue;
    });
    
    toast.success("Gradient applied", {
      description: "Gradient background has been applied to selected elements",
    });
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
    <div className="h-full flex flex-col">
      <Tabs defaultValue="variables" className="p-4 flex-1 flex flex-col">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="variables" className="flex items-center gap-1">
            <Palette size={14} /> Variables
          </TabsTrigger>
          <TabsTrigger value="themes" className="flex items-center gap-1">
            <PaintBucket size={14} /> Themes
          </TabsTrigger>
          <TabsTrigger value="gradients" className="flex items-center gap-1">
            <GradientIcon size={14} /> Gradients
          </TabsTrigger>
        </TabsList>
        
        <div className="flex-1 overflow-y-auto tab-content-container">
          <TabsContent value="variables" className="space-y-6 h-full">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">CSS Variables</h3>
              <Button 
                size="sm" 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={handleAddVariable}
              >
                <Plus size={14} /> Add Variable
              </Button>
            </div>
            
            <div className="space-y-4 overflow-y-auto pr-2">
              {variables.map((variable, index) => (
                <div key={variable.name} className="space-y-2 group relative">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={variable.name}>{variable.label}</Label>
                    <div className="flex items-center gap-2">
                      {variable.type === 'color' && (
                        <div className="flex items-center gap-2">
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
                      
                      {index >= defaultCssVariables.length && (
                        <button 
                          className="text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleRemoveVariable(index)}
                        >
                          <Trash size={14} />
                        </button>
                      )}
                    </div>
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
          
          <TabsContent value="themes" className="space-y-6 h-full">
            <div>
              <div className="flex justify-between mb-4">
                <h3 className="text-lg font-medium">Theme Presets</h3>
                <Button 
                  variant={isDarkMode ? "default" : "outline"}
                  size="sm"
                  onClick={onToggleDarkMode}
                  className="flex items-center gap-2"
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
          
          <TabsContent value="gradients" className="space-y-6 h-full">
            <div>
              <h3 className="text-lg font-medium mb-4">Gradient Controls</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="gradient-start">Gradient Start Color</Label>
                  <div className="flex space-x-2">
                    <Input
                      type="color"
                      id="gradient-start"
                      value={gradientStart}
                      onChange={(e) => setGradientStart(e.target.value)}
                      className="w-12 h-10 p-1"
                    />
                    <Input
                      type="text"
                      value={gradientStart}
                      onChange={(e) => setGradientStart(e.target.value)}
                      className="flex-1"
                      placeholder="#RRGGBB"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="gradient-end">Gradient End Color</Label>
                  <div className="flex space-x-2">
                    <Input
                      type="color"
                      id="gradient-end"
                      value={gradientEnd}
                      onChange={(e) => setGradientEnd(e.target.value)}
                      className="w-12 h-10 p-1"
                    />
                    <Input
                      type="text"
                      value={gradientEnd}
                      onChange={(e) => setGradientEnd(e.target.value)}
                      className="flex-1"
                      placeholder="#RRGGBB"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="gradient-direction">Direction (degrees)</Label>
                  <div className="flex items-center space-x-2">
                    <Slider
                      id="gradient-direction"
                      min={0}
                      max={360}
                      step={45}
                      value={[parseInt(gradientDirection)]}
                      onValueChange={(value) => setGradientDirection(`${value[0]}deg`)}
                      className="flex-1"
                    />
                    <Input
                      type="text"
                      value={gradientDirection}
                      onChange={(e) => setGradientDirection(e.target.value)}
                      className="w-20"
                    />
                  </div>
                </div>
                
                <div className="h-20 rounded-lg border mt-4" style={{
                  background: `linear-gradient(${gradientDirection}, ${gradientStart}, ${gradientEnd})`
                }}></div>
                
                <Button onClick={handleApplyGradient} className="w-full mt-2 flex items-center gap-2">
                  <GradientIcon size={16} /> Apply Gradient to Elements
                </Button>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
      
      <div className="p-4 border-t bg-muted/20">
        <h3 className="font-medium mb-2 flex items-center gap-2">
          <Download size={16} /> Export Options
        </h3>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={handleCopyCSS} className="flex items-center gap-2">
            <Copy size={14} /> Copy CSS
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportCSS} className="flex items-center gap-2">
            <FileText size={14} /> Export CSS
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportHTML} className="flex items-center gap-2">
            <Code size={14} /> Export HTML
          </Button>
          <Button variant="default" size="sm" onClick={handleExportFullProject} className="flex items-center gap-2">
            <Download size={14} /> Full Project
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CSSControlPanel;
