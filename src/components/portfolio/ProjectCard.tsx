import { ExternalLink } from "lucide-react";
import { LazyImage } from "./LazyImage";

interface ProjectCardProps {
  title: string;
  tag: string;
  thumbnail?: string;
  description: string;
  tools: string[];
  link?: string;
  onViewProject?: () => void;
}

export function ProjectCard({
  title,
  tag,
  thumbnail,
  description,
  tools,
  link,
  onViewProject,
}: ProjectCardProps) {
  return (
    <article className="group relative bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-black/20">
      {thumbnail && (
        <div className="relative aspect-[4/3] overflow-hidden bg-black/20">
          <LazyImage
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex-1 min-w-0">
            <span className="inline-block px-2.5 py-1 text-xs font-medium text-gray-400 bg-white/5 rounded-md mb-2">
              {tag}
            </span>
            <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2">
              {title}
            </h3>
          </div>
        </div>
        
        <p className="text-sm text-gray-400 mb-4 line-clamp-3 leading-relaxed">
          {description}
        </p>
        
        {tools.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tools.map((tool, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 text-xs text-gray-500 bg-white/5 rounded border border-white/5"
              >
                {tool}
              </span>
            ))}
          </div>
        )}
        
        {(link || onViewProject) && (
          <button
            onClick={onViewProject}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-white/10 hover:bg-white/15 border border-white/10 rounded-md transition-all duration-200 hover:border-white/20"
          >
            <span>View Project</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        )}
      </div>
    </article>
  );
}

