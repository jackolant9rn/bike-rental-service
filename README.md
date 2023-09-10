# bike-rental-service
ПОСТАНОВКА ЗАДАЧИ
Известная компания, занимающаяся прокатом велосипедов в крупных городах России, испытывает проблемы с частой кражей их имущества (велосипедов). Как возможное решение проблемы, компания хочет вести учёт этих случаев и отслеживать прогресс. Их собственные разработчики уже подготовили серверную часть приложения, вам же требуется реализовать клиентскую часть.

Клиентская часть предназначена как для сотрудников компании, так и для обычных пользователей. Обычному пользователю доступна только ограниченная часть функционала: главная страница и страница с возможностью сообщить о новом случае кражи.

<a href="https://documenter.getpostman.com/view/18055274/UVRAH6XZ">ОПИСАНИЕ API</a>

ФУНКЦИОНАЛЬНЫЕ ТРЕБОВАНИЯ
ГЛАВНАЯ СТРАНИЦА

Главная страница должна содержать текстовое описание сервиса, возможно, картинки на ваш выбор. Данная страница доступна всем пользователям без авторизации.

ФОРМА АВТОРИЗАЦИИ

Форму авторизации можете расположить на главной странице, в шапке сайта или на отдельной странице — на ваше усмотрение. У авторизованных пользователей должна быть возможность выйти из учетной записи.

СООБЩИТЬ О КРАЖЕ

«Сообщить о краже» должна содержать форму для отправки информации об украденном велосипеде. Форма должна содержать следующие поля:

Номер лицензии (обязательное поле)
ФИО клиента (обязательное поле)
Тип велосипеда (выпадающий список с заранее определенными вариантами, обязательное поле)
Цвет велосипеда
Дата кражи
Дополнительная информация
Страница должна быть доступна всем пользователям без авторизации. Однако, если форму заполняет авторизованный сотрудник (например, если клиент сообщил о краже по телефону), ему доступно ещё одно дополнительное поле: ответственный сотрудник. Поле представляет собой выпадающий список с возможностью выбора из списка всех одобренных сотрудников, которые есть в базе.

СТРАНИЦА РЕГИСТРАЦИИ

На странице регистрации должна находиться форма регистрации со следующими полями:

E-mail (обязательное поле)
Пароль (обязательное поле)
Имя
Фамилия
Client ID (обязательное поле)
При отправке формы регистрации в базе данных создаётся новый сотрудник. Первый созданный сотрудник с конкретным client ID автоматически получит статус одобренного, остальных сотрудников нужно будет одобрить вручную.

СООБЩЕНИЯ О КРАЖАХ

Данная страница должна содержать список всех известных случаев краж (подсказка: это может быть таблица). Отображать служебные поля, например, clientId не нужно. Должна быть возможность удалить сообщение. При клике на одно сообщение из списка должна открываться его детальная страница.

ДЕТАЛЬНАЯ СТРАНИЦА СООБЩЕНИЯ О КРАЖЕ

Детальная страница сообщения должна содержать всю информацию о конкретном случае кражи с возможностью редактирования любого поля, кроме createdAt, updatedAt и clientId. Для полей, которые могут принимать значения из списка необходимо сделать поля соответствующих типов.

Помните, что в списке ответственных сотрудников должны отображаться только одобренные сотрудники.
Поле завершающего комментария (resolution) должно быть доступно только при выборе статуса «завершен», и в таком случае является обязательным. Т.е. нельзя изменить статус на «завершен», не заполнив поле resolution.

URL детальной страницы должен содержать id сообщения. Пример: localhost:3000/cases/12345 откроет страницу сообщения с id 12345.

ОТВЕТСТВЕННЫЕ СОТРУДНИКИ

Данная страница должна содержать список всех доступных сотрудников. Служебные поля (id, clientId, password) отображать не нужно. Должна быть возможность удалить сотрудника. При клике на одну запись из списка должна открываться детальная страница данного сотрудника.

ДЕТАЛЬНАЯ СТРАНИЦА СОТРУДНИКА

На этой странице должна содержаться детальная информация по сотруднику с возможностью редактирования. Нельзя редактировать поля email и clientId. Должна быть возможность одобрить сотрудника/снять одобрение (подсказка: для этого можно использовать тип поля checkbox).

URL детальной страницы должен содержать id сотрудника. Пример: localhost:3000/officers/12345 откроет страницу сотрудника с id 12345.

ТРЕБОВАНИЯ К ИНТЕРФЕЙСУ
В данном проекте нет готового макета и вам необходимо самостоятельно продумать пользовательский интерфейс. Все оформление: цветовая гамма, расположение элементов, шрифты — на ваше усмотрение. Оцениваться интерфейс будет по следующим критериям:

Читабельность: весь текст должен быть хорошо виден и читабелен. Размер шрифта — не менее 13 пикселей.
Доступность: все элементы должны быть доступны для взаимодействия. Не допускается перекрытие другими элементами, «уползание» за край экрана и т.д.
Понятность: пользователю должно быть однозначно понятно, за что отвечает тот или иной элемент интерфейса: кнопка, поле, выпадающий список и т.д.
Адаптивность: интерфейс должен отображаться корректно на любых размерах экрана.

ТРЕБОВАНИЯ К ВЕРСТКЕ
Соблюдайте семантическую вёрстку. На каждой странице должны присутствовать разделы header, main и footer, а также заголовок h1. Кнопки должны быть реализованы элементом button, элементы дропдауна — списком select и так далее.
Если какой-либо элемент доступен для взаимодействия (ссылка, кнопка), при наведении курсора должен появляться cursor: pointer. Внешний вид самого элемента тоже должен меняться при наведении курсора. Пример: нижнее подчеркивание текста у ссылки, другой цвет фона у кнопки и т.д.
Во всех формах сайта присутствуют обязательные поля, поэтому необходимо обязательно продумать валидацию форм. Если пользователь пытается отправить форму с незаполненными обязательными полями, он должен увидеть сообщение об ошибке.

ТРЕБОВАНИЯ К REACT
Интерфейс должен быть поделен на компоненты. Перед началом работы хорошенько обдумайте, какие компоненты вы будете использовать. Деление на компоненты должно быть логичным и оправданным.
В проекте будет использоваться довольно много данных, поэтому рекомендуется использовать более продвинутый инструмент хранения и изменения данных, чем обычный state, например useReducer или Redux.
При написании кода старайтесь следовать принципам KISS (Keep It Short and Simple — не усложняй) и DRY (Don’t Repeat Yourself — не повторяйся).
В остальном техническая сторона реализации проекта — полностью на ваше усмотрение. Можете использовать любые инструменты и дополнительные библиотеки, какие посчитаете нужными, но старайтесь следить за тем, чтобы их применение было оправдано и не усложняло код без необходимости.
