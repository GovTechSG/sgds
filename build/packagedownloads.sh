#!/usr/bin/env bash
npm pack sgds-govtech # Download npm package tar directly

# Convert tar to zip and transfer to downloads directory
tar -xvf sgds-govtech-*.tgz
mv package sgds-govtech
zip -r sgds-govtech.zip sgds-govtech
mv sgds-govtech.zip assets/downloads/

# Clean up
rm -f sgds-govtech-*.tgz
rm -rf sgds-govtech
