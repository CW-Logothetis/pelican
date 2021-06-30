let count = 0
let counter = document.getElementById("pelican-counter")
let savedDisplay = document.getElementById("saved-display")
let entries = []
let pelican = []

let athensDatetimeStr = new Date().toLocaleString("en-US", { timeZone: "Europe/Athens" });
let dateAthens = new Date(athensDatetimeStr);
let year = dateAthens.getFullYear();
let month = ("0" + (dateAthens.getMonth() + 1)).slice(-2);
let date = ("0" + dateAthens.getDate()).slice(-2);
let time = dateAthens.getHours() + ":" + ("0" + (dateAthens.getMinutes() + 1)).slice(-2);
let dateTime = time + " , " + year + "-" + month + "-" + date;

counter.innerHTML = count

const incrementBtn = document.getElementById("increment-btn")

incrementBtn.addEventListener("click", function() {
  count += 1 
  counter.innerHTML = count 
})

const decrementBtn = document.getElementById("decrement-btn")

decrementBtn.addEventListener("click", function() {
  if (count > 0) {
    count -= 1
    counter.innerHTML = count
  } 
})

function renderEntries() {
  let entriesHTML = ""
  for (i = 0; i < entries.length; i ++) {
     entriesHTML += 
    //  `
    //     <li> 
    //         <span id='count'>${entries[i].count}</span>  
    //         <span id='pelicans'>${entries[i].pelican}</span> 
    //         @
    //         <span id='date-time'>${entries[i].dateTime}</span>
    //     </li>
    //   `
    `
            <tr>
                <th>
                <td id='count'>${entries[i].count}</td>
                </th>
                <th>
                <td id='pelicans'>${entries[i].pelican}</td>
                </th>
                <th>
                <td id='date-time'>${entries[i].dateTime}</td>
                </th> 
            </tr>
    `
  }
  savedDisplay.innerHTML = entriesHTML
}

const saveDalBtn = document.getElementById("save-dal-btn")

saveDalBtn.addEventListener("click", function() {
    let pelican = "Dalmatian"
    let entryObj = {
        count,
        pelican,
        dateTime
    }
    entries.push(entryObj)
    localStorage.setItem("entries", JSON.stringify(entries))
    renderEntries()
    count = 0
    counter.innerHTML = count
})

const saveWhiteBtn = document.getElementById("save-white-btn")

saveWhiteBtn.addEventListener("click", function() {
    let pelican = "White"
    let entryObj = {
        count,
        pelican,
        dateTime
    }
    entries.push(entryObj)
    localStorage.setItem("entries", JSON.stringify(entries))
    renderEntries()
    count = 0
    counter.innerHTML = count
    // console.log(entries)
    // console.log( localStorage.getItem("entries") )
})

let leadsLocalStorage = JSON.parse( localStorage.getItem("entries") )

if (leadsLocalStorage) {
    entries = leadsLocalStorage
    renderEntries()
}



const deleteLastBtn = document.getElementById("delete-last-btn")

deleteLastBtn.addEventListener("dblclick", function() {
    entries.pop()
    localStorage.setItem("entries", JSON.stringify(entries))
    renderEntries()
    count = 0
    counter.innerHTML = count
    console.log(entries)
    console.log( localStorage.getItem("entries") )

})
    
const deleteAllBtn = document.getElementById("delete-all-btn")

deleteAllBtn.addEventListener("dblclick", function() {
    savedDisplay.innerHTML = ""
    count = 0
    entries = []
    localStorage.clear()
    counter.innerHTML = count
})    
    


// TO EXCEL

function downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;

    // CSV file
    csvFile = new Blob([csv], {type: "text/csv"});

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Hide download link
    downloadLink.style.display = "none";

    // Add the link to DOM
    document.body.appendChild(downloadLink);

    // Click download link
    downloadLink.click();
}

const csvBtn = document.getElementById("csv-btn")

function exportTableToCSV(filename) {
    var csv = [];
    var rows = document.querySelectorAll("table tr");
    
    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td");
        
        for (var j = 0; j < cols.length; j++) 
            row.push(cols[j].innerText);
        
        csv.push(row.join(","));        
    }

    // Download CSV file
    downloadCSV(csv.join("\n"), filename);
}

