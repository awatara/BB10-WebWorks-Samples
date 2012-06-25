function onSuccess() {
    document.getElementById("log").innerHTML += "<p>Invocation sucessful</p>";
}

function onError(error) {
    document.getElementById("log").innerHTML += "<p>Invocation error: " + error + "</p>";
}

function invokeBrowser() {
    blackberry.invoke.invoke({
        target: "sys.browser",
    }, onSuccess, onError);
}

function invokeBrowserUri() {
    blackberry.invoke.invoke({
        target: "sys.browser",
        uri: "http://www.blackberry.com"
    }, onSuccess, onError);
}

function invokeHelp() {
    blackberry.invoke.invoke({
        target: "sys.help"
    }, onSuccess, onError);
}

function invokeAdobeReader() {
    blackberry.invoke.invoke({
        target: "com.adobe.AdobeReader",
    }, onSuccess, onError);
}

function invokeAdobeReaderPdf() {
    blackberry.invoke.invoke({
        target: "com.adobe.AdobeReader",
        action: "bb.action.OPEN",
        type: "application/pdf",
        uri: "file:///accounts/1000/shared/documents/Getting Started with Adobe Reader.pdf"
    }, onSuccess, onError);
}

function invokeApp() {
    blackberry.invoke.invoke({
        target: "net.rim.webworks.invokable", 
        action: "bb.action.OPEN",
        type: "text/plain",
        data: "Hello, I invoked you"
    }, onSuccess, onError);
}

function invokePictures() {
    
    downloadPicture();
    
    blackberry.invoke.invoke({
        uri: "file:///accounts/1000/shared/downloads/HTML5_Logo_512.png",
    }, onSuccess, onError);
}

function downloadPicture() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', "/HTML5_Logo_512.png", true);
    xhr.responseType = 'arraybuffer';
    
    xhr.onload = function(e) {
        if (this.status == 200) {
            var bb = new window.WebKitBlobBuilder();
            bb.append(this.response);
            var blob = bb.getBlob('image/png');
            saveFile(blob);
        }
    };
    xhr.send();
}

function saveFile (blob) {
    function gotFs(fs) {
        fs.root.getFile("/accounts/1000/shared/downloads/HTML5_Logo_512.png", {create: true}, gotFile, errorHandler);
    }

    function gotFile(fileEntry) {
        fileEntry.createWriter(gotWriter, errorHandler);
    }

    function gotWriter(fileWriter) {
        fileWriter.onerror = function (e) {
            alert("Failed to write PNG: " + e.toString());
        }
        fileWriter.write(blob);
    }
    window.webkitRequestFileSystem(PERSISTENT, 10 * 1024, gotFs, errorHandler);
}

function errorHandler(e) {
    var msg = '';

    switch (e.code) {
        case FileError.QUOTA_EXCEEDED_ERR:
            msg = 'QUOTA_EXCEEDED_ERR';
            break;
        case FileError.NOT_FOUND_ERR:
            msg = 'NOT_FOUND_ERR';
            break;
        case FileError.SECURITY_ERR:
            msg = 'SECURITY_ERR';
            break;
        case FileError.INVALID_MODIFICATION_ERR:
            msg = 'INVALID_MODIFICATION_ERR';
            break;
        case FileError.INVALID_STATE_ERR:
            msg = 'INVALID_STATE_ERR';
            break;
        default:
            msg = 'Unknown Error';
          break;
    };

    alert('Error: ' + msg);
}
