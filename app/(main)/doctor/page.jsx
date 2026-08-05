import React from "react";
import Link from "next/link";
import { ArrowLeft, Stethoscope, Calendar, Clock } from "lucide-react";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { getDoctorAvailability } from "@/actions/doctor";
import { getCurrentUser } from "@/actions/onboarding";
import AvailabilitySettings from "./_components/availability-settings";

const DoctorDashboard = async () => {
  const user = await getCurrentUser();
  const availabilityData = await getDoctorAvailability();

  if (user?.role !== "DOCTOR") {
    redirect("/onboarding");
  }

  // If not verified, redirect to verification
  if (user?.verificationStatus !== "VERIFIED") {
    redirect("/doctor/verification");
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Back to Home Button */}
      <div className="flex justify-start mb-6">
        <Link href="/">
          <Button variant="outline" size="sm" className="border-emerald-900/30 bg-background text-emerald-400 hover:bg-emerald-900/20 hover:text-emerald-300">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>

      {/* Page Header */}
      <div className="flex items-center gap-3 mb-10">
        <Stethoscope className="h-12 w-12 text-emerald-400" />
        <h1 className="text-4xl md:text-5xl font-bold gradient-title">
          Doctor Dashboard
        </h1>
      </div>

      {/* Main Content Area with Vertical Tabs */}
      <Tabs
        defaultValue="appointments"
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
        orientation="vertical"
      >
        <TabsList className="md:col-span-1 flex flex-col w-full h-auto p-2 bg-muted/20 border-none rounded-md gap-2 justify-start items-start">
          <TabsTrigger 
            value="appointments" 
            className="flex-1 justify-start px-4 py-3 w-full data-[state=active]:bg-muted data-[state=active]:text-white text-muted-foreground"
          >
            <Calendar className="h-4 w-4 mr-3" />
            Appointments
          </TabsTrigger>

          <TabsTrigger
            value="availability"
            className="flex-1 md:flex md:items-center md:justify-start md:px-4 md:py-3 w-full"
          >
            <Clock className="h-4 w-4 mr-2 hidden md:inline" />
            <span>Availability</span>
          </TabsTrigger>
        </TabsList>

        <div className="md:col-span-3">
          <TabsContent value="appointments" className="border-none p-0">
            <div>Todo</div>
          </TabsContent>

          <TabsContent value="availability" className="border-none p-0">
            <AvailabilitySettings slots={availabilityData.slots || []} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default DoctorDashboard;