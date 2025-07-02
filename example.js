// If absolute URL from the remote server is provided, configure the CORS
// header on that server.
// 注意跨域问题
var url = 'https://github.com/SoftWare2022Testing/dapp-testnet/blob/main/wuji.pdf';

// Loaded via <script> tag, create shortcut to access PDF.js exports.
var pdfjsLib = window['pdfjs-dist/build/pdf'];

// The workerSrc property shall be specified.
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.5.207/pdf.worker.min.js';

var loadingTask = pdfjsLib.getDocument(url);
var pdfHandler = null;
// global page number control
var pageNumber = 1;
var totalNumber = -1;

// Asynchronous download of PDF
loadingTask.promise.then(
    // success callback
    function(pdf) {
        console.log('PDF loaded');
        pdfHandler = pdf;
        totalNumber = pdf.numPages;
        setPage(1);
    }, 
    // failure callback
    function (reason) {
        // PDF loading error
        console.error(reason);
    }
);

function setPage(pageNumber) {
    pdfHandler.getPage(pageNumber).then(
        function(page) {
            console.log('Page loaded: ' + pageNumber);

            var scale = 1.0;
            var viewport = page.getViewport({scale: scale});

            // Prepare canvas using PDF page dimensions
            var canvas = document.getElementById('the-canvas');
            var context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            // Render PDF page into canvas context
            var renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            var renderTask = page.render(renderContext);
            renderTask.promise.then(function () {
                console.log('Page rendered');
            });
        }
    );
}

function goToPrePage() {
    if (pageNumber == 1) {
        alert("这是第一页！");
    } else {
        pageNumber--;
        setPage(pageNumber);
    }
}

function goToNextPage() {
    if (pageNumber == totalNumber) {
        alert("这是最后一页！");
    } else {
        pageNumber = pageNumber + 1;
        setPage(pageNumber);   
    }
}

