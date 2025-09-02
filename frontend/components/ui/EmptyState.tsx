import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  FolderOpen, 
  FileText, 
  AlertTriangle, 
  Plus,
  type LucideIcon 
} from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: LucideIcon;
  };
  className?: string;
}

const defaultIcons: Record<string, LucideIcon> = {
  default: FolderOpen,
  documents: FileText,
  alerts: AlertTriangle,
};

export function EmptyState({ 
  icon, 
  title, 
  description, 
  action, 
  className 
}: EmptyStateProps) {
  const Icon = icon || defaultIcons.default;
  const ActionIcon = action?.icon || Plus;

  return (
    <div className={cn(
      "flex flex-col items-center justify-center py-12 px-4 text-center",
      className
    )}>
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <Icon className="h-6 w-6 text-muted-foreground" />
      </div>
      
      <h3 className="mt-4 text-lg font-semibold text-foreground">
        {title}
      </h3>
      
      {description && (
        <p className="mt-2 text-sm text-muted-foreground max-w-sm">
          {description}
        </p>
      )}
      
      {action && (
        <Button 
          onClick={action.onClick}
          className="mt-6"
          size="sm"
        >
          <ActionIcon className="mr-2 h-4 w-4" />
          {action.label}
        </Button>
      )}
    </div>
  );
}
