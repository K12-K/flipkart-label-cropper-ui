import { Tool } from '@/types/tool';

export const tools: Tool[] = [
  {
    slug: 'flipkart-label-crop',
    title: 'Flipkart Shipping Label Crop Tool',
    shortDescription: 'Automatically crop and extract Flipkart shipping labels from PDFs',
    longDescription: 'Upload your Flipkart shipping label PDF and let our AI-powered tool automatically detect, crop, and extract individual labels. Perfect for bulk processing and automation.',
    icon: 'Package',
    status: 'active',
    category: 'E-commerce',
    features: [
      'Automatic SKU detection',
      'Bulk label processing',
      'High-quality output',
      'Instant results',
    ],
    acceptedFileTypes: ['.pdf'],
    maxFileSize: 10 * 1024 * 1024,
    seoSections: [
      {
        title: 'Flipkart Shipping Label Crop Tool',
        content: 'Our Flipkart Shipping Label Crop Tool is designed specifically for e-commerce sellers who need to process multiple shipping labels efficiently. Simply upload your PDF containing Flipkart labels, and our tool will automatically detect, crop, and extract each label individually.',
      },
      {
        title: 'Quick Flipkart Shipping Label Crop Tool',
        content: 'Save hours of manual work with our automated label cropping solution. Whether you have 10 or 1000 labels, our tool processes them all in seconds. Perfect for Flipkart sellers, fulfillment centers, and logistics companies.',
      },
      {
        title: 'How It Works',
        content: 'Upload your PDF file containing Flipkart shipping labels. Our intelligent algorithm detects label boundaries using SKU recognition and layout analysis. Each label is then cropped with precision and made available for download. No manual intervention required.',
      },
      {
        title: 'Privacy & Security',
        content: 'Your files are processed securely and deleted immediately after processing. We never store your shipping labels or any personal information. All processing happens in real-time with end-to-end encryption.',
      },
    ],
  },
  {
    slug: 'pdf-to-word',
    title: 'PDF to Word Converter',
    shortDescription: 'Convert PDF documents to editable Word files',
    longDescription: 'Transform your PDF documents into fully editable Microsoft Word files while preserving formatting, images, and layout.',
    icon: 'FileText',
    status: 'coming-soon',
    category: 'Document Conversion',
    features: [
      'Preserve formatting',
      'Extract images',
      'Maintain layout',
      'Fast conversion',
    ],
    acceptedFileTypes: ['.pdf'],
    maxFileSize: 20 * 1024 * 1024,
    seoSections: [
      {
        title: 'Convert PDF to Word',
        content: 'Convert any PDF file to an editable Word document in seconds. Our advanced conversion engine preserves formatting, fonts, images, and layout structure.',
      },
      {
        title: 'Works Anywhere',
        content: 'No software installation required. Convert your PDFs directly in your browser on any device - Windows, Mac, Linux, or mobile.',
      },
      {
        title: 'Privacy Guaranteed',
        content: 'Your documents are processed securely and deleted immediately after conversion. We respect your privacy and never access or store your files.',
      },
    ],
  },
  {
    slug: 'image-compressor',
    title: 'Image Compressor',
    shortDescription: 'Compress images without losing quality',
    longDescription: 'Reduce image file sizes by up to 80% while maintaining visual quality. Supports JPG, PNG, and WebP formats.',
    icon: 'Image',
    status: 'coming-soon',
    category: 'Image Tools',
    features: [
      'Lossless compression',
      'Batch processing',
      'Multiple formats',
      'Instant preview',
    ],
    acceptedFileTypes: ['.jpg', '.jpeg', '.png', '.webp'],
    maxFileSize: 15 * 1024 * 1024,
    seoSections: [
      {
        title: 'Smart Image Compression',
        content: 'Compress your images without sacrificing quality. Our intelligent algorithm analyzes each image and applies optimal compression settings.',
      },
      {
        title: 'Your Data, Our Priority',
        content: 'All image processing happens securely in the cloud with automatic deletion after download. Your images are never stored or accessed by third parties.',
      },
    ],
  },
  {
    slug: 'pdf-merger',
    title: 'PDF Merger',
    shortDescription: 'Combine multiple PDF files into one',
    longDescription: 'Merge multiple PDF documents into a single file. Arrange pages in any order and create professional combined documents.',
    icon: 'FilePlus',
    status: 'coming-soon',
    category: 'Document Tools',
    features: [
      'Merge multiple PDFs',
      'Arrange page order',
      'No file limits',
      'Fast processing',
    ],
    acceptedFileTypes: ['.pdf'],
    maxFileSize: 50 * 1024 * 1024,
    seoSections: [
      {
        title: 'Merge PDF Files Online',
        content: 'Combine multiple PDF documents into one file with ease. Perfect for creating reports, portfolios, and document collections.',
      },
    ],
  },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug);
}

export function getActiveTools(): Tool[] {
  return tools.filter((tool) => tool.status === 'active');
}

export function getToolsByCategory(category: string): Tool[] {
  return tools.filter((tool) => tool.category === category);
}
