Error 1 : 
Unchecked runtime.lastError: Could not establish connection. Receiving end does not exist.
Context
Unknown
Stack Trace
:0 (anonymous function)

error 2 : 
The source list for the Content Security Policy directive 'default-src' contains an invalid source: 'data:gap:'. It will be ignored.
Context
popup/index.html
Stack Trace
popup/index.html:14 (anonymous function)

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MeetScribe</title>
  <link rel="stylesheet" href="../css/main.css">
  <meta http-equiv="Content-Security-Policy"
  content="default-src 'self' data:gap: http://www.visitsingapore.com 
  https://ssl.gstatic.com 'unsafe-eval';
  style-src 'self' 'unsafe-inline';
  media-src *;
  script-src 'sha256-V+/U3qbjHKP0SaNQhMwYNm62gfWX4QHwPJ7We1PXokI='
">
</head>
<body>
  <div class="container">
    <div class="logo">

error 3 : 

Refused to load the script 'chrome-extension://aaaiedpjkfmmeeamnlbambcojklnjlfm/js/popup.js' because it violates the following Content Security Policy directive: "script-src 'sha256-V+/U3qbjHKP0SaNQhMwYNm62gfWX4QHwPJ7We1PXokI='". Note that 'script-src-elem' was not explicitly set, so 'script-src' is used as a fallback.
Context
popup/index.html
Stack Trace
popup/index.html:0 (anonymous function)
