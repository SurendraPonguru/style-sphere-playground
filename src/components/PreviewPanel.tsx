
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CSSTheme } from "@/utils/cssPlaygroundUtils";
import { cn } from "@/lib/utils";

interface PreviewPanelProps {
  currentTheme: CSSTheme;
  isDarkMode: boolean;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ currentTheme, isDarkMode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeAnimation, setActiveAnimation] = useState("");
  const [activeTab, setActiveTab] = useState("elements");
  
  const animations = [
    { name: "", label: "None" },
    { name: "animation-pulse", label: "Pulse" },
    { name: "animation-bounce", label: "Bounce" },
    { name: "animation-spin", label: "Spin" },
    { name: "animation-fade", label: "Fade" },
    { name: "animation-float", label: "Float" },
    { name: "animation-shake", label: "Shake" },
    { name: "animation-reveal", label: "Reveal" }
  ];
  
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  
  // Handle tab change with animation
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  // Interactive button states
  const [hoverStates, setHoverStates] = useState<{[key: string]: boolean}>({});
  
  const handleHover = (id: string, isHovering: boolean) => {
    setHoverStates(prev => ({
      ...prev,
      [id]: isHovering
    }));
  };
  
  return (
    <div className={`h-full overflow-y-auto ${currentTheme.className} bg-gradient-to-br from-card/80 to-card`}>
      <div className="preview-card h-full p-6 relative">
        <div className="text-center mb-6 animation-reveal">
          <h1 className="text-2xl font-bold mb-2 relative inline-block">
            Preview Panel
            <span className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent w-full"></span>
          </h1>
          <p className="text-sm opacity-80 mt-2">
            Current Theme: <span className="font-medium text-primary">{currentTheme.label}</span> | 
            Mode: <span className="font-medium">{isDarkMode ? "Dark" : "Light"}</span>
          </p>
        </div>
        
        <Tabs defaultValue="elements" value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="grid grid-cols-3 mb-6 bg-background/80 backdrop-blur-sm p-1 rounded-full">
            <TabsTrigger 
              value="elements" 
              className={`rounded-full transition-all duration-300 data-[state=active]:shadow-md`}
            >
              Elements
            </TabsTrigger>
            <TabsTrigger 
              value="components" 
              className={`rounded-full transition-all duration-300 data-[state=active]:shadow-md`}
            >
              Components
            </TabsTrigger>
            <TabsTrigger 
              value="animations" 
              className={`rounded-full transition-all duration-300 data-[state=active]:shadow-md`}
            >
              Animations
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="elements" className="space-y-8 animation-reveal">
            <div className="space-y-4">
              <h3 className="font-medium text-lg border-b pb-2">Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <button 
                  className={cn("preview-button interactive", hoverStates["btn1"] ? "shadow-lg" : "")}
                  onMouseEnter={() => handleHover("btn1", true)}
                  onMouseLeave={() => handleHover("btn1", false)}
                >
                  Button
                </button>
                <button className="preview-button opacity-60 cursor-not-allowed" disabled>Disabled</button>
                <button 
                  className={cn("preview-button interactive", hoverStates["btn2"] ? "shadow-lg" : "")}
                  style={{backgroundColor: "var(--css-secondary-color)"}}
                  onMouseEnter={() => handleHover("btn2", true)}
                  onMouseLeave={() => handleHover("btn2", false)}
                >
                  Secondary
                </button>
                <button 
                  className={cn("preview-button interactive", hoverStates["btn3"] ? "shadow-lg" : "")}
                  style={{backgroundColor: "var(--css-accent-color)"}}
                  onMouseEnter={() => handleHover("btn3", true)}
                  onMouseLeave={() => handleHover("btn3", false)}
                >
                  Accent
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium text-lg border-b pb-2">Inputs</h3>
              <div className="flex flex-col gap-4">
                <input className="preview-input" type="text" placeholder="Text input" />
                <input className="preview-input" type="email" placeholder="Email input" />
                <input className="preview-input" type="password" placeholder="Password input" />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="components" className="space-y-8 animation-reveal">
            <div className="space-y-4">
              <h3 className="font-medium text-lg border-b pb-2">Cards</h3>
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
                    className="preview-button interactive mt-4"
                    style={{marginTop: "var(--css-spacing)", backgroundColor: "var(--css-secondary-color)"}}
                  >
                    Action
                  </button>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium text-lg border-b pb-2">Modal</h3>
              <div>
                <button 
                  className="preview-button interactive"
                  onClick={toggleModal}
                  onMouseEnter={() => handleHover("modalBtn", true)}
                  onMouseLeave={() => handleHover("modalBtn", false)}
                >
                  Open Modal
                </button>
                
                {isModalOpen && (
                  <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="preview-modal-backdrop absolute inset-0" onClick={toggleModal}></div>
                    <div className="preview-modal relative z-10 w-full max-w-md mx-4">
                      <div className="flex justify-between items-center mb-4">
                        <h4 style={{color: "var(--css-primary-color)"}}>
                          Modal Title
                        </h4>
                        <button 
                          className="text-muted-foreground hover:text-foreground"
                          onClick={toggleModal}
                        >
                          ✕
                        </button>
                      </div>
                      <p className="mb-6">This is a modal dialog with some sample content. Click outside or on the close buttons to dismiss.</p>
                      <div className="flex justify-end space-x-2">
                        <button className="preview-button interactive" style={{backgroundColor: "var(--css-accent-color)"}} onClick={toggleModal}>
                          Confirm
                        </button>
                        <button 
                          className="preview-button interactive" 
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
              <h3 className="font-medium text-lg border-b pb-2">Form</h3>
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
                  <button className="preview-button interactive w-full mt-2">Submit</button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="animations" className="space-y-8 animation-reveal">
            <div className="space-y-4">
              <h3 className="font-medium text-lg border-b pb-2">Animation Control</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {animations.map((anim) => (
                  <button 
                    key={anim.name} 
                    className={cn(
                      "preview-button transition-all", 
                      activeAnimation === anim.name ? "ring-2 ring-offset-2" : ""
                    )}
                    style={{backgroundColor: activeAnimation === anim.name ? "var(--css-accent-color)" : undefined}}
                    onClick={() => setActiveAnimation(anim.name)}
                  >
                    {anim.label}
                  </button>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className={cn("preview-card", activeAnimation)}>
                  <h4 style={{color: "var(--css-primary-color)", marginBottom: "var(--css-spacing)"}}>
                    Animated Card
                  </h4>
                  <p>This card has the selected animation applied.</p>
                </div>
                
                <button className={cn("preview-button h-16", activeAnimation)}>
                  Animated Button
                </button>
                
                <input 
                  className={cn("preview-input h-16 text-center", activeAnimation)} 
                  value="Animated Input" 
                  readOnly 
                />
              </div>
              
              {/* New animation showcase section */}
              <div className="mt-8">
                <h3 className="font-medium text-lg border-b pb-2 mb-4">Animation Showcase</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="aspect-square flex items-center justify-center">
                    <div className="w-12 h-12 bg-primary rounded-full animation-pulse"></div>
                  </div>
                  <div className="aspect-square flex items-center justify-center">
                    <div className="w-12 h-12 bg-secondary rounded-full animation-bounce"></div>
                  </div>
                  <div className="aspect-square flex items-center justify-center">
                    <div className="w-12 h-12 flex items-center justify-center bg-accent text-white rounded-full animation-spin">
                      ↻
                    </div>
                  </div>
                  <div className="aspect-square flex items-center justify-center">
                    <div className="w-12 h-12 bg-primary/50 rounded-full animation-float"></div>
                  </div>
                </div>
              </div>
              
              {/* Interactive elements showcase */}
              <div className="mt-8 preview-card bg-gradient-to-br from-background to-background/70">
                <h3 className="font-medium text-lg mb-4">Interactive Elements</h3>
                <div className="flex flex-wrap gap-4">
                  <button className="preview-button interactive">Hover Effect</button>
                  <button className="preview-button interactive" style={{backgroundColor: "var(--css-secondary-color)"}}>
                    Shimmer Effect
                  </button>
                  <div className="preview-card w-full mt-4 transition-all hover:scale-[1.02]">
                    <p className="text-center">This card scales slightly on hover</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PreviewPanel;
