
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { toast } from "sonner";
import CSSControlPanel from "@/components/CSSControlPanel";
import PreviewPanel from "@/components/PreviewPanel";
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
  Eye
} from "lucide-react";

const CSSPlayground: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<CSSTheme>(cssThemes[0]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
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
      description: "This would allow importing designs from files or URLs",
      duration: 3000,
    });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/80">
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
              >
                <Upload size={16} />
                Import
              </Button>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-full hover:bg-muted/50"
              >
                <Github size={16} />
                GitHub
              </a>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={toggleDarkMode}
                className="animate-fade-in flex items-center gap-2 rounded-full"
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
      
      <main className="container py-8 animate-fade-in">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-medium text-foreground/90">Design Workspace</h2>
              <p className="text-muted-foreground text-sm">Customize your CSS variables and see real-time changes</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="rounded-full flex items-center gap-2">
                <Code size={16} />
                Export Code
              </Button>
              <Button variant="default" size="sm" className="rounded-full flex items-center gap-2">
                <Eye size={16} />
                Preview
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2">
            <CSSControlPanel 
              onThemeChange={handleThemeChange}
              currentTheme={currentTheme}
              isDarkMode={isDarkMode}
              onToggleDarkMode={toggleDarkMode}
            />
          </div>
          <div className="lg:col-span-3 animate-scale-in">
            <div className="bg-card border rounded-xl shadow-lg h-[70vh] overflow-hidden transition-all hover:shadow-xl">
              <div className="bg-muted/50 border-b p-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-xs text-muted-foreground">preview.html</div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0 rounded-full">
                    <Layout size={14} />
                  </Button>
                </div>
              </div>
              <PreviewPanel currentTheme={currentTheme} isDarkMode={isDarkMode} />
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-card border rounded-xl shadow-md transition-all hover:shadow-lg animate-fade-in">
          <h2 className="text-lg font-medium mb-3 flex items-center gap-2">
            <PaintBucket size={18} className="text-primary" />
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">About CSS Playground</span>
          </h2>
          <p className="text-muted-foreground">
            This interactive CSS playground allows you to experiment with various CSS properties and see real-time results. 
            Tweak colors, spacing, border radius, and more to create your perfect design. 
            Try different themes like Glassmorphism, Neumorphism and Modern with a single click.
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
        <div className="container py-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">CSS Playground - Experiment with CSS in real-time</p>
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
