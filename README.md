# Проектная работа "Веб-ларек"

## Описание проекта
WEB-ларёк - это интернет-магазин, реализованный с использованием архитектуры MVP (Model-View-Presenter).
Проект выполнен с использованием TypeScript для обеспечения строгой типизации и лучшей поддержки автодополнения в IDE.

## Основные принципы:

- Изолированность компонентов
- Единственная ответственность
- Масштабируемость 
- Переиспользование компонентов

## Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом
- src/types/ — папка с типами

## Важные файлы:

- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Об архитектуре

- В приложении взаимодействие между компонентами осуществляется посредством использования событий.
- Модели генерируют эти события, которые затем обрабатываются слушателями событий в основном коде.
- Слушатели событий отвечают за передачу данных соответствующим компонентам отображения. Кроме того, они выполняют вычисления, необходимые между передачами данных, могут вносить изменения в значения моделей.

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Составные части архитектуры приложения:

-   **Главный экран**
    Отображает ключевые элементы пользовательского интерфейса приложения. 

-   **Базовые классы моделей данных** - `ProductModel`, `CatalogueModel`, `BasketModel`, `Modal`, `OrderModel`
    Обеспечивают создание и хранение данных внутри приложения. 

-   **Представления UI компонентов для модальных окон** - `ProductUI`, `ProductBasketUI`, `BasketUI`, `PaymentUI`, `BuyerUI`, `CompletingUI`
    Используются для формирования пользовательского интерфейса на основе моделей данных.

-   **Перечисления** - `PaymentsEnum`, `StatusOrderEnum`
     Содержат варианты значений для динамических типов.

### Базовый код

#### Базовый Класс `Component<T>`

Это основной утилитарный класс, который отвечает за управление и взаимодействие с элементами DOM.

##### **Переменные класса:**

-   protected readonly container: HTMLElement - HTML-контейнер для компонента.

##### **Конструктор класса:**

```
    protected constructor(protected readonly container: HTMLElement) {}

```

##### **Методы класса:**

-   `toggleClass(element: HTMLElement, className: string, force?: boolean): void;` - Изменяет класс элемента.
-   `protected setText(element: HTMLElement, value: unknown): void;` - Устанавливает текст для элемента.
-   `setDisabled(element: HTMLElement, state: boolean): void;` - Изменяет состояние блокировки элемента.
-   `protected setHidden(element: HTMLElement): void;` - Скрывает элемент.
-   `protected setVisible(element: HTMLElement): void;` - Показывает элемент.
-   `protected setImage(element: HTMLImageElement, src: string, alt?: string): void;` - Устанавливает изображение с альтернативным текстом.
-   `render(data?: Partial<T>): HTMLElement;` - Метод для создания UI компонента на основе HTML-шаблона.

##### **Генерируемые события:**

---

#### Перечисление `EventsEnum`

Перечисление событий приложения

-    `API_GET_ALL_PRODUCTS`  - Запрос на получение всех товаров с сервера. 
-    `API_GET_PRODUCT`  - Запрос на получение конкретного товара с сервера. 
-    `API_POST_PRODUCT`  - Отправка данных заказа на сервер. 
-    `OPEN_MODAL_PRODUCT`  - Открытие модального окна для просмотра товара. 
-    `OPEN_MODAL_BASKET`  - Открытие модального окна для корзины. 
-    `OPEN_MODAL_PAYMENT`  - Открытие модального окна для выбора способа оплаты и ввода адреса. 
-    `OPEN_MODAL_Buyer`  - Открытие модального окна с информацией о пользователе. 
-    `OPEN_MODAL_SUCCESS`  - Открытие модального окна об успешной оплате. 
-    `CLOSE_MODAL`  - Закрытие модального окна. 
-    `ADD_PRODUCT_TO_BASKET`  - Добавление товара в корзину. 
-    `DELETE_PRODUCT_IN_BASKET`  - Удаление товара из корзины. 
-    `SELECT_TYPE_PAYMENT`  - Выбор способа оплаты. 
-    `INPUT_ADDRESS` - Ввод адреса. 
-    `INPUT_PHONE`  - Ввод телефона. 
-    `INPUT_EMAIL`  - Ввод электронной почты. 

#### Перечисление `PaymentsEnum`

Перечисление событий выбора способов оплаты

-    `PAYMENT_ONLINE`  - Онлайн-оплата. 
-    `PAYMENT_RECEIPT`  - Оплата при получении. 

#### Перечисление `StatusOrderEnum`

Перечисление статуса оформления заказа

-    `ORDER_REJECTION`  - Заказ отменен. 
-    `ORDER_MISTAKE`  - Ошибка при оформлении заказа. 
-    `ORDER_SUCCESS`  - Заказ успешно оформлен. 

### Модуль Product

#### Класс `ProductModel<T>`

Модель данных для товара в проекте, используемая для отображения в каталоге, модальном окне и корзине.

##### **Используемые типы:**

```
type ProductType {
    id: string;
    img: string;
    tag: string;
    name: string;
    descriptions: string;
    price: number;
}
```

##### **Наследуемые интерфейсы:**

-   `IProductModel<T>`

##### **Переменные класса:**

-   private id: string - Уникальный идентификатор товара.
-   private img: string - URL изображения товара.
-   private tag: string - Категория товара.
-   private name: string - Название товара.
-   private descriptions: string - Описание товара.
-   private price: number - Цена товара.

##### **Конструктор класса:**

```
constructor(obj: ProductType) {
  this.id = obj.id
  this.img = obj.img
  this.tag = obj.tag
  this.name = obj.name
  this.descriptions = obj.descriptions
  this.price = obj.price
}
```

##### **Методы класса:**

-    `getId(): string;`  - Получение уникального идентификатора товара. 
-    `setId(value: string): void;`  - Установка уникального идентификатора товара. 
-    `getImg(): string;`  - Получение URL изображения товара. 
-    `setImg(value: string): void;`  - Установка URL изображения товара. 
-    `getTag(): string;`  - Получение категории товара. 
-    `setTag(value: string): void;`  - Установка категории товара. 
-    `getName(): string;`  - Получение названия товара. 
-    `setName(value: string): void;`  - Установка названия товара. 
-    `getDescriptions(): string;`  - Получение описания товара. 
-    `setDescriptions(value: string): void;`  - Установка описания товара. 
-    `getPrice(): number;`  - Получение цены товара. 
-    `setPrice(value: number): void;`  - Установка цены товара. 

---

#### Класс `ProductUI<T>`

Представление UI компонента для отображения полной информации о товаре в модальном окне. 

##### **Наследуемые классы:**

-   `Component<T>`, `IProductUI`

##### **Переменные класса:**

-    `_model: IProductModel`  - Модель данных для отображения. 
-    `_img: HTMLImageElement;`  - Элемент изображения товара. 
-    `_tag: HTMLElement;`  - Элемент категории товара. 
-    `_title: HTMLElement;`  - Элемент заголовка товара. 
-    `_descriptions: HTMLElement;`  - Элемент описания товара. 
-    `_total: HTMLElement;`  - Элемент цены товара. 
-    `_close: HTMLButtonElement;`  - Кнопка закрытия модального окна. 

##### **Конструктор класса:**

```
constructor(
    protected model: IProductModel, 
    protected container: HTMLElement, 
    protected settings: ProductSetings
) {
    super(container);
    
    ... Поиск элементов и их запись в переменные.

    ... Обработка событий.
}
```

##### **Генерируемые события:**

-   Клик по кнопке `В корзину` - `CLOSE_MODAL`, `OPEN_MODAL_BASKET`.

---

#### Класс `ProductShortUI<T>`

Представление UI компонента для отображения краткой информации о товаре в главном каталоге.

##### **Наследуемые классы:**

-   `Component<T>`, `IProductShortUI`

##### **Переменные класса:**

-   `_model: IProductModel;` - Модель данных
-   `_img: HTMLImageElement;` - Элемент изображения товара.
-   `_tag: HTMLElement;` - Элемент категории товара.
-   `_title: HTMLElement;` - Элемент заголовка товара.
-   `_total: HTMLElement;` - Элемент стоимости товара.

##### **Конструктор класса:**

```
constructor(
    protected model: IProductModel, 
    protected container: HTMLElement, 
    protected settings: ProductSetings
) {
    super(container);
    
    ... Поиск элементов и их запись в переменные.

    ... Обработка событий.
}
```

##### **Генерируемые события:**

-   Клик по карточке товара из каталога - `OPEN_MODAL_PRODUCT`

---

#### Класс `ProductBasketUI<T>`

Представление UI компонента для отображения информации о товаре в корзине.

##### **Наследуемые классы:**

-   `Component<T>`, `IProductBasketUI`

##### **Переменные класса:**

-    `_model: IProductModel;`  - Модель данных для отображения. 
-    `_index: number;`  - Порядковый номер позиции в корзине. 
-    `_title: HTMLElement;`  - Элемент заголовка. 
-    `_total: HTMLElement;`  - Элемент цены товара. 
-    `_delete: HTMLElement;`  - Кнопка удаления товара. 

##### **Конструктор класса:**

```
constructor(
    protected model: IProductModel, 
    protected container: HTMLElement, 
    protected settings: ProductSetings
) {
    super(container);
    
    ... Поиск элементов и их запись в переменные.

    ... Обработка событий.
}
```

##### **Генерируемые события:**

-   Клик по иконке удаления товара из корзины - `DELETE_PRODUCT_IN_BASKET`

---

### Модуль Catalogue

#### Класс `CatalogueModel<T>`

Модель каталога товаров, используемая для отображения основной коллекции товаров на странице.

##### **Используемые типы:**

```
type CatalogueType = {
    items: IProductModel[]
}
```

##### **Наследуемые интерфейсы:**

-   `ICatalogueModel<T>`, `ICatalogueAPI`

##### **Переменные класса:**

-   private items: IProductModel[] - Массив товаров.

##### **Конструктор класса:**

```
constructor(obj?: CatalogueType) {
  this.items = obj?.items ?? IProductModel[]
}
```

##### **Методы класса:**

-   `getItems(): IProductModel[];` - Получение списка товаров.
-   `getItem(id: string): IProductModel;` - Получение товара по ID.

---

#### Интерфейс `ICatalogueAPI`

API интерфейс для взаимодействия с сервером для модуля  `Catalogue`.

##### **Конструктор класса:**

Принимает базовый URL и опции для запросов.

```
constructor(
    baseUrl: string,
    options: RequestInit = {}
)
```

##### **Методы класса:**

-   `getProducts(): IProductModel[];` - GET запрос для получения всех товаров.
-   `getProduct(id: string): IProductModel;` - GET запрос для получения товара по ID.

##### **Генерируемые события:**

-   Запрос всех товаров `getProducts` - `API_GET_ALL_PRODUCTS`.
-   Запрос товара по ID `getProduct` - `API_GET_PRODUCT`.

---

#### Класс `CatalogueUI<T>`

Представление UI компонента для отображения главного каталога товаров.

##### **Наследуемые классы:**

-   `Component<T>`, `ICatalogueUI`

##### **Переменные класса:**

-   `_model: ICatalogueModel;` - Модель данных.
-   `_list: HTMLElement;` - Контейнер для товаров.

##### **Конструктор класса:**

```
constructor(
    protected model: ICatalogueModel, 
    protected container: HTMLElement, 
    protected settings: CatalogueSetings
) {
    super(container);
    
    ... Поиск элементов и их запись в переменные.

    ... Обработка событий.
}
```

---

### Модуль Basket

#### Класс `BasketModel<T>`

Модель корзины, хранящая добавленные товары. Используется для передачи данных в заказ при подтверждении.

##### **Используемые типы:**

```
type BasketType = {
    items: IProductModel[]
    total?: number
}
```

##### **Наследуемые интерфейсы:**

-   `IBasketModel<T>`

##### **Переменные класса:**

-   private items: IProductModel[] - Массив товаров в корзине.
-   private total: number - Общая сумма товаров.

##### **Конструктор класса:**

```
constructor(obj?: BasketType) {
  this.items = obj?.items ?? IProductModel[]
  this.total = obj?.total ?? 0
}
```

##### **Методы класса:**

-   `getItems(): IProductModel[];` - Получение списка товаров в корзине.
-   `setItems(value: IProductModel[]): void;` - Установка списка товаров в корзину.
-   `getTotal(): number;` - Получение общей суммы товаров в корзине.
-   `setTotal(value: number): void;` - Установка общей суммы товаров в корзине.
-   `add(id: string): void;` - Добавление товара в корзину.
-   `delete(id: string): void;` - Удаление товара из корзины.

---

#### Класс `BasketUI<T>`

Представление UI компонента для отображения полной корзины.

##### **Наследуемые классы:**

-   `Component<T>`, `IBasketUI`

##### **Переменные класса:**

-   `_model: IBasketModel;` - Модель данных.
-   `_total: number;` - Общая сумма корзины.
-   `_close: HTMLElement;` - Кнопка закртыия.

##### **Конструктор класса:**

```
constructor(
    protected model: IBasketModel, 
    protected container: HTMLElement, 
    protected settings: IBasketSetings
) {
    super(container);
    
    ... Поиск элементов и их запись в переменные.

    ... Обработка событий.

}
```

##### **Генерируемые события:**

-   Клик по кнопке `Оформить` - `CLOSE_MODAL`, `OPEN_MODAL_PAYMENT`

---

#### Класс `BasketShortUI<T>`

Представление UI компонента для отображения краткой информации о корзине.

##### **Наследуемые классы:**

-   `Component<T>`, `IBasketShortUI`

##### **Переменные класса:**

-   `_model: IBasketModel;` - Модель данных.
-   `_coll: number;` - Колличество товаров в корзине.

##### **Конструктор класса:**

```
constructor(
    protected model: IBasketModel, 
    protected container: HTMLElement, 
    protected settings: BasketSetings
) {
    super(container);
    
    ... Поиск элементов и их запись в переменные.

    ... Обработка событий.

}
```

##### **Генерируемые события:**

-   Клик на иконке корзины - `OPEN_MODAL_BASKET`.

---

### Модуль Modal

#### Класс `Modal<T>`

Модель данных модального окна, используемая как обертка для контента.

##### **Используемые типы:**

```
type ModalType = {
      name: string
      isOpen: boolean
      content: HTMLElement
}
```

##### **Наследуемые интерфейсы:**

-   `IModal`

##### **Переменные класса:**

-   private name: string - Название модального окна.
-   private isOpen: boolean - Статус окна (открыто/закрыто).
-   private content: HTMLElement - Вложенный контент модального окна.

##### **Конструктор класса:**

```
constructor(obj: ModalType) {
  this.name = obj.name? ?? null
  this.isOpen = obj?.isOpen? ?? false
  this.content = obj?.content? ?? undefined
}
```

##### **Методы класса:**

-   `getName(): string;` - Получение названия модального окна.
-   `setName(value: string): void;` - Установка названия модального окна.
-   `getIsOpen(): boolean;` - Получение статуса окна.
-   `setIsOpen(value: boolean): void;` - Установка статуса модального окна.
-   `getContent(): HTMLElement;` - Получение содержимого модального окна.
-   `setContent(value: HTMLElement): void;` - Установка содержимого модального окна.
-   `open(): void;` - Открытие модального окна.
-   `close(): void;` - Закрытие модального окна.

---

#### Класс `ModalUI`

Представление UI компонента для отображения модального окна.

##### **Наследуемые классы:**

-   `Component<T>`, `IModalUI`

##### **Переменные класса:**

-   `_model: IModal` - Модель данных.
-   `_close: HTMLElement` - Кнопка закрытия модального окна.

##### **Конструктор класса:**

```
constructor(
    protected model: IModal, 
    protected container: HTMLElement, 
    protected settings: ModalSetings
) {
    super(container);
    
    ... Поиск элементов и их запись в переменные.

    ... Обработка событий.
}
```

##### **Генерируемые события:**

-   Клик по кнопке закрытия модального окна - `CLOSE_MODAL`.
-   Клик по области вокруг модального окна - `CLOSE_MODAL`.

---

### Модуль Payment

#### Класс `PaymentModel<T>`

Модель данных о способе оплаты и адресе доставки. Используется в модальной форме на странице магазина.

##### **Используемые типы:**

```
type PaymentType = {
      payment: PaymentsEnum
      address: string
}
```

##### **Наследуемые интерфейсы:**

-   `IPaymentModel<T>`

##### **Переменные класса:**

-   private payment: PaymentsEnum - Способ оплаты.
-   private address: string - Адрес доставки.

##### **Конструктор класса:**

```
constructor();
constructor(obj: PaymentType) {
  this.payment = obj?.payment? ?? null
  this.address = obj?.address? ?? null
}
```

##### **Методы класса:**

-   `getPayment(): PaymentType;` - Получение данных о способе оплаты.
-   `setPayment(value: PaymentType): void;` - Установка способа оплаты.
-   `getAddress(): string;` - Получение адреса доставки.
-   `setAddress(value: string): void;` - Установка адреса доставки.

---

#### Класс `PaymentUI<T>`

Представление UI компонента для отображения формы в модальном окне (один из шагов оформления заказа).

##### **Наследуемые классы:**

-   `Component<T>`, `IPaymentUI<T>`

##### **Переменные класса:**

-   `_model: IPaymentModel;` - Модель данных для отображения.
-   `_btnPayments: HTMLElement[];` - Кнопки типов оплаты.
-   `_adress: HTMLInputElement;` - Поле ввода адреса.
-   `_close?: HTMLButtonElement;` - Кнопка закрытия.

##### **Конструктор класса:**

```
constructor(
    protected model: IPaymentModel, 
    protected container: HTMLElement, 
    protected settings: PaymentSetings
) {
    super(container);
    
    ... Поиск элементов и их запись в переменные.

    ... Обработка событий.

}
```

##### **Генерируемые события:**

-   Выбор способа оплаты заказа - `SELECT_TYPE_PAYMENT`.
-   Ввод адреса доставки - `INPUT_ADDRESS`.
-   Клик на кнопку `Далее` - `CLOSE_MODAL`, `OPEN_MODAL_Buyer`

---

### Модуль Buyer

#### Класс `BuyerModel<T>`

Модель данных, содержащая информацию о пользователе, включая его контактный телефон и электронную почту. Используется для отображения в модальном окне на этапе оформления заказа.

##### **Используемые типы:**

```
type BuyerType = {
      email: string
      phone: string
}
```

##### **Наследуемые интерфейсы:**

-   `IBuyerModel<T>`

##### **Переменные класса:**

-   private email: string - хранит электронную почту покупателя.
-   private phone: string - хранит контактный телефон покупателя.

##### **Конструктор класса:**

```
constructor();
constructor(obj: BuyerType) {
  this.email = obj?.email? ?? null
  this.phone = obj?.phone? ?? null
}
```

##### **Методы класса:**

-   `getEmail(): string;` - возвращает электронную почту покупателя.
-   `setEmail(value: string): void;` - устанавливает электронную почту покупателя.
-   `getPhone(): string;` - возвращает контактный телефон покупателя.
-   `setPhone(value: string): void;` - устанавливает контактный телефон покупателя.

---

#### Класс `BuyerUI<T>`

Класс для отображения пользовательского интерфейса формы, где пользователь вводит свои контактные данные в модальном окне.

##### **Наследуемые классы:**

-   `Component<T>`, `IBuyerUI`

##### **Переменные класса:**

-   `_model: IBuyerModel;` - Модель данных.
-   `_email: HTMLElement;` - Элемент для ввода электронной почты
-   `_phone: HTMLElement;` - Элемент для ввода телефона
-   `_close: HTMLElement;` - Элемент кнопки закрытия.

##### **Конструктор класса:**

```
constructor(
    protected model: IBuyerModel, 
    protected container: HTMLElement, 
    protected settings: CompletingSetings
) {
    super(container);
    
    ... Поиск элементов и их запись в переменные.

    ... Обработка событий.

}
```

##### **Генерируемые события:**

-   Ввод контактного телефона - `INPUT_PHONE`.
-   Ввод электронной почты - `INPUT_EMAIL`.
-   Нажатие на кнопку `Оплатить` - `CLOSE_MODAL`, `OPEN_MODAL_SUCCESS`

---

### Модуль Order

#### Класс `OrderModel<T>`

Модель заказа, которая заполняется данными по мере прохождения этапов оформления заказа. Хранит всю информацию о заказе для последующей передачи на сервер и использования в интерфейсе.

##### **Используемые типы:**

```
type OrderType = {
      status: StatusOrderEnum
      basket: IBasketModel
      payment: IPaymentModel
      buyer: IBuyerModel
}
```

##### **Наследуемые интерфейсы:**

-   `IOrderModel<T>`, `IOrderAPI`

##### **Переменные класса:**

-   private status: StatusOrderEnum - Статус заказа.
-   private basket: IBasketModel - Список товаров в заказе.
-   private payment: IPaymentModel - Данные о способе оплаты и адресе доставки.
-   private buyer: IBuyerModel - Данные о покупателе.

##### **Конструктор класса:**

```
constructor();
constructor(obj: OrderType) {
  this.status = obj?.status? ?? null
  this.basket = obj?.basket? ?? null
  this.payment = obj?.payment? ?? null
  this.buyer = obj?.buyer? ?? null
}
```

##### **Методы класса:**

-   `getStatus(): StatusOrderEnum;` - возвращает статус заказа.
-   `setStatus(value: StatusOrderEnum): void;` - устанавливает статус заказа.
-   `getBasket(): IBasketModel;` - возвращает корзину с позициями заказа.
-   `setBasket(value: IBasketModel): void;` - устанавливает корзину с позициями заказа.
-   `getPayment(): IPaymentModel;` -  возвращает данные о платеже и адресе.
-   `setPayment(value: IPaymentModel): void;` - устанавливает данные о платеже и адресе.
-   `getBuyer(): IBuyerModel;` - возвращает данные о покупателе.
-   `setBuyer(value: IBuyerModel): void;` - устанавливает данные о покупателе.

---

#### Интерфейс `IOrderAPI`

Интерфейс для взаимодействия с сервером, позволяющий отправлять и получать информацию о заказах.

##### **Конструктор класса:**

Принимает базовый URL и опции для запросов.

```
constructor(
    baseUrl: string,
    options: RequestInit = {}
)
```

##### **Методы класса:**

-   `postOrder(): void;` - отправляет данные о заказе на сервер.

##### **Генерируемые события:**

-   Отправка заказа на сервер. Вызов метода `postOrder` - `API_POST_PRODUCT`

---

### Модуль Completing

#### Класс `CompletingModel<T>`

Модель, содержащая информацию о статусе заказа, используется для отображения в модальном окне, которое сообщает о завершении оформления заказа.

##### **Используемые типы:**

```
type CompletingPurchaseType = {
      title: string
      desctiprions: string
      textBtnClose?: string
}
```

##### **Наследуемые интерфейсы:**

-   `ICompletingModel<T>`

##### **Переменные класса:**

-   private title: string - заголовок уведомления.
-   private desctiprions: string - описание уведомления.
-   private textBtnClose: string - текст кнопки закрытия.

##### **Конструктор класса:**

Конструктор может принимать объект с данными для инициализации полей. 

```
    constructor();
    constructor(obj?: CompletingPurchaseType) {
      this.title = obj?.title? ?? null,
      this.desctiprions = obj?.desctiprions? ?? null,
      this.textBtnClose = obj?.textBtnClose? ?? null
    }
```

##### **Методы класса:**

-   `getTitle(): string;` - возвращает заголовок уведомления.
-   `setTitle(value: string): void;` - устанавливает заголовок уведомления.
-   `getDesctiprions(): string;` - возвращает текст описания уведомления.
-   `setDesctiprions(value: string): void;` - устанавливает текст описания уведомления.
-   `getTextBtnClose(): string;` - возвращает текст кнопки закрытия уведомления.
-   `setTextBtnClose(value: string): void;` - устанавливает текст кнопки закрытия уведомления.

---

#### Класс `CompletingUI<T>`

Класс для отображения пользовательского интерфейса уведомления о завершении оформления заказа.

##### **Наследуемые классы:**

-   `Component<T>`, `ICompletingUI<T>`

##### **Переменные класса:**

-   `_model: ICompletingModel;` - Модель данных.
-   `_img?: HTMLImageElement;` - Элемент изображения.
-   `_title: HTMLElement;` - Элемент заголовка.
-   `_descriptions: HTMLElement;` - Элемент описания.
-   `_close?: HTMLButtonElement;` - Элемент кнопки закрытия.

##### **Конструктор класса:**

Конструктор принимает модель данных, контейнер и настройки, выполняя поиск элементов и настройку обработки событий. 

```
constructor(
    protected model: ICompletingModel, 
    protected container: HTMLElement, 
    protected settings: CompletingSetings
) {
    super(container);
    
    ... Поиск элементов и их запись в переменные.

    ... Обработка событий.

}
```

-   Нажатие на кнопку `За новыми покупками!` вызывает событие - `CLOSE_MODAL`
