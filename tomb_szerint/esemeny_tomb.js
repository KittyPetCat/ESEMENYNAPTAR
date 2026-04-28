const szemelyek = ["Anna", "Béla", "Cili", "Dani"];
let esemenyek = {};
szemelyek.forEach(n => esemenyek[n] = []);

const szinek = ["pink", "lila", "blue", "yellow"];

function renderPersonSelect() {
    const select = document.getElementById("person-select");
    szemelyek.forEach(n => {
        const opt = document.createElement("option");
        opt.value = n;
        opt.textContent = n;
        select.appendChild(opt);
    });
}

function renderHourSelect() {
    const startSel = document.getElementById("start-hour");
    const endSel = document.getElementById("end-hour");

    for (let i = 1; i <= 10; i++) {
        let o1 = new Option(i, i);
        let o2 = new Option(i, i);
        startSel.add(o1);
        endSel.add(o2);
    }
}

function renderCalendar() {
    const tbody = document.getElementById("calendar-body");
    tbody.innerHTML = "";

    const selected = document.getElementById("person-select").value;

    for (let ora = 1; ora <= 10; ora++) {
        const tr = document.createElement("tr");

        const th = document.createElement("th");
        th.textContent = ora;
        tr.appendChild(th);

        for (let nap = 0; nap < 7; nap++) {

            const ongoing = esemenyek[selected].find(ev =>
                ev.nap === nap && ora > ev.start && ora < ev.end
            );
            if (ongoing) continue;

            const td = document.createElement("td");

            const es = esemenyek[selected].find(ev =>
                ev.nap === nap && ev.start === ora
            );

            if (es) {
                const div = document.createElement("div");
                div.className = "event " + es.szin;
                div.textContent = es.desc;

                div.style.height = (es.end - es.start) * 38 + "px";

                td.appendChild(div);
            }

            tr.appendChild(td);
        }

        tbody.appendChild(tr);
    }
}

function addEvent(e) {
    e.preventDefault();

    const selected = document.getElementById("person-select").value;
    const nap = parseInt(document.getElementById("day-select").value);
    const start = parseInt(document.getElementById("start-hour").value);
    const end = parseInt(document.getElementById("end-hour").value);
    const desc = document.getElementById("event-desc").value;

    if (end <= start) {
        alert("Hibás idő!");
        return;
    }

    const szin = szinek[nap % szinek.length];

    if (esemenyek[selected].some(ev =>
        ev.nap === nap && !(end <= ev.start || start >= ev.end)
    )) {
        alert("Ütközés!");
        return;
    }

    esemenyek[selected].push({ nap, start, end, desc, szin });
    renderCalendar();
    document.getElementById("event-form").reset();
}

function vissza() {
    window.location.href = "login/esemenynaplo.html";
}

document.addEventListener("DOMContentLoaded", () => {
    renderPersonSelect();
    renderHourSelect();
    renderCalendar();

    document.getElementById("person-select")
        .addEventListener("change", renderCalendar);

    document.getElementById("event-form")
        .addEventListener("submit", addEvent);
});