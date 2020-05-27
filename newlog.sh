# Get new log ID number and create boilerplate JS file
LASTLOGNO=`ls -1 src/logs/ | tail -n1 | sed 's/[^0-9]//g'`
NEWLOGNO=$(($LASTLOGNO + 1))
NEWLOGNAME="log$NEWLOGNO.js"
printf "export const log0 = \`\\\\\n\n\`;" > src/logs/$NEWLOGNAME

# Delete count line from log index, and the line above it
sed -i '$ d' src/logs/index.js
sed -i '$ d' src/logs/index.js
# Update log index with new log file
printf "export * from './log$NEWLOGNO'" >> src/logs/index.js
# Add count line back to log index
printf "\n\nexport const count = $(($NEWLOGNO + 1));" >> src/logs/index.js
