(() => {

  // futureofcoding.org/issues -> https://github.com/futureofcoding/futureofcoding.org/issues
  // futureofcoding.org/issues/3 -> https://github.com/futureofcoding/futureofcoding.org/issues/3
  const path = window.location.pathname.split("/").slice(1); // get rid of the leading ""
  if (path.length > 0) {
    if (path[0] == "issues") {
      window.location.replace("https://github.com/futureofcoding/futureofcoding.org/" + path.join("/"));
      return;
    }
  }

  const moved = {
    "/drafts/dctp": "/essays/dctp",
    "/drafts/frp": "/papers/comprehensible-frp",
    "/essays/app-idea": "/drafts/app-idea",
    "/essays/casual": "/drafts/casual",
    "/essays/causal": "/drafts/casual",
    "/essays/customer-support": "/drafts/customer-support",
    "/essays/invented-or-discovered": "/drafts/invented-or-discovered",
    "/essays/learnable-programming": "/drafts/learnable-programming",
    "/essays/legal-code": "/drafts/legal-code",
    "/essays/power": "/drafts/power",
    "/essays/regex-for-humans": "/drafts/regex-for-humans",
    "/essays/visual": "/drafts/visual",
    "/notes/conal-elliot": "/notes/conal-elliott",
    "/podcast": "/episodes",
    "/slack": "/community",
    "/slack-link": "/community",
    "/slack-readme": "/community"
  }

  const movedKeyExact = Object.keys(moved).find(url => window.location.pathname === url)
  if (movedKeyExact) {
    window.location.replace(moved[movedKeyExact]);
    return;
  } else {
    const movedKey = Object.keys(moved).find(url => window.location.pathname.includes(url))
    if (movedKey) {
      window.location.replace(moved[movedKey]);
      return;
    }
  }

  // futureofcoding.org/epsiodes/1 --> futureofcoding.org/epsiodes/001
  const episodeNumberMatch = /\/episodes\/(\d+)/.exec(window.location.pathname)
  const episodeNumber = episodeNumberMatch && episodeNumberMatch[1]
  if (episodeNumber && episodeNumber.length < 3) {
    window.location.replace(`/episodes/${episodeNumber.padStart(3, '0')}`);
    return;
  }

  const sf = (a, b) => {
    const aInt = parseInt(a.split("-")[0])
    const bInt = parseInt(b.split("-")[0])
    if (!isNaN(aInt) && !isNaN(bInt)) {
      return aInt - bInt;
    } else {
      return a.localeCompare(b)
    }
  }

  const endingSlash = window.location.pathname.endsWith("/") ? "" : "/"
  const pathname = window.location.pathname + endingSlash
  const files = document.getElementById('fileElement').innerText.split(".").filter(path => path.startsWith(pathname)).map(path => path.replace(pathname, "")).sort(sf)
  if (files.length) {
    window.title = pathname
    document.getElementById('notFoundText').style.display = "none"
    document.getElementById('directory').style.display =  "block"
    document.getElementById('title').innerText = pathname
    files.forEach(file => {
      document.getElementById('directory').innerHTML += '<li style="list-style-type: none;"><a href="./' + file +  '">' + file + '</a></li>'
    })
  }
})()
