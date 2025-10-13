import { useState } from "react";
import { TopBar } from "@/components/Layout/TopBar";
import { Sidebar } from "@/components/Layout/Sidebar";
import { CarViewer } from "@/components/3D/CarViewer";
import { LoginModal } from "@/components/UI/LoginModal";
import { motion } from "framer-motion";

const Index = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [selectedPart, setSelectedPart] = useState<{
    category: string;
    part: string;
  } | null>(null);

  const handleHomeClick = () => {
    setSelectedPart(null);
    console.log("Home clicked - reset camera");
  };

  const handlePartSelect = (categoryId: string, partName: string) => {
    setSelectedPart({ category: categoryId, part: partName });
    console.log("Selected:", categoryId, partName);
  };

  return (
    <div className="min-h-screen w-full overflow-hidden">
      <TopBar onHomeClick={handleHomeClick} onLoginClick={() => setLoginModalOpen(true)} />
      
      <div className="flex pt-16 h-screen">
        <Sidebar onPartSelect={handlePartSelect} />
        
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex-1 ml-80"
        >
          <CarViewer selectedPart={selectedPart} />
        </motion.main>
      </div>

      <LoginModal open={loginModalOpen} onOpenChange={setLoginModalOpen} />
    </div>
  );
};

export default Index;
