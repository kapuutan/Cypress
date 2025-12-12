# Cypress E2E тесты

## Запуск
- UI: `npm run cypress:open`
- CI: `npm run test:e2e`

## Покрыто
- Логин через UI
- Проверка сохранения сессии
- Переход в профиль
- Смена аватарки через input file
- Проверка сохранения после reload

## Генерация данных
- username через timestamp
- password через uuid()
