"use client";

import { bookAppointment } from "@/actions/appointments";
import useFetch from "@/hooks/use-fetch";
import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar, Clock, CreditCard } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const AppointmentForm = ({ doctorId, slot, onBack, onComplete }) => {
  const [description, setDescription] = useState("");

  const { loading, data, fn: submitBooking } = useFetch(bookAppointment);

  return (
    <form className="space-y-6">
      <div className="bg-muted/20 p-4 rounded-lg border border-emerald-900/20 space-y-3">
        <div className="flex items-center">
          <Calendar className="h-5 w-5 text-emerald-400 mr-2" />

          <span className="text-white font-medium">
            {format(new Date(slot.startTime), "EEEE, MMMM d, yyyy")}
          </span>
        </div>

        <div className="flex items-center">
          <Clock className="h-5 w-5 text-emerald-400 mr-2" />

          <span className="text-white">{slot.formatted}</span>
        </div>

        <div className="flex items-center">
          <CreditCard className="h-5 w-5 text-emerald-400 mr-2" />

          <span className="text-muted-foreground">
            Cost:
            <span className="text-white font-medium"> 2 credits</span>
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">
          Describe your medical concern (optional)
        </Label>

        <Textarea
          id="description"
          placeholder="Please provide any details about your medical concern or what you'd like to discuss in the appointment..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-background border-emerald-900/20 h-32"
        />

        <p className="text-sm text-muted-foreground">
          This information will be shared with the doctor before your
          appointment.
        </p>
      </div>
    </form>
  );
};

export default AppointmentForm;
