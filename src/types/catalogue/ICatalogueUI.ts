import { Component } from '../../utils/components';

/**
 * Интерфейс представления каталога на странице
 * @property { ICatalogueModel } model
 */
export interface ICatalogueUI<ICatalogueModel> extends Component<HTMLElement> {
	/**
	 * Модель данных для использования в отрисовке
	 * @type { ICatalogueModel }
	 */
	_model: ICatalogueModel;

	/**
	 * Контейнер под товары
	 * @type { HTMLElement }
	 */
	_list: HTMLElement;
}
