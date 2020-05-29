#!/bin/bash

# Get last log ID number based on what files are in src/logs/
LASTLOGNO=`ls -1 src/logs/ | sort -V | tail -n1 | sed 's/[^0-9]//g'`
echo - LAST LOG NO.: $LASTLOGNO

# Since LASTLOGNO will have leading zeroes, force bash to treat it 
# as decimal instead of octal, and add 1 to it
NEWLOGNO=$((10#$LASTLOGNO + 1))
# Pad NEWLOGNO with leading zeroes
NEWLOGNO=$(printf "%04d" $NEWLOGNO)
echo - NEW LOG NO.: $NEWLOGNO

# Make new log name and pad the number with leading zeroes
NEWLOGNAME="log_$NEWLOGNO.js"

# Write boilerplate lines to new log file
printf "export const log_${NEWLOGNO}_pre = \`\\\\\n---\nLOG_$NEWLOGNO\nEPOCH TIMESTAMP 0000000000 (GMT 0000-00-00 00:00:00)\n---\n\`;\n\n" > src/logs/$NEWLOGNAME
printf "export const log_$NEWLOGNO = \`\\\\\n" >> src/logs/$NEWLOGNAME
printf "\\\\" >> src/logs/$NEWLOGNAME
printf "\n\n" >> src/logs/$NEWLOGNAME
printf "\\\\n\\\\" >> src/logs/$NEWLOGNAME
printf "\n\`;" >> src/logs/$NEWLOGNAME
echo - BOILERPLATE WRITTEN to $NEWLOGNAME

# Delete count line from log index, and the line above it
sed -i '$ d' src/logs/index.js
sed -i '$ d' src/logs/index.js
# Update log index with new log file
printf "export * from './log_$NEWLOGNO';" >> src/logs/index.js
# Add count line back to log index
printf "\n\nexport const count = $(($NEWLOGNO + 1));" >> src/logs/index.js
echo - LOG INDEX UPDATED
