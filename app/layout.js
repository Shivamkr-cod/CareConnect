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
                  <li><a href="#" className="hover:text-teal-400 transition-colors">Video Consultations</a></li>
                  <li><a href="#" className="hover:text-teal-400 transition-colors">Specialist Referrals</a></li>
                  <li><a href="#" className="hover:text-teal-400 transition-colors">Prescription Refills</a></li>
                  <li><a href="#" className="hover:text-teal-400 transition-colors">Mental Health</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-4">Company</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li><a href="#" className="hover:text-teal-400 transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-teal-400 transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-teal-400 transition-colors">Press</a></li>
                  <li><a href="#" className="hover:text-teal-400 transition-colors">Contact</a></li>
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
