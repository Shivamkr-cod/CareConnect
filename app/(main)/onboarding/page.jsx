"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Stethoscope, User } from "lucide-react";

import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useFetch from "@/hooks/use-fetch"; // change to useFetch if that's your filename
import { setUserRole } from "@/actions/onboarding";

const doctorFormSchema = z.object({
  specialty: z.string().min(1, "Specialty is required"),

  experience: z
    .number()
    .min(1, "Experience must be at least 1 year")
    .max(70, "Experience must be less than 70 years"),

  credentialUrl: z
    .string()
    .url("Please enter a valid URL")
    .min(1, "Credential URL is required"),

  description: z.string().min(1, "Description is required"),
});

const OnboardingPage = () => {
  const [step, setStep] = useState("choose-role");
  const router=useRouter();

  const {
    data,
    loading,
    fn: submitUserRole,
  } = useFetch(setUserRole);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(doctorFormSchema),

    defaultValues: {
      specialty: "",
      experience: undefined,
      credentialUrl: "",
      description: "",
    },
  });

  const specialtyValue = watch("specialty");

  const handlePatientSelection = async () => {
    if (loading) return;

    const formData = new FormData();
    formData.append("role", "PATIENT");

    await submitUserRole(formData);
  };

  const onSubmit = async (data) => {
    if (loading) return;
    
    const formData = new FormData();
    formData.append("role", "DOCTOR");
    formData.append("specialty", data.specialty);
    formData.append("experience", data.experience.toString());
    formData.append("credentialUrl", data.credentialUrl);
    formData.append("description", data.description);

    await submitUserRole(formData);
  };

  useEffect(() => {
    if (data && data?.success) {
      toast.success("Role selected!");
      router.push(data.redirect);
    }
  }, [data, router]);

  if (step === "choose-role") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Patient Card */}
        <Card 
        onClick={()=>!loading && handlePatientSelection()}
        className="border-emerald-900/20 hover:border-emerald-700/40 transition-all">
          <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
            <div className="p-4 bg-emerald-900/20 rounded-full mb-4">
              <User className="h-8 w-8 text-emerald-400" />
            </div>

            <CardTitle className="text-xl font-semibold text-white mb-2">
              Join as a Patient
            </CardTitle>

            <CardDescription className="mb-4">
              Book appointments, consult with doctors, and manage your
              healthcare journey.
            </CardDescription>

            <Button
              onClick={handlePatientSelection}
              disabled={loading}
              className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Continue as a Patient"
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Doctor Card */}
        <Card 
        onClick={()=>!loading && setStep("doctor-form")}
        className="border-emerald-900/20 hover:border-emerald-700/40 transition-all">
          <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
            <div className="p-4 bg-emerald-900/20 rounded-full mb-4">
              <Stethoscope className="h-8 w-8 text-emerald-400" />
            </div>

            <CardTitle className="text-xl font-semibold text-white mb-2">
              Join as a Doctor
            </CardTitle>

            <CardDescription className="mb-4">
              Create your professional profile, set your availability, and
              provide consultations.
            </CardDescription>

            <Button
            disabled={loading}
              onClick={() => setStep("doctor-form")}
              className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700"
            >
              Continue as a Doctor
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === "doctor-form") {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="specialty">Specialty</Label>
            <Input
              id="specialty"
              {...register("specialty")}
              placeholder="e.g. Cardiologist"
            />
            {errors.specialty && (
              <p className="text-sm text-red-500">{errors.specialty.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="experience">Experience (Years)</Label>
            <Input
              id="experience"
              type="number"
              {...register("experience", { valueAsNumber: true })}
              placeholder="e.g. 5"
            />
            {errors.experience && (
              <p className="text-sm text-red-500">{errors.experience.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="credentialUrl">Credential URL</Label>
          <Input
            id="credentialUrl"
            {...register("credentialUrl")}
            placeholder="Link to your medical license or credentials"
          />
          {errors.credentialUrl && (
            <p className="text-sm text-red-500">{errors.credentialUrl.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">About You</Label>
          <Textarea
            id="description"
            {...register("description")}
            placeholder="Tell us about your medical background and practice..."
            className="h-32"
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => setStep("choose-role")}>
            Back
          </Button>
          <Button type="submit" disabled={loading} className="bg-emerald-600 hover:bg-emerald-700">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Complete Profile"
            )}
          </Button>
        </div>
      </form>
    );
  }

  return null;
};

export default OnboardingPage;