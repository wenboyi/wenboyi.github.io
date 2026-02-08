---
title: "Publications"  # Change for each file
layout: single
permalink: /publications/  # Change for each file
author_profile: true
class: wide
---

<div id="scholar-stats" style="font-size: 0.85em; color: #555; margin-bottom: 20px;">
  <a href="https://scholar.google.ca/citations?user=9YmflWMAAAAJ&hl=en&oi=ao" target="_blank" rel="noopener noreferrer" style="text-decoration: none; color: #4285f4;">
    <i class="fas fa-graduation-cap"></i> Google Scholar
  </a>
  &nbsp;|&nbsp;
  <span id="scholar-citations">Citations: —</span>
  &nbsp;|&nbsp;
  <span id="scholar-hindex">h-index: —</span>
  &nbsp;|&nbsp;
  <span id="scholar-i10index">i10-index: —</span>
</div>

<script>
(function() {
  var scholarId = '9YmflWMAAAAJ';
  var url = 'https://scholar.google.ca/citations?user=' + scholarId + '&hl=en';
  var proxyUrl = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(url);

  fetch(proxyUrl)
    .then(function(response) { return response.text(); })
    .then(function(html) {
      // Google Scholar profile page has a table with citation stats
      // The table cells contain: Citations, h-index, i10-index (All and Since columns)
      var parser = new DOMParser();
      var doc = parser.parseFromString(html, 'text/html');
      var cells = doc.querySelectorAll('#gsc_rsb_st td.gsc_rsb_std');
      if (cells.length >= 5) {
        var citations = cells[0].textContent.trim();
        var hindex = cells[2].textContent.trim();
        var i10index = cells[4].textContent.trim();
        document.getElementById('scholar-citations').textContent = 'Citations: ' + citations;
        document.getElementById('scholar-hindex').textContent = 'h-index: ' + hindex;
        document.getElementById('scholar-i10index').textContent = 'i10-index: ' + i10index;
      }
    })
    .catch(function() {
      // If fetch fails, leave the dashes as placeholder
    });
})();
</script>

 <sup>*Shared first author* \*</sup> 

- **Yi, W.**, & Palmer, C. (2026). Respiratory Synchrony and Individual Differences Causally Influence Dyadic Interpersonal Coordination. Psychophysiology, 63(2), e70254. https://doi.org/10.1111/psyp.70254

- **Yi, W.**, Palmer, C., Serian, A., Roy, M. (2025). Individualizing musical tempo to spontaneous rates maximizes music-induced hypoalgesia. PAIN, doi: 10.1097/j.pain.0000000000003513.

- Høffding, S., ... ,**Yi, W.**,Danielsen, A., Jensenius, A. (2025). Introducing the MusicLab Copenhagen Dataset. Music & Science, 8. https://doi.org/10.1177/20592043241303288

- Høffding, S.\*, **Yi, W.**\*, Lippert, E., Gonzalez Sanchez, V., Bishop, L., Laeng, B., Danielsen, A.,
Jensenius, A. & Wallot, S. (2023). Into the Hive-mind: Shared absorption and cardiac interrelations in expert and student string quartets. Music & Science, 6, doi: 10.1177/20592043231168597.

- **Yi, W.** (2022). When hearts beat as one: cardiac dynamics and synchrony in string quartet performances. Master's thesis. University of Oslo.
  
- **Yi, W.** (2022). The reproduction of auditory spatial perception in classical music recordings. Audio Engineering, 2022, 46(7). [In Chinese].

- **Yi, W.** (2021). A pilot study of expressive body movement on audio parameters of piano performances. Proceedings of the 2nd Nordic Sound and Music Computing Conference, 24, Copenhagen, Denmark.

- Hu, Z. & **Yi, W.** (2021). An introduction to the impact of developments in audio technology on the concept of music mixing composition. Advanced Motion Picture Technology, 2021 (05). [In Chinese].

