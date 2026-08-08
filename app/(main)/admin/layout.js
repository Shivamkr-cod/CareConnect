import React from "react";
import { redirect } from "next/navigation";
import { ShieldCheck, ArrowLeft, Info, Users } from "lucide-react";
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


      <PageHeader icon={<ShieldCheck />} title="Admin Settings" />

      <Tabs
        defaultValue="pending"
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
        orientation="vertical"
      >
        <TabsList className="md:col-span-1 flex flex-col w-full h-auto p-2 bg-muted/30 border rounded-md gap-2">
          <TabsTrigger value="pending" className="flex-1 justify-start px-4 py-3 w-full"> 
            <Info className="h-4 w-4 mr-2 inline-block" />
            <span>Pending Verification</span>
          </TabsTrigger>

          <TabsTrigger value="doctors" className="flex-1 justify-start px-4 py-3 w-full">
            <Users className="h-4 w-4 mr-2 inline-block" />
            <span>Doctors</span>
          </TabsTrigger>
        </TabsList>

        <div className="md:col-span-3">
          {children}
        </div>
      </Tabs>
    </div>
  );
};

export default AdminLayout;
