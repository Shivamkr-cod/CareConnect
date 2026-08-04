import React from "react";
import Link from "next/link";
import { ArrowLeft, Stethoscope, Calendar, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import PageHeader from "@/components/page-header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

const DoctorDashboard = async () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Back to Home Button */}
      <div className="flex justify-start mb-6">
        <Button variant="outline" size="sm" asChild className="border-emerald-900/30">
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </Button>
      </div>

      {/* Page Header */}
      <div className="flex items-center gap-3 mb-10">
        <Stethoscope className="h-12 w-12 text-emerald-400" />
        <h1 className="text-4xl md:text-5xl font-bold gradient-title">
          Doctor Dashboard
        </h1>
      </div>

      {/* Main Content Area with Vertical Tabs */}
      <Tabs
        defaultValue="appointments"
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
        orientation="vertical"
      >
        <TabsList className="md:col-span-1 flex flex-col w-full h-auto p-2 bg-muted/20 border-none rounded-md gap-2 justify-start items-start">
          <TabsTrigger 
            value="appointments" 
            className="flex-1 justify-start px-4 py-3 w-full data-[state=active]:bg-muted data-[state=active]:text-white text-muted-foreground"
          >
            <Calendar className="h-4 w-4 mr-3" />
            Appointments
          </TabsTrigger>

          <TabsTrigger 
            value="availability" 
            className="flex-1 justify-start px-4 py-3 w-full data-[state=active]:bg-muted data-[state=active]:text-white text-muted-foreground"
          >
            <Clock className="h-4 w-4 mr-3" />
            Availability
          </TabsTrigger>
        </TabsList>

        <div className="md:col-span-3">
          <TabsContent value="appointments" className="m-0 border-none p-0">
            <Card className="bg-background border-muted">
              <CardContent className="p-6">
                <p className="text-muted-foreground">Appointments content goes here...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="availability" className="m-0 border-none p-0">
            <div className="p-4">
              <h2 className="text-white">availability</h2>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default DoctorDashboard;
