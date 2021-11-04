#!/bin/bash
# We always need to have our first line be #!/bin/bash
# To Run We can use ./<File_Name>
# To give permission to run this script use
# chmod +x <File_Name>


# NO SPACES
hello="Hello"
world="world"
index=10
# This is how we use variables
echo $hello $world

# CONDITIONAL
# Need Spaces
# -eq equal -z null -lt less than -gt greater than -le less than equal -ge greater than equal -ne not equal
if [ $index -lt 5 ]
then
    echo $hello
else
    echo "Nope Greater Than"
fi
# When comparing strings it is best pratice to put vars into quotes
# if [ "$foo" == "$bar" ] And if [ "$foo" != "$bar" ]

# WHILE
# Until loops follow While Loop closely, Until loops run until condition is true
count=0
while [ $count -le 10 ]
do
    echo $count
    ((count++))
done

echo "All Done With Loop"

# FOR
names="Keith Ryan Kirtfield"
for name in $names
do
    echo $name
done

echo "Done writting name"



# RANGES
# FOR value in <RANGE>  i.e. {1..5}
# If the first num > second num than COUNTS DOWN
# x..y..<Values to count up/down> i.e. 10..0..2 Count down by 2 to reach 0
# can use break to break out of loop


# SELECT Presents all elements in console for use to select
select var in $names
do
    echo $var
done