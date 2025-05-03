import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CSSTheme } from "@/utils/cssPlaygroundUtils";
import { cn } from "@/lib/utils";
import { 
  Palette, 
  Move, 
  ArrowRight, 
  Plus, 
  Check, 
  X, 
  PaintBucket as GradientIcon,
  ArrowLeft, 
  ArrowUp, 
  ArrowDown 
} from "lucide-react";

interface PreviewPanelProps {
  currentTheme: CSSTheme;
  isDarkMode: boolean;
}

interface DraggableElement {
  id: string;
  type: string;
  position: { x: number; y: number };
  content: string;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ currentTheme, isDarkMode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeAnimation, setActiveAnimation] = useState("");
  const [activeTab, setActiveTab] = useState("elements");
  const [draggableElements, setDraggableElements] = useState<DraggableElement[]>([]);
  const [draggedElement, setDraggedElement] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  
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

  // Handle element drag start
  const handleDragStart = (e: React.DragEvent, type: string) => {
    e.dataTransfer.setData("elementType", type);
    setDraggedElement(type);
  };

  // Handle element drag over
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Handle element drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("elementType");
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newElement: DraggableElement = {
      id: `element-${Date.now()}`,
      type,
      position: { x, y },
      content: `${type.charAt(0).toUpperCase()}${type.slice(1)}`
    };
    
    setDraggableElements(prev => [...prev, newElement]);
    setDraggedElement(null);
  };

  // Handle element move
  const handleElementMove = (e: React.MouseEvent, index: number) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setDraggableElements(prev => {
      const newElements = [...prev];
      newElements[index] = {
        ...newElements[index],
        position: { x, y }
      };
      return newElements;
    });
  };

  // Handle element remove
  const handleElementRemove = (id: string) => {
    setDraggableElements(prev => prev.filter(element => element.id !== id));
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
          <TabsList className="grid grid-cols-4 mb-6 bg-background/80 backdrop-blur-sm p-1 rounded-full">
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
            <TabsTrigger 
              value="draggable" 
              className={`rounded-full transition-all duration-300 data-[state=active]:shadow-md`}
            >
              Draggable
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="elements" className="space-y-8 animation-reveal">
            <div className="space-y-4">
              <h3 className="font-medium text-lg border-b pb-2">Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <button 
                  className={cn("preview-button interactive flex items-center gap-2", hoverStates["btn1"] ? "shadow-lg" : "")}
                  onMouseEnter={() => handleHover("btn1", true)}
                  onMouseLeave={() => handleHover("btn1", false)}
                >
                  <ArrowRight size={16} /> Button
                </button>
                <button className="preview-button opacity-60 cursor-not-allowed flex items-center gap-2" disabled>
                  <X size={16} /> Disabled
                </button>
                <button 
                  className={cn("preview-button interactive flex items-center gap-2", hoverStates["btn2"] ? "shadow-lg" : "")}
                  style={{backgroundColor: "var(--css-secondary-color)"}}
                  onMouseEnter={() => handleHover("btn2", true)}
                  onMouseLeave={() => handleHover("btn2", false)}
                >
                  <Check size={16} /> Secondary
                </button>
                <button 
                  className={cn("preview-button interactive flex items-center gap-2", hoverStates["btn3"] ? "shadow-lg" : "")}
                  style={{backgroundColor: "var(--css-accent-color)"}}
                  onMouseEnter={() => handleHover("btn3", true)}
                  onMouseLeave={() => handleHover("btn3", false)}
                >
                  <Plus size={16} /> Accent
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium text-lg border-b pb-2">Gradient Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <button 
                  className="preview-button interactive flex items-center gap-2 bg-gradient"
                  style={{
                    background: "linear-gradient(90deg, var(--css-primary-color), var(--css-secondary-color))"
                  }}
                >
                  <GradientIcon size={16} /> Gradient
                </button>
                <button 
                  className="preview-button interactive flex items-center gap-2 bg-gradient"
                  style={{
                    background: "linear-gradient(90deg, var(--css-secondary-color), var(--css-accent-color))"
                  }}
                >
                  <Palette size={16} /> Colors
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

            <div className="space-y-4">
              <h3 className="font-medium text-lg border-b pb-2">Directional Buttons</h3>
              <div className="grid grid-cols-3 gap-2 max-w-[200px] mx-auto">
                <div></div>
                <button className="preview-button interactive flex items-center justify-center">
                  <ArrowUp size={18} />
                </button>
                <div></div>
                <button className="preview-button interactive flex items-center justify-center">
                  <ArrowLeft size={18} />
                </button>
                <div className="preview-button flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30">
                  <Move size={18} />
                </div>
                <button className="preview-button interactive flex items-center justify-center">
                  <ArrowRight size={18} />
                </button>
                <div></div>
                <button className="preview-button interactive flex items-center justify-center">
                  <ArrowDown size={18} />
                </button>
                <div></div>
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
          
          <TabsContent value="draggable" className="space-y-4 animation-reveal">
            <div className="mb-6">
              <h3 className="font-medium text-lg border-b pb-2 mb-4">Drag and Drop Elements</h3>
              <div className="flex flex-wrap gap-4 mb-6">
                <div 
                  className="preview-button interactive cursor-move flex items-center gap-2"
                  draggable
                  onDragStart={(e) => handleDragStart(e, "button")}
                >
                  <Move size={16} /> Drag Button
                </div>
                <div 
                  className="preview-card p-3 cursor-move w-auto inline-block"
                  draggable
                  onDragStart={(e) => handleDragStart(e, "card")}
                >
                  <Move size={16} /> Drag Card
                </div>
                <div 
                  className="preview-input p-2 cursor-move flex items-center"
                  draggable
                  onDragStart={(e) => handleDragStart(e, "input")}
                >
                  <Move size={16} /> Drag Input
                </div>
              </div>
              
              <div 
                ref={canvasRef}
                className="h-[300px] border-2 border-dashed border-primary/30 rounded-lg relative overflow-hidden bg-background/50"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground pointer-events-none">
                  {draggedElement ? (
                    <p>Drop the {draggedElement} here</p>
                  ) : (
                    <p>Drag elements here</p>
                  )}
                </div>
                
                {draggableElements.map((element, index) => (
                  <div 
                    key={element.id}
                    className="absolute cursor-move"
                    style={{
                      left: `${element.position.x}px`,
                      top: `${element.position.y}px`,
                    }}
                    draggable
                    onDrag={(e: React.MouseEvent) => handleElementMove(e, index)}
                  >
                    {element.type === "button" && (
                      <div className="flex items-center">
                        <button className="preview-button">{element.content}</button>
                        <button 
                          className="ml-2 p-1 text-destructive hover:bg-destructive/10 rounded"
                          onClick={() => handleElementRemove(element.id)}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    )}
                    {element.type === "card" && (
                      <div className="flex items-start">
                        <div className="preview-card p-3">
                          <p>{element.content}</p>
                        </div>
                        <button 
                          className="ml-2 p-1 text-destructive hover:bg-destructive/10 rounded"
                          onClick={() => handleElementRemove(element.id)}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    )}
                    {element.type === "input" && (
                      <div className="flex items-center">
                        <input className="preview-input" placeholder={element.content} />
                        <button 
                          className="ml-2 p-1 text-destructive hover:bg-destructive/10 rounded"
                          onClick={() => handleElementRemove(element.id)}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-4 text-xs text-muted-foreground">
                <p>Note: You can drag elements from above into the canvas. Drag the elements in the canvas to reposition them.</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PreviewPanel;
