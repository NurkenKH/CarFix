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
}

const categories: PartCategory[] = [
  {
    id: "engine",
    name: "Engine",
    icon: Cog,
    parts: ["Turbocharger", "Air Filter", "Exhaust System", "Fuel System"],
  },
  {
    id: "transmission",
    name: "Transmission",
    icon: Settings,
    parts: ["Clutch Kit", "Gearbox", "Differential"],
  },
  {
    id: "wheels",
    name: "Wheels",
    icon: Circle,
    parts: ["Alloy Rims", "Performance Tires", "Brake System"],
  },
  {
    id: "suspension",
    name: "Suspension",
    icon: Box,
    parts: ["Coil Springs", "Shock Absorbers", "Anti-Roll Bars"],
  },
  {
    id: "body",
    name: "Body",
    icon: Box,
    parts: ["Carbon Fiber Hood", "Sport Bumpers", "Side Skirts", "Rear Spoiler"],
  },
  {
    id: "paint",
    name: "Paint",
    icon: PaintBucket,
    parts: ["Base Color Paint", "Clear Coat Finish", "Custom Decals"],
  },
  {
    id: "aero",
    name: "Aero",
    icon: Wind,
    parts: ["Front Splitter", "Rear Wing", "Rear Diffuser"],
  },
  {
    id: "interior",
    name: "Interior",
    icon: Armchair,
    parts: ["Racing Seats", "Sport Steering Wheel", "Custom Dashboard"],
  },
  {
    id: "electronics",
    name: "Electronics",
    icon: Zap,
    parts: ["Performance ECU", "Performance Sensors", "LED Lighting Kit"],
  },
];

interface SidebarProps {
  onPartSelect: (categoryId: string, partName: string) => void;
}

export const Sidebar = ({ onPartSelect }: SidebarProps) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
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
                  {category.parts.map((part) => (
                    <button
                      key={part}
                      onClick={() => onPartSelect(category.id, part)}
                      className="w-full text-left p-2 px-4 rounded-md text-sm text-muted-foreground hover:text-primary hover:bg-secondary/50 transition-all"
                    >
                      {part}
                    </button>
                  ))}
                  
                  <TooltipProvider>
                    <div className="flex gap-2 mt-3 pt-2 border-t border-border/50">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a
                            href="https://kolesa.kz"
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
                            href="https://youtube.com"
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
