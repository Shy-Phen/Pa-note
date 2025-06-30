export const corsOptions = {
  origin: "http://localhost:5173", // ✅ your actual frontend URL and port
  credentials: true, // ✅ allow credentials (cookies, etc.)
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
