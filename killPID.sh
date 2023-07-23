#!/bin/bash
port_to_check=3000
lsof_output=$(lsof -i tcp:"$port_to_check")

pid=$(echo "$lsof_output" | awk 'NR==2 {print $2}') # 只對第二行操作並找第二個字段
echo $pid
if [ $pid ];then
  echo "found pid: $pid"
  echo "Killing the process..."
  kill -9 "$pid"
  echo "Process with PID $pid has been terminated."
else
   echo  echo "No process found listening on port $port_to_check."
fi