"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useKickAuth } from "@/context/KickAuthContext";
import { useAuth } from "@/context/AuthContext";
import { saveUserData } from "@/utils/api";
import { ConnectedUserData } from '@/types/auth';


// components
import { Spinner } from "@heroui/spinner";
import { KickLogoIcon } from "@/components/icons";

const KickVerificationComplete = () => {
    const { kickData, twitchData } = useKickAuth();
    const { login } = useAuth();
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    useEffect(() => {
        const handleDataSave = async () => {
            if (!kickData || !twitchData) {
                setError("Missing required authentication data.");
                setIsProcessing(false);
                return;
            }

            try {
                const response = await saveUserData({ user: twitchData }, kickData);

                if (!response.success) {
                    throw new Error("Failed to save user data.");
                }

                const connectedUserData: ConnectedUserData = {
                  twitch: twitchData,
                  kick: kickData,
                  primaryPlatform: "twitch", // Or determine the primary platform dynamically
              };

                login(connectedUserData);

                setSuccess(true);
                setIsProcessing(false);
                router.push('/dashboard');
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unexpected error occurred.");
                }

                setIsProcessing(false);
            }
        };

        handleDataSave();
    }, [kickData, twitchData, login, router]);

    if (error) {
        return (
            <div className="flex flex-col items-center space-y-6 p-8">
                <KickLogoIcon className="w-16 h-16 text-kick" />
                <h2 className="text-2xl font-bold text-center text-red-500">
                    Verification Error
                </h2>
                <p className="text-center text-foreground">{error}</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center space-y-6 p-8">
            <KickLogoIcon className="w-16 h-16 text-kick" />
            <h2 className="text-2xl font-bold text-center">
                Verification Complete
            </h2>
            <p className="text-center text-foreground">
                Your Kick and Twitch accounts have been successfully connected.
            </p>
            {isProcessing && (
                <Spinner
                    color="warning"
                    size="lg"
                    label="Finalizing your connection..."
                    labelColor="warning"
                />
            )}
            {success && <p className="text-green-500">User data saved successfully!</p>}
        </div>
    );
};

export default KickVerificationComplete;