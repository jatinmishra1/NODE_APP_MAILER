const nodemailer = require("nodemailer");
const { Client } = require("pg");
const config = require("./config");

// Use the DB config from config.js
const client = new Client(config.db);
const YOUTUBE_CHANNEL = "https://youtube.com/@dishaayri?si=KcDLgUX1aTHn7e1D";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jatinmishra0911@gmail.com",
    pass: "cmwxilvzlrlvcjls",
  },
});

async function sendEmails() {
  try {
    await client.connect();

    const res = await client.query(`
      SELECT r.id, r.email, c.subject, c.body, c.video_link
      FROM email_scheduler.recipients r
      JOIN email_scheduler.campaigns c ON r.campaign_id = c.id
      WHERE r.sent = FALSE
    `);

    for (let row of res.rows) {
      const videoLink = row.video_link || "";
      const textBody = `${row.body}${
        videoLink ? "\n\nWatch Video: " + videoLink : ""
      }`;
      const htmlBody =
        `<p>${row.body.replace(/\n/g, "<br>")}</p>` +
        (videoLink
          ? `<p><a href="${videoLink}" target="_blank">Watch Video</a></p>`
          : "") +
        `<p><a href="${YOUTUBE_CHANNEL}" target="_blank">Visit My YouTube Channel</a></p>`;

      try {
        await transporter.sendMail({
          from: "jatinmishra0911@gmail.com",
          to: row.email,
          subject: row.subject,
          text: textBody,
          html: htmlBody,
        });

        console.log(`Email sent to ${row.email}`);
      } catch (err) {
        console.error(`Failed to send email to ${row.email}:`, err.message);
      }
    }
  } catch (err) {
    console.error("Database connection error:", err.message);
  } finally {
    await client.end();
  }
}

sendEmails();
