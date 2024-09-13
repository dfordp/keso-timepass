## Xenon Stack Project

### Problem Statement

We were asked to develop an AI driven real estate solution  which would assist users in their property search , whether it be a residential property or a commercial property.


### Working

The developed application is built on top MERN tech stack utlizing the firebase for authentication , cloudinary cloud Storage for storing files , along with @asymmetrik/akin for creating a node.js compatible driven recommdation engine , further compatible with the mongoose library.


It allows users to upload their own properties as well as see others properties and view data.

With each viewing, a request is sent to the engine which tracks all the user's viewing and add's to the model , it's usage may be very raw at the beginning but it is going to improve performace by a significant margin.


## Linux Command Project Submission 


step 1    nano ~/bin/sysopctl

step 2 #!/bin/bash
VERSION="v0.1.0"

# Display the help message
function show_help() {
    echo "Usage: sysopctl [subcommand] [options]"
    echo ""
    echo "Subcommands:"
    echo "  service list                   List all running services"
    echo "  service start <service-name>   Start a service"
    echo "  service stop <service-name>    Stop a service"
    echo "  system load                    Show current system load"
    echo "  disk usage                     Check disk usage"
    echo "  process monitor                Monitor system processes"
    echo "  logs analyze                   Analyze system logs"
    echo "  backup <path>                  Backup system files"
    echo ""
    echo "Options:"
    echo "  --help                         Show this help message"
    echo "  --version                      Show the version information"
}

# Show the version information
function show_version() {
    echo "sysopctl version $VERSION"
}

# Main command processing
case "$1" in
    --help)
        show_help
        ;;
    --version)
        show_version
        ;;
    service)
        case "$2" in
            list)
                systemctl list-units --type=service
                ;;
            start)
                sudo systemctl start "$3"
                ;;
            stop)
                sudo systemctl stop "$3"
                ;;
            *)
                echo "Invalid service command"
                ;;
        esac
        ;;
    system)
        if [ "$2" == "load" ]; then
            uptime
        else
            echo "Invalid system command"
        fi
        ;;
    disk)
        if [ "$2" == "usage" ]; then
            df -h
        else
            echo "Invalid disk command"
        fi
        ;;
    process)
        if [ "$2" == "monitor" ]; then
            top
        else
            echo "Invalid process command"
        fi
        ;;
    logs)
        if [ "$2" == "analyze" ]; then
            journalctl -p 3 -xb
        else
            echo "Invalid logs command"
        fi
        ;;
    backup)
        if [ -n "$2" ]; then
            rsync -av --progress "$2" /backup/location/
        else
            echo "Please specify a path to backup"
        fi
        ;;
    *)
        echo "Unknown command: $1"
        show_help
        ;;
esac



step 3 chmod +x ~/bin/sysopctl


step 4 Add ~/bin to your PATH as described in the previous message.

Step 5 sudo nano /usr/share/man/man1/sysopctl.1

Step 6 .TH SYSOPCTL "1" "September 2024" "sysopctl v0.1.0" "User Commands"
.SH NAME
sysopctl \- Manage system resources and tasks
.SH SYNOPSIS
sysopctl [subcommand] [options]
.SH DESCRIPTION
sysopctl is a command designed to manage system services, processes, and system health.
.SH OPTIONS
.TP
.B --help
Display this help message.
.TP
.B --version
Display the version information.
...


Step 7 sudo mandb
