
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import CSSControlPanel from "@/components/CSSControlPanel";
import PreviewPanel from "@/components/PreviewPanel";
import { cssThemes, CSSTheme } from "@/utils/cssPlaygroundUtils";

const CSSPlayground: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<CSSTheme>(cssThemes[0]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const { toast } = useToast();
  
  // Handle theme change
  const handleThemeChange = (theme: CSSTheme) => {
    setCurrentTheme(theme);
    toast({
      title: `${theme.label} theme applied`,
      description: theme.description,
    });
  };
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };
  
  // Initialize dark mode based on user preference
  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(prefersDark);
    if (prefersDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);
  
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">CSS Playground</h1>
            <div className="flex items-center gap-2">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                GitHub
              </a>
              <Button variant="outline" size="sm" onClick={toggleDarkMode}>
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container py-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2">
            <CSSControlPanel 
              onThemeChange={handleThemeChange}
              currentTheme={currentTheme}
              isDarkMode={isDarkMode}
              onToggleDarkMode={toggleDarkMode}
            />
          </div>
          <div className="lg:col-span-3">
            <div className="bg-card border rounded-lg shadow-md h-[70vh]">
              <PreviewPanel currentTheme={currentTheme} isDarkMode={isDarkMode} />
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-card border rounded-lg">
          <h2 className="text-lg font-medium mb-2">About CSS Playground</h2>
          <p className="text-muted-foreground">
            This interactive CSS playground allows you to experiment with various CSS properties and see real-time results. 
            Tweak colors, spacing, border radius, and more to create your perfect design. 
            Try different themes like Glassmorphism and Neumorphism with a single click.
          </p>
          <div className="mt-4">
            <h3 className="text-sm font-medium">Tips:</h3>
            <ul className="text-xs text-muted-foreground list-disc list-inside">
              <li>Adjust CSS variables to see real-time changes</li>
              <li>Switch between themes to explore different design styles</li>
              <li>Toggle between light and dark mode for different color schemes</li>
              <li>Export your CSS to use in your own projects</li>
            </ul>
          </div>
        </div>
      </main>
      
      <footer className="border-t mt-8">
        <div className="container py-6 text-center text-sm text-muted-foreground">
          <p>CSS Playground - Experiment with CSS in real-time</p>
        </div>
      </footer>
    </div>
  );
};

export default CSSPlayground;
