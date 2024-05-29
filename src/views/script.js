document.getElementById('fetch-data-btn').addEventListener('click', fetchData);

async function fetchData() {
    const dataContainer = document.getElementById('json-container');
    dataContainer.innerHTML = 'Loading...';

    try {
        const response = await fetch('http://192.168.50.97:3000/api/temperature/ultimate'); // URL de ejemplo
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayData(data);
    } catch (error) {
        dataContainer.innerHTML = 'Error fetching data: ' + error.message;
    }
}

function displayData(data) {
    const dataContainer = document.getElementById('json-container');
    dataContainer.innerHTML = `<pre>${syntaxHighlight(JSON.stringify(data, null, 2))}</pre>`;
}

function syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        let cls = 'json-value';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'json-key';
            } else {
                cls = 'json-string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'json-value';
        } else if (/null/.test(match)) {
            cls = 'json-value';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}
