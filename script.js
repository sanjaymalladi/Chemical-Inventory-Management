function searchChemical() {
    const chemicalName = document.getElementById('chemicalName').value.trim().toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = ''; // Clear previous results

    if (!chemicalName) {
        resultDiv.innerHTML = 'Please enter a chemical name.';
        return;
    }

    // Fetch the Excel file and process it
    fetch('chemicals.xlsx')
        .then(response => response.arrayBuffer())
        .then(data => {
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            // Search for the chemical in the Excel data
            let found = false;
            jsonData.forEach(row => {
                if (row[0] && row[0].toLowerCase() === chemicalName) {
                    found = true;
                    resultDiv.innerHTML = `Chemical: ${row[0]}<br>Location: ${row[1]}`;
                }
            });

            if (!found) {
                resultDiv.innerHTML = 'Chemical not found.';
            }
        })
        .catch(error => {
            console.error('Error reading the Excel file:', error);
            resultDiv.innerHTML = 'Error reading the Excel file.';
        });
}
