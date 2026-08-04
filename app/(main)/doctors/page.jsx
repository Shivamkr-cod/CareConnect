import Link from "next/link";
import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { SPECIALTIES } from "@/lib/specialities";

const SpecialitiesPage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center mb-8 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">
          Find Your Doctor
        </h1>

        <p className="text-muted-foreground text-lg">
          Browse by specialty or view all available healthcare providers
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {SPECIALTIES.map((specialty) => (
          <Link
            key={specialty.name}
            href={`/doctors/${specialty.name}`}
          >
            <Card>
              <CardContent>
                <div className="flex flex-col items-center justify-center gap-3 py-6">
                  <div>{specialty.icon}</div>

                  <h3>{specialty.name}</h3>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
};

export default SpecialitiesPage;