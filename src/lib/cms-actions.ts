"use server";

import { revalidatePath } from "next/cache";
import dbConnect from "@/lib/db";
import { Project, Experience, Social } from "@/lib/models";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// --- Middleware/Auth check ---
async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }
}

// ==========================================
// PROJECTS
// ==========================================

export async function createProject(data: any) {
  await requireAuth();
  await dbConnect();
  const project = await Project.create(data);
  revalidatePath("/");
  revalidatePath("/dashboard/projects");
  revalidatePath("/projects");
  return JSON.parse(JSON.stringify(project));
}

export async function updateProject(id: string, data: any) {
  await requireAuth();
  await dbConnect();
  const project = await Project.findByIdAndUpdate(id, data, { new: true });
  revalidatePath("/");
  revalidatePath("/dashboard/projects");
  revalidatePath("/projects");
  return JSON.parse(JSON.stringify(project));
}

export async function deleteProject(id: string) {
  await requireAuth();
  await dbConnect();
  await Project.findByIdAndDelete(id);
  revalidatePath("/");
  revalidatePath("/dashboard/projects");
  revalidatePath("/projects");
  return { success: true };
}

// ==========================================
// EXPERIENCE
// ==========================================

export async function createExperience(data: any) {
  await requireAuth();
  await dbConnect();
  const exp = await Experience.create(data);
  revalidatePath("/");
  revalidatePath("/dashboard/experience");
  return JSON.parse(JSON.stringify(exp));
}

export async function updateExperience(id: string, data: any) {
  await requireAuth();
  await dbConnect();
  const exp = await Experience.findByIdAndUpdate(id, data, { new: true });
  revalidatePath("/");
  revalidatePath("/dashboard/experience");
  return JSON.parse(JSON.stringify(exp));
}

export async function deleteExperience(id: string) {
  await requireAuth();
  await dbConnect();
  await Experience.findByIdAndDelete(id);
  revalidatePath("/");
  revalidatePath("/dashboard/experience");
  return { success: true };
}

// ==========================================
// SOCIALS
// ==========================================

export async function createSocial(data: any) {
  await requireAuth();
  await dbConnect();
  const social = await Social.create(data);
  revalidatePath("/");
  revalidatePath("/dashboard/socials");
  return JSON.parse(JSON.stringify(social));
}

export async function updateSocial(id: string, data: any) {
  await requireAuth();
  await dbConnect();
  const social = await Social.findByIdAndUpdate(id, data, { new: true });
  revalidatePath("/");
  revalidatePath("/dashboard/socials");
  return JSON.parse(JSON.stringify(social));
}

export async function deleteSocial(id: string) {
  await requireAuth();
  await dbConnect();
  await Social.findByIdAndDelete(id);
  revalidatePath("/");
  revalidatePath("/dashboard/socials");
  return { success: true };
}
