import { motion } from "framer-motion";
import { X, ShoppingCart, Package } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PartDetail } from "@/data/partsData";
import { useToast } from "@/hooks/use-toast";

interface PartDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  part: PartDetail | null;
}

export const PartDetailsModal = ({ open, onOpenChange, part }: PartDetailsModalProps) => {
  const { toast } = useToast();

  if (!part) return null;

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${part.name} has been added to your cart.`,
    });
    onOpenChange(false);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("kk-KZ", {
      style: "currency",
      currency: "KZT",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] glass-panel border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gradient-primary flex items-center gap-2">
            <Package className="w-6 h-6 text-primary" />
            {part.name}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Part Category: <span className="capitalize font-medium text-foreground">{part.category}</span>
          </DialogDescription>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Image Placeholder */}
          <div className="w-full h-48 rounded-lg bg-secondary/30 flex items-center justify-center border border-border">
            {part.image ? (
              <img
                src={part.image}
                alt={part.name}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="text-center">
                <Package className="w-16 h-16 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Image placeholder</p>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Description</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {part.description}
            </p>
          </div>

          {/* Price */}
          <div className="p-4 rounded-lg bg-secondary/50 border border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Market Price</span>
              <span className="text-2xl font-bold text-primary">
                {formatPrice(part.priceKZT)}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleAddToCart}
              className="flex-1 gap-2"
              size="lg"
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </Button>
            <Button
              onClick={() => onOpenChange(false)}
              variant="outline"
              size="lg"
              className="gap-2"
            >
              <X className="w-4 h-4" />
              Close
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};
