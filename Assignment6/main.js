import fs from 'fs';

/**
 * Escapes CSV field values.
 * Escapes double quotes and wraps values in double quotes.
 */
function escapeCsvValue(val) {
    if (val === null || val === undefined) return '""';

    // Convert arrays or non-string values to string
    let str = Array.isArray(val) ? val.join(', ') : String(val);

    // Escape existing double quotes by doubling them ("" -> """")
    str = str.replace(/"/g, '""');

    return `"${str}"`;
}

/**
 * Fetches remote job data from the REST API and exports it to a CSV file.
 *
 * @param {string} fileName - Output CSV file name (defaults to 'java_remote_jobs_usa.csv')
 * @returns {Promise<number>} Number of records exported
 */
export async function exportJobsToCsv(fileName = 'java_remote_jobs_usa.csv') {
    const apiUrl = 'https://jobicy.com/api/v2/remote-jobs?geo=usa&tag=java';

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const jobs = data.jobs || [];


        if (jobs.length === 0) {
            console.warn('No job records found in API response.');
            return 0;
        }

        const headers = ['Job Title', 'Company', 'Location', 'Job Type', 'Publication Date', 'URL'];
        const csvRows = [headers.map(escapeCsvValue).join(',')];


        for (const job of jobs) {
            const row = [
                job.jobTitle,
                job.companyName,
                job.jobGeo || 'USA',
                Array.isArray(job.jobType) ? job.jobType.join(', ') : job.jobType,
                job.pubDate,
                job.url
            ];
            csvRows.push(row.map(escapeCsvValue).join(','));
        }

        const csvContent = csvRows.join('\n');
        fs.writeFileSync(fileName, csvContent, 'utf8');

        console.log(`Successfully exported ${jobs.length} records to '${fileName}'`);
        return jobs.length;

    } catch (error) {
        console.error(`Failed to export CSV: ${error.message}`);
        throw error;
    }
}

exportJobsToCsv()
    .then(count => console.log(`Total Records Exported: ${count}`))
    .catch(err => console.error('Execution Error:', err));