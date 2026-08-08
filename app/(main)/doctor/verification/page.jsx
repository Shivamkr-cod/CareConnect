import { redirect } from "next/navigation";
import React from "react";
import { getCurrentUser } from "@/actions/onboarding";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Clock } from "lucide-react";

const DoctorVerification = async () => {
  const user = await getCurrentUser();

  if (user?.role !== "DOCTOR") {
    redirect("/onboarding");
  }

  // If already verified, redirect to dashboard
  if (user?.verificationStatus === "VERIFIED") {
    redirect("/doctor");
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <Card className="bg-card border-muted text-center py-10">
        <CardHeader>
          <div className="mx-auto bg-teal-900/20 p-4 rounded-full mb-4 w-fit">
            <Clock className="h-10 w-10 text-teal-400" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">
            Verification Pending
          </CardTitle>
          <CardDescription className="text-base mt-2">
            Your profile is currently under review by our administration team.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            We will notify you once your verification is complete. This process typically takes 1-2 business days. Thank you for your patience!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorVerification;
