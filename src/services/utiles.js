export function getYears(startYear, endYear) {
    let years = [];
    for (let i = startYear; i <= endYear; i++) {
        years.push(i)
    }
    return years;
}

export function parseStringToDate(str) {
    let parts = str.split('-')
    return new Date(parts[0], parts[1] - 1, parts[2])
}

export function getYearAverageData(chartData) {
    let sum = 0; 
    let count = 0;
    let year = null;
    let yearAverageData = [];

    chartData.forEach(({x, y}) => {
        if(!year) {
            year = x.getFullYear();
        }

        if(year !== x.getFullYear()) {
            yearAverageData.push({x: year, y: sum / count});
            year = x.getFullYear();
            sum = 0;
            count = 0;
        }

        sum += y;
        count++;
    })
    if(sum > 0) {
        yearAverageData.push({x: year, y: sum / count});
    }
    return yearAverageData;
}

export function getMonthAverageData(chartData) {
    let sum = 0;
    let count = 0;
    let month = null;
    let year = null;
    let monthAverageData = [];

    chartData.forEach(({x, y}) => {
        if(!month) {
            month = x.getMonth();
            year = x.getFullYear();
        }

        if(month !== x.getMonth()) {
            monthAverageData.push({x: new Date(year, month, 1), y: sum / count});
            month = x.getMonth();
            year = x.getFullYear();
            sum = 0;
            count = 0;
        }

        sum += y;
        count++;
    })

    if(sum > 0) {
        monthAverageData.push({x: new Date(year, month, 1), y: sum / count});
    }

    return monthAverageData;
}