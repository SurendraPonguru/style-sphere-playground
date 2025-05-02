
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { toast } from "sonner";
import CSSControlPanel from "@/components/CSSControlPanel";
import PreviewPanel from "@/components/PreviewPanel";
import { cssThemes, CSSTheme } from "@/utils/cssPlaygroundUtils";

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
  
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                CSS Playground
              </span>
            </h1>
            <div className="flex items-center gap-3">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                GitHub
              </a>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={toggleDarkMode}
                className="animate-fade-in"
              >
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container py-6 animate-fade-in">
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
            <div className="bg-card border rounded-lg shadow-lg h-[70vh] overflow-hidden transition-all hover:shadow-xl">
              <PreviewPanel currentTheme={currentTheme} isDarkMode={isDarkMode} />
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-card border rounded-lg shadow-md transition-all hover:shadow-lg animate-fade-in">
          <h2 className="text-lg font-medium mb-3 text-primary">About CSS Playground</h2>
          <p className="text-muted-foreground">
            This interactive CSS playground allows you to experiment with various CSS properties and see real-time results. 
            Tweak colors, spacing, border radius, and more to create your perfect design. 
            Try different themes like Glassmorphism, Neumorphism and Modern with a single click.
          </p>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-secondary">Tips:</h3>
            <ul className="text-xs text-muted-foreground list-disc list-inside mt-2 grid gap-1 md:grid-cols-2">
              <li>Adjust CSS variables to see real-time changes</li>
              <li>Switch between themes to explore different design styles</li>
              <li>Toggle between light and dark mode for different color schemes</li>
              <li>Explore animations and interactive elements in the preview panel</li>
              <li>Export your CSS to use in your own projects</li>
              <li>Try hovering over elements to see interactive effects</li>
            </ul>
          </div>
        </div>
      </main>
      
      <footer className="border-t mt-8 bg-muted/30">
        <div className="container py-6 text-center text-sm text-muted-foreground">
          <p>CSS Playground - Experiment with CSS in real-time</p>
        </div>
      </footer>
    </div>
  );
};

export default CSSPlayground;
