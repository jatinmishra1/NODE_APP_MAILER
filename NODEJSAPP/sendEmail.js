const { Client } = require("pg");
const fs = require("fs");
const path = require("path");
const config = require("./config");

async function sendEmails() {
  const client = new Client(config.db);
  await client.connect();

  // Ensure tmp directory exists
  if (!fs.existsSync(config.tmpDir)) {
    fs.mkdirSync(config.tmpDir, { recursive: true });
  }

  try {
    const res = await client.query(`
      SELECT r.id, r.email, c.subject, c.body
      FROM email_scheduler.recipients r
      JOIN email_scheduler.campaigns c ON r.campaign_id = c.id
      WHERE r.sent = FALSE
    `);

    for (let row of res.rows) {
      const tmpFile = path.join(config.tmpDir, `email_${row.id}.txt`);
      const emailText = `Subject: ${row.subject}\n\n${row.body}`;

      fs.writeFileSync(tmpFile, emailText);

      try {
        const nodemailer = require("nodemailer");
        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "jatinmishra0911@gmail.com",
            pass: "cmwxilvzlrlvcjls",
          },
        });

        await transporter.sendMail({
          from: "jatinmishra0911@gmail.com",
          to: row.email,
          subject: row.subject,
          text: row.body,
        });

        console.log(`Email sent to ${row.email}`);
      } catch (err) {
        console.error(`Failed to send email to ${row.email}`, err.message);
      } finally {
        fs.unlinkSync(tmpFile);
      }
    }
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

sendEmails();
