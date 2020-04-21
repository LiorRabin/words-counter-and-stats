#!/bin/bash

set -e

# in case "sudo" is needed
PERMISSION_PREFIX=""

# stop all processes
$PERMISSION_PREFIX docker-compose down