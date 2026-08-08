// "use client";

import { checkUser } from "@/lib/checkUser";
import { checkAndAllocateCredits } from "@/actions/credits";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Calendar, User, Stethoscope, ShieldCheck, CreditCard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = async () => {
  let user = await checkUser();
  if (user?.role === "PATIENT") {
    const updatedUser = await checkAndAllocateCredits(user);
    if (updatedUser) user = updatedUser;
  }

  return (
    <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-10 supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 shadow-lg shadow-blue-500/30 overflow-hidden transition-transform group-hover:scale-105">
            <div className="absolute inset-0 bg-white/20 rounded-xl blur-sm" />
            <span className="relative z-10 text-2xl font-black text-white tracking-tighter drop-shadow-md">
              C
            </span>
            <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-cyan-100 animate-pulse" />
          </div>
          <span className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
            Care<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Connect</span>
          </span>
        </Link>
        <div className="flex items-center space-x-2">
          <SignedIn>
            <SignedIn>
              {user?.role === "ADMIN" && (
                <Link href="/admin">
                  <Button
                    variant="outline"
                    className="hidden md:inline-flex items-center gap-2"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    Admin Dashboard
                  </Button>

                  <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                    <ShieldCheck className="h-4 w-4" />
                  </Button>
                </Link>
              )}
            </SignedIn>
            {user?.role === "DOCTOR" && (
              <Link href="/doctor">
                <Button
                  variant="outline"
                  className="hidden md:inline-flex items-center gap-2"
                >
                  <Stethoscope className="h-4 w-4" />
                  Doctor Dashboard
                </Button>

                <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                  <Stethoscope className="h-4 w-4" />
                </Button>
              </Link>
            )}

            {user?.role === "PATIENT" && (
              <Link href="/appointment">
                <Button
                  variant="outline"
                  className="hidden md:inline-flex items-center gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  My Appointment
                </Button>

                <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                  <Calendar className="h-4 w-4" />
                </Button>
              </Link>
            )}
          </SignedIn>

          {(!user || user?.role === "PATIENT") && (
            <Link href="/pricing">
              <Badge
                variant="outline"
                className="h-9 bg-blue-900/20 border-blue-700/30 px-3 py-1 flex items-center gap-2"
              >
                <CreditCard className="h-3.5 w-3.5 text-blue-400" />

                <span className="text-blue-400">
                  {user && user?.role === "PATIENT" ? (
                    <>
                      {user.credits}{" "}
                      <span className="hidden md:inline">Credits</span>
                    </>
                  ) : (
                    <>Pricing</>
                  )}
                </span>
              </Badge>
            </Link>
          )}

          <SignedOut>
            <SignInButton>
              <Button variant="secondary">Sign In</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: "font-semibold",
                },
              }}
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;
