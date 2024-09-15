/**
 *Определяет контракт для класса `BasketPresenter`, который управляет коллекцией элементов.
 *
 * @function addItem Добавляет в корзину новый товар типа T.
 * @function getAllItems Возвращает массив всех товаров в корзине, каждый товар имеет тип M.
 * @function checkItemInBasket Проверяет, есть ли в корзине товар с указанным идентификатором.
 * @function createModel Создает модель типа M из элемента типа T.
 * @function getTotalPrice Возвращает общую стоимость всех товаров в корзине.
 * @function clear Удаляет все товары из корзины.
 * @function deleteItem Удаляет товар из корзины.
 *
 */
export interface IBasketPresenter<T, M> {
    addItem(item: T): void;
	getAllItems(): M[];
	checkItemInBasket(id: string): boolean;
	createModel(item: T): M;
	getTotalPrice(): number;
	clear(): void;
	deleteItem(id: string): void;
}
