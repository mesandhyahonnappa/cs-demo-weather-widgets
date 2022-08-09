'use strict';

const fs = require('fs');
const packageFile = require('./packageFile');
const semver = require('semver');

function getBumpType() {
  const lastArg = process.argv[process.argv.length - 1];
  if (['prerelease', 'prepatch', 'preminor', 'premajor', 'patch', 'minor', 'major'].includes(lastArg)) {
    return lastArg;
  }
  return 'prerelease';
}

const type = getBumpType();
const pkg = packageFile.read();
pkg.version = semver.inc(pkg.version, type);
packageFile.write(pkg);
