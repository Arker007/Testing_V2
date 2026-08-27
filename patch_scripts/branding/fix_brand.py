import re

with open('design.md', 'r') as f:
    content = f.read()

# Fix remnants of #88E31B
content = content.replace('#88E31B', '#77D986')
# Fix remnants of rgba(136,227,27,.12)
content = content.replace('rgba(136,227,27,.12)', 'rgba(119,217,134,.15)')

with open('design.md', 'w') as f:
    f.write(content)
print("done replacing remaining brand green references")
