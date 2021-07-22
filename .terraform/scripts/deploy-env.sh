#!/bin/bash

. .env

terraform init

terraform workspace select default

terraform apply -auto-approve -parallelism=3