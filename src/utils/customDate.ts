const padTo2Digits = (num: any) => {
    return num.toString().padStart(2, '0');
}

function convertToLocalTime(date: Date) {
    const offset = 0;
    let localDate = new Date(date.getTime() + (offset * 60 * 60 * 1000));
    return localDate.toString();
    // return localDate.toLocaleString('en-US', { timeZoneName: 'short' });
}

const timeZoneIna = (date: Date, datetime = true) => {

    /**
     * 
     * TIMEZON INDONESIA
     * 
     *  Waktu Indonesia Barat (WIB) : Asia/Jakarta
     *  
     *  Waktu Indonesia Tengah(WITA): Asia/Ujung_Pandang
     * 
     *  Waktu Indonesia Timur(WIT): Asia/Jayapura
     */

    let dateINA = date.toLocaleString('id-ID', {
        timeZone: 'Asia/Jakarta',
        hour12: false,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hourCycle: 'h24'
    }).split(' ')[0];


    let timeIna = date.toLocaleString('id-ID', {
        timeZone: 'Asia/Jakarta',
        hour12: false,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hourCycle: 'h24'
    }).split(' ')[1];

    let customDateIna = dateINA.split('/')[2] + '-' + dateINA.split('/')[1] + '-' + dateINA.split('/')[0];

    let customTimeIna = timeIna.split('.')[0] + ':' + timeIna.split('.')[1] + ':' + timeIna.split('.')[2];

    if (datetime) {
        let dateNew = customDateIna + ' ' + customTimeIna;
        dateNew = dateNew.replaceAll(',', '');
        return dateNew;
    } else {
        return customDateIna;
    }
}

const dateFormat = (date: Date) => {

    let formatNew = date;
    console.log("formatNew ", formatNew);

    // console.log(year + '-' + month + '-' + day);

    return (
        [
            formatNew.getFullYear(),
            padTo2Digits(formatNew.getMonth() + 1),
            padTo2Digits(formatNew.getDate()),
        ].join('-') +
        ' ' +
        [
            padTo2Digits(formatNew.getHours()),
            padTo2Digits(formatNew.getMinutes()),
            padTo2Digits(formatNew.getSeconds()),
        ].join(':')
    );
}

export { timeZoneIna, dateFormat };