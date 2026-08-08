"use client";

import { bookAppointment } from "@/actions/appointments";
import useFetch from "@/hooks/use-fetch";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { format } from "date-fns";
import { Calendar, Clock, CreditCard, ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const AppointmentForm = ({ doctorId, slot, onBack, onComplete }) => {
  const [description, setDescription] = useState("");

  const { loading, data, fn: submitBooking } = useFetch(bookAppointment);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("doctorId", doctorId);
    formData.append("startTime", slot.startTime);
    formData.append("endTime", slot.endTime);
    formData.append("description", description);

    const res = await submitBooking(formData);
    if (res?.success) {
      toast.success("Appointment booked successfully!");
      onComplete();
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="bg-muted/20 p-4 rounded-lg border border-teal-900/20 space-y-3">
        <div className="flex items-center">
          <Calendar className="h-5 w-5 text-teal-400 mr-2" />

          <span className="text-white font-medium">
            {format(new Date(slot.startTime), "EEEE, MMMM d, yyyy")}
          </span>
        </div>

        <div className="flex items-center">
          <Clock className="h-5 w-5 text-teal-400 mr-2" />

          <span className="text-white">{slot.formatted}</span>
        </div>

        <div className="flex items-center">
          <CreditCard className="h-5 w-5 text-teal-400 mr-2" />

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
          className="bg-background border-teal-900/20 h-32"
        />

        <p className="text-sm text-muted-foreground">
          This information will be shared with the doctor before your
          appointment.
        </p>
      </div>

      <div className="flex justify-between pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={loading}
          className="border-teal-900/30"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Change Time Slot
        </Button>

        <Button
          type="submit"
          disabled={loading}
          className="bg-teal-600 hover:bg-teal-700"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Booking...
            </>
          ) : (
            "Confirm Booking"
          )}
        </Button>
      </div>
    </form>
  );
};

export default AppointmentForm;
