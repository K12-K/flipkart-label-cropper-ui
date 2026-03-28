import { notFound } from 'next/navigation';
import { getToolBySlug } from '@/lib/tools-config';
import { ToolLayout } from '@/components/ToolLayout';
import { ToolInterface } from '@/components/ToolInterface';
import type { Metadata } from 'next';

interface ToolPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const tool = getToolBySlug(params.slug);

  if (!tool) {
    return {
      title: 'Tool Not Found',
    };
  }

  return {
    title: `${tool.title} | FileTools`,
    description: tool.shortDescription,
  };
}

export default function ToolPage({ params }: ToolPageProps) {
  const tool = getToolBySlug(params.slug);

  if (!tool) {
    notFound();
  }

  if (tool.status === 'coming-soon') {
    return (
      <ToolLayout tool={tool}>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
          <p className="text-muted-foreground">
            This tool is currently under development. Check back soon!
          </p>
        </div>
      </ToolLayout>
    );
  }

  return (
    <ToolLayout tool={tool}>
      <ToolInterface tool={tool} />
    </ToolLayout>
  );
}
