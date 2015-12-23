#!/usr/bin/env bash



#  Product Hunt CLI Tool
#  A command line tool for communicating with the Product Hunt API.
#  Copyright (C) Kyle Brumm <http://kylebrumm.com>



# -------------------------------------------------------
# PH VARIABLES
# -------------------------------------------------------

# Set up some variables
RED=$(tput setaf 1);
GREEN=$(tput setaf 2);
YELLOW=$(tput setaf 3);
WHITE=$(tput setaf 7);
RESET=$(tput sgr0);

PH_DEV_TOKEN=""
PH_KEY=""
PH_SECRET=""

PH_REQUEST_BASE_ROUTE="https://api.producthunt.com/v1"
PH_REQUEST_HEADERS="-H 'Accept: application/json' -H 'Content-Type: application/json' -H 'Authorization: Bearer $PH_DEV_TOKEN' -H 'Host: api.producthunt.com'"



# -------------------------------------------------------
# PH HELPERS
# -------------------------------------------------------

# Display help information
ph_help() {
cat <<EOF

Product Hunt CLI Tool

A command line tool for communicating with the Product Hunt API.

Usage:
    ph <endpoint> <options>

Endpoints:
    posts
        --day="2015-10-26"    Get posts from a specific day
    search
        category="games"      Get posts from a specific category

EOF
exit;
}

# Escape a string
escape_string() {
    printf '%s' "$1" | sed -e 's/[][\/^*@:+.$-]/\\&/g'
}

# Throw an error
error() {
    i=0
    while [ "$i" -lt "$2" ]; do
        printf "    "
        i=$[$i+1]
    done
    printf "${RED}Error:${WHITE} ${1}\n"
    exit
}

# Urlencode a string
rawurlencode() {
  local string="${1}"
  local strlen=${#string}
  local encoded=""

  for (( pos=0 ; pos<strlen ; pos++ )); do
     c=${string:$pos:1}
     case "$c" in
        [-_.~a-zA-Z0-9] ) o="${c}" ;;
        * )               printf -v o '%%%02X' "'$c"
     esac
     encoded+="${o}"
  done
  echo "${encoded}"    # You can either set a return variable (FASTER)
}



# -------------------------------------------------------
# PH ENDPOINTS
# -------------------------------------------------------

# ME: Handle getting your personal info
ph_endpoint_me() {
    printf "${GREEN}==> Personal${WHITE}\n"
    curl $PH_REQUEST_HEADERS "$PH_REQUEST_BASE_ROUTE/me"
}

# POSTS: Handle getting posts
ph_endpoint_posts() {
    printf "${GREEN}==> Posts${WHITE}\n"
}

# USERS: Handle getting users
ph_endpoint_users() {
    printf "${GREEN}==> Users${WHITE}\n"
}



# -------------------------------------------------------
# PH INIT
# -------------------------------------------------------

# Check if help info should be displayed
if [ "$1" = "-h" -o "$1" = "--help" -o -z "$1" ]; then
    ph_help;
fi

# Check if the user has added their developer token
if [ ! "$PH_DEV_TOKEN" ]; then
    error "You need to add your developer token..." 0
    # Tell the user where to go to get a developer token
    # Ask the user to enter their token
    # Replace the PH_DEV_TOKEN to include their token they entered
fi

# See what endpoint we need
case "$1" in
    posts)
        ph_endpoint_posts
        ;;
    users)
        ph_endpoint_users
        ;;
    *)
        # Illegal task
        printf "${RED}Error:${WHITE} Illegal task -- $1 (see \"ph --help\" for help)\n"
        ;;
esac



# -------------------------------------------------------
# TO-DO
# -------------------------------------------------------
#
# - Prompt user for their dev token and add it to the script
# - Handle all the endpoints
#   - Posts
#   - Categories
#   - Users
#   - Collections
#   - Comments
#   - Notifications
#   - Live Events
# - Handle different endpoint options
#   - Day/Days ago
#   - Search Category/URL
#   - Order
#   - Pagination
#
# -------------------------------------------------------

# -------------------------------------------------------
# HELP
# -------------------------------------------------------
#
# - https://api.producthunt.com/v1/docs
#
# -------------------------------------------------------
