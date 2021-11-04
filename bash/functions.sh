#!/bin/bash


# Functions need to be defined before called

function say_hello {
    echo "Hello World!"
}
# Functions can take args and can return a status
function print_args {
    echo Hello $1
    return 0
}

say_hello

print_args "Sun"
print_args "keith"
# $? contains the return status of the pre execution
echo "The previous function has a return value of $?"