export interface Tool {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  icon: string;
  status: 'active' | 'coming-soon';
  category: string;
  features: string[];
  acceptedFileTypes: string[];
  maxFileSize: number;
  seoSections: SEOSection[];
}

export interface SEOSection {
  title: string;
  content: string;
}

export interface ProcessingJob {
  jobId: string;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
  downloadUrl?: string;
  error?: string;
}
