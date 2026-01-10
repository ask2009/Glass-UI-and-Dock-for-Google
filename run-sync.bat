@echo off
setlocal

:: ===== common に移動して webpack 実行 =====
cd /d "%~dp0common"
call npx webpack
if errorlevel 1 (
  echo webpack に失敗しました
  pause
  exit /b 1
)

:: ===== コピー設定 =====
set source=%~dp0common
set destination1=%~dp0firefox
set destination2=%~dp0chrome

:: Firefox へコピー
robocopy "%source%" "%destination1%" /E /COPY:DATS /R:3 /W:5 ^
/XF ".babelrc" "package.json" "package-lock.json" "webpack.config.js" "tsconfig.json" ^
/XD "node_modules"

:: Chrome へコピー
robocopy "%source%" "%destination2%" /E /COPY:DATS /R:3 /W:5 ^
/XF ".babelrc" "package.json" "package-lock.json" "webpack.config.js" "tsconfig.json" ^
/XD "node_modules"

echo すべてのコピー完了

:: ===== chrome-patch.js 実行 =====
cd /d "%~dp0"
node chrome-patch.js

pause
