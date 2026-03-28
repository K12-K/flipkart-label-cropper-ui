import { Tool } from '@/types/tool';
import { Badge } from '@/components/ui/badge';
import * as Icons from 'lucide-react';

interface ToolLayoutProps {
  tool: Tool;
  children: React.ReactNode;
}

export function ToolLayout({ tool, children }: ToolLayoutProps) {
  const IconComponent = Icons[tool.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
              {IconComponent && <IconComponent className="w-8 h-8 text-primary" />}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">{tool.title}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {tool.longDescription}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              <Badge variant="secondary" className="text-sm">
                {tool.category}
              </Badge>
              {tool.features.slice(0, 3).map((feature, index) => (
                <Badge key={index} variant="outline" className="text-sm">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>

          <div className="bg-card border rounded-2xl shadow-xl p-8 md:p-12 mb-16">
            {children}
          </div>

          <div className="space-y-16">
            {tool.seoSections.map((section, index) => (
              <div key={index} className="max-w-3xl">
                <h2 className="text-3xl font-bold mb-4">{section.title}</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
