import React from "react";
import { User, Star, Calendar, BadgeCheck } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const DoctorCard = ({ doctor }) => {
  return (
    <Card className="bg-background border-blue-900/20 hover:border-blue-700/40 transition-all">
      <CardContent className="pt-4">
        <div className="flex items-start gap-4">
          <div className="relative w-12 h-12 rounded-full bg-blue-900/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
            {doctor.imageUrl ? (
              <Image
                src={doctor.imageUrl}
                alt={doctor.name}
                fill
                className="object-cover"
              />
            ) : (
              <User className="h-6 w-6 text-blue-400" />
            )}
          </div>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
              <h3 className="font-medium text-white text-lg">{doctor.name}</h3>

              <BadgeCheck className="h-5 w-5 text-blue-400 self-start sm:self-auto flex-shrink-0" />
            </div>

            <p className="text-sm text-muted-foreground mb-1">
              {doctor.specialty} • {doctor.experience} years experience
            </p>

            <div className="mt-4 line-clamp-2 text-sm text-muted-foreground mb-4">
              {doctor.description}
            </div>

            <Link 
              href={`/doctors/${doctor.specialty}/${doctor.id}`} 
              className="mt-4 flex w-full items-center justify-center rounded-md bg-blue-500 h-9 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <Calendar className="h-4 w-4 mr-2" />
              View Profile & Book
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorCard;
