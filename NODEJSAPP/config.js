module.exports = {
  db: {
    user: "postgres",
    host: "172.30.99.85",
    database: "intake_database",
    password: "postgres",
    port: 5432,
  },
  tmpDir: "C:\\email-scheduler-node\\tmp", // Windows temp folder
  msmtpConfig: "C:\\email-scheduler-node\\config\\msmtprc", // if using msmtp on Windows
};
