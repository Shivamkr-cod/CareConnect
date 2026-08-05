"use client";

import { setAvailabilitySlots } from "@/actions/doctor";
import useFetch from "@/hooks/use-fetch";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Plus, Loader2, AlertCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CustomTimePicker = ({ value, onChange }) => {
  const [hour, setHour] = useState(() => {
    if (value) {
      let h = parseInt(value.split(":")[0], 10);
      if (h === 0) return "12";
      if (h > 12) return (h - 12).toString().padStart(2, "0");
      return h.toString().padStart(2, "0");
    }
    return "12";
  });
  
  const [minute, setMinute] = useState(() => {
    if (value) return value.split(":")[1];
    return "00";
  });
  
  const [ampm, setAmPm] = useState(() => {
    if (value) {
      let h = parseInt(value.split(":")[0], 10);
      return h >= 12 ? "PM" : "AM";
    }
    return "AM";
  });

  const updateTime = (newHour, newMin, newAmPm) => {
    let h = parseInt(newHour, 10);
    if (newAmPm === "PM" && h !== 12) h += 12;
    if (newAmPm === "AM" && h === 12) h = 0;
    const h24 = h.toString().padStart(2, "0");
    onChange(`${h24}:${newMin}`);
  };

  useEffect(() => {
    if (!value) {
      updateTime(hour, minute, ampm);
    }
  }, []);

  const handleHourChange = (val) => {
    setHour(val);
    updateTime(val, minute, ampm);
  };
  const handleMinChange = (val) => {
    setMinute(val);
    updateTime(hour, val, ampm);
  };
  const handleAmPmChange = (val) => {
    setAmPm(val);
    updateTime(hour, minute, val);
  };

  return (
    <div className="flex items-center gap-2">
      <Select value={hour} onValueChange={handleHourChange}>
        <SelectTrigger className="w-[70px] bg-background border-emerald-900/20">
          <SelectValue placeholder="HH" />
        </SelectTrigger>
        <SelectContent>
          {Array.from({ length: 12 }, (_, i) => {
            const v = (i + 1).toString().padStart(2, "0");
            return <SelectItem key={v} value={v}>{v}</SelectItem>;
          })}
        </SelectContent>
      </Select>
      <span className="text-muted-foreground font-bold">:</span>
      <Select value={minute} onValueChange={handleMinChange}>
        <SelectTrigger className="w-[70px] bg-background border-emerald-900/20">
          <SelectValue placeholder="MM" />
        </SelectTrigger>
        <SelectContent>
          {Array.from({ length: 60 }, (_, i) => {
            const v = i.toString().padStart(2, "0");
            return <SelectItem key={v} value={v}>{v}</SelectItem>;
          })}
        </SelectContent>
      </Select>
      <Select value={ampm} onValueChange={handleAmPmChange}>
        <SelectTrigger className="w-[75px] bg-background border-emerald-900/20">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="AM">AM</SelectItem>
          <SelectItem value="PM">PM</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

const AvailabilitySettings = ({ slots }) => {
  const [showForm, setShowForm] = useState(true);

  const { loading, fn: submitSlots, data } = useFetch(setAvailabilitySlots);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      startTime: "",
      endTime: "",
    },
  });

  function createLocalDateFromTime(timeStr) {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const now = new Date();
    return new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours,
      minutes
    );
  }

  const onSubmit = async (data) => {
    if (loading) return;

    const formData = new FormData();

    const startDate = createLocalDateFromTime(data.startTime);
    const endDate = createLocalDateFromTime(data.endTime);

    if (startDate >= endDate) {
      toast.error("End time must be after start time");
      return;
    }

    // Add to form data
    formData.append("startTime", startDate.toISOString());
    formData.append("endTime", endDate.toISOString());

    await submitSlots(formData);
  };

  useEffect(() => {
    if (data && data?.success) {
      setTimeout(() => {
        setShowForm(false);
        toast.success("Availability slots updated successfully");
      }, 0);
    }
  }, [data]);

  const formatTimeString = (dateString) => {
    try {
      return format(new Date(dateString), "h:mm a");
    } catch (e) {
      return "Invalid time";
    }
  };

  return (
    <Card className="border-emerald-900/20">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-white flex items-center">
          <Clock className="h-5 w-5 mr-2 text-emerald-400" />
          Availability Settings
        </CardTitle>

        <CardDescription>
          Set your daily availability for patient appointments
        </CardDescription>
      </CardHeader>

      <CardContent>
        {!showForm ? (
          <>
            <div className="mb-6">
              <h3 className="text-lg font-medium text-white mb-3">
                Current Availability
              </h3>

              {slots.length === 0 ? (
                <p className="text-muted-foreground">
                  You haven&apos;t set any availability slots yet. Add your
                  availability to start accepting appointments.
                </p>
              ) : (
                <div>
                  {slots.map((slot) => {
                    return (
                      <div
                        key={slot.id}
                        className="flex items-center p-3 rounded-md bg-muted/20 border border-emerald-900/20 mb-2"
                      >
                        <div className="bg-emerald-900/20 p-2 rounded-full mr-3">
                          <Clock className="h-4 w-4 text-emerald-400" />
                        </div>

                        <p className="text-white font-medium">
                          {formatTimeString(slot.startTime)} -{" "}
                          {formatTimeString(slot.endTime)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <Button
              onClick={() => setShowForm(true)}
              className="w-full bg-emerald-600 hover:bg-emerald-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Set Availability Time
            </Button>
          </>
        ) : (
          <form
            className="space-y-4 border border-emerald-900/20 rounded-md p-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h3 className="text-lg font-medium text-white mb-2">
              Set Daily Availability
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Start Time */}
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time</Label>
                <Controller
                  name="startTime"
                  control={control}
                  rules={{ required: "Start time is required" }}
                  render={({ field }) => (
                    <CustomTimePicker
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />

                {errors.startTime && (
                  <p className="text-sm font-medium text-red-500">
                    {errors.startTime.message}
                  </p>
                )}
              </div>

              {/* End Time */}
              <div className="space-y-2">
                <Label htmlFor="endTime">End Time</Label>
                <Controller
                  name="endTime"
                  control={control}
                  rules={{ required: "End time is required" }}
                  render={({ field }) => (
                    <CustomTimePicker
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />

                {errors.endTime && (
                  <p className="text-sm font-medium text-red-500">
                    {errors.endTime.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-2 ">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowForm(false)}
                disabled={loading}
                className="border-emerald-900/30"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={loading}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Availability"
                )}
              </Button>
            </div>
          </form>
        )}

        <div className="mt-6 p-4 bg-muted/10 border border-emerald-900/10 rounded-md">
          <h4 className="font-medium text-white flex items-center">
            <AlertCircle className="h-4 w-4 mr-2 text-emerald-400" />
            How Availability Works
          </h4>

          <p className="text-muted-foreground text-sm">
            Setting your daily availability allows patients to book appointments
            during those hours. The same availability applies to all days. You
            can update your availability at any time, but existing booked
            appointments will not be affected.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AvailabilitySettings;
