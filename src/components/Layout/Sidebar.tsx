import { motion } from "framer-motion";
import { useState } from "react";
import {
  Settings,
  Cog,
  Circle,
  Box,
  PaintBucket,
  Wind,
  Armchair,
  Zap,
  ChevronRight,
  Search,
  Disc,
  Youtube,
  Car,
  Eye,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PartCategory {
  id: string;
  name: string;
  icon: React.ElementType;
  parts: string[];
  kolesaLink: string;
  youtubeLink: string;
  is3DClickable?: boolean;
}

const categories: PartCategory[] = [
  {
    id: "3d-parts",
    name: "3D Clickable Parts",
    icon: Eye,
    parts: ["Front Windshield", "Side Mirror", "Left Body Panel Door"],
    kolesaLink: "https://kolesa.kz/zapchasti/prodazha/toyota/corolla/",
    youtubeLink: "https://www.youtube.com/watch?v=ZvpqZQMvdp0",
    is3DClickable: true,
  },
  {
    id: "engine",
    name: "Engine",
    icon: Cog,
    parts: ["Turbocharger", "Air Filter", "Exhaust System", "Fuel System"],
    kolesaLink: "https://kolesa.kz/a/show/181374114?search_id=3dc794718dbb8c1104f55f365555682d5209e38b&search_type=vip&advert_position=2",
    youtubeLink: "https://www.youtube.com/watch?v=4vZlf69OfXM",
  },
  {
    id: "transmission",
    name: "Transmission",
    icon: Settings,
    parts: ["Clutch Kit", "Gearbox", "Differential"],
    kolesaLink: "https://kolesa.kz/a/show/201653716?search_id=410070e0f963afbdbbbe50b959437332a289562a&search_type=vip&advert_position=1",
    youtubeLink: "https://www.youtube.com/watch?v=_z-_o5036qU",
  },
  {
    id: "wheels",
    name: "Wheels",
    icon: Circle,
    parts: ["Alloy Rims", "Performance Tires", "Brake System"],
    kolesaLink: "https://kolesa.kz/zapchasti/shiny/almaty/?_txt_=%D1%88%D0%B8%D0%BD%D1%8B+%D1%82%D0%BE%D0%B9%D0%BE%D1%82%D0%B0",
    youtubeLink: "https://www.youtube.com/watch?v=6hfHOzb7eYc",
  },
  {
    id: "suspension",
    name: "Suspension",
    icon: Box,
    parts: ["Coil Springs", "Shock Absorbers", "Anti-Roll Bars"],
    kolesaLink: "https://kolesa.kz/zapchasti/prodazha/toyota/camry/?_txt_=%D0%B0%D0%BC%D0%BE%D1%80%D1%82%D0%B8%D0%B7%D0%B0%D1%82%D0%BE%D1%80%D1%8B+%D0%BA%D0%B0%D0%BC%D1%80%D0%B8+40",
    youtubeLink: "https://www.youtube.com/watch?v=Drs3cAYQq-Q",
  },
  {
    id: "body",
    name: "Body",
    icon: Box,
    parts: ["Carbon Fiber Hood", "Sport Bumpers", "Side Skirts", "Rear Spoiler"],
    kolesaLink: "https://kolesa.kz/zapchasti/prodazha/toyota/caldina/?_txt_=%D0%B1%D0%B0%D0%BC%D0%BF%D0%B5%D1%80+%D1%82%D0%BE%D0%B9%D0%BE%D1%82%D0%B0",
    youtubeLink: "https://www.youtube.com/watch?v=ww3EZy6Rl5o",
  },
  {
    id: "paint",
    name: "Paint",
    icon: PaintBucket,
    parts: ["Base Color Paint", "Clear Coat Finish", "Custom Decals"],
    kolesaLink: "https://kuzovnoi-remont.kz/services/pokraska-avto/toyota/",
    youtubeLink: "https://www.youtube.com/watch?v=p2vM9qVJSns",
  },
  {
    id: "aero",
    name: "Aero",
    icon: Wind,
    parts: ["Front Splitter", "Rear Wing", "Rear Diffuser"],
    kolesaLink: "https://kolesa.kz/zapchasti/prodazha/toyota/yaris/?_txt_=%D0%BA%D0%BE%D0%BD%D0%B4%D0%B8%D1%86%D0%B8%D0%BE%D0%BD%D0%B5%D1%80",
    youtubeLink: "https://www.youtube.com/watch?v=-u6PpvoxkKg",
  },
  {
    id: "interior",
    name: "Interior",
    icon: Armchair,
    parts: ["Racing Seats", "Sport Steering Wheel", "Custom Dashboard"],
    kolesaLink: "https://kolesa.kz/zapchasti/prodazha/toyota/camry/?_txt_=%D1%81%D0%B8%D0%B4%D0%B5%D0%BD%D1%8C%D1%8F+toyota",
    youtubeLink: "https://www.youtube.com/watch?v=2MyKOWImBh4",
  },
  {
    id: "electronics",
    name: "Electronics",
    icon: Zap,
    parts: ["Performance ECU", "Performance Sensors", "LED Lighting Kit"],
    kolesaLink: "https://kolesa.kz/zapchasti/prodazha/toyota/?_txt_=%D0%BF%D0%B0%D1%80%D1%8B&find-in-text=0",
    youtubeLink: "https://www.youtube.com/watch?v=5rs2iYk0Rlw",
  },
  {
    id: "mirror",
    name: "Side Mirror",
    icon: Circle,
    parts: ["Left Mirror", "Right Mirror", "Mirror Glass"],
    kolesaLink: "https://kolesa.kz/zapchasti/prodazha/toyota/corolla/?_txt_=%D0%B7%D0%B5%D1%80%D0%BA%D0%B0%D0%BB%D0%BE",
    youtubeLink: "https://www.youtube.com/watch?v=ZvpqZQMvdp0",
  },
];

interface SidebarProps {
  onPartSelect: (categoryId: string, partName: string) => void;
  on3DPartSelect?: (partName: string) => void;
}

export const Sidebar = ({ onPartSelect, on3DPartSelect }: SidebarProps) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const handlePartClick = (category: PartCategory, part: string) => {
    if (category.is3DClickable && on3DPartSelect) {
      on3DPartSelect(part);
    } else {
      onPartSelect(category.id, part);
    }
  };

  const filteredCategories = categories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.parts.some((part) => part.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="fixed left-0 top-16 bottom-0 w-80 glass-panel border-r border-border overflow-hidden flex flex-col"
    >
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold mb-3 text-gradient-primary">Car Parts</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search parts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-secondary/50 border-border"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {filteredCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="mb-2"
            >
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/70 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center group-hover:bg-primary/20 group-hover:glow-primary transition-all">
                  <category.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="flex-1 text-left font-medium">{category.name}</span>
                <ChevronRight
                  className={`w-5 h-5 text-muted-foreground transition-transform ${
                    expandedCategory === category.id ? "rotate-90" : ""
                  }`}
                />
              </button>

              {expandedCategory === category.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="ml-10 mt-1 space-y-1 overflow-hidden"
                >
                  {category.is3DClickable && (
                    <p className="text-xs text-primary/70 px-4 py-1 italic">
                      Click to focus on 3D model
                    </p>
                  )}
                  {category.parts.map((part) => (
                    <button
                      key={part}
                      onClick={() => handlePartClick(category, part)}
                      className={`w-full text-left p-2 px-4 rounded-md text-sm text-muted-foreground hover:text-primary hover:bg-secondary/50 transition-all ${
                        category.is3DClickable ? "flex items-center gap-2" : ""
                      }`}
                    >
                      {category.is3DClickable && <Eye className="w-3 h-3" />}
                      {part}
                    </button>
                  ))}
                  
                  <TooltipProvider>
                    <div className="flex gap-2 mt-3 pt-2 border-t border-border/50">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a
                            href={category.kolesaLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 p-2 rounded-md text-xs font-medium bg-secondary/50 hover:bg-primary/20 hover:text-primary transition-all group"
                          >
                            <Disc className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                            Buy on Kolesa.kz
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Find authentic parts</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a
                            href={category.youtubeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 p-2 rounded-md text-xs font-medium bg-secondary/50 hover:bg-destructive/20 hover:text-destructive transition-all group"
                          >
                            <Youtube className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            Watch Tutorial
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Learn installation tips</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TooltipProvider>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </motion.aside>
  );
};
