"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useFetch from "@/hooks/use-fetch"; // change to useFetch if that's your filename
import { setUserRole } from "@/actions/onboarding";
import { SPECIALTIES } from "@/lib/specialities";

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
  const router = useRouter();

  const { data, loading, fn: submitUserRole } = useFetch(setUserRole);

  const {
    register,
    handleSubmit,
    control,
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
    if (data) {
      if (data.success) {
        toast.success("Role selected!");
        router.push(data.redirect);
      } else if (data.error) {
        toast.error(data.error);
      }
    }
  }, [data, router]);

  if (step === "choose-role") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Patient Card */}
        <Card
          onClick={() => !loading && handlePatientSelection()}
          className="border-teal-900/20 hover:border-teal-700/40 transition-all"
        >
          <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
            <div className="p-4 bg-teal-900/20 rounded-full mb-4">
              <User className="h-8 w-8 text-teal-400" />
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
              className="w-full mt-2 bg-teal-600 hover:bg-teal-700"
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
          onClick={() => !loading && setStep("doctor-form")}
          className="border-teal-900/20 hover:border-teal-700/40 transition-all"
        >
          <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
            <div className="p-4 bg-teal-900/20 rounded-full mb-4">
              <Stethoscope className="h-8 w-8 text-teal-400" />
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
              className="w-full mt-2 bg-teal-600 hover:bg-teal-700"
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
      <Card className="border-teal-900/20">
        <CardContent className="pt-6">
          <div className="mb-6">
            <CardTitle className="text-2xl font-bold text-white mb-2">
              Complete Your Doctor Profile
            </CardTitle>

            <CardDescription>
              Please provide your professional details for verification
            </CardDescription>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Label htmlFor="specialty">Medical Speciality</Label>

              <Controller
                name="specialty"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger id="specialty">
                      <SelectValue placeholder="Select your specialty" />
                    </SelectTrigger>

                    <SelectContent>
                      {SPECIALTIES.map((spec) => {
                        return (
                          <SelectItem key={spec.name} value={spec.name}>
                            <div className="flex items-center gap-2">
                              <span className="text-teal-400">{spec.icon}</span>
                              {spec.name}
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.specialty && (
                <p className="text-sm font-medium text-red-500 mt-1">
                  {errors.specialty.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience">Years of Experience</Label>

              <Input
                id="experience"
                type="number"
                placeholder="eg. 5"
                {...register("experience", { valueAsNumber: true })}
              />

              {errors.experience && (
                <p className="text-sm font-medium text-red-500 mt-1">
                  {errors.experience.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="credentialUrl">Link to Credential Document</Label>
              <Input
                id="credentialUrl"
                placeholder="https://example.com/my-medical-degree.pdf"
                {...register("credentialUrl")}
              />
              <p className="text-sm text-gray-400">
                Please provide a link to your medical degree or certification
              </p>
              {errors.credentialUrl && (
                <p className="text-sm font-medium text-red-500 mt-1">
                  {errors.credentialUrl.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description of Your Services</Label>
              <Textarea
                id="description"
                placeholder="Describe your expertise, services, and approach to patient care..."
                {...register("description")}
              />
              {errors.description && (
                <p className="text-sm font-medium text-red-500 mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="flex justify-between items-center pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep("choose-role")}
                disabled={loading}
              >
                Back
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-teal-600 hover:bg-teal-700 text-white"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Submit for Verification"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }
};

export default OnboardingPage;
