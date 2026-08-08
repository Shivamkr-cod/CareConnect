"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Ban, Loader2, User, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { updateDoctorActiveStatus } from "@/actions/admin";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";

export default function VerifiedDoctors({ doctors }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [targetDoctor, setTargetDoctor] = useState(null);
  const [actionType, setActionType] = useState(null);

  const {
    loading,
    data,
    fn: submitStatusUpdate,
  } = useFetch(updateDoctorActiveStatus);

  const filteredDoctors = doctors.filter((doctor) => {
    const query = searchTerm.toLowerCase();
    return (
      doctor.name.toLowerCase().includes(query) ||
      doctor.specialty.toLowerCase().includes(query) ||
      doctor.email.toLowerCase().includes(query)
    );
  });

  const handleStatusChange = async (doctor, suspend) => {
    const confirmed = window.confirm(
      `Are you sure you want to ${suspend ? "suspend" : "reinstate"} ${
        doctor.name
      }?`
    );
    if (!confirmed || loading) return;

    const formData = new FormData();
    formData.append("doctorId", doctor.id);
    formData.append("suspend", suspend ? "true" : "false");

    setTargetDoctor(doctor);
    setActionType(suspend ? "SUSPEND" : "REINSTATE");

    await submitStatusUpdate(formData);
  };

  useEffect(() => {
    if (data?.success && targetDoctor && actionType) {
      const actionVerb = actionType === "SUSPEND" ? "Suspended" : "Reinstated";
      toast.success(`Doctor ${targetDoctor.name} ${actionVerb.toLowerCase()} successfully`);
      
      const wasSuspend = actionType === "SUSPEND";

      setTimeout(() => {
        setTargetDoctor(null);
        setActionType(null);
        
        // If we just suspended a doctor, reload to return to the pending page as requested
        if (wasSuspend) {
          window.location.reload();
        }
      }, 0);
    }
  }, [data, targetDoctor, actionType]);

  return (
    <div>
      <Card className="bg-card border-muted">
        <div className="flex flex-col md:flex-row md:items-center justify-between p-6 pb-2 gap-4">
          <div className="space-y-1.5">
            <CardTitle className="text-xl font-bold text-white">
              Manage Doctors
            </CardTitle>
            <CardDescription>
              View and manage all verified doctors
            </CardDescription>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search doctors..."
              className="pl-8 bg-background border-muted"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <CardContent className="pt-4">
          {filteredDoctors.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm
                ? "No doctors match your search criteria."
                : "No verified doctors available."}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredDoctors.map((doctor) => {
                const isSuspended = doctor.verificationStatus === "REJECTED" || doctor.verificationStatus === "PENDING";
                return (
                  <Card
                    key={doctor.id}
                    className="bg-background border-muted hover:border-muted-foreground/30 transition-all"
                  >
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <User className="h-5 w-5 text-blue-400" />
                          <div>
                            <h3 className="font-medium text-white">
                              {doctor.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {doctor.specialty} • {doctor.experience} years
                              experience
                            </p>
                            <p className="text-sm text-muted-foreground mt-0.5">
                              {doctor.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          {isSuspended ? (
                            <>
                              <span className="text-sm font-medium text-red-400">
                                Suspended
                              </span>
                              <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => handleStatusChange(doctor, false)}
                                disabled={loading}
                                className="hover:bg-muted/80"
                              >
                                {loading && targetDoctor?.id === doctor.id ? (
                                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                                ) : (
                                  <Check className="h-4 w-4 mr-2" />
                                )}
                                Reinstate
                              </Button>
                            </>
                          ) : (
                            <>
                              <span className="text-sm font-medium text-blue-400">
                                Active
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleStatusChange(doctor, true)}
                                disabled={loading}
                                className="border-red-900/30 text-red-500 hover:bg-red-900/20 hover:text-red-400 bg-transparent"
                              >
                                {loading && targetDoctor?.id === doctor.id ? (
                                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                                ) : (
                                  <Ban className="h-4 w-4 mr-2" />
                                )}
                                Suspend
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
