@echo off
REM =============================================
REM EmailScheduler Database Installer (Single SQL)
REM =============================================

REM ===============================
REM Configure PostgreSQL connection
REM ===============================
SET PGHOST=172.30.99.85
SET PGPORT=5432
SET PGUSER=postgres
SET PGPASSWORD=postgres
SET PGDATABASE=intake_database

REM ===============================
REM Path to master installer SQL (relative to this .bat)
REM ===============================
SET INSTALLER_SQL=%~dp0Installer.sql

REM ===============================
REM Run installer
REM ===============================
echo Running EmailScheduler installer...
psql -v client_encoding=UTF8 -f "%INSTALLER_SQL%"

echo Database installation completed!
pause
