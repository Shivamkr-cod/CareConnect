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
        <Link href="/" className="flex items-center gap-3 group">
          {/* Professional Tech-Health "C" SVG Logo */}
          <svg 
            width="38" 
            height="38" 
            viewBox="0 0 40 40" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className="transition-transform group-hover:scale-105 duration-300 drop-shadow-sm"
          >
            <path 
              d="M28 12C26.5 9 23.5 7 20 7C12.8 7 7 12.8 7 20C7 27.2 12.8 33 20 33C23.5 33 26.5 31 28 28" 
              stroke="url(#paint0_linear)" 
              strokeWidth="5.5" 
              strokeLinecap="round"
            />
            <circle cx="28" cy="20" r="4.5" fill="#22d3ee" className="animate-pulse" />
            <defs>
              <linearGradient id="paint0_linear" x1="7" y1="7" x2="28" y2="33" gradientUnits="userSpaceOnUse">
                <stop stopColor="#0d9488"/>
                <stop offset="1" stopColor="#0891b2"/>
              </linearGradient>
            </defs>
          </svg>
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
                className="h-9 bg-teal-900/20 border-teal-700/30 px-3 py-1 flex items-center gap-2"
              >
                <CreditCard className="h-3.5 w-3.5 text-teal-400" />

                <span className="text-teal-400">
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
