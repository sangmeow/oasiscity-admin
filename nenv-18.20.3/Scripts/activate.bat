
@echo off
set "NODE_VIRTUAL_ENV=S:\github\oasiscity_nodejs_library\test-folder\nenv-18.20.3"
if not defined PROMPT (
    set "PROMPT=$P$G"
)
if defined _OLD_VIRTUAL_PROMPT (
    set "PROMPT=%_OLD_VIRTUAL_PROMPT%"
)
if defined _OLD_VIRTUAL_NODE_PATH (
    set "NODE_PATH=%_OLD_VIRTUAL_NODE_PATH%"
)
set "_OLD_VIRTUAL_PROMPT=%PROMPT%"
set "PROMPT=(nenv-18.20.3) %PROMPT%"
if defined NODE_PATH (
    set "_OLD_VIRTUAL_NODE_PATH=%NODE_PATH%"
    set NODE_PATH=
)
if defined _OLD_VIRTUAL_PATH (
    set "PATH=%_OLD_VIRTUAL_PATH%"
) else (
    set "_OLD_VIRTUAL_PATH=%PATH%"
)
set "PATH=%NODE_VIRTUAL_ENV%\Scripts;%PATH%"
:END

