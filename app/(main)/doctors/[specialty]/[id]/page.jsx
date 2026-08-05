import { getAvailableTimeSlots, getDoctorById } from "@/actions/appointments";
import DoctorProfile from "./_components/doctor-profile";
import { redirect } from "next/navigation";
import React from "react";

const DoctorProfilePage = async ({ params }) => {
  const { id } = await params;

  let doctorData, slotsData;

  try {
    [doctorData, slotsData] = await Promise.all([
      getDoctorById(id),
      getAvailableTimeSlots(id),
    ]);
  } catch (error) {
    console.error("Error loading doctor profile:", error);
    redirect("/doctors");
  }

  return (
    <DoctorProfile
      doctor={doctorData?.doctor}
      availableDays={slotsData?.days || []}
    />
  );
};

export default DoctorProfilePage;