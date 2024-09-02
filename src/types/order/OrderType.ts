import { StatusOrderEnum } from '../Enums';
import { IBasketModel } from '../basket/IBasketModel';
import { IBuyerModel } from '../buyer/IBuyerModel';
import { PaymentType } from '../payment/PaymentType';
import { IPaymentModel } from '../payment/IPaymentModel';

/**
 * Тип данных для создания модели заказа.
 * @property { StatusOrderEnum } status - Статус из перечисления
 * @property { IBasketModel } basket - Модель корзины
 * @property { IPaymentModel } payment - Модель данных об оплате
 * @property { IBuyerModel } bayer - Модель данных о покупателе
 */
export type OrderType = {
	status: StatusOrderEnum;
	basket: IBasketModel;
	payment: IPaymentModel<PaymentType>;
	bayer: IBuyerModel;
};