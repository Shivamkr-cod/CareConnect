import Pricing from "@/components/pricing";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { features, creditBenefits, testimonials } from "@/lib/data";
import { ArrowRight, Check, Stethoscope } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-background">
      <section className="relative overflow-hidden pt-24 pb-10 min-h-[calc(100vh-64px)] flex items-center">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-6 items-center">
            <div className="max-w-3xl space-y-6">
              <Badge
                variant="outline"
                className="bg-teal-900/30 border-teal-700/30 px-4 py-2 text-teal-400 text-sm font-medium"
              >
                Healthcare made simple
              </Badge>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-white">
                Connect with
                <br />
                doctors{" "}
                <span className="gradient-title whitespace-nowrap">
                  anytime, anywhere
                </span>
              </h1>

              <p className="text-muted-foreground text-lg md:text-xl max-w-xl">
                Book appointments, consult via video, and manage your healthcare
                journey all in one secure platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/onboarding">
                  <Button
                    size="lg"
                    className="bg-teal-600 text-white hover:bg-teal-700"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>

                <Link href="/doctor">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-teal-700/30 hover:bg-muted/80"
                  >
                    Find Doctors
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative h-[300px] sm:h-[400px] lg:h-[620px]">
              <Image
                src="/careconnect-surgeons.jpg"
                alt="Medical Professional Preparing"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our platform makes healthcare accessible with just a few clicks
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((features, index) => {
              return (
                <Card
                  key={index}
                  className="border-teal-900/20 hover:border-teal-800/40 transition-all duration-300"
                >
                  <CardHeader className="pb-2">
                    <div className="bg-teal-900/20 p-3 rounded-lg w-fit mb-4">
                      {features.icon}
                    </div>
                    <CardTitle className="text-xl font-semibold text-white">
                      {features.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {features.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-teal-900/30 border-teal-700/30 px-4 py-1 text-teal-400 text-sm font-medium mb-4">
              Affordable Healthcare
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Consultation Packages
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose the perfect consultation package that fits your healthcare
              needs
            </p>
          </div>

          <div>
            {/* Pricing Table */}
            <Pricing/>
            <Card className="mt-12 bg-muted/20 border-teal-900/30">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-white flex items-center">
                  <Stethoscope className="h-5 w-5 mr-2 text-teal-400" />
                  How Our Credit System Works
                </CardTitle>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {creditBenefits.map((benefit, index) => {
                    return (
                      <li key={index} className="flex items-start">
                        <div>
                          <Check className="h-4 w-4 text-teal-400" />
                        </div>
                        <p
                          className="text-muted-foreground"
                          dangerouslySetInnerHTML={{ __html: benefit }}
                        />
                      </li>
                    );
                  })}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="bg-teal-900/30 border-teal-700/30 px-4 py-1 text-teal-400 text-sm font-medium mb-4"
            >
              Success Stories
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What Our Users Say
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Hear from patients and doctors who use our platform
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => {
              return (
                <Card
                  key={index}
                  className="border-teal-900/20 hover:border-teal-800/40 transition-all duration-300"
                >
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-teal-900/20 flex items-center justify-center mr-4">
                        <span className="text-teal-400 font-bold">
                          {testimonial.initials}
                        </span>
                      </div>

                      <div>
                        <h4 className="font-semibold text-white">
                          {testimonial.name}
                        </h4>

                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>

                    <p className="text-muted-foreground">
                      &quot;{testimonial.quote}&quot;
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-teal-900/30 to-teal-950/20 border-teal-800">
            <CardContent className="p-8 md:p-12 lg:p-16 relative overflow-hidden">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Ready to take control of your healthcare?
                </h2>

                <p className="text-lg text-muted-foreground mb-8">
                  Join thousands of users who have simplified their healthcare
                  journey with our platform. Get started today and experience
                  healthcare the way it should be.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/sign-up">
                    <Button
                      size="lg"
                      className="bg-teal-600 text-white hover:bg-teal-700"
                    >
                      Sign Up Now
                    </Button>
                  </Link>
                  <Link href="/pricing">
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-teal-700/30 hover:bg-muted/80"
                    >
                      View Pricing
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
