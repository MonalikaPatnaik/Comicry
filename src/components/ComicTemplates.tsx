
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ComicTemplate, ComicPanelType } from "@/types/comic";

interface ComicTemplatesProps {
  templates: ComicTemplate[];
  onSelect: (panels: ComicPanelType[]) => void;
}

const ComicTemplates = ({ templates, onSelect }: ComicTemplatesProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template) => (
        <Card key={template.id} className="overflow-hidden border-2 hover:border-blue-600 transition-all">
          <div className="aspect-video relative overflow-hidden bg-gray-100">
            <img 
              src={template.previewImage} 
              alt={template.title}
              className="w-full h-full object-cover"
            />
          </div>
          <CardContent className="p-4">
            <h3 className="font-bold text-lg mb-2">{template.title}</h3>
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{template.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">{template.panels.length} panels</span>
              <Button 
                onClick={() => onSelect(template.panels)} 
                className="bg-blue-600 hover:bg-blue-700"
              >
                Use Template
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ComicTemplates;
