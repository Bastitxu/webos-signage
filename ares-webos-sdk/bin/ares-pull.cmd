:: Created by npm, please don't edit manually.
@SET SCRIPT="%~dp0\.\node_modules\ares-webos-sdk\bin\ares-pull.js"

@IF NOT EXIST %SCRIPT% (
    @SET SCRIPT="%~dp0\.\ares-pull.js"
)

@IF EXIST "%~dp0\x86\node.exe" (
    @SETLOCAL
    @SET "PATH=%~dp0\x86;%PATH%"
    node %SCRIPT% %*
) ELSE (
  node  %SCRIPT% %*
)
