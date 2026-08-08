import Link from "next/link";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import {dark} from "@clerk/themes";
import { Toaster } from "sonner";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "CareConnect- Doctor Appointment App",
  description: "Connect with doctors anytime, anywhere",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{baseTheme:dark,}}>
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.className}`}>
         <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
             {/*header*/}
             <Header/>

        <main className="min-h-screen">{children}</main>
        <Toaster richColors />

        {/* footer*/}

        <footer className="bg-muted/20 py-16 border-t border-teal-900/20 mt-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              <div className="md:col-span-1">
                <h3 className="text-xl font-bold text-white mb-4">CareConnect</h3>
                <p className="text-muted-foreground">Expert doctors, just a tap away. Seamless virtual healthcare for everyone.</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-4">Services</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li><Link href="/sign-in" className="hover:text-teal-400 transition-colors">Video Consultations</Link></li>
                  <li><Link href="/sign-in" className="hover:text-teal-400 transition-colors">Specialist Referrals</Link></li>
                  <li><Link href="/sign-in" className="hover:text-teal-400 transition-colors">Prescription Refills</Link></li>
                  <li><Link href="/sign-in" className="hover:text-teal-400 transition-colors">Mental Health</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-4">Contact Us</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li><a href="mailto:support@careconnect.health" className="hover:text-teal-400 transition-colors">support@careconnect.health</a></li>
                  <li><a href="tel:+15551234567" className="hover:text-teal-400 transition-colors">+1 (555) 123-4567</a></li>
                  <li>123 Health Ave, Medical District<br/>New York, NY 10001</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-4">Legal</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li><a href="#" className="hover:text-teal-400 transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-teal-400 transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-teal-400 transition-colors">Cookie Policy</a></li>
                </ul>
              </div>
            </div>
            <div className="pt-8 border-t border-teal-900/20 text-center text-muted-foreground">
              <p>Made with ❤️ by Shivam</p>
              <p className="text-sm mt-2">&copy; 2026 CareConnect. All rights reserved.</p>
            </div>
          </div>
        </footer>
          </ThemeProvider>
       
      </body>
    </html>
    </ClerkProvider>
  );
}
