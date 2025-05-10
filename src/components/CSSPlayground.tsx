
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { toast } from "sonner";
import CSSControlPanel from "@/components/CSSControlPanel";
import PreviewPanel from "@/components/PreviewPanel";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { cssThemes, CSSTheme } from "@/utils/cssPlaygroundUtils";
import { 
  Download, 
  Upload, 
  Github, 
  Moon, 
  Sun, 
  Code,
  Palette,
  PaintBucket,
  Layout,
  Eye,
  ArrowRight,
  Info,
  LayoutPanelTop
} from "lucide-react";

const CSSPlayground: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<CSSTheme>(cssThemes[0]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [showWelcomeGuide, setShowWelcomeGuide] = useState<boolean>(true);
  const { toast: uiToast } = useToast();
  
  // Handle theme change with improved feedback
  const handleThemeChange = (theme: CSSTheme) => {
    setCurrentTheme(theme);
    toast.success(`${theme.label} theme applied`, {
      description: theme.description,
      duration: 3000,
    });
  };
  
  // Toggle dark mode with animated transition
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };
  
  // Initialize dark mode based on user preference
  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  // Handle design import
  const handleImportDesign = () => {
    // Simulate import functionality
    toast.info("Import design functionality", {
      description: "Upload a CSS file or design configuration to import your styles",
      duration: 3000,
    });
  };

  const dismissWelcomeGuide = () => {
    setShowWelcomeGuide(false);
    toast.success("Welcome guide dismissed", {
      description: "You can open it again from the Help menu if needed",
      duration: 3000,
    });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 overflow-x-hidden">
      <header className="border-b backdrop-blur-md sticky top-0 z-10 shadow-sm bg-background/90">
        <div className="container py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Palette className="text-primary h-6 w-6" />
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                CSS Playground
              </span>
            </h1>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleImportDesign}
                className="flex items-center gap-2 rounded-full"
                data-tooltip="Import existing CSS or design configuration"
              >
                <Upload size={16} />
                Import
              </Button>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-full hover:bg-muted/50"
                data-tooltip="View source code on GitHub"
              >
                <Github size={16} />
                GitHub
              </a>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={toggleDarkMode}
                className="animate-fade-in flex items-center gap-2 rounded-full"
                data-tooltip={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDarkMode ? (
                  <>
                    <Sun size={16} className="text-amber-400" />
                    Light
                  </>
                ) : (
                  <>
                    <Moon size={16} className="text-indigo-400" />
                    Dark
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container py-8 animate-fade-in flex flex-col h-[calc(100vh-160px)]">
        {showWelcomeGuide && (
          <div className="mb-6 bg-primary/5 border border-primary/20 rounded-xl p-4 relative animation-reveal">
            <button 
              className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
              onClick={dismissWelcomeGuide}
            >
              ✕
            </button>
            <h2 className="text-lg font-medium flex items-center gap-2 mb-3">
              <Info size={18} className="text-primary" />
              Welcome to CSS Playground
            </h2>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                This interactive tool helps you experiment with CSS and design in real-time. Follow these simple steps:
              </p>
              <ol className="list-decimal pl-5 space-y-1">
                <li><span className="font-medium text-foreground">Modify Variables</span>: Adjust colors, spacing and more in the control panel</li>
                <li><span className="font-medium text-foreground">Try Different Themes</span>: Switch between design styles like Glassmorphism</li>
                <li><span className="font-medium text-foreground">Preview Changes</span>: See your modifications instantly in the preview panel</li>
                <li><span className="font-medium text-foreground">Export Your CSS</span>: Download your custom styles when you're done</li>
              </ol>
              <div className="pt-2">
                <Button
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={dismissWelcomeGuide}
                >
                  <ArrowRight size={16} />
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="mb-6">
          <div className="flex items-center gap-2">
            <LayoutPanelTop size={18} className="text-primary" />
            <h2 className="text-xl font-medium text-foreground/90">Horizontal Layout Preview</h2>
            <span className="text-xs text-muted-foreground ml-2">(Preview panel on top, controls on bottom)</span>
          </div>
        </div>
        
        <ResizablePanelGroup 
          direction="vertical" 
          className="flex-1 border rounded-xl bg-card shadow-lg overflow-hidden h-full horizontal-layout-panel"
        >
          {/* Top Section: Preview Panel */}
          <ResizablePanel defaultSize={60} minSize={30} className="bg-muted/30 overflow-hidden">
            <div className="bg-muted/50 border-b p-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-xs text-muted-foreground">preview.html</div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7 w-7 p-0 rounded-full"
                  data-tooltip="Change layout view"
                >
                  <Layout size={14} />
                </Button>
              </div>
            </div>
            <div className="h-full overflow-y-auto p-4 preview-content">
              <PreviewPanel currentTheme={currentTheme} isDarkMode={isDarkMode} />
            </div>
          </ResizablePanel>
          
          {/* Resizable Handle */}
          <ResizableHandle withHandle />
          
          {/* Bottom Section: CSS Control Panel */}
          <ResizablePanel defaultSize={40} minSize={25} className="overflow-hidden">
            <div className="flex h-full flex-col">
              <div className="p-4 border-b bg-muted/20">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <Palette size={18} className="text-primary" />
                    CSS Control Panel
                  </h3>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="rounded-full flex items-center gap-2"
                      data-tooltip="View and copy the generated code"
                    >
                      <Code size={16} />
                      Export Code
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="rounded-full flex items-center gap-2"
                      data-tooltip="Preview your design in fullscreen"
                    >
                      <Eye size={16} />
                      Preview
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                <CSSControlPanel 
                  onThemeChange={handleThemeChange}
                  currentTheme={currentTheme}
                  isDarkMode={isDarkMode}
                  onToggleDarkMode={toggleDarkMode}
                />
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
        
        <div className="mt-8 p-6 bg-card border rounded-xl shadow-md transition-all hover:shadow-lg animate-fade-in">
          <h2 className="text-lg font-medium mb-3 flex items-center gap-2">
            <PaintBucket size={18} className="text-primary" />
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">About CSS Playground</span>
          </h2>
          <p className="text-muted-foreground">
            This interactive CSS playground allows you to experiment with various CSS properties and see real-time results. 
            Tweak colors, spacing, border radius, and more to create your perfect design. 
            Try different themes like Glassmorphism, Neumorphism and Modern with a single click.
            When you're done, export your CSS to use in your projects.
          </p>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-secondary-foreground">Tips:</h3>
            <ul className="text-xs text-muted-foreground mt-2 grid gap-2 md:grid-cols-2">
              {[
                "Adjust CSS variables to see real-time changes",
                "Switch between themes to explore different design styles",
                "Toggle between light and dark mode for different color schemes",
                "Explore animations and interactive elements in the preview panel",
                "Export your CSS to use in your own projects",
                "Try hovering over elements to see interactive effects",
                "Drag and drop elements to rearrange the layout",
                "Try gradient colors for more vibrant designs"
              ].map((tip, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      
      <footer className="border-t mt-8 bg-muted/30">
        <div className="container py-6 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground mb-2 sm:mb-0">CSS Playground - Experiment with CSS in real-time</p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CSSPlayground;
