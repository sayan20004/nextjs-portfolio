async function getPosts(): Promise<PlainPost[]> {
  // await dbConnect(); // <-- REMOVE FROM HERE
  try {
    await dbConnect(); // <-- ADD HERE
    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .populate("commentCount")
      .lean();

    return JSON.parse(JSON.stringify(posts));
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return [];
  }
}