#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readlineSync = require('readline-sync');
const { execSync } = require('child_process');

// Get current project path
const parentPath = path.resolve(__dirname, '..');
const packageJsonPath = path.join(parentPath, 'package.json');

// Read json file into a variable
const json = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

// Get current version
const currentVersion = json.version.split('.').map(part => parseInt(part));

let choice;

while (!['Major', 'minor', 'patch'].includes(choice)) {
  // Ask user which part to update
  choice = readlineSync.question("Do you want to update 'Major', 'minor', or 'patch'? ");

  if (!['Major', 'minor', 'patch'].includes(choice)) {
    console.log('Unrecognized option. Please try again.');
  }
}

let nextVersion;

// Update version number based on user's choice
if (choice === 'Major') {
  nextVersion = [currentVersion[0] + 1, 0, 0];
} else if (choice === 'minor') {
  nextVersion = [currentVersion[0], currentVersion[1] + 1, 0];
} else if (choice === 'patch') {
  nextVersion = [currentVersion[0], currentVersion[1], currentVersion[2] + 1];
}

// Update version in json
json.version = nextVersion.join('.');

// Write the updated json object back into the file
fs.writeFileSync(packageJsonPath, JSON.stringify(json, null, 2), 'utf-8');

// Change to project directory
process.chdir(parentPath);

// Git add and commit the changes
execSync('git add .');
execSync(`git commit -m "Updated version to ${json.version}"`);

// Remove the dist folder if it exists
const distPath = path.join(parentPath, 'dist');
if (fs.existsSync(distPath)) {
  execSync('rmdir /s /q dist');
}

// Remove electron_dist folder if it exists
const distElectronPath = path.join(parentPath, 'dist_electron');
if (fs.existsSync(distElectronPath)) {
  execSync('rmdir /s /q dist_electron');
}
// Build the webkit
execSync('npm run electron:build');

console.log('Build completata con successo!');
