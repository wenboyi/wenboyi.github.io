---
title: "Wenbo YI's Homepage"  # Change for each file
layout: home
author_profile: true
show_recent_posts: false

---


Welcome!

I am a Ph.D. candidate in Experimental Psychology (Cognition & Cognitive Neuroscience) at [McGill University, Canada](https://www.mcgill.ca/psychology/), where I am advised by [Dr. Caroline Palmer](https://www.mcgill.ca/spl/palmer). Prior to joining McGill, I trained as an audio engineer at the Bachelor's and Master's levels in China. I then obtained my M.Phil. in Music Technology from the [University of Oslo, Norway](https://www.uio.no/english/index.html), where I also worked as a research assistant in the FRONT Neuro Lab at the [RITMO Center of Excellence](https://www.uio.no/ritmo/english) under the guidance of [Dr. Tor Endestad](https://www.sv.uio.no/psi/english/people/academic/tendesta/) and [Dr. Alexander Refsum Jensenius](https://www.uio.no/ritmo/english/people/management/alexanje/index.html).

My Ph.D. project explores individual differences in auditory perception and production, specifically how rhythmic entrainment occurs within and between individuals by integrating auditory-motor data with EEG, ECG, and respiration in both individual and group settings. Previous projects have examined how individual differences influence [music’s pain-reducing effects](https://journals.lww.com/pain/abstract/2025/08000/individualizing_musical_tempo_to_spontaneous_rates.11.aspx) and the ways [partners synchronize hearts and breathing during joint action](https://onlinelibrary.wiley.com/doi/10.1111/psyp.70254).

My ongoing project focuses on individual differences in cortical oscillations and their role in auditory-motor coordination using hyperscanning EEG. Beyond experimental work, I am also interested in developing new computational approaches to better quantify multimodal oscillatory signals and clarify brain-body interactions.

Beyond academia, I have a deep passion for classical music. My journey as a concert pianist began at age five, leading to performances in major concert halls and multiple championships at national and provincial levels in China. These experiences have profoundly shaped my interest in music as both an art form and a fundamental perspective on human behavior in science. Nowadays, you can (frequently) find me in Montreal's Place des Arts auditorium.

### Recent Updates

<div style="max-height: 400px; overflow-y: auto; padding-right: 10px;">
{% for item in site.data.news %}
<div style="margin-bottom: 15px; padding-left: 10px; border-left: 3px solid #494e52;">
  <strong style="color: #494e52;">{{ item.date }}</strong><br>
  {{ item.content | markdownify | remove: '<p>' | remove: '</p>' }}
</div>
{% endfor %}
</div>

## Contact Information

<div style="background-color: #f5f5f5; padding: 20px; border-radius: 10px;">
  <strong>Wenbo Yi</strong><br>
  wenbo.yi (at) mail.mcgill.ca<br><br>
  <em>Sequence Production Lab (SPL), Department of Psychology</em><br>
  <em>McGill University</em><br>
  <em>2001 McGill College, Montreal, Quebec, Canada, H3A 1G1</em>
</div>
