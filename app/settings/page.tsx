// app/settings/page.tsx
"use client";

// Dependencies
import React, { useEffect, useState } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image"; // Assuming you have an Image component
import { useAuth } from "@/context/AuthContext";
import { fetchFormData, submitFormData } from "@/utils/api";
import { useFormData, FormDataProvider } from "@/context/FormDataContext";

const SettingsForm: React.FC = () => {
    const { isAuthenticated, kickUser, twitchUser } = useAuth();
    const { formData, setFormData } = useFormData();
    const [action, setAction] = useState<string | null>(null);

    const kickUsername = kickUser?.username || "NA";
    const twitchUsername = twitchUser?.display_name || "NA";
    const kickPFP = kickUser?.profile_pic || "https://i.pravatar.cc/150";

    useEffect(() => {
        if (twitchUser?.id) {
            fetchFormData(twitchUser.id)
                .then(data => setFormData(data))
                .catch(error => console.error("Error fetching form data:", error));
        }
    }, [twitchUser?.id]);

    console.log("Kick user", kickUser);
    console.log("Twitch user", twitchUser);

    if (!isAuthenticated) {
        // Redirect to login if not authenticated
        if (typeof window !== "undefined") {
            window.location.href = "/login";
        }
        return null;
    }

    return (
        <section className="flex flex-col flex-grow items-center gap-4 py-12 px-6 text-center">
            {/* Profile Picture */}
            <img
                src={kickPFP}
                alt="Profile Picture"
                className="w-48 h-48 rounded-full mb-4 border-4 border-primary p-2"
            />
            {/* Usernames */}
            <div className="text-center text-lg uppercase font-medium mb-4 space-y-1">
                <h2>Kick: <span className="text-kick">{kickUsername}</span></h2>
                <h2>Twitch: <span className="text-twitch">{twitchUsername}</span></h2>
            </div>

            {/* Settings Form */}
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
                        onReset={() => setAction("reset")}
                        onSubmit={async (e) => {
                            e.preventDefault();
                            const data = Object.fromEntries(new FormData(e.currentTarget) as unknown as Iterable<[string, string]>);
                            try {
                                const response = await submitFormData(twitchUser?.id as string, data.bitcoinAddress, data.contactMethod);
                                setAction(`Submitted: ${JSON.stringify(response)}`);
                            } catch (error) {
                                if (error instanceof Error) {
                                    setAction(`Error: ${error.message}`);
                                } else {
                                    setAction('An unknown error occurred');
                                }
                            }
                        }}
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
                            onChange={(e) => setFormData({ ...formData, contactAddress: e.target.value })}
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
                            onChange={(e) => setFormData({ ...formData, bitcoinAddress: e.target.value })}
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
    <FormDataProvider>
        <SettingsForm />
    </FormDataProvider>
);

export default SettingsPage;