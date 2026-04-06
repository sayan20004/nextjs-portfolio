import dotenv from "dotenv";
import mongoose from "mongoose";
import * as fs from "fs";
import * as path from "path";

// Load environment variables from .env.local
dotenv.config({ path: path.join(__dirname, "../.env.local") });

// Import models
import { Project, Experience, Social, HomepageIntro } from "../src/lib/models";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

async function connectToDb() {
  try {
    await mongoose.connect(MONGODB_URI!);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error);
    process.exit(1);
  }
}

async function migrateProjects() {
  console.log("\n📦 Migrating Projects...");
  try {
    const projectsPath = path.join(__dirname, "../src/data/projects.json");
    const projectsData = JSON.parse(fs.readFileSync(projectsPath, "utf-8"));

    // Clear existing projects
    const deletedCount = await Project.deleteMany({});
    console.log(`  Cleared ${deletedCount.deletedCount} existing projects`);

    // Insert new projects
    const result = await Project.insertMany(projectsData.projects);
    console.log(`  ✅ Created ${result.length} projects`);
  } catch (error) {
    console.error("  ❌ Error migrating projects:", error);
  }
}

async function migrateExperience() {
  console.log("\n💼 Migrating Experience & Education...");
  try {
    // Load career.json
    const careerPath = path.join(__dirname, "../src/data/career.json");
    const careerData = JSON.parse(fs.readFileSync(careerPath, "utf-8"));

    // Load education.json
    const educationPath = path.join(__dirname, "../src/data/education.json");
    const educationData = JSON.parse(fs.readFileSync(educationPath, "utf-8"));

    // Clear existing experience
    const deletedCount = await Experience.deleteMany({});
    console.log(`  Cleared ${deletedCount.deletedCount} existing experience records`);

    // Combine and format career and education
    const experiences = [
      ...careerData.career.map((item: any) => ({ ...item, type: "work" })),
      ...educationData.education.map((item: any) => ({ ...item, type: "education" })),
    ];

    // Insert new experience
    const result = await Experience.insertMany(experiences);
    console.log(`  ✅ Created ${result.length} experience records`);
  } catch (error) {
    console.error("  ❌ Error migrating experience:", error);
  }
}

async function migrateSocials() {
  console.log("\n🔗 Migrating Socials...");
  try {
    const socialsPath = path.join(__dirname, "../src/data/socials.json");
    const socialsData = JSON.parse(fs.readFileSync(socialsPath, "utf-8"));

    // Clear existing socials
    const deletedCount = await Social.deleteMany({});
    console.log(`  Cleared ${deletedCount.deletedCount} existing socials`);

    // Add order to socials if not present
    const socialsWithOrder = socialsData.socials.map((social: any, index: number) => ({
      ...social,
      order: social.order || index,
    }));

    // Insert new socials
    const result = await Social.insertMany(socialsWithOrder);
    console.log(`  ✅ Created ${result.length} socials`);
  } catch (error) {
    console.error("  ❌ Error migrating socials:", error);
  }
}

async function migrateHomepageIntro() {
  console.log("\n🏠 Migrating Homepage Intro...");
  try {
    // Clear existing
    const deletedCount = await HomepageIntro.deleteMany({});
    console.log(`  Cleared ${deletedCount.deletedCount} existing intro records`);

    // Create homepage intro with default data
    const intro = await HomepageIntro.create({
      name: "Sayan Maity",
      title: "Full Stack Developer & UI/UX Enthusiast",
      tagline: "A full stack engineer from India, learning User experience",
      photo: "/sayanmaity.jpg",
      cvLink: "/SayanMaity_Resume.pdf",
      bio: [
        "A full stack engineer from India, learning User experience",
        "Currently working as Jr. Dev at Techinnovator",
        "Building SwiftKit (Ready to use Components for your iOS Apps)",
        "Reach out if you want to find a way to work together!",
      ],
    });

    console.log(`  ✅ Created homepage intro`);
  } catch (error) {
    console.error("  ❌ Error migrating homepage intro:", error);
  }
}

async function runMigration() {
  console.log("🚀 Starting data migration...\n");

  try {
    await connectToDb();

    await migrateProjects();
    await migrateExperience();
    await migrateSocials();
    await migrateHomepageIntro();

    console.log("\n✨ Migration completed successfully!");
  } catch (error) {
    console.error("\n❌ Migration failed:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("\n📍 Disconnected from MongoDB");
  }
}

runMigration();
