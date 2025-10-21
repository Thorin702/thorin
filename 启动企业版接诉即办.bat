@echo off
chcp 65001 >nul
title 企业版接诉即办系统启动器

echo.
echo ========================================
echo    企业版接诉即办系统启动器
echo ========================================
echo.

:: 检查Node.js是否安装
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo 错误：未检测到Node.js，请先安装Node.js
    echo 下载地址：https://nodejs.org/
    pause
    exit /b 1
)

:: 检查npm是否可用
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo 错误：未检测到npm，请检查Node.js安装
    pause
    exit /b 1
)

:: 切换到项目目录
cd /d "%~dp0"

echo 正在启动企业版接诉即办系统...
echo 启动地址：http://localhost:3000/
echo.
echo 按 Ctrl+C 可以停止服务
echo.

:: 启动开发服务器
npm run dev

pause
