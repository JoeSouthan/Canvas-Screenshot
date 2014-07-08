A Sinatra/JS based script to take "screenshots" of the current page.

Due to XSS, we have to proxy requests to external images before we can export the canvas, this example does just that.

# This a prototype only!

I take no responsibility for any damage done to your server. 

Perhaps write a whitelist to convert the images so you don't get stung by exploits.

Run:
```ruby
ruby convert.rb
```
and navigate to http://localhost:4567/ to try it out.

Uses jQuery, [HTML2Canvas](https://github.com/niklasvh/html2canvas/), Bootstrap and Sinatra.