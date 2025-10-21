# 企业版接诉即办系统启动器
# 设置控制台编码为UTF-8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "    企业版接诉即办系统启动器" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 检查Node.js是否安装
try {
    $nodeVersion = node --version 2>$null
    if ($nodeVersion) {
        Write-Host "✓ Node.js版本: $nodeVersion" -ForegroundColor Green
    }
} catch {
    Write-Host "✗ 错误：未检测到Node.js，请先安装Node.js" -ForegroundColor Red
    Write-Host "下载地址：https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "按回车键退出"
    exit 1
}

# 检查npm是否可用
try {
    $npmVersion = npm --version 2>$null
    if ($npmVersion) {
        Write-Host "✓ npm版本: $npmVersion" -ForegroundColor Green
    }
} catch {
    Write-Host "✗ 错误：未检测到npm，请检查Node.js安装" -ForegroundColor Red
    Read-Host "按回车键退出"
    exit 1
}

# 切换到脚本所在目录
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

Write-Host ""
Write-Host "正在启动企业版接诉即办系统..." -ForegroundColor Green
Write-Host "启动地址：http://localhost:3000/" -ForegroundColor Yellow
Write-Host ""
Write-Host "按 Ctrl+C 可以停止服务" -ForegroundColor Cyan
Write-Host ""

# 启动开发服务器
try {
    npm run dev
} catch {
    Write-Host "启动失败，请检查项目配置" -ForegroundColor Red
    Read-Host "按回车键退出"
}
