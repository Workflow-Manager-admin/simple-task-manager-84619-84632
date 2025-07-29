#!/bin/bash
cd /home/kavia/workspace/code-generation/simple-task-manager-84619-84632/todo_app_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

