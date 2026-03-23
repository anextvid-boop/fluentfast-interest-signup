import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Grab the "FUND THE PROJECT" button container exactly
fund_match = re.search(r'(<div style="margin-bottom: 20px; z-index: 15; position: relative;">\s*<a href="https://anextvid-boop\.github\.io/fluentfast-investors/\?cache=v6" class="primary-cta-btn"[^>]+>FUND THE PROJECT</a>\s*</div>)', html)
if not fund_match:
    print("Could not find fund button to move!")
    exit(1)
fund_html = fund_match.group(1)

# 2. Grab the expand-able form section exactly
form_match = re.search(r'(<!-- Interest Registration Form \(Expandable Box\) -->\s*<section class="inline-form-section hidden-reveal" id="interestFormSection".*?</section>)', html, re.DOTALL)
if not form_match:
    print("Could not find section to move!")
    exit(1)
form_html = form_match.group(1)

# 3. Remove them from their old locations
html = html.replace(fund_html, '')
html = html.replace(form_html, '')

# 4. Insert the dividers into the top hero section
divider = '\n      <!-- Divider -->\n      <hr style="width: 80%; max-width: 300px; border: none; height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent); margin: 0px auto 10px auto;">\n'

new_hero = f"""
      <h1 style="font-family: var(--font-display); font-size: clamp(3rem, 16vw, 9.5rem); font-weight: 900; line-height: 0.95; text-align: center; margin: 0; margin-bottom: 5px; letter-spacing: -1px; z-index: 10; position: relative;">
        <span class="fluent">FLUENT</span> <span class="fast">FAST</span>
      </h1>{divider}
      
      <div class="koalas glow-koalas" data-text="KOALAS" style="position: relative; z-index: 5;">KOALAS</div>{divider}
      
      <!-- Centerpiece High-Res Koala -->
      <div style="display: flex; justify-content: center; width: 100%; position: relative; z-index: 12; margin-top: 15px; margin-bottom: 5px;">
        <img src="./public/media__1774174625160.png" style="max-height: 180px; width: auto; max-width: 95vw; opacity: 1; display: block; filter: drop-shadow(0px 15px 30px rgba(0, 0, 0, 0.4)); animation: floatUpAndDown 4s ease-in-out infinite; object-fit: contain; object-position: bottom;" alt="FluentFast Hero Koala">
      </div>{divider}
      <div class="waitlist glow-waitlist" data-text="WAITLIST" style="margin-top: 5px; margin-bottom: 20px;">WAITLIST</div>
      
      <!-- Moved Form Box Here -->
{form_html}
"""

# Replace the old top hero sequence with this new constructed one
old_hero_regex = re.compile(r'<h1 style="font-family: var\(--font-display\).*?WAITLIST</div>', re.DOTALL)
html = old_hero_regex.sub(new_hero, html, count=1)

# 5. Insert FUND THE PROJECT down in `.alt-layout` (where the form used to be)
new_ipad_koala = f"""
    <!-- Moved Fund Project Button Down Here -->
    <div style="display: flex; justify-content: center; margin: 2rem 0; width: 100%;">
      {fund_html}
    </div>
    
    <!-- iPad Koala Anchored to Gallery Area -->"""

html = html.replace('<!-- iPad Koala Anchored to Gallery Area -->', new_ipad_koala)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Finished updates.")
