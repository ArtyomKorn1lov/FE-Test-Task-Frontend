# Справочник пользователей FeTestTask (frontend)

## Справочник пользователей FeTestTask, на момент реализации ТЗ удалено с github

### Краткая информация:

- Исходный макет - https://www.figma.com/design/okyYwGZKg9ZUkTzZth3YXK/FE-Test-Task-(Copy)
- Простой справочник пользователей использующий фреймворк vue 3, является web-приложением, взаимодействующим с серверной частью посредством REST
- Функционал: базовый CRUD, фильтрация, сортировка, пагинация, загрузка файлов
- Unit-тестирование программного кода
- Используются eslint и prettier
- Доступно развёртывание в Docker

### Cсылка на репозиторий с backend - https://github.com/ArtyomKorn1lov/FE-Test-Task-Backend
### Cсылка на репозиторий с docker compose - https://github.com/ArtyomKorn1lov/FE-Test-Task-Docker-Compose

## Мануальная установка проекта:

### Установка зависимостей

```sh
npm install
```

### Запуск приложения для разработки

```sh
npm run dev
```

### Запуск unit-тестов

```sh
npm run test
```

### Запуск проверки eslint и prettier

```sh
npm run lint
```

### Запуск автоматического форматирования программного кода

```sh
npm run format
```

### Сборка и минификация js и css

```sh
npm run build
```

### Запуск приложения с собранными файлами

```sh
npm run start
```

### Prod-сборка и запуск сервера с frontend-приложением

```sh
npm run prod
```

## Установка проекта в docker:

### Сборка образа:

```sh
docker build -t fe-test-task-frontend .
```

### Запуск контейнера:

```sh
docker run -d -p 8000:80 --name fe-test-task-frontend fe-test-task-frontend
```
