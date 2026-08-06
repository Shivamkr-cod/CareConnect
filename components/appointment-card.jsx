"use client";

import React, { useState } from "react";
import { format } from "date-fns";

import {
  cancelAppointment,
  addAppointmentNotes,
  markAppointmentCompleted,
} from "@/actions/doctor";
import { generateVideoToken } from "@/actions/appointments";

import useFetch from "@/hooks/use-fetch";

import { User, Stethoscope, Calendar, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const AppointmentCard = ({ appointment, userRole }) => {
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState(null); // "cancel", "notes", "video", "complete"
  const [notes, setNotes] = useState(appointment.notes || "");

  const {
    loading: cancelLoading,
    fn: submitCancel,
    data: cancelData,
  } = useFetch(cancelAppointment);

  const {
    loading: notesLoading,
    fn: submitNotes,
    data: notesData,
  } = useFetch(addAppointmentNotes);

  const {
    loading: tokenLoading,
    fn: submitTokenRequest,
    data: tokenData,
  } = useFetch(generateVideoToken);

  const {
    loading: completeLoading,
    fn: submitMarkCompleted,
    data: completeData,
  } = useFetch(markAppointmentCompleted);

  const otherParty =
    userRole === "DOCTOR"
      ? appointment.patient
      : appointment.doctor;

  const otherPartyLabel =
    userRole === "DOCTOR" ? "Patient" : "Doctor";

  const otherPartyIcon =
    userRole === "DOCTOR"
      ? <User />
      : <Stethoscope />;

  const formatDateTime = (dateString) => {
    try {
      return format(
        new Date(dateString),
        "MMMM d, yyyy 'at' h:mm a"
      );
    } catch (e) {
      return "Invalid date";
    }
  };

  const formatTime = (dateString) => {
    try {
      return format(new Date(dateString), "h:mm a");
    } catch (e) {
      return "Invalid time";
    }
  };

  return (
    <Card>
      <CardContent>
        <div className="flex justify-between">
          <div className="flex">
            <div className="bg-muted/20 rounded-full p-2 mt-1">
              {otherPartyIcon}
            </div>

            <div className="ml-4">
              <h3 className="font-medium text-white">
                {userRole === "DOCTOR"
                  ? otherParty.name
                  : `Dr. ${otherParty.name}`}
              </h3>

              {userRole === "DOCTOR" && (
                <p className="text-sm text-muted-foreground">
                  {otherParty.email}
                </p>
              )}

              {userRole !== "DOCTOR" && (
                <p className="text-sm text-muted-foreground">
                  {otherParty.specialty}
                </p>
              )}

              <div className="flex items-center mt-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1" />
                <span>
                  {formatDateTime(appointment.startTime)}
                </span>
              </div>

              <div className="flex items-center mt-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                <span>
                  {formatTime(appointment.startTime)}
                  {" - "}
                  {formatTime(appointment.endTime)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentCard;