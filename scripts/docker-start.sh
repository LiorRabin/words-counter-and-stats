#!/bin/bash

set -e

# in case "sudo" is needed
PERMISSION_PREFIX=""

# start all processes
$PERMISSION_PREFIX docker-compose up --build -d