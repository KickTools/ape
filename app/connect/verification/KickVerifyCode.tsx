// app/connect/verification/KickVerifyCode.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@heroui/button";
import { useKickAuth } from "@/context/KickAuthContext";
import { KickLogoIcon } from "@/components/icons";
import KickWebSocket from '@/utils/kickWS';

const generateVerificationCode = (length = 20): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length }, () =>
    characters.charAt(Math.floor(Math.random() * characters.length))
  ).join('');
};

const KickVerifyCode: React.FC = () => {
  const { senderId, setPage } = useKickAuth();
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isInitialized = useRef(false); // Track initialization

  useEffect(() => {
    if (isInitialized.current || !senderId) return; // Skip if already initialized or chatroomId is null
    isInitialized.current = true;

    console.log('KickVerifyCode mounted with chatroomId:', senderId);
    
    const code = generateVerificationCode();
    console.log('Generated verification code:', code);
    setVerificationCode(code);
    setIsLoading(false);

    console.log('Starting WebSocket connection...');
    const ws = new KickWebSocket(
      "18517945",
      code,
      senderId, // Replace with the expected sender ID
      () => {
        console.log('✅ Verification successful!');
        setIsVerified(true);
        setPage('complete');
      }
    );

    return () => {
      console.log('Cleaning up WebSocket connection...');
      ws.close();
    };
  }, [senderId, setPage]);

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-bold mb-4">Verify Your Kick Account</h2>

      {isLoading ? (
        <div className="text-center">
          <div className="animate-spin w-6 h-6 border-2 border-kick border-t-transparent rounded-full mx-auto" />
          <p className="mt-2">Generating verification code...</p>
        </div>
      ) : (
        <>
          <div className="bg-default-100 p-4 rounded-lg">
            <p className="text-lg mb-2">Your verification code:</p>
            <code className="block text-xl font-mono bg-default-200 p-2 rounded">
              {verificationCode}
            </code>
          </div>

          <div className="space-y-4">
            <p>
              Please type this code in the{' '}
              <a
                href="https://kick.com/kicktools"
                target="_blank"
                rel="noopener noreferrer"
                className="text-kick hover:underline"
              >
                KickTools channel chat
              </a>
              {' '}to verify your account.
            </p>

            <Button
              size="lg"
              color={isVerified ? "success" : "default"}
              isDisabled={!isVerified}
              className="w-full"
              startContent={<KickLogoIcon />}
              onPress={() => setPage('complete')}
            >
              {isVerified ? "Verified! Continue" : "Waiting for verification..."}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default KickVerifyCode;
