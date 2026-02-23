import cron from "node-cron";
import { fetchJobsFromAPI } from "../services/jobScrapper.js";

cron.schedule("0 */6 * * *", async () => {
    console.log("Running job scraper...");
    await fetchJobsFromAPI();
});