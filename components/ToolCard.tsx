'use client';

import Link from 'next/link';
import * as Icons from 'lucide-react';
import { Tool } from '@/types/tool';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  const IconComponent = Icons[tool.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50">
      <CardHeader>
        <div className="flex items-start justify-between mb-3">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            {IconComponent && <IconComponent className="w-6 h-6 text-primary" />}
          </div>

          {tool.status === 'coming-soon' && (
            <Badge variant="secondary" className="text-xs">
              Coming Soon
            </Badge>
          )}
        </div>

        <CardTitle className="text-xl">{tool.title}</CardTitle>
        <CardDescription>{tool.shortDescription}</CardDescription>
      </CardHeader>

      <CardContent>
        <ul className="space-y-2 mb-6">
          {tool.features.slice(0, 3).map((feature, index) => (
            <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              {feature}
            </li>
          ))}
        </ul>

        {tool.status === 'active' ? (
          <Link href={`/tools/${tool.slug}`}>
            <Button className="w-full group">
              Try Now
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        ) : (
          <Button disabled className="w-full">
            Coming Soon
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
