fetch('https://codeforces.com/api/contest.list')
  .then(response => response.json())
  .then(data => {
    let html = document.querySelectorAll(".contest-list")[0];
    const contests = data.result;
    contests.forEach(contest => {
        if (contest.phase == "FINISHED") {
            html = document.querySelectorAll(".contest-list")[1];
        }
        let date = new Date(contest.startTimeSeconds*1000);
        var currentOffset = date.getTimezoneOffset();
        var ISTOffset = 330;

        var ISTTime = new Date(date.getTime() + (ISTOffset + currentOffset)*60000);

        let HTML = `<div class="contest-item">
                        <p class = "date">${ISTTime.toDateString()} | ${ISTTime.toLocaleTimeString()}</p>
                        <h3>${contest.name}</h1>
                        <p class = "link-item"><a target="_blank" href="https://codeforces.com/contest/${contest.id}">Enter Contest</a></p>
                        <p class = "about-item">${contest.phase == "BEFORE" ? "UPCOMING": contest.phase}</p>
                    </div>`
        html.insertAdjacentHTML("beforeend", HTML);
    });
  })
  .catch(error => console.error(error))