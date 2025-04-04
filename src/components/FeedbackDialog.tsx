
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check, MessageCircle, ThumbsUp, ThumbsDown } from "lucide-react";
import { toast } from "sonner";

interface FeedbackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  roomName: string;
}

const FeedbackDialog = ({ open, onOpenChange, roomName }: FeedbackDialogProps) => {
  const [rating, setRating] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    // In a real app, this would send the feedback to a database
    console.log("Feedback submitted:", { rating, comment, roomName });
    
    // Show success state
    setSubmitted(true);
    
    // Show toast notification
    toast.success("Thank you for your feedback!");
    
    // Reset and close after delay
    setTimeout(() => {
      setRating(null);
      setComment("");
      setSubmitted(false);
      onOpenChange(false);
    }, 2000);
  };

  const handleClose = () => {
    setRating(null);
    setComment("");
    setSubmitted(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {!submitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-center">How was your conversation?</DialogTitle>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <p className="text-sm text-center text-muted-foreground mb-4">
                Your feedback helps us improve our support chat rooms.
              </p>
              
              <RadioGroup 
                value={rating || ""} 
                onValueChange={setRating}
                className="flex justify-center gap-4"
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="bg-primary/10 hover:bg-primary/20 transition-colors p-3 rounded-full">
                    <RadioGroupItem value="positive" id="positive" className="sr-only" />
                    <Label htmlFor="positive" className="cursor-pointer">
                      <ThumbsUp className={`h-8 w-8 ${rating === "positive" ? "text-primary" : "text-muted-foreground"}`} />
                    </Label>
                  </div>
                  <span className="text-sm">Helpful</span>
                </div>
                
                <div className="flex flex-col items-center gap-2">
                  <div className="bg-primary/10 hover:bg-primary/20 transition-colors p-3 rounded-full">
                    <RadioGroupItem value="negative" id="negative" className="sr-only" />
                    <Label htmlFor="negative" className="cursor-pointer">
                      <ThumbsDown className={`h-8 w-8 ${rating === "negative" ? "text-primary" : "text-muted-foreground"}`} />
                    </Label>
                  </div>
                  <span className="text-sm">Not helpful</span>
                </div>
              </RadioGroup>
              
              <div className="space-y-2">
                <Label htmlFor="feedback-comment">Additional comments (optional)</Label>
                <Textarea 
                  id="feedback-comment"
                  placeholder="Share your thoughts about this chat room..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Skip
              </Button>
              <Button onClick={handleSubmit} disabled={!rating}>
                Submit Feedback
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div className="py-8 flex flex-col items-center justify-center">
            <div className="bg-green-100 rounded-full p-3 mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Thank you!</h3>
            <p className="text-center text-muted-foreground">
              Your feedback helps us improve our support community.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackDialog;
