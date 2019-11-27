import { MatPaginatorIntl } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
export class MatPaginatorIntlSpanish extends MatPaginatorIntl {
	translate: TranslateService;
	itemsPerPageLabel = 'Registros por página:';
	nextPageLabel     = 'Página siguiente';
	previousPageLabel = 'Página anterior';
	lastPageLabel     = 'Última página';
	firstPageLabel    = 'Primera página';
	of                = 'de';

	getRangeLabel = function (page, pageSize, length) {
		this.of = this.translate ? this.translate.instant('paginator.of') : 'of';
		if (length === 0 || pageSize === 0) {
			return '0 ' + this.of + ' ' + length;
		}
		length = Math.max(length, 0);
		const startIndex = page * pageSize;
		// If the start index exceeds the list length, do not try and fix the end index to the end.
		const endIndex = startIndex < length ?
			Math.min(startIndex + pageSize, length) :
			startIndex + pageSize;
		return startIndex + 1 + ' - ' + endIndex + ' ' + this.of + ' '  + length;
	};
	injectTranslateService(translate: TranslateService) {
		this.translate = translate;
		this.translate.onLangChange.subscribe(() => {
			this.translateLabels();
		});
		this.translateLabels();
	}

	translateLabels() {
		this.itemsPerPageLabel = this.translate.instant('paginator.items_per_page');
		this.nextPageLabel     = this.translate.instant('paginator.next_page');
		this.previousPageLabel = this.translate.instant('paginator.previous_page');
		this.lastPageLabel     = this.translate.instant('paginator.last_page');
		this.firstPageLabel    = this.translate.instant('paginator.first_page');
		this.of                = this.translate.instant('paginator.of');
	}


}