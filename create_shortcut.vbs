' Create Desktop Shortcut Script
Option Explicit

Dim objShell, objShortcut, strDesktop, strTargetPath, strWorkingDir
Dim strIconPath, strDescription, strArgs

' Create Shell object
Set objShell = CreateObject("WScript.Shell")

' Get desktop path
strDesktop = objShell.SpecialFolders("Desktop")

' Set target path (PowerShell script)
strTargetPath = "powershell.exe"
strWorkingDir = CreateObject("Scripting.FileSystemObject").GetParentFolderName(WScript.ScriptFullName)
strIconPath = "powershell.exe,0"
strDescription = "Enterprise Complaint Handling System Launcher"

' Build arguments string
strArgs = "-ExecutionPolicy Bypass -File " & strWorkingDir & "\启动企业版接诉即办.ps1"

' Create shortcut object
Set objShortcut = objShell.CreateShortcut(strDesktop & "\Enterprise Complaint System.lnk")

' Set shortcut properties
objShortcut.TargetPath = strTargetPath
objShortcut.Arguments = strArgs
objShortcut.WorkingDirectory = strWorkingDir
objShortcut.IconLocation = strIconPath
objShortcut.Description = strDescription
objShortcut.WindowStyle = 1

' Save shortcut
objShortcut.Save

' Show success message
WScript.Echo "Desktop shortcut created successfully!"
WScript.Echo "Shortcut location: " & strDesktop & "\Enterprise Complaint System.lnk"
WScript.Echo "Double-click to launch the system"

' Clean up objects
Set objShortcut = Nothing
Set objShell = Nothing
