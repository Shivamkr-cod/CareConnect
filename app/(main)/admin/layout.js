import React from "react";
import { redirect } from "next/navigation";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";

import PageHeader from "@/components/page-header";
import { verifyAdmin } from "@/actions/admin";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Admin Settings - MediMeet",
  description: "Manage doctors, patients, and platform settings",
};

const AdminLayout = async ({ children }) => {
  // Verify the user has admin access
  const isAdmin = await verifyAdmin();

  if (!isAdmin) {
    redirect("/onboarding");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Button variant="outline" asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>

      <PageHeader
        icon={<ShieldCheck />}
        title="Admin Settings"
      />

      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>

        {children}
      </Tabs>
    </div>
  );
};

export default AdminLayout;