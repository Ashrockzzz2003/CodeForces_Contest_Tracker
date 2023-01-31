fetch('https://codeforces.com/api/contest.list')
  .then(response => response.json())
  .then(data => {
    let html = document.querySelectorAll(".contest-list")[0];
    const contests = data.result;
    contests.forEach(contest => {
        if (contest.phase == "FINISHED") {
            html = document.querySelectorAll(".contest-list")[1];
        }
        let date = new Date(contest.startTimeSeconds*1000 + (5.5 * 60 * 60 * 1000));
        let HTML = `<div class="contest-item">
                        <p class = "date">${date.toDateString()} | ${date.toLocaleTimeString()}</p>
                        <h3>${contest.name}</h1>
                        <p class = "link-item"><a href="https://codeforces.com/contest/${contest.id}">Enter Contest</a></p>
                        <p class = "about-item">${contest.phase == "BEFORE" ? "UPCOMING": contest.phase}</p>
                    </div>`
        html.insertAdjacentHTML("beforeend", HTML);
    });
  })
  .catch(error => console.error(error))