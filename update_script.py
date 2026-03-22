import re

with open('index.html', 'r') as f:
    html = f.read()

# 1. Insert Koala and WAITLIST before expandable-gallery-container
insert_str = """
      <!-- Centerpiece High-Res Koala -->
      <div style="display: flex; justify-content: center; width: 100%; position: relative; z-index: 12; margin-top: 15px; margin-bottom: 5px;">
        <img src="./public/media__1774174625160.png" style="max-height: 180px; width: auto; max-width: 95vw; opacity: 1; display: block; filter: drop-shadow(0px 15px 30px rgba(0, 0, 0, 0.4)); animation: floatUpAndDown 4s ease-in-out infinite; object-fit: contain; object-position: bottom;" alt="FluentFast Hero Koala">
      </div>
      <div class="waitlist glow-waitlist" data-text="WAITLIST" style="margin-top: 5px; margin-bottom: 20px;">WAITLIST</div>
      <!-- Vertical Expandable Stack Gallery -->"""

html = html.replace('<!-- Vertical Expandable Stack Gallery -->', insert_str)

# 2. Remove the old WAITLIST div
old_waitlist = '<div class="waitlist glow-waitlist" data-text="WAITLIST" style="margin-top: 15px; margin-bottom: 10px;">WAITLIST</div>'
html = html.replace(old_waitlist, '')

# 3. Remove the old Centerpiece High-Res Koala block
old_koala = """    <!-- Centerpiece High-Res Koala -->
    <div style="display: flex; justify-content: center; width: 100%; position: relative; z-index: 12; margin-bottom: -15px;">
      <img src="./public/media__1774174625160.png" style="max-height: 240px; width: auto; max-width: 95vw; opacity: 1; display: block; filter: drop-shadow(0px 15px 30px rgba(0, 0, 0, 0.4)); animation: floatUpAndDown 4s ease-in-out infinite; object-fit: contain; object-position: bottom;" alt="FluentFast Hero Koala">
    </div>"""
html = html.replace(old_koala, '')

# 4. Update "Unlock Your 10 Instant Power Phrases" text
html = html.replace('Unlock Your 10 Instant Power Phrases <span', 'Join the waiting list <span')

# 5. Update paragraph describing the phrases
html = html.replace("send you the 10 phrases that make you sound fluent from day one", "be the first to know when FluentFast goes live")

# 6. Add last name field to the form
old_form = """            <div class="form-group">
              <label for="name">First Name</label>
              <input type="text" id="name" name="name" placeholder="E.g., Jahronimo" required>
            </div>

            <div class="form-group">
              <label for="email">Best Email Address</label>
              <input type="email" id="email" name="email" placeholder="Where should we send your phrases?" required>
            </div>"""

new_form = """            <div class="form-group">
              <label for="name">First Name</label>
              <input type="text" id="name" name="name" placeholder="E.g., Jahronimo" required>
            </div>

            <div class="form-group">
              <label for="lname">Last Name</label>
              <input type="text" id="lname" name="lname" placeholder="E.g., Smith" required>
            </div>

            <div class="form-group">
              <label for="email">Best Email Address</label>
              <input type="email" id="email" name="email" placeholder="Where should we send the updates?" required>
            </div>"""
html = html.replace(old_form, new_form)

# 7. Update CTA button text and JS
html = html.replace('GET MY POWER PHRASES', 'JOIN THE WAITING LIST')

with open('index.html', 'w') as f:
    f.write(html)

print("HTML modifications complete")
