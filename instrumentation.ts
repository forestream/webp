let cleanupInterval: NodeJS.Timeout | null = null;

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { cleanupOldFiles } = await import("./utils/cleanup");

    console.log("🧹 Starting automatic cleanup service...");

    // 서버 시작 시 한 번 실행
    await cleanupOldFiles("output", 30);
    await cleanupOldFiles("uploads", 30);

    // 30분(1,800,000ms)마다 실행
    const THIRTY_MINUTES = 30 * 60 * 1000;

    cleanupInterval = setInterval(async () => {
      console.log("🧹 Running scheduled cleanup...");
      await cleanupOldFiles("output", 30);
      await cleanupOldFiles("uploads", 30);
    }, THIRTY_MINUTES);

    console.log("✅ Cleanup service started. Running every 30 minutes.");

    // 프로세스 종료 시 interval 정리
    process.on("SIGTERM", () => {
      if (cleanupInterval) {
        clearInterval(cleanupInterval);
        console.log("🛑 Cleanup service stopped.");
      }
    });

    process.on("SIGINT", () => {
      if (cleanupInterval) {
        clearInterval(cleanupInterval);
        console.log("🛑 Cleanup service stopped.");
      }
    });
  }
}
