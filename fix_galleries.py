import re

with open('index.html', 'r') as f:
    html = f.read()

# Remove the `.png` gallery cards from marquee top row
html = re.sub(r'<div class="gallery-card">\s*<img src="./public/new_concept5\.png"[^>]+>\s*</div>\s*', '', html)
html = re.sub(r'<div class="gallery-card">\s*<img src="./public/new_concept3\.png"[^>]+>\s*</div>\s*', '', html)

with open('index.html', 'w') as f:
    f.write(html)
