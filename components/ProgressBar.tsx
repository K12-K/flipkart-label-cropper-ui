'use client';

import { Progress } from '@/components/ui/progress';
import { CircleCheck as CheckCircle2, Loader as Loader2, Circle as XCircle } from 'lucide-react';

interface ProgressBarProps {
  progress: number;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  statusMessage?: string;
}

export function ProgressBar({ progress, status, statusMessage }: ProgressBarProps) {
  const getStatusIcon = () => {
    switch (status) {
      case 'uploading':
      case 'processing':
        return <Loader2 className="w-5 h-5 text-primary animate-spin" />;
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-destructive" />;
    }
  };

  const getStatusText = () => {
    if (statusMessage) return statusMessage;

    switch (status) {
      case 'uploading':
        return 'Uploading file...';
      case 'processing':
        return 'Processing your file...';
      case 'completed':
        return 'Processing complete!';
      case 'error':
        return 'An error occurred';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'error':
        return 'text-destructive';
      default:
        return 'text-foreground';
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-3">
        {getStatusIcon()}
        <div className="flex-1">
          <p className={`font-medium ${getStatusColor()}`}>
            {getStatusText()}
          </p>
          <p className="text-sm text-muted-foreground mt-0.5">
            {progress}% complete
          </p>
        </div>
      </div>

      <Progress value={progress} className="h-2" />
    </div>
  );
}
