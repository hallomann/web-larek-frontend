import { Component } from "../../utils/components";

/**
 * Класс представления UI компонента для отрисовки содержимого формы в модальном окне (один из шагов пользовательского сценария).
 * @property { IBuyerModel } model
 */
export interface IBuyerUI<IBuyerModel> extends Component<HTMLElement> {
	/**
	 * Модель данных для использования в отрисовке
	 * @type { IBuyerModel }
	 */
	_model: IBuyerModel;

	/**
	 * Элемент ввода почты.
	 * @type { HTMLElement }
	 */
	_email: HTMLElement;

	/**
	 * Элемент ввода телефона.
	 * @type { HTMLElement }
	 */
	_phone: HTMLElement;

	/**
	 * Элемент кнопки.
	 * @type { HTMLButtonElement }
	 */
	_close: HTMLButtonElement;
}
