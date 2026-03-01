# FLocky - Realtime Chat

Мессенджер для обмена текстовыми сообщениями в режиме реального времени в рамках тематических чат-комнат.

## 🚀 Возможности

- ✅ Регистрация и аутентификация пользователей
- ✅ Просмотр списка существующих комнат
- ✅ Поиск комнат в реальном времени (live search)
- ✅ Просмотр истории сообщений в чате
- ✅ Отправка сообщений в чатах комнат
- ✅ Удаление собственных сообщений
- ✅ Удаление любых сообщений для владельца комнаты
- ✅ Поиск сообщений в выбранном чате (live search)
- ✅ Отображение сообщений в реальном времени
- ✅ Выход из аккаунта

## 🛠 Технологии

- **Frontend**: React 18.2.0
- **Build Tool**: Vite 5.2.0
- **State Management**: Redux Toolkit 2.8.2
- **Backend**: Firebase 11.8.1
  - Firebase Authentication (аутентификация по email)
  - Firebase Realtime Database (хранение данных в реальном времени)
- **UI Library**: RSuite 5.81.0 (уведомления об ошибках)
- **Routing**: React Router DOM 7.6.0

## 📦 Установка

1. Клонируйте репозиторий:
```bash
git clone https://github.com/Luca324/FLocky.git
cd realtime-chat
```

2. Установите зависимости:
```bash
cd app
npm install
```

3. Создайте файл `.env` в папке `app` и добавьте конфигурацию Firebase:
```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_DATABASE_URL=your_database_url
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 🏃 Запуск

### Режим разработки
```bash
npm run dev
```
Приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000)

### Сборка для продакшена
```bash
npm run build
```

### Просмотр продакшен сборки
```bash
npm run preview
```

## 🔍 Особенности реализации

### Поиск

Поиск по комнатам и сообщениям реализован на стороне клиента с использованием гибридного алгоритма:

1. **Точный поиск подстроки** (без учета регистра)
   - Используется `String.includes()` для проверки точного вхождения подстроки

2. **Нечеткое сравнение строк** на основе расстояния Левенштейна
   - Применяется, если точное вхождение не найдено
   - Позволяет находить результаты даже при опечатках

### Права доступа

- **Обычный пользователь**: может удалять только свои сообщения
- **Владелец комнаты**: может удалять любые сообщения в своей комнате

## 📸 Скриншоты

### Окно входа и регистрации
<img width="1707" height="734" alt="Окно входа и регистрации" src="https://github.com/user-attachments/assets/a1a66f5b-4458-4d68-85ea-c2396a207e04" />

### Окно комнаты
<img width="954" height="640" alt="Окно комнаты" src="https://github.com/user-attachments/assets/6716135b-b3de-49db-bb5b-479eb91b1afd" />

### Поиск по чатам
<img width="1001" height="358" alt="Поиск по чатам" src="https://github.com/user-attachments/assets/fa755780-e0d2-463d-b196-e1bca2f83c69" />

### Поиск по сообщениям
<img width="954" height="639" alt="Поиск по сообщениям" src="https://github.com/user-attachments/assets/e07481b1-0f17-4d72-a762-9b51e4d259af" />

### Удаление сообщения
<img width="1649" height="332" alt="Удаление сообщения" src="https://github.com/user-attachments/assets/7edaee4b-e63f-4074-83c3-88cb67a09026" />

### Сообщения об ошибках
<img width="614" height="610" alt="Сообщения об ошибках" src="https://github.com/user-attachments/assets/d8cc61ae-a26e-4116-9f9f-ee587b9c0956" />

## 📁 Структура проекта

```
app/
├── src/
│   ├── components/        # React компоненты
│   │   ├── Chat.jsx       # Компонент чата
│   │   ├── Login.jsx      # Компонент входа
│   │   ├── Register.jsx   # Компонент регистрации
│   │   └── UI/            # UI компоненты
│   ├── store/             # Redux store и слайсы
│   ├── utils/             # Утилиты (поиск, clipboard)
│   ├── firebase.js        # Конфигурация Firebase
│   └── styles/            # Стили приложения
├── package.json
└── vite.config.js
```

## 🌿 Ветки проекта

- `main` - основная ветка
- `search` - разработка поиска
- `auth` - разработка авторизации
- `top-tabs` - альтернативная версия дизайна списка комнат
- `build` - коммиты, относящиеся к сборке проекта

## 📝 Лицензия

Проект разработан в учебных целях.

## 👤 Автор

Tatyana Mosolova

---

**Репозиторий**: [https://github.com/Luca324/FLocky](https://github.com/Luca324/FLocky)
