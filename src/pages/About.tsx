
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft,
  Palette, 
  PaintBucket,
  Layout,
  Code
} from "lucide-react";

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 overflow-x-hidden">
      <header className="border-b backdrop-blur-md sticky top-0 z-10 shadow-sm bg-background/90">
        <div className="container py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Palette className="text-primary h-6 w-6" />
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                About CSS Playground
              </span>
            </h1>
            <div>
              <Button 
                variant="outline" 
                size="sm" 
                asChild
                className="flex items-center gap-2 rounded-full"
              >
                <Link to="/">
                  <ArrowLeft size={16} />
                  Back to Playground
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container py-8 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
              <Palette className="text-primary" />
              About CSS Playground
            </h2>
            <p className="text-lg text-muted-foreground">
              CSS Playground is an interactive tool designed to help web developers and designers
              experiment with CSS and design concepts in real-time.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-card border p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
              <div className="mb-4 flex items-center gap-2">
                <Layout className="text-primary h-6 w-6" />
                <h3 className="text-xl font-medium">Interactive Design</h3>
              </div>
              <p className="text-muted-foreground">
                Experience real-time CSS manipulation with our intuitive interface.
                Adjust colors, spacing, typography, and more to see immediate results.
                Perfect for prototyping and experimenting with different design styles.
              </p>
            </div>
            
            <div className="bg-card border p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
              <div className="mb-4 flex items-center gap-2">
                <PaintBucket className="text-primary h-6 w-6" />
                <h3 className="text-xl font-medium">Design Themes</h3>
              </div>
              <p className="text-muted-foreground">
                Explore various design themes like Glassmorphism, Neumorphism, and Modern UI.
                Switch between them with a click and customize each to match your vision.
                Find the perfect style for your next web project.
              </p>
            </div>
            
            <div className="bg-card border p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
              <div className="mb-4 flex items-center gap-2">
                <Code className="text-primary h-6 w-6" />
                <h3 className="text-xl font-medium">Export & Use</h3>
              </div>
              <p className="text-muted-foreground">
                When you've perfected your design, export the CSS code with one click.
                Use the generated styles in your own projects or as a starting point
                for further development. Save time on initial CSS setup and focus on creativity.
              </p>
            </div>
            
            <div className="bg-card border p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
              <div className="mb-4 flex items-center gap-2">
                <Palette className="text-primary h-6 w-6" />
                <h3 className="text-xl font-medium">Learning Tool</h3>
              </div>
              <p className="text-muted-foreground">
                CSS Playground serves as an educational tool for beginners learning CSS.
                See how different properties affect the visual presentation in real-time.
                Experiment without fear of breaking your actual projects.
              </p>
            </div>
          </div>
          
          <div className="bg-card border p-6 rounded-xl shadow-md mb-12">
            <h3 className="text-2xl font-bold mb-4">How to Use</h3>
            <ol className="space-y-4 text-muted-foreground">
              <li className="flex gap-3">
                <span className="bg-primary/20 text-primary font-medium h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0">1</span>
                <span><strong className="text-foreground">Modify Variables</strong>: Adjust colors, spacing, borders, and more using the control panel. See changes instantly in the preview area.</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-primary/20 text-primary font-medium h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0">2</span>
                <span><strong className="text-foreground">Try Different Themes</strong>: Switch between design styles like Glassmorphism, Neumorphism, and Modern UI to see different approaches.</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-primary/20 text-primary font-medium h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0">3</span>
                <span><strong className="text-foreground">Preview Your Changes</strong>: The preview panel shows your modifications in real-time on various UI elements.</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-primary/20 text-primary font-medium h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0">4</span>
                <span><strong className="text-foreground">Export Your CSS</strong>: Once you're happy with your design, export the generated CSS code for use in your projects.</span>
              </li>
            </ol>
          </div>
          
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-6">Ready to start designing?</h3>
            <Button size="lg" asChild className="rounded-full px-8 py-6 text-lg">
              <Link to="/">
                Go to CSS Playground
              </Link>
            </Button>
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

export default About;
