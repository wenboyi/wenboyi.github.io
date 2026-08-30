(function () {
  var root = document.getElementById("scholar-stats");
  if (!root) return;

  var scholarId = root.getAttribute("data-scholar-id") || "9YmflWMAAAAJ";
  var scholarUrl = "https://scholar.google.ca/citations?user=" + scholarId + "&hl=en";

  function setMetric(id, label, value) {
    var el = document.getElementById(id);
    if (el) el.innerHTML = label + ": <strong>" + value + "</strong>";
  }

  function applyStats(stats) {
    setMetric("scholar-citations", "Citations", stats.citations);
    setMetric("scholar-hindex", "h-index", stats.h_index);
    setMetric("scholar-i10index", "i10-index", stats.i10_index);
    var asOf = document.getElementById("scholar-asof");
    if (asOf) asOf.textContent = "";
  }

  function plausible(stats) {
    var citations = Number(stats.citations);
    var hIndex = Number(stats.h_index);
    var i10 = Number(stats.i10_index);
    return (
      Number.isFinite(citations) &&
      Number.isFinite(hIndex) &&
      Number.isFinite(i10) &&
      citations >= 0 &&
      hIndex >= 0 &&
      i10 >= 0 &&
      hIndex <= citations &&
      i10 <= citations &&
      hIndex <= 200
    );
  }

  function fromCells(html) {
    var doc = new DOMParser().parseFromString(html, "text/html");
    var cells = doc.querySelectorAll("#gsc_rsb_st td.gsc_rsb_std");
    if (cells.length >= 5) {
      return {
        citations: cells[0].textContent.replace(/\D/g, ""),
        h_index: cells[2].textContent.replace(/\D/g, ""),
        i10_index: cells[4].textContent.replace(/\D/g, "")
      };
    }
    var nums = [];
    html.replace(/gsc_rsb_std[^>]*>([0-9,]+)/g, function (_, n) {
      nums.push(n.replace(/,/g, ""));
    });
    if (nums.length >= 5) {
      return { citations: nums[0], h_index: nums[2], i10_index: nums[4] };
    }
    return null;
  }

  function fromPapers(html) {
    var doc = new DOMParser().parseFromString(html, "text/html");
    var cites = [];
    doc.querySelectorAll("a.gsc_a_ac").forEach(function (anchor) {
      var n = parseInt(anchor.textContent.replace(/,/g, ""), 10);
      if (!isNaN(n)) cites.push(n);
    });
    if (!cites.length) {
      html.replace(/gsc_a_ac[^>]*>(\d+)/g, function (_, n) {
        cites.push(parseInt(n, 10));
      });
    }
    if (!cites.length) return null;
    cites.sort(function (a, b) { return b - a; });
    var hIndex = 0;
    for (var i = 0; i < cites.length; i++) {
      if (cites[i] >= i + 1) hIndex = i + 1;
      else break;
    }
    return {
      citations: String(cites.reduce(function (sum, n) { return sum + n; }, 0)),
      h_index: String(hIndex),
      i10_index: String(cites.filter(function (n) { return n >= 10; }).length)
    };
  }

  function parseStats(payload) {
    var html = payload;
    if (typeof payload === "string") {
      try {
        var json = JSON.parse(payload);
        if (json && typeof json.contents === "string") html = json.contents;
      } catch (e) {}
    } else if (payload && typeof payload.contents === "string") {
      html = payload.contents;
    }
    if (typeof html !== "string" || html.length < 200) return null;
    var stats = fromCells(html) || fromPapers(html);
    return stats && plausible(stats) ? stats : null;
  }

  function fetchWithTimeout(url, ms) {
    var controller = typeof AbortController !== "undefined" ? new AbortController() : null;
    var timer = controller ? setTimeout(function () { controller.abort(); }, ms) : null;
    return fetch(url, controller ? { signal: controller.signal } : {})
      .then(function (response) {
        if (!response.ok) throw new Error("HTTP " + response.status);
        return response.text();
      })
      .finally(function () { if (timer) clearTimeout(timer); });
  }

  function jsonpAllOrigins(url) {
    return new Promise(function (resolve, reject) {
      var cb = "__scholarStatsCb" + Date.now();
      var script = document.createElement("script");
      var timer = setTimeout(function () {
        cleanup();
        reject(new Error("JSONP timeout"));
      }, 10000);
      function cleanup() {
        clearTimeout(timer);
        if (script.parentNode) script.parentNode.removeChild(script);
        try { delete window[cb]; } catch (e) { window[cb] = undefined; }
      }
      window[cb] = function (data) {
        cleanup();
        resolve(data);
      };
      script.onerror = function () {
        cleanup();
        reject(new Error("JSONP error"));
      };
      script.src = "https://api.allorigins.win/get?callback=" + cb + "&url=" + encodeURIComponent(url);
      document.head.appendChild(script);
    });
  }

  var encoded = encodeURIComponent(scholarUrl);
  var attempts = [
    function () { return fetchWithTimeout("https://api.allorigins.win/get?url=" + encoded, 10000); },
    function () { return jsonpAllOrigins(scholarUrl); },
    function () { return fetchWithTimeout("https://api.allorigins.win/raw?url=" + encoded, 10000); },
    function () { return fetchWithTimeout("https://api.codetabs.com/v1/proxy?quest=" + encoded, 10000); },
    function () { return fetchWithTimeout("https://corsproxy.io/?" + encoded, 8000); }
  ];

  function tryAttempt(i) {
    if (i >= attempts.length) return;
    Promise.resolve()
      .then(attempts[i])
      .then(parseStats)
      .then(function (stats) {
        if (stats) applyStats(stats);
        else tryAttempt(i + 1);
      })
      .catch(function () { tryAttempt(i + 1); });
  }

  tryAttempt(0);
})();
