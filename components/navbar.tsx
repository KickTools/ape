// components/navbar.tsx
"use client";

import { memo } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Avatar } from "@heroui/avatar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from "@heroui/dropdown";
import { usePathname } from 'next/navigation';

import { siteConfig } from "@/config/site";
import { TwitterIcon, DiscordIcon } from "@/components/icons";
import { TrainwrecksTVLogo } from "@/components/logo";

export const Navbar = memo(() => {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, twitchUser, kickUser, loading, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/'); // This will redirect to home page after logout
  };

  if (loading) {
    return (
      <HeroUINavbar maxWidth="xl" position="sticky" height="5rem" isBlurred={true}>
        <NavbarContent className="basis-1/5 sm:basis-full" justify="center">
          <NavbarItem>Loading...</NavbarItem>
        </NavbarContent>
      </HeroUINavbar>
    );
  }

  // Filter navItems and navMenuItems based on isAuthenticated
  const filteredNavItems = siteConfig.navItems.filter((item) =>
    isAuthenticated ? item.showWhenAuthenticated : !item.showWhenAuthenticated
  );

  const filteredNavMenuItems = siteConfig.navMenuItems.filter((item) =>
    isAuthenticated ? item.showWhenAuthenticated : !item.showWhenAuthenticated
  );

  return (
    <HeroUINavbar
      maxWidth="xl"
      position="sticky"
      height={"5rem"}
      isBlurred={true}
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
        ]
      }}
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <Link className="flex justify-start items-center gap-2" href="/">
            <TrainwrecksTVLogo width={2.5} height={2.5} />
            <p className="font-bold text-warning uppercase">Ape Gang</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {filteredNavItems.map((item) => (
          <NavbarItem key={item.label} data-active={pathname === item.href ? "true" : undefined}>
            <Link
              href={item.href}
              color="warning"
              size="lg"
              className={pathname === item.href ? 'text-primary-400 font-bold' : 'font-bold'}
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden md:flex gap-2 mr-2">
          <Link isExternal aria-label="Twitter" href={siteConfig.links.twitter}>
            <TwitterIcon className="text-warning" />
          </Link>
          <Link isExternal aria-label="Discord" href={siteConfig.links.discord}>
            <DiscordIcon className="text-warning" />
          </Link>
        </NavbarItem>
        {isAuthenticated ? (
          <NavbarItem className="hidden md:flex">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="primary"
                  name={kickUser?.username || "User"}
                  size="md"
                  src={kickUser?.profile_pic || "https://i.pravatar.cc/150"}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{kickUser?.username || "User"}</p>
                </DropdownItem>
                <DropdownItem key="settings" color="warning" onPress={() => window.location.href = "/settings"}>
                  Settings
                </DropdownItem>
                <DropdownItem key="logout" color="warning" onPress={handleLogout}>
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        ) : (
          <NavbarItem className="hidden sm:flex">
            <Button
              as={Link}
              color="primary"
              variant="shadow"
              href={siteConfig.links.login}
            >
              Login
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {filteredNavMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === filteredNavMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href={item.href}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
});