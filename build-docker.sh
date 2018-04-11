#!/bin/sh

set -e

echo ">>> Building docker image"
sudo docker build -t ranking-system-ui .

