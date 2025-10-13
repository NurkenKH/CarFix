import { Home, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface TopBarProps {
  onHomeClick: () => void;
  onLoginClick: () => void;
}

export const TopBar = ({ onHomeClick, onLoginClick }: TopBarProps) => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 h-16 glass-panel border-b border-border"
    >
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-primary">
            <span className="text-xl font-bold text-primary-foreground">C</span>
          </div>
          <h1 className="text-2xl font-bold text-gradient-primary">CarFix</h1>
        </div>

        <nav className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onHomeClick}
            className="text-foreground hover:text-primary hover:bg-secondary/50 transition-all"
          >
            <Home className="w-4 h-4 mr-2" />
            Home
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onLoginClick}
            className="text-foreground hover:text-primary hover:bg-secondary/50 transition-all"
          >
            <LogIn className="w-4 h-4 mr-2" />
            Login
          </Button>
        </nav>
      </div>
    </motion.header>
  );
};
