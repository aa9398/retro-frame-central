interface StreamingBadgeProps {
  platform: string;
  className?: string;
}

const platformColors: Record<string, string> = {
  "Netflix": "bg-red-600 text-white",
  "Prime Video": "bg-blue-600 text-white", 
  "Disney+": "bg-blue-800 text-white",
  "HBO Max": "bg-purple-600 text-white",
  "Apple TV": "bg-gray-800 text-white",
  "Hulu": "bg-green-600 text-white"
};

export function StreamingBadge({ platform, className = "" }: StreamingBadgeProps) {
  const colorClass = platformColors[platform] || "bg-muted text-muted-foreground";
  
  return (
    <span className={`inline-block text-xs font-medium px-2 py-1 rounded-sm ${colorClass} ${className}`}>
      {platform}
    </span>
  );
}