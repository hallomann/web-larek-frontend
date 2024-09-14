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
- src/components/ — JS компоненты и базовые компоненты

## Важные файлы:

- src/pages/index.html — HTML-файл главной страницы
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Об архитектуре

- В приложении взаимодействие между компонентами осуществляется посредством использования событий.
- Пользовательский интерфейс генерирует эти события, которые затем обрабатываются слушателями событий в основном коде, далее событие меняет модель и представление.
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

- **Главный экран**
  Отображает ключевые элементы пользовательского интерфейса приложения.

- **Базовые классы моделей данных**
  Обеспечивают создание и хранение данных внутри приложения.

- **Представления UI компонентов для модальных окон**
  Используются для формирования пользовательского интерфейса на основе моделей данных.

- **Перечисления**
  Содержат варианты значений для динамических типов.

### Базовый код

#### Базовый Класс `Component<T>`

Это основной утилитарный класс, который отвечает за управление и взаимодействие с элементами DOM.

##### **Переменные класса:**

- protected readonly container: HTMLElement - HTML-контейнер для компонента.

##### **Конструктор класса:**

```
    protected constructor(protected readonly container: HTMLElement) {}

```

##### **Методы класса:**

- `toggleClass(element: HTMLElement, className: string, force?: boolean): void;` - Изменяет класс элемента.
- `protected setText(element: HTMLElement, value: unknown): void;` - Устанавливает текст для элемента.
- `setDisabled(element: HTMLElement, state: boolean): void;` - Изменяет состояние блокировки элемента.
- `protected setHidden(element: HTMLElement): void;` - Скрывает элемент.
- `protected setVisible(element: HTMLElement): void;` - Показывает элемент.
- `protected setImage(element: HTMLImageElement, src: string, alt?: string): void;` - Устанавливает изображение с альтернативным текстом.
- `render(data?: Partial<T>): HTMLElement;` - Метод для создания UI компонента на основе HTML-шаблона.

---

#### Базовый абстрактный класс `Api`

Базовый утилитарный класс, описывающий взаимодействие с сервисами через базовые запросы к серверу.

##### **Переменные класса:**

- readonly baseUrl: string; - Базовый URL для обращений.
- protected options: RequestInit; - Опции для заголовков.

##### **Конструктор класса:**

```
	constructor(baseUrl: string, options: RequestInit = {})
```

##### **Методы класса:**

- `protected handleResponse(response: Response): Promise<object>` - Обработать ответ.
- `get(uri: string)` - Выполнить GET-запрос.

#### Базовый Класс `EventEmitter`

Базовый утилитарный класс, описывающий взаимодействие с событиями и их генерацию в приложении.

##### **Переменные класса:**

- `_events: Map<EventName, Set<Subscriber>>;`

##### **Конструктор класса:**

```
constructor() {
    this._events = new Map<EventName, Set<Subscriber>>();
}
```

##### **Методы класса:**

- `on<T extends object>(eventName: EventName, callback: (event: T) => void)` - Подписаться на событие.
- `off(eventName: EventName, callback: Subscriber)` - Отписаться от события.
- `emit<T extends object>(eventName: string, data?: T)` - Сгенерировать событие.
- `onAll(callback: (event: EmitterEvent) => void)` - Подписаться на все события.
- `offAll()` - Отменить подписку на все события.
- `trigger<T extends object>(eventName: string, context?: Partial<T>)` - Запустить событие.

---

#### Базовый Абстрактный Класс `Model<T>`

Базовый утилитарный класс, описывающий модель данных в приложении.

##### **Конструктор класса:**

```
constructor(data: Partial<T>, protected events: IEvents) {
    Object.assign(this, data);
}
```

##### **Методы класса:**

- `emitChanges(event: string, payload?: object)` - Уведомить всех о том, что модель изменилась.

---

#### Перечисление `EventsEnum`

Перечисление событий приложения

- API_ORDER_POST - Событие API. Отправка заказа на сервер.
- API_CATALOG_GET_ALL - Событие API. Загрузка каталога.
- API_CATALOG_GET_ID - Событие API. Загрузка товара по ID.
- MODAL_OPEN - Событие открытия модального окна.
- MODAL_CLOSE - Событие закрытия модального окна.
- BASKET_ADD_PRODUCT - Событие добавления продукта в корзину.
- BASKET_DELETE_PRODUCT - Событие удаления продукта из корзины.
- LOGGER - Событие логирования.
- PRODUCT_PREVIEW_CLICK_BUTTON - Событие клика по кнопке в модальном окне предпросмотра продукта.
- RENDER_PRODUCT_PREVIEW - Событие клика по карточке продукта в каталоге. Открытие модального окна предпросмотра продукта.
- RENDER_BASKET_SHORT - Событие изменения состояния корзины. Отрисовка компонента виджета "Корзина".
- RENDER_BASKET_FULL - Событие изменения состояния корзины. Отрисовка компонента модального окна полной корзины.
- RENDER_ORDER_PAYMENT - Событие перерисовки модального окна с формой заказа.
- RENDER_ORDER_CONTACTS - Событие перерисовки модального окна с формой контактов.
- RENDER_ORDER_SUCCESS - Событие перерисовки модального окна с информацией о завершении формирования заказа.
- BROCKER_FORM_VALIDATOR - Брокер получил данные для распределения по валидаторам форм.
- CHECK_VALID_FORM_PAYMENT - Валидация поля из формы "Оплата".
- CHECK_VALID_FORM_CONTACTS - Валидация поля из формы "Контакты".
- FORM_PAYMENT_ERRORS - Ошибка валидации в форме "Оплата".
- FORM_CONTACTS_ERRORS - Ошибка валидации в форме "Контакты".

### Модуль Application

#### Тип [`TComponents`](/src/components/app/types/TComponents.ts)

Типизация объекта UI-компонентов для приложения.

##### **Значения типа:**

```
export type TComponents = {
	page: PageUI; - Компонент страницы.
	basketShort: BasketShortUI; - Компонент виджета корзины в шапке.
	basketFull: BasketFullUI; - Компонент модального окна корзины.
	payment: PaymentUI; - Компонент модального окна оплаты.
	contacts: ContactsUI; - Компонент модального окна контактов.
	modal: ModalUI; - Компонент модального окна.
	success: SuccessUI; - Компонент модального окна завершения заказа.
};
```

#### Тип [`TPresenters`](/src/components/app/types/TPresenters.ts)

Типизация объекта презентеров для управления моделями и UI-компонентами в приложении.

##### **Значения типа:**

```
export type TPresenters = {
	basket: BasketPresenter<TProductType, ProductModel>;
	order: OrderPresenter<IEvents>;
	product: ProductPresenter<TProductType, ProductModel>;
};
```

#### Класс [`ApplicationsModel`](/src/components/app/ApplicationsModel.ts)

Класс Applications Model представляет собой универсальный класс, который позволяет определять типы презентаторов и компонентов, используемых в приложении.

Класс содержит два закрытых поля: `_presenters` и `_components`, в которых хранятся экземпляры презентаторов и компонентов, задействованных в приложении.

В классе есть конструктор, принимающий два параметра: `presenters` и `components`.

В классе предусмотрены два метода `getter` и `setter` для полей `_presenters` и `_components`.
Методы `getter` предназначены для извлечения текущих значений полей, в то время как методы `setter` позволяют обновить значения полей.

Данный класс обеспечивает управление презентаторами и компонентами приложения, а также упрощает доступ к ним и их обновление.

##### **Переменные класса:**

```
    _presenters - Коллекция презентаторов.
    _components - Коллекция компонентов.
```

##### **Конструктор класса:**

```
constructor(presenters: P, components: C) {
    this._presenters = presenters;
    this._components = components;
}
```

### Модуль Basket

#### Тип [`TBasketType`](/src/components/basket/types/TBasketType.ts)

Типизация представления корзины в приложении с принимаемым типом данных T.

##### **Значения типа:**

```
export type TBasketType<T> = {
	products: T[];
};
```

#### Интерфейс [`IBasketPresenter`](/src/components/basket/types/IBasketPresenter.ts)

Определяет контракт для класса `BasketPresenter`, который управляет коллекцией элементов.

##### **Методы класса:**

- addItem(item: T): void; - Добавляет товар в корзину, создавая для него модель и сохраняя её в карте \_items.
- getAllItems(): M[]; - Возвращает массив всех товаров, находящихся в корзине.
- checkItemInBasket(id: string): boolean; - Проверяет наличие товара с указанным идентификатором в корзине.
- createModel(item: T): M; - Создает экземпляр `ProductModel` для данного товара и возвращает его в виде типа M.
- getTotalPrice(): number; - Вычисляет общую стоимость всех товаров в корзине.
- clear(): void; - Удаляет все товары из корзины.
- deleteItem(id: string): void; - Удаляет товар с указанным идентификатором из корзины.

#### Класс [`BasketPresenter`](/src/components/basket/BasketPresenter.ts)

Универсальный класс, который управляет набором элементов в корзине, реализуя интерфейс `IBasketPresenter`, использует карту для хранения элементов и предоставляет методы для добавления, удаления и получения элементов.

##### **Наследуемые интерфейсы:**

- `IBasketPresenter`

##### **Переменные класса:**

```
    events: IEvents;
    items: Map<string, M> = new Map();
```

##### **Конструктор класса:**

```
	constructor(events: IEvents) {
		this.events = events;
	}
```

#### Представление модального окна полной корзины

##### Тип [`TBasketFullSettings`](/src/components/basket/view/full/types/TBasketFullSettings.ts)

Типизация представления набора параметров для настройки UI-компонента полного представления корзины.

##### **Значения типа:**

```
export type TBasketFullSettings = {
	selectorList: string;
	selectorPrice: string;
	selectorButton: string;
};
```

##### Тип [`TBasketFullView`](/src/components/basket/view/full/types/TBasketFullView.ts)

Типизация объекта UI-представления компонента полной корзины.

##### **Значения типа:**

```
export type TBasketFullView = {
	items: HTMLElement[];
	total: number;
	isActivButton: boolean;
};

```

##### Класс [`BasketFullUI`](/src/components/basket/view/full/BasketFullUI.ts)

Расширяет класс Component и используется для управления пользовательским интерфейсом корзины или шоппинг-трека. У него есть три приватных свойства: `_items`, `_button` и `_total`, представляющие контейнер для элементов корзины, кнопку для отображения оплаты заказа и элемент общей цены соответственно.  

Конструктор инициализирует класс с помощью элемента `container`, объекта `events` и объекта `settings`. Он устанавливает свойства `_items`, `_button` и `_total` а также добавляет к кнопке обработчик событий, который генерирует событие `RENDER_ORDER_PAYMENT` при клике.

##### **Используемые типы:**

```
    TBasketFullView
    TBasketFullSettings
```

##### **Наследуемые интерфейсы:**

##### **Наследуемые классы:**

- `Component`

##### **Переменные класса:**

```
    settings: TBasketFullSettings;
    _items: HTMLElement;
    _button: HTMLButtonElement;
    _total: HTMLSpanElement;
```

##### **Конструктор класса:**

```
constructor(protected container: HTMLElement, events: IEvents, settings: TBasketFullSettings) {
    super(container);
    this.settings = settings;

    this._items = ensureElement(settings.selectorList, container) as HTMLElement;
    this._button = ensureElement(settings.selectorButton, container) as HTMLButtonElement;
    this._total = ensureElement(settings.selectorPrice, container) as HTMLSpanElement;

    this._button.addEventListener('click', () => events.emit(EVENT.RENDER_ORDER_PAYMENT));
}
```

##### **Методы класса:**

- Стандартные сеттеры для установки значений, соответствующих типу `TBasketFullView`

##### **Генерируемые события:**

- `RENDER_ORDER_PAYMENT` - Событие перерисовки модального окна с формой заказа.

#### Представление виджета корзины в Header

##### Тип [`TBasketShortSettings`](/src/components/basket/view/short/types/TBasketShortSettings.ts)

Это определение типа, `TBasketShortSettings`, определяет тип объекта с единственным свойством.

##### **Значения типа:**

```
export type TBasketShortSettings = {
	selectorCounter: string; - строковое свойство, представляющее CSS-селектор для элемента счетчика.
};
```

##### Тип [`TBasketShortView`](/src/components/basket/view/short/types/TBasketShortView.ts)

Тип `TBasketShortView`, представляет объект с единственным свойством.

##### **Значения типа:**

```
export type TBasketShortView = {
	count: number; - count: число, представляющее количество элементов в корзине (краткое представление).
};
```

##### Класс [`BasketShortUI`](/src/components/basket/view/short/BasketShortUI.ts)

Класс пользовательского интерфейса `BasketShort` расширяет класс `Component` и используется для управления пользовательским интерфейсом в режиме краткого просмотра корзины. У него есть два приватных свойства: `settings` и `_count`, а также конструктор, который инициализирует компонент и настраивает обработчик событий.

##### **Используемые типы:**

- `TBasketShortView` - Представление объекта с единственным числовым свойством `count`, представляющим количество элементов в корзине (краткое представление).
- `TBasketShortSettings` - Определяет тип объекта с единственным свойством, представляющим CSS-селектор для элемента счетчика.

##### **Наследуемые интерфейсы:**

- `Component` - Базовый компонент UI.

##### **Переменные класса:**

```
    settings: TBasketShortSettings; - Свойство `settings` содержит настройки компонента.
    _count: HTMLSpanElement; - Свойство `_count` представляет собой HTML-элемент, который является счетчиком в корзине..
```

##### **Конструктор класса:**

```
constructor(protected container: HTMLElement, events: IEvents, settings: TBasketShortSettings) {
    super(container);
    this.settings = settings;

    this._count = ensureElement(this.settings.selectorCounter, container) as HTMLSpanElement;

    this.container.addEventListener('click', () => events.emit(EVENT.RENDER_BASKET_FULL));
}
```

##### **Методы класса:**

- Сеттеры

##### **Генерируемые события:**

- `RENDER_BASKET_FULL` - Событие изменения состояния корзины. Отрисовка компонента модального окна полной корзины.

### Модуль Order

#### Перечисление [`PaymentTypesEnums`](/src/components/order/enums/PaymentTypesEnums.ts)

Перечисление типов оплаты используемых в приложении.

##### **Значения в перечислении:**

```
	ONLINE = 'online',
	RECEIPT = 'receipt',
```

#### Тип [`TPaymentData`](/src/components/order/types/TOrderType.ts)

Тип данных платежа, который определяет объект с двумя свойствами: `payment` и `address`.

##### **Значения типа:**

```
export type TPaymentData = {
	payment: string; - это строковое свойство, представляющее адрес доставки.
	address: string; - это строковое свойство, представляющее способ оплаты.
};
```

#### Тип [`TContactsData`](/src/components/order/types/TOrderType.ts)

Тип данных контактной информации определяет объект с двумя свойствами: `phone` и `email`.

##### **Значения типа:**

```
export type TContactsData = {
	phone: string;
	email: string;
};
```

#### Тип [`TOrderType`](/src/components/order/types/TOrderType.ts)

Тип данных заказа определяет объект с двумя свойствами: `items` и `email`.

##### **Значения типа:**

```
export type TOrderType = {
	items: string[]; - коллекция строковых свойств, представляющих идентификаторы продуктов.
	total: number; - числовое свойство, представляющее общую стоимость заказа.
} & TPaymentData &
	TContactsData;
```

##### **Наследуемые типы:**

- `TPaymentData`
- `TContactsData`

#### Интерфейс [`IOrderModel`](/src/components/order/types/IOrderModel.ts)

Интерфейс модели данных о заказе.

##### **Методы интерфейса:**

```
	addItem(item: T): void; - Добавляет элемент типа T в заказ. Параметр type T общего типа: при реализации этого интерфейса его можно заменить на любой тип.
	deleteItem(item: T): void; - Удаляет элемент типа T из заказа.
	clear(): void; - Удаляет все элементы.
```

#### Класс [`OrderModel`](/src/components/order/OrderModel.ts)

Расширяет базовый класс Model и реализует интерфейс IOrderModel. Он управляет деталями заказа, включая элементы, общую стоимость, платеж, адрес, телефон и электронную почту.

##### **Используемые типы:**

- `TOrderType` - Определяет объект с двумя свойствами: `items` и `email`. и объеденяет в себе `TPaymentData` и `TContactsData`.
- `ProductModel` - Модель товара в приложении.

##### **Наследуемые классы:**

- `Model` - Базовая модель, чтобы можно было отличить ее от простых объектов с данными.

##### **Наследуемые интерфейсы:**

- `IOrderModel` - Интерфейс модели данных о заказе.

##### **Переменные класса:**

```
    items: string[] = [];
    total = 0;
    payment = '';
    address = '';
    phone = '';
    email = '';
```

##### **Конструктор класса:**

```
    constructor(data: Partial<TOrderType>, events: IEvents) {
        super(data, events);
    }
```

##### **Методы класса:**

- get/set total: извлекает или устанавливает общую сумму заказа. 
- get/set payment: получает или задает способ оплаты для заказа.
- get/set address: извлекает или устанавливает адрес доставки для заказа.
- get/set phone: получает или задает номер телефона для заказа.
- get/set email: извлекает или устанавливает адрес электронной почты для заказа.
- addItem: добавляет товар в заказ, обновляя общую сумму и список товаров.
- deleteItem: удаляет элемент из заказа, обновляя общую сумму и перечень товаров.
- clear(): возвращает заказ в исходное состояние, очищая все поля.
- toJSON(): возвращает данные заказа в формате JSON.

##### **Генерируемые события:**

#### Класс [`OrderPresenter`](/src/components/order/OrderPresenter.ts)

Принимает параметр типа E `IEvents`. У него есть три свойства: `api`, `model` и `events`.
Класс является презентером для заказа, отвечающим за управление данными заказа и взаимодействиями.

##### **Переменные класса:**

```
	api?: IOrderApi;
	model: OrderModel;
	events: E;
```

##### **Конструктор класса:**

```
    constructor(events: E, api?: IOrderApi) {
        this.events = events;
        this.api = api;
        this.model = new OrderModel({}, this.events);
    }
```

#### API

##### Тип [`TOrderResult`](/src/components/order/api/types/TOrderResult.ts)

Тип данных ответа от сервера, определяет объект с одним свойством: `id`.

##### **Значения типа:**

```
export type TOrderResult = {
	id: string;
};
```

##### Тип [`IOrderApi`](/src/components/order/api/types/IOrderApi.ts)

Интерфейс, предоставляющий возможность отправки заказа на сервер.

##### **Значения интерфейса:**

```
export interface IOrderApi {
	postOrder(order: TOrderType): Promise<void | TOrderResult>;
}
```

##### **Методы интерфейса:**

```
	postOrder(order: TOrderType): Promise<void | TOrderResult>;
```

##### **Генерируемые события:**

##### Класс [`OrderApi`](/src/components/order/api/OrderApi.ts)

Класс `OrderApi` предоставляет возможность отправки заказа на сервер.

##### **Наследуемые интерфейсы:**

- `IOrderApi` - Интерфейс с возможностью отправки заказа на сервер.

##### **Наследуемые классы:**

- `Api` - абстрактный класс, предоставляет базовую реализацию для отправки HTTP-запросов на определенный базовый URL-адрес. По умолчанию для `ContentType` устанавливается значение application/json и позволяет настраивать параметры запроса.

##### **Переменные класса:**

- `cdn: string;` - Cтрока с URL.

##### **Конструктор класса:**

```
constructor(cdn: string, baseUrl: string, options?: RequestInit) {
    super(baseUrl, options);
    this.cdn = cdn;
}
```

##### **Методы класса:**

- `postOrder(order: TOrderType): Promise<void | TOrderResult>` - .

#### Представление для формы данных о заказе

##### Класс [`ContactsUI`](/src/components/order/views/contacts/ContactsUI.ts)

Класс UI `ContactsUI` расширяет класс `FormUI` и управляет функциональностью форм с контактами покупателя.

##### **Используемые типы:**

- `TOrderType` - Тип данных заказа, определяющий объект с двумя свойствами: `items` и `email`. и объединяет в себе `TPaymentData` и `TContactsData`.

##### **Наследуемые классы:**

- `FormUI` - абстрактный класс, расширяющий `Component` - UI-компонент `form`, который можно использовать для отображения и управления формами.

##### **Конструктор класса:**

```
constructor(protected container: HTMLFormElement, protected events: IEvents) {
    super(container, events);
}
```

#### Представление для формы контактной информации

#### Тип [`TPaymentSettings`](/src/components/order/views/payment/TPaymentSettings.ts)

##### **Значения типа:**

```
export type TPaymentSettings = {
	selectorOnline: string;
	selectorReceit: string;
	classNameActive: string;
};
```

#### Класс [`PaymentUI`](/src/components/order/views/payment/PaymentUI.ts)

Класс UI с данными о платеже расширяет пользовательский интерфейс `FormUI<TOrderType>` и управляет пользовательским интерфейсом формы платежа.

У него есть два приватных свойства: `_online` и `_receipt`, которые являются элементами кнопок для онлайн-платежей и оплаты по квитанции.

##### **Используемые типы:**

- `TOrderType` - Тип данных заказа, определяющий объект с двумя свойствами: `items` и `email`.
##### **Наследуемые классы:**

- `FormUI` - Абстрактный класс, расширяющий `Component` - UI-компонент `form`, который можно использовать для отображения и управления формами.

##### **Переменные класса:**

```
    readonly settings: TPaymentSettings; - Настройки для отображения формы оплаты.
    _online: HTMLButtonElement; - HTML-элемент кнопки с типом оплаты `онлайн`.
    _receipt: HTMLButtonElement; - HTML-элемент кнопки с типом оплаты `при получении`.
```

##### **Конструктор класса:**

```
	constructor(protected container: HTMLFormElement, events: IEvents, settings: TPaymentSettings) {
		super(container, events);
		this.settings = settings;

		this._online = ensureElement(settings.selectorOnline, container) as HTMLButtonElement;
		this._receipt = ensureElement(settings.selectorReceit, container) as HTMLButtonElement;

        ... Обработчики событий
	}
```

##### **Методы класса:**

- `togglePaymentType(button: HTMLButtonElement)` -
  Меняет активный тип оплаты. Если `button` - это `online`, то добавляет класс `active` online-элементу и удаляет его у receipt-элемента.
  Иначе удаляет класс `active` у online-элемента и добавляет его у receipt-элемента.

##### **Генерируемые события:**

- `BROCKER_FORM_VALIDATOR`

### Модуль Page

#### Тип [`TPageView`](/src/components/page/types/TPageView.ts)

Определяет тип объекта с единственным свойством locked - логическое свойство, указывающее, заблокирован просмотр или нет.

##### **Значения типа:**

```
    export type TPageView = {
        locked: boolean;
    };
```

#### Тип [`TPageSettings`](/src/components/page/types/TPageSettings.ts)

Тип, представляющий объект с настройками для UI-компонента `PageUI`.

##### **Значения типа:**

```
    export type TPageSettings = {
        selectorWrapper: string;
        classNameWrapperLocked: string;
    };
```

#### Класс [`PageUI`](/src/components/page/PageUI.ts)

Класс UI страницы расширяет класс `Component` и используется для управления интерфейсом страницы.
У него есть два приватных свойства: `_wrapper` (HTMLЭлемент) и `settings` (объект `TPageSettings`).

##### **Используемые типы:**

- `TPageView` - Определяет тип объекта со свойством `locked` - логическое свойство, указывающее, заблокирован просмотр или нет.

##### **Наследуемые классы:**

- `Component` - Базовый UI-компонент для приложения.

##### **Переменные класса:**

- `_wrapper: HTMLElement;` - Свойство `_wrapper` HTML-элемент, из которого будет построен DOM-элемент.
- `settings: TPageSettings;` - Объект `TPageSettings` содержит селекторы для настроек страницы.

##### **Конструктор класса:**

```
	constructor(container: HTMLElement, protected events: IEvents, settings: TPageSettings) {
		super(container);
		this.settings = settings;
		this._wrapper = ensureElement<HTMLElement>(settings.selectorWrapper);
	}
```

##### **Методы класса:**

- Сеттер на `locked`.

### Модуль Product

#### Интерфейс [`IProductApi`](/src/components/product/types/IProductApi.ts)

Интерфейс для работы с API товаров.

##### **Методы интерфейса:**

- `getProducts(): Promise<T[]>;` - Извлекает список из `API` и возвращает объединение массива объектов `TProductType`, сопоставляет ответ `API`, чтобы включить URL-адрес `cdn` в свойство `img` каждого продукта.
- `getProduct(id: string): Promise<T[]>;` - Извлекает отдельный продукт по его идентификатору из API и возвращает объединение массива объектов `TProductType`. Он сопоставляет ответ `API` с включением URL-адреса `cdn` в свойство `img` продукта.

#### Класс [`ProductApi`](/src/components/product/ProductApi.ts)

Класс для работы с `API` методами товаров на серверной части расширяет класс `Api` и реализует интерфейс `IProductApi`. У него есть свойство `cdn`, доступное только для чтения, и два метода для поиска продуктов.

##### **Используемые типы:**

- `TProductType` - Определяет форму представления.

##### **Наследуемые интерфейсы:**

- `IProductApi` - Интерфейс для работы с API товаров.

##### **Наследуемые классы:**

- `Api` - Абстрактный класс, предоставляет базовую реализацию для отправки HTTP-запросов на определенный базовый URL-адрес. По умолчанию для заголовка `ContentType` устанавливается значение application/json и позволяет настраивать параметры запроса.

##### **Переменные класса:**

- `readonly cdn: string;` - строка с URL-адресом `cdn`.
- `baseUrl: string;` - строка с базовым URL-адресом.
- `options?: RequestInit;` - параметры для `RequestInit`.

##### **Конструктор класса:**

```
	constructor(readonly cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}
```

##### **Методы класса:**

- `getProducts(): Promise<TProductType[]>` - .
- `getProduct(id: string): Promise<TProductType[]>` - .

##### **Генерируемые события:**

#### Тип [`TProductType`](/src/components/product/types/TProductType.ts)

Тип данных, представляющий объект с данными о товаре.

##### **Значения типа:**

```
export type TProductType = {
	index?: number;
	id: string;
	image?: string;
	category?: string;
	title: string;
	description: string;
	price: number;
};
```

#### Класс [`ProductModel`](/src/components/product/ProductModel.ts)

Модель товара в приложении.

##### **Используемые типы:**

- `TProductType` - Определяет форму объекта, представляющего продукт.

##### **Наследуемые классы:**

- `Model` - Базовая модель.

##### **Переменные класса:**

- `_id: string;` - Идентификатор продукта.
- `_image?: string;` - Изображение продукта.
- `_category?: string;` - Категория продукта.
- `_title: string;` - Наименование продукта.
- `_description: string;` - Описание продукта.
- `_price: number;` - Стоимость продукта.

##### **Конструктор класса:**

```
	constructor(data: Partial<TProductType>, protected events?: IEvents) {
		super(data, events);
	}
```

##### **Методы класса:**

- Стандартные геттеры и сеттеры согласно типу данных `TProductType`.

#### Интерфейс [`IProductPresenter`](/src/components/product/types/IProductPresenter.ts)

Это определение интерфейса для класса, представляющего продукты, позволяющее использовать общие типы T и M.

##### **Методы класса:**

- `addItem(item: T): void;` - Добавляет новый элемент типа T в коллекцию `presenter`, создавая новый экземпляр с помощью `createModel`.
- `getItem(id: string): M;` - Получает элемент типа M из коллекции presenter по его идентификатору.
- `getAllItems(): M[];` - Возвращает массив всех элементов типа M в коллекции презентатора.
- `createModel(item: T): M;` - Создает новый экземпляр `ProductModel` из элемента типа T и возвращает его как тип M.

#### Класс [`ProductPresenter`](/src/components/product/ProductPresenter.ts)

Универсальный класс `ProductPresenter` принимает два параметра типа T и M, реализует интерфейс `IProductPresenter` и отвечает за управление коллекцией элементов типа M.

##### **Наследуемые интерфейсы:**

- `IProductPresenter` - Это определение интерфейса для класса, представляющего продукты, позволяющее использовать общие типы T и M.

##### **Переменные класса:**

- `api?: IProductApi<T>;` - Объект API для работы с продуктами.
- `events: IEvents;` - Объект событий, который будет передан в родительский конструктор.
- `items: Map<string, M> = new Map();` - Коллекция элементов типа M.

##### **Конструктор класса:**

```
	constructor(events: IEvents, api?: IProductApi<T>) {
		this.events = events;
		this.api = api;
	}
```

##### **Генерируемые события:**

#### Представление для Корзины

##### Тип [`TProductBasketSettings`](/src/components/product/views/basket/types/TProductBasketSettings.ts)

Тип данных, представляющий объект с настройками для UI-компонента `ProductBasketUI`.

##### **Значения типа:**

```
export type TProductBasketSettings = {
	selectorIndex: string;
	selectorTitle: string;
	selectorPrice: string;
	selectorButton: string;
};
```

##### Класс [`ProductBasketUI`](/src/components/product/views/basket/ProductBasketUI.ts)

Класс UI корзины продуктов расширяет класс `Component` и представляет собой компонент пользовательского интерфейса для корзины продуктов. У него есть несколько приватных свойств для хранения настроек и HTML-элементов, и конструктор, который инициализирует эти свойства и настраивает обработчик событий для кнопки удаления.

##### **Используемые типы:**

- `TProductType` - Определяет объект, представляющий продукт.

##### **Наследуемые классы:**

- `Component` - Базовый UI-компонент для приложения.

##### **Переменные класса:**

- `settings: TProductBasketSettings;` - Объект с настройками компонента пользовательского интерфейса корзины продуктов.
- `id: string;` - Идентификатор продукта.
- `index: HTMLSpanElement;` - HTML-компонент индекса товара.
- `title: HTMLSpanElement;` - HTML-компонент названия продукта.
- `price: HTMLSpanElement;` - HTML-компонент цены продукта.
- `delete: HTMLButtonElement;` - HTML-компонент кнопки удаления.

##### **Конструктор класса:**

```
	constructor(protected container: HTMLTemplateElement, events: IEvents, settings: TProductBasketSettings) {
		super(container);
		this.settings = settings;

		this._index = ensureElement(settings.selectorIndex, container) as HTMLSpanElement;
		this._title = ensureElement(settings.selectorTitle, container) as HTMLSpanElement;
		this._price = ensureElement(settings.selectorPrice, container) as HTMLSpanElement;
		this._delete = ensureElement(settings.selectorButton, container) as HTMLButtonElement;

		this._delete.addEventListener('click', () => {
			events.emit(EVENT.BASKET_DELETE_PRODUCT, { id: this.id });
			events.emit(EVENT.RENDER_BASKET_FULL);
		});
	}
```

##### **Методы класса:**

- Геттеры и Сеттеры id, index, title, price

##### **Генерируемые события:**

- `BASKET_DELETE_PRODUCT` - Событие удаления из корзины.
- `RENDER_BASKET_FULL` - Событие изменения и отрисовки состояния корзины.

#### Представление для Каталога

##### Тип [`TProductCatalogSettings`](/src/components/product/views/catalog/types/TProductCatalogSettings.ts)

Тип данных, представляющий объект с настройками для UI-компонента `ProductCatalogUI`.

##### **Значения типа:**

```
export type TProductCatalogSettings = {
	selectorCategory: string;
	selectorTitle: string;
	selectorImage: string;
	selectorPrice: string;
	classCategorySoft: string;
	classCategoryHard: string;
	classCategoryOther: string;
	classCategoryAdditional: string;
	classCategoryButton: string;
};
```

##### Класс [`ProductCatalogUI`](/src/components/product/views/catalog/ProductCatalogUI.ts)

Класс UI `ProductCatalog` расширяет класс `Component` и используется для управления UI каталога продуктов: установки и получения идентификатора продукта, категории, названия, изображения и цены.

##### **Используемые типы:**

- `TProductType` - Определяет форму объекта, представляющего продукт.

##### **Наследуемые классы:**

- `Component` - Базовый UI-компонент для приложения.

##### **Переменные класса:**

- `settings: TProductCatalogSettings;` - Объект с настройками UI-компонента каталога продуктов.
- `id: string;` - Идентификатор продукта.
- `category: HTMLSpanElement;` - Категория продукта.
- `image: HTMLImageElement;` - Изображение продукта.
- `title: HTMLTitleElement;` - Название продукта.
- `price: HTMLSpanElement;` - Цена продукта.

##### **Конструктор класса:**

```
	constructor(protected container: HTMLElement, settings?: TProductCatalogSettings, events?: IEvents) {
		super(container);
		this.settings = settings;

		this._category = ensureElement(settings.selectorCategory, container) as HTMLSpanElement;
		this._title = ensureElement(settings.selectorTitle, container) as HTMLTitleElement;
		this._image = ensureElement(settings.selectorImage, container) as HTMLImageElement;
		this._price = ensureElement(settings.selectorPrice, container) as HTMLSpanElement;

		this.container.addEventListener('click', () => events.emit(EVENT.RENDER_PRODUCT_PREVIEW, { id: this.id }));
	}
```

##### **Методы класса:**

- Геттеры и сеттеры id, category, title, image, price

##### **Генерируемые события:**

- `RENDER_PRODUCT_PREVIEW` - Событие клика по продуктовой карточке в каталоге с последующим открытием модального окна предпросмотра.

#### Представление для Предпросмотра

##### Тип [`TProductPreviewSettings`](/src/components/product/views/preview/types/TProductPreviewSettings.ts)

Тип данных с настройками для UI-компонента `ProductPreviewUI`.

##### **Значения типа:**

```
export type TProductPreviewSettings = {
	selectorImage: string;
	selectorCategory: string;
	selectorTitle: string;
	selectorDescription: string;
	selectorButton: string;
	selectorPrice: string;
	classCategorySoft: string;
	classCategoryHard: string;
	classCategoryOther: string;
	classCategoryAdditional: string;
	classCategoryButton: string;
};
```

##### Класс [`ProductPreviewUI`](/src/components/product/views/preview/ProductPreviewUI.ts)

UI-компонент представления предварительного просмотра продукта.

##### **Используемые типы:**

- `TProductType` - Определяет форму объекта, представляющего продукт.

##### **Наследуемые классы:**

- `Component` - Базовый UI-компонент для приложения.

##### **Переменные класса:**

```
-   `settings: TProductPreviewSettings;` - Предоставляет объект с настройками для UI-компонента.
-   `id: string;` - Предоставляет идентификатор продукта.
-   `image: HTMLImageElement;` - Предоставляет источник изображения.
-   `category: HTMLSpanElement;` - Предоставляет категорию продукта.
-   `title: HTMLTimeElement;` - Предоставляет название продукта.
-   `description: HTMLParagraphElement;` - Предоставляет описание продукта.
-   `button: HTMLButtonElement;` - Предоставляет кнопку "Купить".
-   `price: HTMLSpanElement;` - Предоставляет цену продукта.
```

##### **Конструктор класса:**

```
constructor(protected container: HTMLTemplateElement, events: IEvents, settings: TProductPreviewSettings) {
		super(container);
		this.settings = settings;

		this._image = ensureElement(settings.selectorImage, container) as HTMLImageElement;
		this._category = ensureElement(settings.selectorCategory, container) as HTMLSpanElement;
		this._title = ensureElement(settings.selectorTitle, container) as HTMLTimeElement;
		this._description = ensureElement(settings.selectorDescription, container) as HTMLParagraphElement;
		this._button = ensureElement(settings.selectorButton, container) as HTMLButtonElement;
		this._price = ensureElement(settings.selectorPrice, container) as HTMLSpanElement;

        ... Обработка событий
	}
```

##### **Методы класса:**

- Геттеры и сеттеры id, image, category, title, description, button, price

##### **Генерируемые события:**

#### Представление завершения оформления заказа

##### Класс [`TSuccessSettings`](/src/components/order/views/success/TSuccessSettings.ts)

Тип данных представляющий объект с настройками для UI-компонента `SuccessUI`.

##### **Значения типа:**

```
export type TSuccessSettings = {
	selectorTitle: string;
	selectorDescription: string;
	selectorBtnClose: string;
};
```

##### Класс [`TSuccessView`](/src/components/order/views/success/TSuccessView.ts)

Тип данных представляющий объект представления UI-компонента `SuccessUI`.

##### **Значения типа:**

```
export type TSuccessView = {
	title?: string;
	descriptions: string;
	close?: string;
};
```

##### Класс [`SuccessUI`](/src/components/order/views/success/SuccessUI.ts)

Класс `SuccessUI` расширяет класс `Component` и предназначен для управления UI для получения сообщения об успешном завершении оформления заказа.
Он использует элемент контейнера, события и настройки в своем конструкторе.

##### **Используемые типы:**

- `TSuccessView` - Тип данных, представляющий объект с настройками для UI-компонента `SuccessUI`.

##### **Наследуемые классы:**

- `Component` - Базовый UI-компонент для приложения.

##### **Переменные класса:**

- `settings: TSuccessSettings;` - Настройки UI компонента.
- `title: HTMLElement;` - Элемент заголовка сообщения об успешном завершении оформления заказа.
- `descriptions: HTMLElement;` - Элемент описания сообщения об успешном завершении оформления заказа.
- `close: HTMLButtonElement;` - Элемент кнопки закрытия сообщения об успешном завершении оформления заказа.

##### **Конструктор класса:**

```
	constructor(protected container: HTMLFormElement, events: IEvents, settings: TSuccessSettings) {
		super(container);
		this.settings = settings;

		this._title = ensureElement(this.settings.selectorTitle, container) as HTMLElement;
		this._descriptions = ensureElement(this.settings.selectorDescription, container) as HTMLElement;
		this._close = ensureElement(this.settings.selectorBtnClose, container) as HTMLButtonElement;

		this._close.addEventListener('click', () => events.emit(EVENT.MODAL_CLOSE));
	}
```

##### **Методы класса:**

- Сеттеры title, descriptions, close

##### **Генерируемые события:**

- `MODAL_CLOSE` - Событие закрытия модального окна..

### Общие компоненты Shared

#### Модуль Form

##### Тип [`TFormView`](/src/components/shared/form/types/TFormView.ts)

Тип данных с настройками для UI-компонента `FormUI`.

##### **Значения типа:**

```
export type TFormView = {
	valid: boolean;
	errors: string;
	next: string;
};
```

##### Абстрактный класс [`FormUI`](/src/components/shared/form/FormUI.ts)

Класс `FormUI` - это абстрактный класс, расширяющий класс `Component`, представляет собой UI-компонент `form`, который можно использовать для отображения форм и управления ими.
Класс имеет три защищенных свойства: `_submit`, `_errors` и `_next`.

###### **Используемые типы:**

- `TFormView` - Тип данных представляющий объект с настройками для `FormUI`.

##### **Наследуемые классы:**

- `Component` - Базовый UI-компонент для приложения.

###### **Переменные класса:**

- `submit: HTMLButtonElement;` - Компонент кнопки отправки формы.
- `errors: HTMLElement;` - Компонент элемента ошибки.
- `next: string;` - Объект следующего события.

###### **Конструктор класса:**

```
	constructor(protected container: HTMLFormElement, protected events: IEvents) {
		super(container);
		this._submit = ensureElement<HTMLButtonElement>('button[type=submit]', this.container);
		this._errors = ensureElement<HTMLElement>('.form__errors', this.container);

		this.container.addEventListener('input', (e: Event) => {
			const target = e.target as HTMLInputElement;
			const field = target.name as keyof T;
			const value = target.value;
			this.onInputChange(field, value);
		});

		this.container.addEventListener('submit', (e: Event) => {
			e.preventDefault();
			this.events.emit(this._next);
		});
	}
```

###### **Методы класса:**

- Стандартные сеттеры `errors`, `next`, `valid`.
- `onInputChange(field: keyof T, value: string);` - Отправляет событие для валидации формы при изменении поля ввода.
- `render(state: Partial<T> & TFormView): HTMLFormElement;` - Рендерит UI-компонент формы в указанном состоянии и возвращает элемент контейнера.

###### **Генерируемые события:**

- `BROCKER_FORM_VALIDATOR` - Брокер получил данные для распределения по валидаторам форм и событие, переданное в параметре `next`.

#### Модуль Modal

##### Тип [`TModalSettings`](/src/components/shared/modal/types/TModalSettings.ts)

Тип данных, представляющий объект с настройками для UI-компонента `ModalUI`.

##### **Значения типа:**

```
export type TModalSettings = {
	selectorClose: string; - Селектор кнопки закрытия модального окна.
	selectorContent: string; - Селектор содержимого модального окна.
	classActive: string; - Класс активного модального окна.
};
```

##### Тип [`TModalView`](/src/components/shared/modal/types/TModalView.ts)

Тип данных, представляющий объект с параметрами для UI-компонента `ModalUI`.

##### **Значения типа:**

```
export type TModalView = {
	content: HTMLElement; - HTML элемент с содержимым модального окна.
};
```

##### Класс [`ModalUI`](/src/components/shared/modal/ModalUI.ts)

`ModalUI` расширяет класс `Component` и представляет UI-компонент для модального окна.

###### **Используемые типы:**

- `TModalView` - Тип представления параметров модального окна.
- `TModalSettings` - Тип данных, представляющий объект с настройками для UI-компонента `ModalUI`.

###### **Наследуемые интерфейсы:**

##### **Наследуемые классы:**

- `Component` - Базовый UI-компонент для приложения.

###### **Переменные класса:**

- `settings: TModalSettings;` - Параметр `settings` задает настройки для модального элемента.
- `close: HTMLButtonElement;` - Поле `_close` содержит HTML-элемент кнопки для закрытия модального элемента.
- `content: HTMLElement;` - Поле `_content` содержит HTML-элемент для отображения содержимого модального элемента.

###### **Конструктор класса:**

```
	constructor(protected container: HTMLElement, protected events: IEvents, settings: TModalSettings) {
		super(container);
		this.settings = settings;

		this._close = ensureElement<HTMLButtonElement>(settings.selectorClose, container);
		this._content = ensureElement<HTMLElement>(settings.selectorContent, container);

		document.addEventListener('keydown', (event) => {
			if (event.key === 'Escape') events.emit(EVENT.MODAL_CLOSE);
		});
		this._close.addEventListener('click', () => events.emit(EVENT.MODAL_CLOSE));
		this.container.addEventListener('click', (event) => {
			const withinBoundaries = event.composedPath().includes(this._content);
			if (!withinBoundaries) events.emit(EVENT.MODAL_CLOSE);
		});
	}
```

###### **Методы класса:**

- `open(): void;` - Метод open добавляет CSS-класс в контейнер модального элемента, указывая, что модальный элемент активен и должен отображаться.
- `close(): void;` - Метод close удаляет для очистки содержимое модального элемента CSS-класс, указывающий на активность модального элемента.
- `render(data: TModalView): HTMLElement;` - Метод render инициализирует рендеринг модального элемента.
