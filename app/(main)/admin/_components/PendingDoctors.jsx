"use client";

import React, { useState } from "react";
import { updateDoctorStatus } from "@/actions/admin";
import useFetch from "@/hooks/use-fetch";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { User } from "lucide-react";
import { format } from "date-fns";

const PendingDoctors = ({ doctors }) => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const {
    loading,
    data,
    fn: submitStatusUpdate,
  } = useFetch(updateDoctorStatus);

  const handleCloseDialog = () => {
    setSelectedDoctor(null);
  };

  return (
    <div>
      <Card className="bg-card border-muted">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-white">
            Pending Doctor Verifications
          </CardTitle>
          <CardDescription>
            Review and approve doctor applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          {doctors?.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No pending verification requests at this time.
            </div>
          ) : (
            <div className="space-y-4">
              {doctors?.map((doctor) => (
                <Card
                  key={doctor.id}
                  className="bg-background border-muted hover:border-muted-foreground/30 transition-all"
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <User className="h-5 w-5 text-emerald-400" />
                        <div>
                          <h3 className="font-medium text-white">
                            {doctor.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {doctor.specialty} • {doctor.experience} years
                            experience
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge
                          variant="outline"
                          className="bg-amber-900/20 border-amber-900/30 text-amber-400"
                        >
                          Pending
                        </Badge>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="hover:bg-muted/80"
                          onClick={() => setSelectedDoctor(doctor)}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {selectedDoctor && (
        <Dialog open={!!selectedDoctor} onOpenChange={handleCloseDialog}>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-white">
                Doctor Verification Details
              </DialogTitle>

              <DialogDescription>
                Review the doctor&apos;s information carefully before making a
                decision
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              {/* Basic Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Full Name
                  </h4>
                  <p className="text-base font-medium text-white">
                    {selectedDoctor.name}
                  </p>
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Application Date
                  </h4>
                  <p className="text-base font-medium text-white">
                    {format(new Date(selectedDoctor.createdAt), "PPP")}
                  </p>
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Email
                  </h4>
                  <p className="text-base font-medium text-white break-all">
                    {selectedDoctor.email}
                  </p>
                </div>
              </div>

              <Separator className="bg-emerald-900/20" />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default PendingDoctors;
