"use client";

import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, ChevronRight } from "lucide-react";
import { format } from "date-fns";

const SlotPicker = ({ days, onSelectSlot }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);

  const firstDayWithSlots =
    days.find((day) => day.slots.length > 0)?.date || days[0]?.date;

  const [activeTab, setActiveTab] = useState(firstDayWithSlots);

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const confirmSelection = () => {
    if (selectedSlot) {
      onSelectSlot(selectedSlot);
    }
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto overflow-y-hidden border border-teal-900/20 bg-teal-900/5 p-1 rounded-md h-auto flex-wrap gap-1">
          {days.map((day) => (
            <TabsTrigger
              key={day.date}
              value={day.date}
              disabled={day.slots.length === 0}
              className={`
                !data-active:bg-teal-900/20 !data-active:border-teal-600 !data-active:text-white
                border border-transparent px-4 py-2 text-muted-foreground rounded-md transition-all
                ${day.slots.length === 0 ? "opacity-50 cursor-not-allowed" : "hover:text-teal-400"}
              `}
            >
              <div className="flex gap-1 items-center">
                <span className="font-medium text-sm">
                  {format(new Date(day.date), "MMM d")}
                </span>
                <span className="text-xs">
                  ({format(new Date(day.date), "EEE")})
                </span>
              </div>

              {day.slots.length > 0 && (
                <div className="ml-2 bg-teal-900/30 text-teal-400 text-xs px-2 py-0.5 rounded">
                  {day.slots.length}
                </div>
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        {days.map((day) => (
          <TabsContent key={day.date} value={day.date} className="pt-4">
            {day.slots.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No available slots for this day.
              </div>
            ) : (
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-white mb-4">
                  {format(new Date(day.date), "EEEE, MMM d")}
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {day.slots.map((slot) => (
                    <Card
                      key={slot.startTime}
                      className={`border-teal-900/20 bg-transparent cursor-pointer transition-all ${
                        selectedSlot?.startTime === slot.startTime
                          ? "bg-teal-900/10 border-teal-600"
                          : "hover:border-teal-700/40"
                      }`}
                      onClick={() => handleSlotSelect(slot)}
                    >
                      <CardContent className="p-3 flex items-center">
                        <Clock
                          className={`h-4 w-4 mr-2 ${
                            selectedSlot?.startTime === slot.startTime
                              ? "text-teal-400"
                              : "text-muted-foreground"
                          }`}
                        />

                        <span
                          className={
                            selectedSlot?.startTime === slot.startTime
                              ? "text-white"
                              : "text-muted-foreground"
                          }
                        >
                          {format(new Date(slot.startTime), "h:mm a")}
                        </span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      <div className="flex justify-end">
        <Button
          onClick={confirmSelection}
          disabled={!selectedSlot}
          className="bg-teal-600 hover:bg-teal-700"
        >
          Continue
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default SlotPicker;
