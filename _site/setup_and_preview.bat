@echo off
REM === Setup and Preview Jekyll Site ===
REM Run this script from the website folder (right-click > Open in Terminal, then: .\setup_and_preview.bat)

echo.
echo === Step 1: Setting Ruby PATH ===
set PATH=C:\Ruby40-x64\bin;C:\Ruby40-x64\msys64\usr\bin;%PATH%
ruby -v
if errorlevel 1 (
    echo ERROR: Ruby not found at C:\Ruby40-x64. Please install Ruby+DevKit from https://rubyinstaller.org/
    pause
    exit /b 1
)

echo.
echo === Step 2: Removing old Gemfile.lock ===
if exist Gemfile.lock del Gemfile.lock

echo.
echo === Step 3: Installing Bundler ===
gem install bundler

echo.
echo === Step 4: Installing dependencies (bundle install) ===
bundle install
if errorlevel 1 (
    echo.
    echo ERROR: bundle install failed. See error above.
    pause
    exit /b 1
)

echo.
echo === Step 5: Starting Jekyll server ===
echo.
echo Your site will be available at: http://localhost:4000
echo Press Ctrl+C to stop the server.
echo.
bundle exec jekyll serve --livereload
pause
