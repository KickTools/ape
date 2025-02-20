// components/navbar.tsx
"use client";

import { memo, useEffect, useState } from "react";
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
  const { isAuthenticated, kickUser, loading, logout } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => { // Added handleLogout function
    await logout();
    router.push('/');
  };

  // Show minimal navbar during SSR or initial load
  if (!mounted || loading) {
    return (
      <HeroUINavbar maxWidth="xl" position="sticky" height="5rem" isBlurred={true} classNames={{
        base: [
          "bg-[#0e0e0e]/30", "shadow-lg"],
        wrapper: [
          "bg-transparent",]
      }}>
        <NavbarContent justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <Link className="flex justify-start items-center gap-2" href="/">
              <TrainwrecksTVLogo width={2.5} height={2.5} />
              <p className="font-bold text-warning uppercase">Ape Gang</p>
            </Link>
          </NavbarBrand>
        </NavbarContent>
      </HeroUINavbar>
    );
  }

  const baseNavbar = (
    <HeroUINavbar
      maxWidth="xl"
      position="sticky"
      height="5rem"
      classNames={{
        base: [
          "bg-[#0e0e0e]/30", "shadow-lg"],
        wrapper: [
          "bg-transparent",]
      }}
    >
      {/* Rest of your code stays exactly the same until the DropdownMenu */}
      <NavbarContent justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <Link className="flex justify-start items-center gap-2" href="/">
            <TrainwrecksTVLogo width={2.5} height={2.5} />
            <p className="font-bold text-warning uppercase">Ape Gang</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {loading ? null : (
        <>
          <NavbarContent justify="center" className="hidden sm:flex gap-4">
            {(isAuthenticated ?
              siteConfig.navItems.filter(item => item.showWhenAuthenticated) :
              siteConfig.navItems.filter(item => !item.showWhenAuthenticated)
            ).map((item) => (
              <NavbarItem key={item.label} data-active={pathname === item.href}>
                <Link
                  href={item.href}
                  color="warning"
                  size="lg"
                  className={pathname === item.href ? 'text-primary-400 font-bold' : 'font-bold'}
                >
                  <span>{item.label}</span>
                </Link>
              </NavbarItem>
            ))}
          </NavbarContent>

          <NavbarContent justify="end" className="hidden sm:flex">
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
                    <DropdownItem key="profile" className="h-14 gap-2" textValue="Profile">
                      <p className="font-semibold">Signed in as</p>
                      <p className="font-semibold">{kickUser?.username || "User"}</p>
                    </DropdownItem>
                    <DropdownItem key="settings" color="warning" onPress={() => router.push("/settings")} textValue="Settings">
                      Settings
                    </DropdownItem>
                    <DropdownItem key="logout" color="warning" onPress={handleLogout} textValue="Logout">
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

          <NavbarContent justify="end" className="sm:hidden basis-1 pl-4">
            <NavbarMenuToggle />
          </NavbarContent>

          <NavbarMenu>
            <div className="mx-4 mt-2 flex flex-col gap-2">
              {(isAuthenticated ?
                siteConfig.navMenuItems.filter(item => item.showWhenAuthenticated) :
                siteConfig.navMenuItems.filter(item => !item.showWhenAuthenticated)
              ).map((item, index) => (
                <NavbarMenuItem key={`${item}-${index}`}>
                  <Link
                    color={
                      index === 2
                        ? "primary"
                        : index === siteConfig.navMenuItems.length - 1
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
        </>
      )}
    </HeroUINavbar>
  );

  return baseNavbar;
});

Navbar.displayName = 'Navbar';