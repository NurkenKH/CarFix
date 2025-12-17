import { useState } from "react";
import { TopBar } from "@/components/Layout/TopBar";
import { Sidebar } from "@/components/Layout/Sidebar";
import { CarViewer } from "@/components/3D/CarViewer";
import { LoginModal } from "@/components/UI/LoginModal";
import { PartDetailsModal } from "@/components/UI/PartDetailsModal";
import { AIAssistantModal } from "@/components/UI/AIAssistantModal";
import { motion } from "framer-motion";
import { getPartById, PartDetail } from "@/data/partsData";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";

const Index = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [partModalOpen, setPartModalOpen] = useState(false);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [selectedPart, setSelectedPart] = useState<PartDetail | null>(null);
  const [selected3DPart, setSelected3DPart] = useState<string | null>(null);

  const handleHomeClick = () => {
    setSelectedPart(null);
    setPartModalOpen(false);
    setSelected3DPart(null);
  };

  const handlePartSelect = (categoryId: string, partName: string) => {
    const part = getPartById(categoryId, partName);
    if (part) {
      setSelectedPart(part);
      setPartModalOpen(true);
    }
  };

  const handle3DPartSelect = (partName: string) => {
    setSelected3DPart(partName);
  };

  return (
    <div className="min-h-screen w-full overflow-hidden">
      <TopBar onHomeClick={handleHomeClick} onLoginClick={() => setLoginModalOpen(true)} />
      
      <div className="flex pt-16 h-screen">
        <Sidebar onPartSelect={handlePartSelect} on3DPartSelect={handle3DPartSelect} />
        
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex-1 ml-80"
        >
          <CarViewer selectedPartName={selected3DPart} />
        </motion.main>
      </div>

      <LoginModal open={loginModalOpen} onOpenChange={setLoginModalOpen} />
      <PartDetailsModal 
        open={partModalOpen} 
        onOpenChange={setPartModalOpen}
        part={selectedPart}
      />
      <AIAssistantModal 
        open={aiAssistantOpen} 
        onOpenChange={setAiAssistantOpen}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <Button
          onClick={() => setAiAssistantOpen(true)}
          size="lg"
          className="rounded-full w-16 h-16 shadow-lg glow-primary hover:glow-accent transition-all"
        >
          <Bot className="w-8 h-8" />
        </Button>
      </motion.div>
    </div>
  );
};

export default Index;
