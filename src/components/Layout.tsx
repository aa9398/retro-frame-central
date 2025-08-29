import { Header } from "@/components/Header";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="border-t-2 border-pixel-border mt-16 py-8 bg-muted/20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-6 h-6 bg-primary rounded-sm flex items-center justify-center">
              <span className="text-primary-foreground font-pixel text-xs">C</span>
            </div>
            <span className="font-pixel text-sm text-primary tracking-wider">
              CINEHUB
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Your retro hub for movies and series
          </p>
        </div>
      </footer>
    </div>
  );
}