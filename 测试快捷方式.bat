@echo off
chcp 65001 >nul
title 测试桌面快捷方式

echo.
echo ========================================
echo    测试桌面快捷方式是否工作正常
echo ========================================
echo.

echo 正在测试桌面快捷方式...
echo.

:: 检查桌面快捷方式是否存在
if exist "%USERPROFILE%\Desktop\Enterprise Complaint System.lnk" (
    echo ✓ 桌面快捷方式存在
    echo 位置: %USERPROFILE%\Desktop\Enterprise Complaint System.lnk
    echo.
    echo 正在测试启动脚本...
    
    :: 检查PowerShell脚本是否存在
    if exist "启动企业版接诉即办.ps1" (
        echo ✓ PowerShell启动脚本存在
        echo.
        echo 正在测试Node.js环境...
        
        :: 检查Node.js
        node --version >nul 2>&1
        if %errorlevel% equ 0 (
            echo ✓ Node.js环境正常
            echo.
            echo 正在测试npm环境...
            
            :: 检查npm
            npm --version >nul 2>&1
            if %errorlevel% equ 0 (
                echo ✓ npm环境正常
                echo.
                echo ========================================
                echo    所有检查通过！快捷方式可以正常使用
                echo ========================================
                echo.
                echo 现在你可以：
                echo 1. 双击桌面上的"Enterprise Complaint System"快捷方式
                echo 2. 系统将自动启动并在浏览器中打开
                echo 3. 访问地址：http://localhost:3000/
                echo.
                echo 或者直接运行：npm run dev
                echo.
            ) else (
                echo ✗ npm环境异常，请检查Node.js安装
            )
        ) else (
            echo ✗ Node.js环境异常，请安装Node.js
        )
    ) else (
        echo ✗ PowerShell启动脚本不存在
    )
) else (
    echo ✗ 桌面快捷方式不存在
    echo 请重新运行"创建桌面快捷方式.vbs"脚本
)

echo.
pause
