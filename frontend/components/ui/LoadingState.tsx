import { cn } from "@/lib/utils";
import { Loader2, type LucideIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface LoadingStateProps {
  icon?: LucideIcon;
  title?: string;
  description?: string;
  className?: string;
}

interface SkeletonRowProps {
  className?: string;
}

function SkeletonRow({ className }: SkeletonRowProps) {
  return (
    <div className={cn("flex items-center space-x-4", className)}>
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 flex-1" />
      <Skeleton className="h-4 w-20" />
    </div>
  );
}

export function LoadingState({ 
  icon = Loader2, 
  title = "Loading...", 
  description,
  className 
}: LoadingStateProps) {
  const Icon = icon;

  return (
    <div className={cn("flex flex-col items-center justify-center py-12 px-4 text-center", className)}>
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <Icon className="h-6 w-6 text-muted-foreground animate-spin" />
      </div>
      
      <h3 className="mt-4 text-lg font-semibold text-foreground">
        {title}
      </h3>
      
      {description && (
        <p className="mt-2 text-sm text-muted-foreground max-w-sm">
          {description}
        </p>
      )}
    </div>
  );
}

export function TableLoadingState({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {/* Header skeleton */}
      <div className="flex items-center space-x-4 p-4 border-b">
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 flex-1" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-16" />
      </div>
      
      {/* Row skeletons */}
      {Array.from({ length: rows }).map((_, index) => (
        <SkeletonRow key={index} className="p-4" />
      ))}
    </div>
  );
}

export function CardLoadingState({ cards = 3 }: { cards?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: cards }).map((_, index) => (
        <div key={index} className="space-y-3">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      ))}
    </div>
  );
}
