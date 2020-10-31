export function checkDigitTime(i) {
	if (i < 10) {
		i = "0" + i;
	}
	return i;
}
export function getMyDateFormat(date: Date) {
	return checkDigitTime(date.getHours()) + ":" + checkDigitTime(date.getMinutes()) + ":" + checkDigitTime(date.getSeconds());
}
export function existBetweenDate(filters,field:string):boolean{
	const filterMinDate = filters['minDate__' + field];
	const filterMaxDate = filters['maxDate__' + field];
	return (filterMinDate !== null || filterMaxDate !== null);
}
export function tableFilterBetweenDate<T>(tableData: T[], filters, field:string, isReturnOrigin=true): T[] {
	if (field == null) return tableData;
	const filterMinDate = filters['minDate__' + field];
	const filterMaxDate = filters['maxDate__' + field];
	if (filterMinDate !== null && filterMaxDate !== null) {
		let minD = new Date(filterMinDate);
		let maxD = new Date(filterMaxDate);
		minD.setHours(0);
		minD.setMinutes(0);
		maxD.setHours(23);
		maxD.setMinutes(59);
		return tableData.filter(o =>
			new Date(o[field]).getTime() >= minD.getTime()
			&& new Date(o[field]).getTime() <= maxD.getTime()
		);
	}else if (filterMinDate !== null && filterMaxDate == null) {
		let minD = new Date(filterMinDate);
		minD.setHours(0);
		minD.setMinutes(0);
		return tableData.filter(o =>
			new Date(o[field]).getTime() >= minD.getTime()
		);
	}else if (filterMinDate == null && filterMaxDate !== null) {
		let maxD = new Date(filterMaxDate);
		maxD.setHours(23);
		maxD.setMinutes(59);
		return tableData.filter(o =>
			new Date(o[field]).getTime() <= maxD.getTime()
		);
	}
	return isReturnOrigin?tableData:[];
}
export function tableFilter<T>(tableData: T[], filters, typeSearch, fieldForBetweenDate = null): T[] {
	//typeSearch =  'AND' : 'OR'; // 1. OR \ 2. AND for search conditions
	return tableFilterBetweenDate(tableData, filters, fieldForBetweenDate).filter(o => {
		let r = true;
		for (const key in filters) {
			if(!o.hasOwnProperty(key)&&!key.startsWith('minDate__')&&!key.startsWith('maxDate__')){
				console.info(key+':: no pertenece a la data[]');				
			}
			const filter = filters[key];
			if (typeSearch === 'OR') {
				if (key.startsWith('minDate__')) {
					let minDate = new Date(filter)
					minDate.setHours(0);
					minDate.setMinutes(0);
					if (filter !== null && (minDate.getTime() <= new Date(o[key.split('minDate__')[1]]).getTime()))
						return true;
				} else if (key.startsWith('maxDate__')) {
					let maxDate = new Date(filter)
					maxDate.setHours(23);
					maxDate.setMinutes(59);
					if (filter !== null && (maxDate.getTime() >= new Date(o[key.split('maxDate__')[1]]).getTime()))
						return true;
				} else {
					if (filter !== null && filter !== '' && o.hasOwnProperty(key) && o[key].toLowerCase().startsWith(filter.trim().toLowerCase())) {
						return true;
					}
				}
			} else {
				if (key.startsWith('minDate__')) {
					let minDate = new Date(filter)
					minDate.setHours(0);
					minDate.setMinutes(0);
					if (filter !== null && (minDate.getTime() >= new Date(o[key.split('minDate__')[1]]).getTime()))
						r = false;
				} else if (key.startsWith('maxDate__')) {
					let maxDate = new Date(filter)
					maxDate.setHours(23);
					maxDate.setMinutes(59);
					if (filter !== null && (maxDate.getTime() <= new Date(o[key.split('maxDate__')[1]]).getTime()))
						r = false;
				} else {
					if (filter !== null && filter !== '' && o.hasOwnProperty(key) && !o[key].toLowerCase().startsWith(filter.trim().toLowerCase())) {
						r = false;
					}
				}
			}
		}
		return (typeSearch === 'OR') ? false : r;
	}).map((e, index) => { e['order'] = index + 1; return e; });
}
export function isEmptyFilters(filters):boolean{
	let isEmptyFilters = true;
	for (const key in filters) {
	  const filter = filters[key];
	  if(filter !== null && filter !== '' ){
		isEmptyFilters = false;
	  }
	}
	return isEmptyFilters;
}

export function isEmptyFilters2(filters): boolean {
	let isEmptyFilters = true;
	for (const key in filters) {
		const filter = filters[key];
		if (filter !== null && filter !== '') {
			return false;
		}
	}
	return true;
}
