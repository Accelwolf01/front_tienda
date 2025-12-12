#!/bin/bash

# Install dependencies
npm install

# Build the application
npm run build -- --configuration production

# Ensure _redirects file is in the output directory
cp public/_redirects dist/fornt_tienda/browser/_redirects

echo "Build completed successfully!"
