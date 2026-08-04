import { redirect } from "next/navigation";
import React from "react";

import { getDoctorAppointment, getDoctorAvailability } from "@/actions/doctor";
import { getCurrentUser } from "@/actions/onboarding";
import { Clock } from "lucide-react";

const DoctorDashboard = async () => {
  const user = await getCurrentUser();

  const [appointmentsData, availabilityData] = await Promise.all([
    getDoctorAppointment(),
    getDoctorAvailability(),
  ]);

  if (user?.role !== "DOCTOR") {
    redirect("/onboarding");
  }

  // If already verified, redirect to dashboard
  if (user?.verificationStatus !== "VERIFIED") {
    redirect("/doctor/verification");
  }

  return (
    <Tabs
      defaultValue="appointments"
      className="grid grid-cols-1 md:grid-cols-4 gap-6"
      orientation="vertical"
    >
      <TabsList className="md:col-span-1 flex flex-col w-full h-auto p-2 bg-muted/30 border rounded-md gap-2">
        <TabsTrigger
          value="appointments"
          className="flex-1 justify-start px-4 py-3 w-full"
        >
          <Calender className="h-4 w-4 mr-2 hidden md:inline" />
          <span>Appointments</span>
        </TabsTrigger>

        <TabsTrigger
          value="availability"
          className="flex-1 justify-start px-4 py-3 w-full"
        >
          <Clock className="h-4 w-4 mr-2 hidden md: inline" />
          <span>Availability</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="availability" className="border-none p-0">
        Todo
      </TabsContent>

      <TabsContent
        value="availability"
        className="border-none p-0"
      >availability</TabsContent>
    </Tabs>
  );
};

export default DoctorDashboard;
