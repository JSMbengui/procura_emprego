## Sistema de publicação de vagas

> API para o sistema de publicação de vagas

### Como instalar?
Apos fazer o clone do projecto em sua maquina 
```bash
$ npm install 
```
### Desenvolvimento

#### Iniciar o servidor
```bash
$ npm run dev
```

### Rotas desenvolvidadas no projecto

```bash
User
GER: http:localhost:5000/api/users
    body {
        password,
        email
    }
POST: http:localhost:5000/api/login
    body {
        password,
        email
    }
POST: http:localhost:5000/api/register
    body {
        name,
        birthDay,
        genero,
        password,
        email
    }
PUT: http:localhost:5000/api/users/{user_id}  | KEY
    body {
        name,
        birthDay,
        genero,
        password,
        email
    }
```

```bash
Publicação
GET: http:localhost:5000/api/posts

POST: http:localhost:5000/api/posts | KEY
    body {
        body,
        latitude,
        longitude,
        user
    }
PUT: http:localhost:5000/api/posts/{post_id} | KEY
    body {
        body,
        latitude,
        longitude,
        user
    }
DELETE: http:localhost:5000/api/posts/{post_id}  | KEY

GET: http:localhost:5000/api/canditado_posts/{post_id}  | KEY

POST: http:localhost:5000/api/canditado_posts/  | KEY
    body {
        post,
        user
    }
```

```bash
Message
GET: http:localhost:5000/api/messages

POST: http:localhost:5000/api/messages | KEY
    body {
        body,
        from,
        to
    }
PUT: http:localhost:5000/api/messages/{message_id} | KEY
    body {
        body
    }
DELETE: http:localhost:5000/api/messages/{message_id}  | KEY

GET: http:localhost:5000/api/message_of_user/{user_id} | KEY
```