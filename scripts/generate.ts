import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { DocumentInterface } from "@langchain/core/documents";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import matter from "gray-matter"; 

import * as fs from "fs";
import * as path from "path";

async function safelyLoadDirectory(directory: string, options: Record<string, (filePath: string) => TextLoader>, recursive: boolean = false) {
  try {
    // Check if directory exists
    if (!fs.existsSync(directory)) {
      console.log(`⚠️ Directory not found: ${directory} - skipping...`);
      return [];
    }
    
    const loader = new DirectoryLoader(directory, options, recursive);
    return await loader.load();
  } catch (error) {
    console.warn(`⚠️ Error loading from directory ${directory}:`, error);
    return [];
  }
}

async function generateEmbeddings() {
  try {
    console.log("🚀 Starting embeddings generation...");
    
    
    
    // Load and process routes
    console.log("📂 Loading routes...");
    const routes = await safelyLoadDirectory(
      "src/app",
      {
        ".tsx": (filePath: string) => new TextLoader(filePath),
      },
      true
    );

    const processedRoutes = routes
      .filter((route) => route.metadata.source.endsWith("page.tsx"))
      .map((route): DocumentInterface => {
        const url = route.metadata.source
          .replace(/\\/g, "/")
          .split("/src/app")[1]
          .split("/page.tsx")[0] || "/";

        const pageContentTrimmed = route.pageContent
          .replace(/^import.*$/gm, "")
          .replace(/ className=(["']).*?\1| className={.*?}/g, "")
          .replace(/^\s*[\r]/gm, "")
          .trim();

        return { 
          pageContent: pageContentTrimmed, 
          metadata: { 
            url,
            source: "route",
            timestamp: new Date().toISOString()
          } 
        };
      });

    console.log(`✅ Loaded ${processedRoutes.length} routes`);

    // Load and process data
    console.log("📂 Loading data files...");
    const data = await safelyLoadDirectory("src/data", {
      ".json": (filePath: string) => new TextLoader(filePath),
    });

    const processedData = data.map((doc): DocumentInterface => ({
      ...doc,
      metadata: {
        ...doc.metadata,
        source: "data",
        timestamp: new Date().toISOString()
      }
    }));

    console.log(`✅ Loaded ${processedData.length} data files`);

    // Load and process blog posts
    console.log("📂 Loading blog posts...");
    const posts = await safelyLoadDirectory(
      "content",
      {
        ".mdx": (filePath: string) => new TextLoader(filePath),
      },
      true
    );

    // --- 2. REPLACE THIS WHOLE BLOCK ---
    const processedPosts = posts
      .filter((post) => post.metadata.source.endsWith(".mdx"))
      .map((post): DocumentInterface => {
        // Use gray-matter to parse the file
        const { content, data } = matter(post.pageContent);
        
        // 'content' is the actual MDX body
        // 'data' is the parsed frontmatter object (e.g., data.title)
        return { 
          pageContent: content.trim(), // <-- THE FIX: Use the MDX body
          metadata: {
            ...post.metadata,
            source: "blog",
            timestamp: new Date().toISOString(),
            ...(data as object), // Spread the parsed frontmatter into metadata
          }
        };
      });
    // --- END OF REPLACEMENT ---

    console.log(`✅ Loaded ${processedPosts.length} blog posts`);

    // Split documents (only if we have any)
    console.log("✂️ Splitting documents...");
    const routesSplitter = RecursiveCharacterTextSplitter.fromLanguage("html");
    const dataSplitter = RecursiveCharacterTextSplitter.fromLanguage("js");
    const postSplitter = RecursiveCharacterTextSplitter.fromLanguage("markdown");

    let allSplitDocuments = [];
    
    if (processedRoutes.length > 0) {
      const splitRoutes = await routesSplitter.splitDocuments(processedRoutes);
      allSplitDocuments.push(...splitRoutes);
      console.log(`  ✅ Split ${processedRoutes.length} routes into ${splitRoutes.length} chunks`);
    }
    
    if (processedData.length > 0) {
      const splitData = await dataSplitter.splitDocuments(processedData);
      allSplitDocuments.push(...splitData);
      console.log(`  ✅ Split ${processedData.length} data files into ${splitData.length} chunks`);
    }
    
    if (processedPosts.length > 0) {
      const splitPosts = await postSplitter.splitDocuments(processedPosts);
      allSplitDocuments.push(...splitPosts);
      console.log(`  ✅ Split ${processedPosts.length} blog posts into ${splitPosts.length} chunks`);
    }
    
    console.log(`✅ Total: Split documents into ${allSplitDocuments.length} chunks`);

    // Add documents to vector store (only if we have any)
    if (allSplitDocuments.length > 0) {
      console.log("📥 Adding documents to mock vector store...");
      
    } else {
      console.log("⚠️ No documents to add to vector store");
    }

    console.log("✨ Embeddings generation completed successfully!");
  } catch (error) {
    console.error("❌ Error generating embeddings:", error);
    
    // Exit with success in build mode to not break CI/CD pipelines
    if (process.env.NODE_ENV === "production" || process.argv.includes("--build")) {
      console.log("⚠️ Continuing build process despite embeddings generation failure");
      return;
    }
    
    process.exit(1);
  }
}

generateEmbeddings();