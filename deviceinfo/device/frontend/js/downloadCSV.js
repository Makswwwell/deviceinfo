function downloadCSV(teg) {
     var csv = $(teg).table2CSV({delivery:'value'});
     var element = document.createElement('a');
     element.href = 'data:text/csv;charset=UTF-8,'+encodeURIComponent(csv);
     element.target = '_blank';
     element.download='data.csv';
     element.click();
}