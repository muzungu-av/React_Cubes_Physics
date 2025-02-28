# Этап 1: Сборка
FROM node:20.18 AS builder
WORKDIR /app
# Включаем Corepack и устанавливаем указанную версию Yarn
RUN corepack enable && corepack prepare yarn@4.5.3 --activate
# Копируем файлы для управления зависимостями
COPY package.json yarn.lock ./
# Устанавливаем зависимости с Yarn 4.5.3
RUN yarn install --frozen-lockfile
# Копируем остальной код
COPY . .
# Выполняем сборку
RUN yarn build

# Этап 2: Сервер для продакшена
FROM node:20.18-slim
WORKDIR /app
# Копируем только результат сборки
COPY --from=builder /app/dist ./dist
# Устанавливаем минимальный сервер для отдачи статики
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]