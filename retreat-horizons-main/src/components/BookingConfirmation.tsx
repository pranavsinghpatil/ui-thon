
import { useState, useEffect } from "react";
import { Check } from "lucide-react";

const createConfetti = () => {
  const confetti = [];
  const colors = ["#D4AF37", "#8B5523", "#D4A5A5", "#F5F1ED"];
  
  for (let i = 0; i < 50; i++) {
    confetti.push({
      left: `${Math.random() * 100}%`,
      top: "50%",
      backgroundColor: colors[Math.floor(Math.random() * colors.length)],
      transform: `rotate(${Math.random() * 360}deg)`,
      animationDelay: `${Math.random() * 0.5}s`,
      width: `${Math.random() * 8 + 4}px`,
      height: `${Math.random() * 8 + 4}px`,
    });
  }
  
  return confetti;
};

export const BookingConfirmation = ({ listingTitle }: { listingTitle: string }) => {
  const [confetti, setConfetti] = useState<any[]>([]);
  
  useEffect(() => {
    setConfetti(createConfetti());
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white rounded-xl p-6 shadow-xl w-full max-w-md text-center">
        <div className="mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-semibold mb-2">Booking Confirmed!</h3>
        <p className="text-muted-foreground mb-4">
          Your stay at <span className="font-semibold">{listingTitle}</span> has been booked successfully.
        </p>
        <p className="text-sm text-muted-foreground">
          Check your email for booking details.
        </p>
        
        {/* Confetti effect */}
        {confetti.map((piece, index) => (
          <div
            key={index}
            className="confetti-piece"
            style={{
              left: piece.left,
              top: piece.top,
              backgroundColor: piece.backgroundColor,
              transform: piece.transform,
              animationDelay: piece.animationDelay,
              width: piece.width,
              height: piece.height,
            }}
          />
        ))}
      </div>
    </div>
  );
};
