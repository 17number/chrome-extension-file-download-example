function handleDownload() {
  const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
  const content = 'あいうえお,かきくけこ,さしすせそ\nたちつてと,なにぬねの,はひふへほ';
  const blob = new Blob([ bom, content ], { "type" : "text/csv" });

  if (window.navigator.msSaveBlob) {
    window.navigator.msSaveBlob(blob, "test.csv");
    window.navigator.msSaveOrOpenBlob(blob, "test.csv");
  } else {
    const url = window.URL.createObjectURL(blob);
    document.getElementById("myDownload").href = url;
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
    }, 1000)
  }
}

(function() {
  'use strict';
  document.body.insertAdjacentHTML(
    "afterEnd",
    `
    <a id="myDownload" href="#" download="test.csv">ダウンロード</a>
    `
  );
  document.getElementById("myDownload").addEventListener("click", handleDownload);
  document.getElementById("myDownload").click();
  document.getElementById("myDownload").remove();
})();
