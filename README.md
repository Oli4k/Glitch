Google Spreadsheet CMS with Tabletop
==============

**A Google Spreadsheet CMS with Tabletop** as a basic serverless content management system.

How-to
------

- Create a new google sheet with these worksheets and columns: 

content  
title  |  content  |  img  |  imgalt  |	id 
  
  --> ad this formula ```=LOWER(REGEXREPLACE(A2," |[.]","-"))``` to cells in column id

info  
author  |  title  |	intro  |	background

- Paste the spreadsheet URL with quotes, for example "https://docs.google.com/spreadsheets/d/1spe1ZBiB9YlRZ15fRtWpZAi8VIy2z1ZNq58zTsJpkpE/pubhtml" to GOOGLE_SHEET_URL in .env

- Publish your Google spreadsheet to web (entire document)

Known issues
------------

- Most of CSS needs to be done
- DOM is not finished
- Need a nice way to host images
- Other issues

**Made by Olivier Slabbers**


\ ゜o゜)ノ
