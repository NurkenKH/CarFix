import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Home, LogIn, LogOut, MapPin, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";

interface TopBarProps {
  onHomeClick: () => void;
  onLoginClick: () => void;
}

export const TopBar = ({ onHomeClick, onLoginClick }: TopBarProps) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<SupabaseUser | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

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

        <nav className="flex items-center gap-2">
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
            onClick={() => navigate("/map")}
            className="text-foreground hover:text-primary hover:bg-secondary/50 transition-all"
          >
            <MapPin className="w-4 h-4 mr-2" />
            Map
          </Button>

          {user ? (
            <>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/50 text-sm">
                <User className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground max-w-[120px] truncate">
                  {user.email}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/auth")}
              className="text-foreground hover:text-primary hover:bg-secondary/50 transition-all"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Login
            </Button>
          )}
        </nav>
      </div>
    </motion.header>
  );
};
