# Dashboards
This repo is for the Dashboards displayed on TV's throughout CentralAr.com facilities. Please bear this in mind as these boards were made in a hurry and are highly customized to meet our internal demands, so the code is not as clean and modular as one would expect

Here are some screenshots of the boards:
![ga](https://user-images.githubusercontent.com/8310271/33607094-f6bcc766-d9a6-11e7-8451-c7e53823a0b4.png)
![ra](https://user-images.githubusercontent.com/8310271/33607096-f70a76fa-d9a6-11e7-818f-7e6b1fb1eecf.png)
![temp](https://user-images.githubusercontent.com/8310271/33607097-f729d658-d9a6-11e7-85a2-b9a89c5d8b62.png)
![graph](https://user-images.githubusercontent.com/8310271/33607095-f6e60676-d9a6-11e7-9797-8c909f7615ba.png)


All the dashboards are in portuguese, including some code commentary. Deal with it.

Since the dashboards are designed to run directly on smart-tv's browsers or in lightweight without-even-a-cooler low budget PC, these dashboards are made in plain old-fashioned HTML, JS and CSS. No fancy node or pre-processors here.

The dashboards also have a low update rate, querying the servers at regular intervals (usually 10 minutes) and only during work hours. No real-time stuff here.

Serve these files on a simple static file server. I recommend the [Chrome Web Server app](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb?hl=en) But it will probably be deprecated in no-time due to google ending suport for chrome apps, when that happens, try [firebase hosting](https://firebase.google.com/).

## APIs access

At the begining of each Dashboard-*.js file is a key string for each of the APIs we access, obiviously you'll need to provide your own keys.

**PRO TIP:** most API's don't accept ip-based hosts, this basicaly means that http://localhost works, but http://127.0.0.1 don't.

- For GA, the key is in the _HTML_ files; Generate a Google Analytics Key [HERE](https://console.developers.google.com/apis/credentials); You want the clientId key

- You'll also have to provide the GA **VIEW** id you wish to monitor, you can get it [HERE](https://ga-dev-tools.appspot.com/account-explorer/)

- Apixu is the weather API we use, [a key can be obtained here](https://www.apixu.com/). The free tier is enough for us. To calculate how much you'll need, do this math:
```
TOTAL_CITIES * TOTAL_DAYS_IT_WILL_RUN * TOTAL_REQUESTS_PER_DAY

in our case, it goes like this:
27*24*2 = 1296 requests/Month (+ some requests from other boards)
```
There's probally a more efficient way to use the weather API, but I just don't have the time to look at the docs, feel free to create a PR :)

---

## Query Reputations

the file `Pesquisa-De-Reputacao.js` is made to be imported in a bookmarklet, like this:

```js
javascript: (function () {
    var queryReputationScript = document.createElement('script');
    queryReputationScript.setAttribute('src', '//rawgithub.com/leocb/Dashboards-CentralAr/master/Pesquisa-De-Reputacao.js');
    document.body.appendChild(queryReputationScript);
}());
```

Copy the code above and save it in the `url` parameter of a bookmark, then access `http://www.ebit.com.br` and click on the bookmark# Dashboards-CentralAr-master
