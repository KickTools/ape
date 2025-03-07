// src/components/admin/giveaways/CoinFlipModal.jsx
"use client";

import { useState } from "react";
import { useToast } from "@/contexts/ToastContext";
import Button from "@/components/elements/Button";
import Icons from "@/assets/icons";

export default function CoinFlipModal({ onClose }) {
  const [isFlipping, setIsFlipping] = useState(false);
  const [coinClass, setCoinClass] = useState("");
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("Start coin flip");
  const toast = useToast();

  const flipCoin = () => {
    if (isFlipping) return;

    setIsFlipping(true);
    setCoinClass("");
    setResult(null);
    setMessage("Flipping..."); // Update message to "Flipping..."

    setTimeout(() => {
      const flipResult = Math.random() < 0.5 ? "Heads" : "Tails";
      setCoinClass(`flip-${flipResult.toLowerCase()}`);

      setTimeout(() => {
        setIsFlipping(false);
        setResult(flipResult);
        setMessage(null); // Clear the message, result will show
        toast.success(`It's ${flipResult}!`);
      }, 2900);
    }, 100);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Ape Coin Flip</h2>

      <div className="py-8 flex justify-center">
        <div
          className={`relative w-32 h-32 cursor-pointer transform-gpu ${coinClass} select-none`}
          style={{
            transformStyle: "preserve-3d",
            perspective: "1000px"
          }}
        >
          {/* Heads side */}
          <div
            className="absolute w-full h-full rounded-full bg-apeRed flex items-center justify-center"
            style={{
              backfaceVisibility: "hidden",
              boxShadow:
                "inset 0 0 45px rgba(255,255,255,0.3), 0 12px 20px -10px rgba(0,0,0,0.4)"
            }}
          >
            <span className="text-white text-7xl">
              <Icons.Ape size="8xl" />
            </span>
          </div>

          {/* Tails side */}
          <div
            className="absolute w-full h-full rounded-full bg-apeBlue flex items-center justify-center"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              boxShadow:
                "inset 0 0 45px rgba(255,255,255,0.3), 0 12px 20px -10px rgba(0,0,0,0.4)"
            }}
          >
            <span className="text-white text-7xl">
              <Icons.BananaBunch size="7xl" />
            </span>
          </div>
        </div>
      </div>

      <div className="my-6 text-center" style={{ minHeight: "48px" }}>
        {message ? (
          <div className="text-2xl font-semibold text-foreground-700">
            {message}
          </div>
        ) : result ? (
          <div
            className={`text-2xl font-black tracking-wide ${
              result === "Heads" ? "text-apeRed" : "text-apeBlue"
            }`}
          >
            {result}!
          </div>
        ) : null}
      </div>

      <div className="flex gap-2 mt-4">
        <Button
          onClick={onClose}
          color="foreground-900"
          size="small"
          radius="md"
        >
          Close
        </Button>
        <Button
          onClick={flipCoin}
          color="apeRed"
          size="small"
          radius="md"
          disabled={isFlipping}
        >
          {isFlipping ? (
            <span className="flex items-center justify-center gap-2">
              <Icons.Coin size="md" />
              Flipping...
            </span>
          ) : (
            "Flip Coin"
          )}
        </Button>
      </div>
    </div>
  );
}
