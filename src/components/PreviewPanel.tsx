
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CSSTheme } from "@/utils/cssPlaygroundUtils";

interface PreviewPanelProps {
  currentTheme: CSSTheme;
  isDarkMode: boolean;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ currentTheme, isDarkMode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeAnimation, setActiveAnimation] = useState("");
  
  const animations = [
    { name: "", label: "None" },
    { name: "animation-pulse", label: "Pulse" },
    { name: "animation-bounce", label: "Bounce" },
    { name: "animation-spin", label: "Spin" },
    { name: "animation-fade", label: "Fade" }
  ];
  
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  
  return (
    <div className={`h-full overflow-y-auto ${currentTheme.className}`}>
      <div className="preview-card h-full p-6 relative">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">Preview Panel</h1>
          <p className="text-sm opacity-80">
            Current Theme: <span className="font-medium">{currentTheme.label}</span> | 
            Mode: <span className="font-medium">{isDarkMode ? "Dark" : "Light"}</span>
          </p>
        </div>
        
        <Tabs defaultValue="elements">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="elements">Elements</TabsTrigger>
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="animations">Animations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="elements" className="space-y-8">
            <div className="space-y-4">
              <h3 className="font-medium">Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <button className="preview-button">Button</button>
                <button className="preview-button" disabled>Disabled</button>
                <button className="preview-button" style={{backgroundColor: "var(--css-secondary-color)"}}>
                  Secondary
                </button>
                <button className="preview-button" style={{backgroundColor: "var(--css-accent-color)"}}>
                  Accent
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium">Inputs</h3>
              <div className="flex flex-col gap-4">
                <input className="preview-input" type="text" placeholder="Text input" />
                <input className="preview-input" type="email" placeholder="Email input" />
                <input className="preview-input" type="password" placeholder="Password input" />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="components" className="space-y-8">
            <div className="space-y-4">
              <h3 className="font-medium">Cards</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="preview-card">
                  <h4 style={{color: "var(--css-primary-color)", marginBottom: "var(--css-spacing)"}}>
                    Simple Card
                  </h4>
                  <p>This is a basic card component with some sample content.</p>
                </div>
                
                <div className="preview-card">
                  <h4 style={{color: "var(--css-secondary-color)", marginBottom: "var(--css-spacing)"}}>
                    Feature Card
                  </h4>
                  <p>This card has a different header color to show variation.</p>
                  <button 
                    className="preview-button"
                    style={{marginTop: "var(--css-spacing)", backgroundColor: "var(--css-secondary-color)"}}
                  >
                    Action
                  </button>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium">Modal</h3>
              <div>
                <button className="preview-button" onClick={toggleModal}>
                  Open Modal
                </button>
                
                {isModalOpen && (
                  <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="preview-modal-backdrop absolute inset-0" onClick={toggleModal}></div>
                    <div className="preview-modal relative z-10 w-full max-w-md mx-4">
                      <h4 style={{color: "var(--css-primary-color)", marginBottom: "var(--css-spacing)"}}>
                        Modal Title
                      </h4>
                      <p className="mb-4">This is a modal dialog with some sample content.</p>
                      <div className="flex justify-end space-x-2">
                        <button className="preview-button" style={{backgroundColor: "var(--css-accent-color)"}} onClick={toggleModal}>
                          Confirm
                        </button>
                        <button 
                          className="preview-button" 
                          style={{backgroundColor: "transparent", color: "var(--css-text-color)", border: "1px solid var(--css-primary-color)"}} 
                          onClick={toggleModal}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium">Form</h3>
              <div className="preview-card">
                <div className="space-y-4">
                  <div>
                    <label 
                      style={{display: "block", marginBottom: "calc(var(--css-spacing) * 0.5)", color: "var(--css-primary-color)"}}
                    >
                      Username
                    </label>
                    <input className="preview-input w-full" type="text" placeholder="Enter username" />
                  </div>
                  <div>
                    <label 
                      style={{display: "block", marginBottom: "calc(var(--css-spacing) * 0.5)", color: "var(--css-primary-color)"}}
                    >
                      Email
                    </label>
                    <input className="preview-input w-full" type="email" placeholder="Enter email" />
                  </div>
                  <button className="preview-button w-full">Submit</button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="animations" className="space-y-8">
            <div className="space-y-4">
              <h3 className="font-medium">Animation Control</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {animations.map((anim) => (
                  <button 
                    key={anim.name} 
                    className={`preview-button ${activeAnimation === anim.name ? "ring-2 ring-offset-2" : ""}`}
                    style={{backgroundColor: activeAnimation === anim.name ? "var(--css-accent-color)" : undefined}}
                    onClick={() => setActiveAnimation(anim.name)}
                  >
                    {anim.label}
                  </button>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={`preview-card ${activeAnimation}`}>
                  <h4 style={{color: "var(--css-primary-color)", marginBottom: "var(--css-spacing)"}}>
                    Animated Card
                  </h4>
                  <p>This card has the selected animation applied.</p>
                </div>
                
                <button className={`preview-button h-16 ${activeAnimation}`}>
                  Animated Button
                </button>
                
                <input 
                  className={`preview-input h-16 text-center ${activeAnimation}`} 
                  value="Animated Input" 
                  readOnly 
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PreviewPanel;
