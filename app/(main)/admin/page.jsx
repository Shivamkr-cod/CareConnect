import React from "react";
import { TabsContent } from "@/components/ui/tabs";

import PendingDoctors from "./_components/PendingDoctors";
import VerifiedDoctors from "./_components/VerifiedDoctors";

import { getPendingDoctors, getVerifiedDoctors } from "@/actions/admin";

const AdminPage = async () => {
  const [pendingDoctorsData, verifiedDoctorsData] = await Promise.all([
    getPendingDoctors(),
    getVerifiedDoctors(),
  ]);

  return (
    <>
      <TabsContent value="pending" className="border-none p-0">
        <PendingDoctors
          doctors={pendingDoctorsData.doctors || []}
        />
      </TabsContent>

      <TabsContent value="doctors" className="border-none p-0">
        <VerifiedDoctors
          doctors={verifiedDoctorsData.doctors || []}
        />
      </TabsContent>
    </>
  );
};

export default AdminPage;