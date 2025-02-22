"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Card, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";
import { useAuth } from "@/context/AuthContext";
import { fetchFormData, submitFormData } from "@/utils/formApi";
import { useFormData, FormDataProvider } from "@/context/FormDataContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ViewerSettings } from "@/types/viewerFormData";
import { FormState } from "@/types/viewerFormData";

const SettingsForm: React.FC = () => {
    const { kickProfile, twitchProfile } = useAuth();
    const { formData, setFormData } = useFormData();
    const [formState, setFormState] = useState<FormState | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const kickUsername = kickProfile?.username || "NA";
    const twitchUsername = twitchProfile?.display_name || "NA";
    const kickPFP = kickProfile?.profile_pic || "https://i.pravatar.cc/150";

    useEffect(() => {
        if (twitchProfile?.user_id) {
            setIsLoading(true);
            setFormState(null);
            
            fetchFormData(twitchProfile.user_id)
                .then((data: ViewerSettings) => {
                    console.log('Fetched form data:', data); // Add this for debugging
                    setFormData({
                        bitcoinAddress: data.bitcoinAddress,
                        contactAddress: data.contactAddress
                    });
                })
                .catch((error: Error) => {
                    console.error("Error fetching form data:", error);
                    setFormState({
                        message: error.message || 'Failed to load your settings',
                        type: 'error'
                    });
                    // Don't reset form data on error
                })
                .finally(() => setIsLoading(false));
        }
    }, [twitchProfile?.user_id, setFormData]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormState(null);
        setIsLoading(true);
        
        const formValues = new FormData(e.currentTarget);
        const bitcoinAddress = formValues.get('bitcoinAddress') as string;
        const contactAddress = formValues.get('contactMethod') as string;
    
        try {
            const response = await submitFormData(
                twitchProfile?.user_id || '',
                bitcoinAddress,
                contactAddress
            );
    
            // Check if the response contains an error
            if (response.error) {
                setFormState({
                    message: response.error.message,
                    type: 'error'
                });
                return;
            }
    
            // Success case
            setFormState({
                message: response.message || 'Settings saved successfully!',
                type: 'success'
            });
            
            // Only update form data on success
            setFormData({
                bitcoinAddress,
                contactAddress
            });
        } catch (error) {
            setFormState({
                message: error instanceof Error ? error.message : 'An error occurred while saving your settings',
                type: 'error'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setFormState(null);
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
                    
                    {formState && (
                        <div className={`p-3 rounded-md ${
                            formState.type === 'success' 
                                ? 'bg-success-100 text-success-700' 
                                : 'bg-danger-100 text-danger-700'
                        }`}>
                            {formState.message}
                        </div>
                    )}
            
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
                            color={formState?.type === 'error' ? 'danger' : 'primary'}
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
                            color={formState?.type === 'error' ? 'danger' : 'primary'}
                            value={formData.bitcoinAddress}
                            onChange={(e) => setFormData(prev => ({
                                ...prev,
                                bitcoinAddress: e.target.value
                            }))}
                        />

                        <div className="flex gap-2">
                            <Button 
                                color={formState?.type === 'error' ? 'danger' : 'primary'} 
                                type="submit" 
                                variant="solid"
                                isLoading={isLoading}
                            >
                                Save
                            </Button>
                            <Button color="warning" type="reset" variant="solid">
                                Reset
                            </Button>
                        </div>
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