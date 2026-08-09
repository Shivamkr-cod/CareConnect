"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/prisma";

export async function setUserRole(formData) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    // Find user in our database
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });

    if (!user) {
      return { success: false, error: "User not found in database. Please refresh the page to try again." };
    }

    const role = formData.get("role");

    if (!role || !["PATIENT", "DOCTOR"].includes(role)) {
      return { success: false, error: "Invalid role selection" };
    }

    // ===========================
    // PATIENT
    // ===========================
    if (role === "PATIENT") {
      await db.user.update({
        where: {
          clerkUserId: userId,
        },
        data: {
          role: "PATIENT",
        },
      });

      revalidatePath("/");

      return {
        success: true,
        redirect: "/doctors",
      };
    }

    // ===========================
    // DOCTOR
    // ===========================
    if (role === "DOCTOR") {
      const specialty = formData.get("specialty");
      const experience = parseInt(formData.get("experience"), 10);
      const credentialUrl = formData.get("credentialUrl");
      const description = formData.get("description");

      if (
        !specialty ||
        isNaN(experience) ||
        !credentialUrl ||
        !description
      ) {
        throw new Error("All fields are required");
      }

      await db.user.update({
        where: {
          clerkUserId: userId,
        },
        data: {
          role: "DOCTOR",
          specialty,
          experience,
          credentialUrl,
          description,
          verificationStatus: "PENDING",
        },
      });

      revalidatePath("/");

      return {
        success: true,
        redirect: "/doctor/verification",
      };
    }
  } catch (error) {
    console.error("Failed to set user role:", error);

    throw new Error(
      `Failed to update user profile: ${
        error?.message || "Unknown error"
      }`
    );
  }
}

export async function getCurrentUser() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  try {
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });

    return user;
  } catch (error) {
    console.error("Failed to get user information:", error);
    return null;
  }
}