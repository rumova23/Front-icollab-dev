export default function extendExportXLS(H){
    //https://www.highcharts.com/forum/viewtopic.php?t=42612
    //https://jsfiddle.net/BlackLabel/9meL5tcs
    //https://www.highcharts.com/docs/extending-highcharts/extending-highcharts
    H.wrap(H.Chart.prototype, 'getTable', function (proceed, useLocalDecimalPoint) {
		function htmlencode(html) {
			return html
				.replace(/&/g, '&amp;')
				.replace(/</g, '&lt;')
				.replace(/>/g, '&gt;')
				.replace(/"/g, '&quot;')
				.replace(/'/g, '&#x27;')
				.replace(/\//g, '&#x2F;');
		}
		console.log("useLocalDecimalPoint:: "+useLocalDecimalPoint);
		console.log((1.1).toLocaleString()[1]);
		
		var html = '<table>',
			options = this.options,
			decimalPoint = useLocalDecimalPoint ? (1.1).toLocaleString('es-MX')[1] : '.',
			useMultiLevelHeaders = H.pick(
				options.exporting.useMultiLevelHeaders, true
			),
			rows = this.getDataRows(useMultiLevelHeaders),
			rowLength = 0,
			topHeaders = useMultiLevelHeaders ? rows.shift() : null,
			subHeaders = rows.shift(),
			// Compare two rows for equality
			isRowEqual = function (row1, row2) {
				var i = row1.length;
				if (row2.length === i) {
					while (i--) {
						if (row1[i] !== row2[i]) {
							return false;
						}
					}
				} else {
					return false;
				}
				return true;
			},
			// Get table cell HTML from value
			getCellHTMLFromValue = function (tag, classes, attrs, value) {
				var val = H.pick(value, ''),
					className = 'text' + (classes ? ' ' + classes : '');
					
				// Convert to string if number
				if (typeof val === 'number') {
					val = val.toString();
					if (decimalPoint === ',') {
						val = val.replace('.', decimalPoint);
					}
					className = 'number';
				} else if (!value) {
					className = 'empty';
				}
				return '<' + tag + (attrs ? ' ' + attrs : '') +
					' class="' + className + '">' +
					val + '</' + tag + '>';
			},
			// Get table header markup from row data
			getTableHeaderHTML = function (topheaders, subheaders, rowLength) {
				var html = '<thead>',
					i = 0,
					len = rowLength || subheaders && subheaders.length,
					next,
					cur,
					curColspan = 0,
					rowspan;
				// Clean up multiple table headers. Chart.getDataRows() returns two
				// levels of headers when using multilevel, not merged. We need to
				// merge identical headers, remove redundant headers, and keep it
				// all marked up nicely.
				if (
					useMultiLevelHeaders &&
					topheaders &&
					subheaders &&
					!isRowEqual(topheaders, subheaders)
				) {
					html += '<tr>';
					for (; i < len; ++i) {
						cur = topheaders[i];
						next = topheaders[i + 1];
						if (cur === next) {
							++curColspan;
						} else if (curColspan) {
							// Ended colspan
							// Add cur to HTML with colspan.
							html += getCellHTMLFromValue(
								'th',
								'highcharts-table-topheading',
								'scope="col" ' +
								'colspan="' + (curColspan + 1) + '"',
								cur
							);
							curColspan = 0;
						} else {
							// Cur is standalone. If it is same as sublevel,
							// remove sublevel and add just toplevel.
							if (cur === subheaders[i]) {
								if (options.exporting.useRowspanHeaders) {
									rowspan = 2;
									delete subheaders[i];
								} else {
									rowspan = 1;
									subheaders[i] = '';
								}
							} else {
								rowspan = 1;
							}
							html += getCellHTMLFromValue(
								'th',
								'highcharts-table-topheading',
								'scope="col"' +
								(rowspan > 1 ?
									' valign="top" rowspan="' + rowspan + '"' :
									''),
								cur
							);
						}
					}
					html += '</tr>';
				}

				// Add the subheaders (the only headers if not using multilevels)
				if (subheaders) {
					html += '<tr>';
					for (i = 0, len = subheaders.length; i < len; ++i) {
						if (subheaders[i] !== undefined) {
							html += getCellHTMLFromValue(
								'th', null, 'scope="col"', subheaders[i]
							);
						}
					}
					html += '</tr>';
				}
				html += '</thead>';
				return html;
			};

		// Add table caption
		if (options.exporting.tableCaption !== false) {
			html += '<caption class="highcharts-table-caption">' + H.pick(
				options.exporting.tableCaption,
				(
					options.title.text ?
						htmlencode(options.title.text) :
						'Chart'
				)) +
				'</caption>';
		}

		// Find longest row
		for (var i = 0, len = rows.length; i < len; ++i) {
			if (rows[i].length > rowLength) {
				rowLength = rows[i].length;
			}
		}

		// Add header
		html += getTableHeaderHTML(
			topHeaders,
			subHeaders,
			Math.max(rowLength, subHeaders.length)
		);

		// Transform the rows to HTML
		html += '<tbody>';
		H.each(rows, function (row) {
			html += '<tr>';
			for (var j = 0; j < rowLength; j++) {
				// Make first column a header too. Especially important for
				// category axes, but also might make sense for datetime? Should
				// await user feedback on this.
				html += getCellHTMLFromValue(
					j ? 'td' : 'th',
					null,
					j ? '' : 'scope="row"',
					row[j]
				);
			}
			html += '</tr>';
		});
		html += '</tbody></table>';

		return html;

	});
}