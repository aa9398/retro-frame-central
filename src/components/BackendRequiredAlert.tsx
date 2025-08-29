import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Database, CreditCard, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BackendRequiredAlertProps {
  feature: "authentication" | "payments" | "watchlist" | "purchases";
  onDismiss?: () => void;
}

export function BackendRequiredAlert({ feature, onDismiss }: BackendRequiredAlertProps) {
  const getFeatureDetails = () => {
    switch (feature) {
      case "authentication":
        return {
          title: "Authentication Required",
          description: "Login and registration features require Supabase authentication setup.",
          icon: <Database className="w-4 h-4" />
        };
      case "payments":
        return {
          title: "Payment Integration Required", 
          description: "Movie purchases require Stripe payment integration via Supabase Edge Functions.",
          icon: <CreditCard className="w-4 h-4" />
        };
      case "watchlist":
        return {
          title: "Database Required",
          description: "Watchlist functionality requires Supabase database to store user preferences.",
          icon: <Database className="w-4 h-4" />
        };
      case "purchases":
        return {
          title: "Backend Integration Required",
          description: "Purchase history requires both Supabase database and Stripe integration.",
          icon: <CreditCard className="w-4 h-4" />
        };
    }
  };

  const { title, description, icon } = getFeatureDetails();

  return (
    <Alert className="border-2 border-retro-blue bg-retro-blue/10">
      <AlertCircle className="w-4 h-4" />
      <AlertTitle className="font-pixel text-sm tracking-wider">
        {title.toUpperCase()}
      </AlertTitle>
      <AlertDescription className="mt-2 mb-4">
        {description}
      </AlertDescription>
      <div className="flex flex-col sm:flex-row gap-2">
        <Button variant="retro-blue" size="sm" asChild>
          <a 
            href="https://docs.lovable.dev/integrations/supabase/" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            {icon}
            <span className="ml-2">Setup Supabase</span>
          </a>
        </Button>
        {onDismiss && (
          <Button variant="outline" size="sm" onClick={onDismiss}>
            Dismiss
          </Button>
        )}
      </div>
    </Alert>
  );
}