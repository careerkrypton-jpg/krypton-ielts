@echo off
title Krypton IELTS - Production Preview
echo Starting Production Preview on http://localhost:4173 ...
start http://localhost:4173
npx vite preview --port 4173 --host
pause

