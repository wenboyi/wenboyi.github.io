---
title: "Homepage"  # Change for each file
layout: home
author_profile: true
show_recent_posts: false
classes: wide

---

Welcome!

I am a Ph.D. candidate in Experimental Psychology (Cognition & Cognitive Neuroscience) at [McGill University, Canada](https://www.mcgill.ca/psychology/), where I am advised by [Dr. Caroline Palmer](https://www.mcgill.ca/spl/palmer). Before joining McGill, I trained as an audio engineer in China. Long hours in the studio sparked my curiosity about the science behind how people appreciate the subtle nuances refined by musicians and engineers. This drew me to music cognition and led me to Europe, where I earned an M.Phil. in Music Technology at the [University of Oslo, Norway](https://www.uio.no/english/index.html), and worked as a research assistant in the FRONT Neuro Lab at the [RITMO Centre of Excellence](https://www.uio.no/ritmo/english).

My Ph.D. dissertation explores individual differences in music perception and production, specifically, how rhythmic entrainment occurs within and between individuals. The work integrates high-precision auditory-motor behavioral sequences with EEG, ECG, and respiration in both individual and group settings. Previous studies have examined how individual differences influence [music’s pain-reducing effects](https://journals.lww.com/pain/abstract/2025/08000/individualizing_musical_tempo_to_spontaneous_rates.11.aspx) and how [partners synchronize their hearts and breathing during joint action](https://onlinelibrary.wiley.com/doi/10.1111/psyp.70254).

My ongoing work uses neurophysiological hyperscanning to focus on body-brain interactions and their role in auditory-motor coordination. I am passionate about using a data-driven, basic-science approach to advance our understanding of auditory cognition, with the goal of developing applications of music as a tool to improve human well-being.

Beyond academia, I have a deep passion for classical music. My journey as a concert pianist began at age five, leading to performances in major concert halls and multiple championships at provincial and national levels in China. These experiences have profoundly shaped my interest in music both as an art form and as a scientific perspective on human behavior. Nowadays, you can (frequently) find me at concerts in Montreal's Place des Arts.

<h4 class="recent-updates__title">Recent Updates</h4>

<div class="news-feed">
{% for item in site.data.news limit: 3 %}
<div class="news-item">
  <strong class="news-date">{{ item.date }}</strong><br>
  {{ item.content | markdownify | remove: '<p>' | remove: '</p>' }}
</div>
{% endfor %}
</div>

## Contact Information

<div class="contact-card">
  <strong>Wenbo Yi</strong><br>
  wenbo.yi (at) mail.mcgill.ca<br><br>
  <em>Sequence Production Lab (SPL), Department of Psychology</em><br>
  <em>McGill University</em><br>
  <em>2001 McGill College, Montreal, Quebec, Canada, H3A 1G1</em>
</div>
