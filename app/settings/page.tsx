// app/settings/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Card, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";
import { useAuth } from "@/context/AuthContext";
import { fetchFormData, submitFormData } from "@/utils/api";
import { useFormData, FormDataProvider } from "@/context/FormDataContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ViewerSettings } from "@/types/viewerFormData";

const SettingsForm: React.FC = () => {
    const { kickUser, twitchUser } = useAuth();
    const { formData, setFormData } = useFormData();
    const [action, setAction] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const kickUsername = kickUser?.username || "NA";
    const twitchUsername = twitchUser?.display_name || "NA";
    const kickPFP = kickUser?.profile_pic || "https://i.pravatar.cc/150";

    // Initialize with empty values
    useEffect(() => {
        setFormData({
            bitcoinAddress: '',
            contactAddress: ''
        });
    }, [setFormData]);

    useEffect(() => {
        if (twitchUser?.id) {
            setIsLoading(true);
            
            fetchFormData(twitchUser.id)
                .then((data: ViewerSettings) => {
                    setFormData({
                        bitcoinAddress: data.bitcoinAddress || '',
                        contactAddress: data.contactAddress || ''
                    });
                })
                .catch(error => {
                    console.error("Error fetching form data:", error);
                    setFormData({
                        bitcoinAddress: '',
                        contactAddress: ''
                    });
                })
                .finally(() => setIsLoading(false));
        }
    }, [twitchUser?.id, setFormData]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formValues = new FormData(e.currentTarget);
        
        try {
            const response = await submitFormData(
                twitchUser?.id || '',
                formValues.get('bitcoinAddress') as string,
                formValues.get('contactMethod') as string
            );
            setAction(`Submitted successfully`);
            
            // Update form data with new values
            setFormData({
                bitcoinAddress: formValues.get('bitcoinAddress') as string,
                contactAddress: formValues.get('contactMethod') as string
            });
        } catch (error) {
            setAction(error instanceof Error ? error.message : 'An unknown error occurred');
        }
    };

    const handleReset = () => {
        setAction("Form reset");
        setFormData({
            bitcoinAddress: '',
            contactAddress: ''
        });
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <section className="flex flex-col flex-grow items-center gap-4 py-12 px-6 text-center">
            <img
                src={kickPFP}
                alt="Profile Picture"
                className="w-48 h-48 rounded-full mb-4 border-4 border-primary p-2"
            />
            <div className="text-center text-lg uppercase font-medium mb-4 space-y-1">
                <h2>Kick: <span className="text-kick">{kickUsername}</span></h2>
                <h2>Twitch: <span className="text-twitch">{twitchUsername}</span></h2>
            </div>

            <Card isBlurred className="w-96 p-2 bg-background/60 dark:bg-foreground-foreground/30 border-none relative" shadow="sm">
                <Image
                    removeWrapper
                    alt="Form Background"
                    className="z-0 w-full h-full object-cover absolute top-0 left-0"
                    src="assets/images/bg-form-ape2.jpg"
                    style={{ filter: 'blur(30px) opacity(.25)' }}
                />
                <CardBody className="p-8 space-y-6 relative z-10">
                    <h1 className="text-lg font-bold tracking-tight text-left uppercase text-primary-600">Contact Info</h1>
                    <Form
                        className="w-full max-w-md flex flex-col gap-8"
                        validationBehavior="native"
                        onReset={handleReset}
                        onSubmit={handleSubmit}
                    >
                        <Input
                            isRequired
                            errorMessage="Please enter a valid contact method"
                            name="contactMethod"
                            placeholder="Preferred contact method"
                            type="text"
                            size="lg"
                            variant="underlined"
                            color="primary"
                            value={formData.contactAddress}
                            onChange={(e) => setFormData(prev => ({
                                ...prev,
                                contactAddress: e.target.value
                            }))}
                        />

                        <Input
                            isRequired
                            errorMessage="Please enter a valid Bitcoin address"
                            name="bitcoinAddress"
                            placeholder="Enter your Bitcoin address"
                            type="text"
                            size="lg"
                            variant="underlined"
                            color="primary"
                            value={formData.bitcoinAddress}
                            onChange={(e) => setFormData(prev => ({
                                ...prev,
                                bitcoinAddress: e.target.value
                            }))}
                        />

                        <div className="flex gap-2">
                            <Button color="primary" type="submit" variant="solid">
                                Save
                            </Button>
                            <Button color="warning" type="reset" variant="solid">
                                Reset
                            </Button>
                        </div>
                        {action && (
                            <div className="text-small text-default-500">
                                Action: <code>{action}</code>
                            </div>
                        )}
                    </Form>
                </CardBody>
            </Card>
        </section>
    );
};

const SettingsPage: React.FC = () => (
    <ProtectedRoute>
        <FormDataProvider>
            <SettingsForm />
        </FormDataProvider>
    </ProtectedRoute>
);

export default SettingsPage;