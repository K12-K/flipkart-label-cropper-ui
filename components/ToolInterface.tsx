'use client';

import { useRef, useState } from 'react';
import { ProcessingJob, Tool } from '@/types/tool';
import { FileUpload } from '@/components/FileUpload';
import { ProgressBar } from '@/components/ProgressBar';
import { Button } from '@/components/ui/button';
import { Download, RotateCcw } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ToolInterfaceProps {
  tool: Tool;
}

export function ToolInterface({ tool }: ToolInterfaceProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedPageType, setSelectedPageType] = useState<'label' | 'a4-4'>('label');
  const [job, setJob] = useState<ProcessingJob | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setJob(null);
  };

  // 🚀 MAIN FUNCTION
  const startProcessing = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);

    try {
      // 1️⃣ Upload file
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('type', selectedPageType);
      // formData.append('type', tool.slug); // tool type // optional

      const res = await fetch('https://flipkart-label-cropper-production.up.railway.app/api/process', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      const jobId = data.jobId;

      setJob({
        jobId,
        status: 'uploading',
        progress: 10,
      });

      // 2️⃣ Start polling
      startPolling(jobId);

    } catch (err) {
      console.error(err);
      setIsProcessing(false);
    }
  };

  // 🔁 POLLING FUNCTION
  const startPolling = (jobId: string) => {
    pollingRef.current = setInterval(async () => {
      try {
        const res = await fetch(
          `https://flipkart-label-cropper-production.up.railway.app/api/status/${jobId}`
        );
        const data = await res.json();

        const progress = data.progress || data.progess || 0;

        setJob((prev) => prev
          ? {
            ...prev,
            status: data?.status === 'active' ? 'processing' : data.status,
            progress,
            downloadUrl: data?.result?.url,
          }
          : null
        );

        // ✅ Stop polling when done
        if (data.status === 'completed' || data.status === 'failed') {
          if (pollingRef.current) clearInterval(pollingRef.current);
          setIsProcessing(false);
        }

      } catch (err) {
        console.error(err);
      }
    }, 2000); // every 2 sec
  };

  const handleReset = () => {
    setSelectedFile(null);
    setJob(null);
    setIsProcessing(false);

    if (pollingRef.current) clearInterval(pollingRef.current);
  };

  const handleDownload = () => {
    if (job?.downloadUrl) {
      window.open(job.downloadUrl, '_blank');
    }
  };

  return (
    <div className="space-y-8">
      {!job && (
        <div className="space-y-6">
          <FileUpload
            acceptedFileTypes={tool.acceptedFileTypes}
            maxFileSize={tool.maxFileSize}
            onFileSelect={handleFileSelect}
            disabled={isProcessing}
          />

          {selectedFile && (
            <>
              <div className="flex justify-center">
                <div className="flex gap-2 bg-muted p-1 rounded-lg">
                  <button
                    onClick={() => setSelectedPageType('label')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition ${selectedPageType === 'label'
                      ? 'bg-white shadow text-black'
                      : 'text-muted-foreground'
                      }`}
                  >
                    Label
                  </button>

                  <button
                    onClick={() => setSelectedPageType('a4-4')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition ${selectedPageType === 'a4-4'
                      ? 'bg-white shadow text-black'
                      : 'text-muted-foreground'
                      }`}
                  >
                    A4
                  </button>
                </div>
              </div>
              <div className="flex justify-center">
                <Button
                  size="lg"
                  onClick={startProcessing}
                  disabled={isProcessing}
                  className="px-12"
                >
                  Start Processing
                </Button>
              </div>
            </>
          )}
        </div>
      )}

      {job && job.status !== 'completed' && (
        <div className="space-y-6">
          <ProgressBar
            progress={job.progress}
            status={job.status}
          />

          <Alert>
            <AlertDescription>
              Please wait while we process your file. This may take a few moments depending on file size.
            </AlertDescription>
          </Alert>
        </div>
      )}

      {job && job.status === 'completed' && (
        <div className="space-y-6">
          <ProgressBar
            progress={job.progress}
            status={job.status}
            statusMessage="Your file is ready!"
          />

          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
              Processing Complete
            </h3>
            <p className="text-sm text-green-700 dark:text-green-300 mb-4">
              Your file has been processed successfully. Download it now or process another file.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                onClick={handleDownload}
                className="flex-1"
              >
                <Download className="mr-2 w-5 h-5" />
                Download File
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={handleReset}
                className="flex-1"
              >
                <RotateCcw className="mr-2 w-5 h-5" />
                Process Another
              </Button>
            </div>
          </div>

          <Alert>
            <AlertDescription>
              Your file will be automatically deleted from our servers after 1 hour for security and privacy.
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
}
