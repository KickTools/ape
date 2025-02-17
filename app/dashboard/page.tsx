// app/dashboard/page.tsx
"use client";

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { TwitchUserData } from '@/types/twitch';
import { KickUserData } from '@/types/kick';

export default function Dashboard() {
  const { twitchUser, kickUser } = useAuth();
  const twitchUserData = twitchUser as TwitchUserData;

  return (
    <ProtectedRoute>
      <div className="flex flex-col flex-grow gap-12 mt-20 items-center">
        <h1 className="text-3xl font-bold">
          Welcome to the Ape Gang, {twitchUserData?.display_name}
        </h1>
        <div className="flex gap-12">
          {twitchUserData && (
            <Card isBlurred isFooterBlurred shadow="sm" className="w-96 p-2 bg-background/60 dark:bg-foreground-foreground/30 border-none relative">
              <Image
                removeWrapper
                alt="Twitch Profile Background"
                className="z-0 w-full h-full object-cover absolute top-0 left-0"
                src={twitchUserData.profile_image_url}
                style={{ filter: 'blur(30px) opacity(.25)' }}
              />
              <CardHeader className="flex flex-col gap-2 absolute z-10 top-1">

              </CardHeader>
              <CardBody className="flex flex-col items-center gap-4 relative z-10">
                <h2 className="text-twitch text-xl font-bold">Twitch Account</h2>
                <p className="text-sm text-twitch-300">Primary Account</p>
                <img
                  src={twitchUserData.profile_image_url}
                  alt="Twitch Profile"
                  width="150"
                  height="150"
                  className="rounded-full"
                />
                <div className="flex flex-col items-center gap-2">
                  <p className="font-semibold">{twitchUserData.display_name}</p>
                  <p className="text-twitch-300 font-semibold">@{twitchUserData.login}</p>
                  {twitchUserData.description && (
                    <p className="text-center px-4">
                      {twitchUserData.description}
                    </p>
                  )}
                  <div className="text-sm text-twitch-300 text-center">
                    <p>Status: {twitchUserData.broadcaster_type || 'User'}</p>
                    <p>Followers: {twitchUserData.followers_count || "NA"}</p>
                    <p>Account Created: {new Date(twitchUserData.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </CardBody>
              <CardFooter className="flex justify-center relative z-10">
                <a
                  href={`https://twitch.tv/${twitchUserData.login}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-twitch hover:text-twitch-400"
                >
                  View Channel
                </a>
              </CardFooter>
            </Card>
          )}

          {kickUser && (
            <Card isFooterBlurred className="w-96 p-2 bg-background/60 dark:bg-foreground-foreground/30 relative">
              <Image
                removeWrapper
                alt="Kick Profile Background"
                className="z-0 w-full h-full object-cover absolute top-0 left-0"
                src={kickUser.profile_pic}
                style={{ filter: 'blur(30px) opacity(.25)' }}
              />
              <CardHeader className="flex flex-col gap-2 absolute z-10 top-1">

              </CardHeader>
              <CardBody className="flex flex-col items-center gap-4 relative z-10">
                <h2 className="text-kick text-xl font-bold">Kick Account</h2>
                <p className="text-sm text-kick-300">Connected Account</p>
                <img
                  src={kickUser.profile_pic}
                  alt="Kick Profile"
                  width="150"
                  height="150"
                  className="rounded-full"
                />
                <div className="flex flex-col items-center gap-2">
                  <p className="font-semibold">{kickUser.username}</p>
                  <p className="text-kick-300 font-semibold">@{kickUser.username}</p>
                  {kickUser.bio && (
                    <p className="text-center px-4">
                      {kickUser.bio}
                    </p>
                  )}
                  <div className="text-sm text-kick-300 text-center">
                    <p>
                      Status:{' '}
                      {kickUser.is_affiliate
                        ? 'Affiliate'
                        : kickUser.is_verified
                          ? 'Verified'
                          : 'User'}
                    </p>
                    <p>Followers: {kickUser.followers_count}</p>
                    <p>Account Created: {new Date(kickUser.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </CardBody>
              <CardFooter className="flex justify-center relative z-10">
                <a
                  href={`https://kick.com/${kickUser.username}`}
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