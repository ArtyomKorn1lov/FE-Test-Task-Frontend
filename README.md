# Справочник пользователей FeTestTask

## Справочник пользователей FeTestTask, на момент реализации ТЗ удалено с github

### Краткая информация:

- Исходный макет - https://www.figma.com/design/okyYwGZKg9ZUkTzZth3YXK/FE-Test-Task-(Copy)
- Простой справочник пользователей использующий фреймворк vue 3, является web-приложением, взаимодействующим с серверной частью посредством REST
- Функционал: базовый CRUD, фильтрация, сортировка, пагинация, загрузка файлов
- Доступно развёртывание в Docker

### Cсылка на реозиторий с backend - https://github.com/ArtyomKorn1lov/FE-Test-Task-Backend

## Мануальная установка проекта:

```sh
npm install
```

### Запуск приложения для разработки

```sh
npm run dev
```

### Запуск проверки eslint и prettier

```sh
npm run lint
```

### Запуск автоматического форматера программного кода

```sh
npm run format
```

### Сборка и минификация js и css

```sh
npm run build
```

### Запуск приложения с собранными файлами

```sh
npm run preview
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
