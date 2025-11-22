-- installer/install.sql (continued)

-- Campaigns table
CREATE TABLE email_scheduler.campaigns (
    id INT PRIMARY KEY DEFAULT nextval('email_scheduler.seq_campaigns'),
    name TEXT NOT NULL,
    subject TEXT NOT NULL,
    body TEXT NOT NULL,
    scheduled_time TIME NOT NULL,
    active BOOLEAN DEFAULT TRUE
);

-- Recipients table
CREATE TABLE email_scheduler.recipients (
    id INT PRIMARY KEY DEFAULT nextval('email_scheduler.seq_recipients'),
    campaign_id INT REFERENCES email_scheduler.campaigns(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    sent BOOLEAN DEFAULT FALSE
);

-- Attachments table
CREATE TABLE email_scheduler.attachments (
    id INT PRIMARY KEY DEFAULT nextval('email_scheduler.seq_attachments'),
    campaign_id INT REFERENCES email_scheduler.campaigns(id) ON DELETE CASCADE,
    file_path TEXT NOT NULL
);
