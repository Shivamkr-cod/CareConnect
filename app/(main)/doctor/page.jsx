import React from "react";
import Link from "next/link";
import { ArrowLeft, Stethoscope, Calendar, Clock, DollarSign } from "lucide-react";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { getDoctorAvailability, getDoctorAppointments } from "@/actions/doctor";
import { getCurrentUser } from "@/actions/onboarding";
import { getDoctorEarnings, getDoctorPayouts } from "@/actions/payout";
import AvailabilitySettings from "./_components/availability-settings";
import DoctorAppointmentsList from "./_components/appointment-list";
import { DoctorEarnings } from "./_components/doctor-earning";

const DoctorDashboard = async () => {
  const user = await getCurrentUser();

  if (user?.role !== "DOCTOR") {
    redirect("/onboarding");
  }

  // If not verified, redirect to verification
  if (user?.verificationStatus !== "VERIFIED") {
    redirect("/doctor/verification");
  }

  const availabilityData = await getDoctorAvailability();
  const appointmentsData = await getDoctorAppointments();
  const { earnings } = await getDoctorEarnings();
  const { payouts } = await getDoctorPayouts();

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Back to Home Button */}
      <div className="flex justify-start mb-6">
        <Link href="/">
          <Button variant="outline" size="sm" className="border-blue-900/30 bg-background text-blue-400 hover:bg-blue-900/20 hover:text-blue-300">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>

      {/* Page Header */}
      <div className="flex items-center gap-3 mb-10">
        <Stethoscope className="h-12 w-12 text-blue-400" />
        <h1 className="text-4xl md:text-5xl font-bold gradient-title">
          Doctor Dashboard
        </h1>
      </div>

      {/* Main Content Area with Vertical Tabs */}
      <Tabs
        defaultValue="appointments"
        className="grid grid-cols-1 lg:grid-cols-4 gap-6"
        orientation="vertical"
      >
        <TabsList className="lg:col-span-1 flex flex-row lg:flex-col w-full h-auto p-2 bg-muted/20 border-none rounded-md gap-2 justify-start items-start overflow-x-auto">
          <TabsTrigger 
            value="appointments" 
            className="flex-1 justify-start px-4 py-3 w-full data-[state=active]:bg-muted data-[state=active]:text-white text-muted-foreground whitespace-nowrap"
          >
            <Calendar className="h-4 w-4 mr-3" />
            Appointments
          </TabsTrigger>

          <TabsTrigger
            value="availability"
            className="flex-1 justify-start px-4 py-3 w-full data-[state=active]:bg-muted data-[state=active]:text-white text-muted-foreground whitespace-nowrap"
          >
            <Clock className="h-4 w-4 mr-2 hidden md:inline" />
            <span>Availability</span>
          </TabsTrigger>

          <TabsTrigger
            value="earnings"
            className="flex-1 justify-start px-4 py-3 w-full data-[state=active]:bg-muted data-[state=active]:text-white text-muted-foreground whitespace-nowrap"
          >
            <DollarSign className="h-4 w-4 mr-2 hidden md:inline" />
            <span>Earnings</span>
          </TabsTrigger>
        </TabsList>

        <div className="lg:col-span-3">
          <TabsContent value="appointments" className="border-none p-0">
            <DoctorAppointmentsList appointments={appointmentsData || []}/>
          </TabsContent>

          <TabsContent value="availability" className="border-none p-0">
            <AvailabilitySettings slots={availabilityData.slots || []} />
          </TabsContent>

          <TabsContent value="earnings" className="border-none p-0">
            <DoctorEarnings earnings={earnings} payouts={payouts} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default DoctorDashboard;