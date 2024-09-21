@echo off

SET SERVER_PORT=5000
SET SITE_PORT=4200

cd "os"

start cmd /k "start_backend.bat"
start cmd /k "start_frontend.bat"