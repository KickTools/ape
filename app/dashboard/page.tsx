// app/dashboard/page.tsx
"use client";

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";

export default function Dashboard() {
  const { twitchProfile, kickProfile } = useAuth();
  console.log('Twitch Profile:', twitchProfile);
  console.log('Kick Profile:', kickProfile);

  return (
    <ProtectedRoute>
      <div className="flex flex-col flex-grow gap-12 mt-20 items-center">
        <h1 className="text-3xl font-bold">
          Welcome to the Ape Gang, {twitchProfile?.display_name}
        </h1>
        <div className="flex gap-12">
          {twitchProfile && (
            <Card isBlurred isFooterBlurred shadow="sm" className="w-96 p-2 bg-background/60 dark:bg-foreground-foreground/30 border-none relative">
              <Image
                removeWrapper
                alt="Twitch Profile Background"
                className="z-0 w-full h-full object-cover absolute top-0 left-0"
                src={twitchProfile.profile_image_url}
                style={{ filter: 'blur(30px) opacity(.25)' }}
              />
              <CardHeader className="flex flex-col gap-2 absolute z-10 top-1">

              </CardHeader>
              <CardBody className="flex flex-col items-center gap-4 relative z-10">
                <h2 className="text-twitch text-xl font-bold">Twitch Account</h2>
                <p className="text-sm text-twitch-300">Primary Account</p>
                <img
                  src={twitchProfile.profile_image_url}
                  alt="Twitch Profile"
                  width="150"
                  height="150"
                  className="rounded-full"
                />
                <div className="flex flex-col items-center gap-2">
                  <p className="font-semibold">{twitchProfile.display_name}</p>
                  <p className="text-twitch-300 font-semibold">@{twitchProfile.login}</p>
                  {twitchProfile.description && (
                    <p className="text-center px-4">
                      {twitchProfile.description}
                    </p>
                  )}
                  <div className="text-sm text-twitch-300 text-center">
                    <p>Status: {twitchProfile.broadcaster_type || 'User'}</p>
                    <p>Followers: {twitchProfile.followers_count || "NA"}</p>
                    <p>Account Created: {new Date(twitchProfile.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </CardBody>
              <CardFooter className="flex justify-center relative z-10">
                <a
                  href={`https://twitch.tv/${twitchProfile.login}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-twitch hover:text-twitch-400"
                >
                  View Channel
                </a>
              </CardFooter>
            </Card>
          )}

          {kickProfile && (
            <Card isFooterBlurred className="w-96 p-2 bg-background/60 dark:bg-foreground-foreground/30 relative">
              <Image
                removeWrapper
                alt="Kick Profile Background"
                className="z-0 w-full h-full object-cover absolute top-0 left-0"
                src={kickProfile.profile_pic}
                style={{ filter: 'blur(30px) opacity(.25)' }}
              />
              <CardHeader className="flex flex-col gap-2 absolute z-10 top-1">

              </CardHeader>
              <CardBody className="flex flex-col items-center gap-4 relative z-10">
                <h2 className="text-kick text-xl font-bold">Kick Account</h2>
                <p className="text-sm text-kick-300">Connected Account</p>
                <img
                  src={kickProfile.profile_pic}
                  alt="Kick Profile"
                  width="150"
                  height="150"
                  className="rounded-full"
                />
                <div className="flex flex-col items-center gap-2">
                  <p className="font-semibold">{kickProfile.username}</p>
                  <p className="text-kick-300 font-semibold">@{kickProfile.username}</p>
                  {kickProfile.bio && (
                    <p className="text-center px-4">
                      {kickProfile.bio}
                    </p>
                  )}
                  <div className="text-sm text-kick-300 text-center">
                    <p>
                      Status:{' '}
                      {kickProfile.is_affiliate
                        ? 'Affiliate'
                        : kickProfile.is_verified
                          ? 'Verified'
                          : 'User'}
                    </p>
                    <p>Followers: {kickProfile.followers_count}</p>
                    <p>Account Created: {new Date(kickProfile.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </CardBody>
              <CardFooter className="flex justify-center relative z-10">
                <a
                  href={`https://kick.com/${kickProfile.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-kick hover:text-kick-400"
                >
                  View Channel
                </a>
              </CardFooter>
            </Card>
          )}

        </div>
      </div>
    </ProtectedRoute>
  );
}