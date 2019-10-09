# Locadora
###### Exercício de Seleção - Desenvolvedor Back-End NodeJS

## Especificação da API webservice

### 1. Criação de usuário 

##### `POST` → /users

Cria um novo usuário no sistema.

- **Corpo da requisição**

  ```json
  {
      "name": "Guilherme Zanatta Tocchetto",
      "email": "tocchettoo@gmail.com",
      "password": "senhasegura"
  }
  ```

#### Possible responses:

- **Success response**

  - **Code:** 200 _OK_
  - **Content:** `{"id": 1, "name": "Guilherme Zanatta Tocchetto", "email": "tocchettoo@gmail.com" }`

- **Error responses**

  - **Code:** 400 _BAD REQUEST_
  - **Content:** `{"error": "Validation failed"`

  OR

  - **Code:** 400 _BAD REQUEST_
  - **Content:** `{"error": "This email is already taken."}`

- **Chamada de exemplo:**

  `curl -d '{"name":"Guilherme Zanatta Tocchetto", "email":"tocchettoo@gmail.com", "password": "senhasegura"}' -H "Content-Type: application/json" -X POST http://localhost:3333/users`

-------------------

### 2. Logon do usuário

##### `POST` → /sessions

Autentica o usuário no sistema e retorna um token para autenticação.

- **Corpo da requisição**

  ```json
  {
  	"email": "tocchettoo@gmail.com",
  	"oldPassword": "senhasegura"
  }
  ```

#### Possible responses:

- **Success response**

  - **Code:** 200 _OK_
  - **Content:** `{"id": 1, "name": "Guilherme Zanatta Tocchetto", "email": "tocchettoo2@gmail.com", "token": <bearer token>}`

- **Error responses**

  - **Code:** 401 _BAD REQUEST_
  - **Content:** `{"error": "Password does not match."`

  OR

  - **Code:** 401 _BAD REQUEST_
  - **Content:** `{"error": "This email is not registered."}`

- **Chamada de exemplo:**

  `curl -d '{"email":"tocchettoo@gmail.com", "password": "senhasegura"}' -H "Content-Type: application/json" -X POST http://localhost:3333/sessions`

- **Observação:**

  O parâmetro `bearer_token` que é retornado no corpo dessa requisição deve ser enviado no header de todas as próximas requisições do cliente listadas abaixo, é através dele que o servidor irá fazer a validação da sessão do usuário.

------------------------

### 3. Edição das informações do usuário

##### `PUT` → /users

Edita as informações de um usuário já existente no sistema.

- **Corpo da requisição**

  ```json
  {
  	"name": "Guilherme Zanatta Tocchetto",
  	"email": "tocchettoo2@gmail.com",
  	"oldPassword": "senhasegura",
      "password": "novasenhasegura",
  	"confirmPassword": "novasenhasegura"
  }
  ```

  ###### Obs.: O parâmetro `bearer_token` deve ser enviado no header dessa requisição.

#### Possible responses:

- **Success response**

  - **Code:** 200 _OK_
  - **Content:** `{"id": 1, "name": "Guilherme Zanatta Tocchetto", "email": "tocchettoo2@gmail.com"}`

- **Error responses**

  - **Code:** 400 _BAD REQUEST_
  - **Content:** `{"error": "Validation failed"`

  OR

  - **Code:** 400 _BAD REQUEST_
  - **Content:** `{"error": "This email is already taken."}`

  OR

  - **Code:** 401 _UNAUTHORIZED_
  - **Content:** `{"error": "Old password does not match."}`

  OR

  - **Code:** 401 _UNAUTHORIZED_
  - **Content:** `{"error": "Invalid token."}`

- **Chamada de exemplo:**

  `curl -d '{"name":"Guilherme Zanatta Tocchetto", "email":"tocchettoo@gmail.com", "oldPassword": "senhasegura", "password": "novasenhasegura", "confirmPassword": "novasenhasegura"}' -H "Content-Type: application/json" -H "Authorization: Bearer <bearer_token>" -X PUT http://localhost:3333/users`

------------------

### 4. Criação de um filme

##### `POST` → /movies

Registra um novo filme no sistema.

- **Corpo da requisição**

  ```json
  {
  	"title": "The Boy Who Harnessed the Wind",
  	"director": "Chiwetel Ejiofor",
  	"quantity": 2
  }
  ```

  ###### Obs.: O parâmetro `bearer_token` deve ser enviado no header dessa requisição.

#### Possible responses:

- **Success response**

  - **Code:** 200 _OK_
  - **Content:** `{"id": 1, "title": "The Boy Who Harnessed the Wind", "director": "Chiwetel Ejiofor", "quantity": 2}`

- **Error responses**

  - **Code:** 400 _BAD REQUEST_
  - **Content:** `{"error": "Validation failed"`

  OR

  - **Code:** 401 _UNAUTHORIZED_
  - **Content:** `{"error": "Invalid token."}`

- **Chamada de exemplo:**

  `curl -d '{"id": 1, "title": "The Boy Who Harnessed the Wind", "director": "Chiwetel Ejiofor", "quantity": 2}' -H "Content-Type: application/json" -H "Authorization: Bearer <bearer_token>" -X POST http://localhost:3333/movies`

---------------------

### 5. Listagem de um filme

##### `GET` → /movie?title=\<titulo_do_filme\>

Retorna um filme do sistema 

- **Corpo da requisição**

  `Vazio`

  ###### Obs.: O parâmetro `bearer_token` deve ser enviado no header dessa requisição.

#### Possible responses:

- **Success response**

  - **Code:** 200 _OK_
  - **Content:** `{"id": 1, "title": "The Boy Who Harnessed the Wind", "director": "Chiwetel Ejiofor", "quantity": 2, "createdAt": "2019-10-09T05:29:26.506Z", "updatedAt": "2019-10-09T05:29:26.506Z"}`

- **Error responses**

  - **Code:** 400 _BAD REQUEST_
  - **Content:** `{"error": "Movie does not exists"`

  OR

  - **Code:** 401 _UNAUTHORIZED_
  - **Content:** `{"error": "Invalid token."}`

- **Chamada de exemplo:**

  `curl -H "Content-Type: application/json" -H "Authorization: Bearer <bearer_token>" -X GET http://localhost:3333/movie?title=The%20Boy%20Who%20Harnessed%20the%20Wind`

----------------

### 6. Listagem de todos os filmes

##### `GET` → /movies

Retorna todos os filmes cadastrados no sistema 

- **Corpo da requisição**

  `Vazio`

  ###### Obs.: O parâmetro `bearer_token` deve ser enviado no header dessa requisição.

#### Possible responses:

- **Success response**

  - **Code:** 200 _OK_
  - **Content:** `[{"id": 1, "title": "The Boy Who Harnessed the Wind", "director": "Chiwetel Ejiofor", "quantity": 2, "createdAt": "2019-10-09T05:29:26.506Z", "updatedAt": "2019-10-09T05:29:26.506Z"}]`

- **Chamada de exemplo:**

  `curl -H "Content-Type: application/json" -H "Authorization: Bearer <bearer_token>" -X GET http://localhost:3333/movies`

-------------

### 7. Locação de um filme

##### `POST` → /rents

Cria uma locação e vincula a mesma a um usuário.

- **Corpo da requisição**

  ```json
  {
  	"id_movie": 1,
  	"quantity": 2
  }
  ```

  ###### Obs.: O parâmetro `bearer_token` deve ser enviado no header dessa requisição.

#### Possible responses:

- **Success response**

  - **Code:** 200 _OK_
  - **Content:** `{"id": 1, "id_user": 1, "rented_at": "2019-10-09T06:03:51.363Z", "returned_at": null, "id_movie": 1, "quantity": 2, "updatedAt": "2019-10-09T06:03:51.364Z", "createdAt": "2019-10-09T06:03:51.364Z"}`

- **Error responses**

  - **Code:** 400 _BAD REQUEST_
  - **Content:** `{"error": "Validation failed"`

  OR

  - **Code:** 400 _BAD REQUEST_
  - **Content:** `{"error": "Movie does not exists"`

  OR

  - **Code:** 400 _BAD REQUEST_
  - **Content:** `{"error": "There are no copies available for this movie"`

  OR

  - **Code:** 401 _UNAUTHORIZED_
  - **Content:** `{"error": "Invalid token."}`

- **Chamada de exemplo:**

  `curl -d '{"id_movie": 1, "quantity": 2}' -H "Content-Type: application/json" -H "Authorization: Bearer <bearer_token>" -X POST http://localhost:3333/rents`

-------------

### 8. Locação de um filme

##### `PUT` → /rents

Realiza a devolução de um filme.

- **Corpo da requisição**

  ```json
  {
  	"id_movie": 1,
  	"quantity": 2
  }
  ```

  ###### Obs.: O parâmetro `bearer_token` deve ser enviado no header dessa requisição.

#### Possible responses:

- **Success response**

  - **Code:** 200 _OK_
  - **Content:** `{"id": 1, "rented_at": "2019-10-09T05:58:30.494Z", "returned_at": "2019-10-09T06:03:37.082Z", "quantity": 2, "createdAt": "2019-10-09T05:58:30.494Z", "updatedAt": "2019-10-09T06:03:37.082Z", "id_user": 1, "id_movie": 1}`

- **Error responses**

  - **Code:** 400 _BAD REQUEST_
  - **Content:** `{"error": "Validation failed"`

  OR

  - **Code:** 400 _BAD REQUEST_
  - **Content:** `{"error": "This rent does not exists"`

  OR

  - **Code:** 401 _UNAUTHORIZED_
  - **Content:** `{"error": "Invalid token."}`

- **Chamada de exemplo:**

  `curl -d '{"id_movie": 1, "quantity": 2}' -H "Content-Type: application/json" -H "Authorization: Bearer <bearer_token>" -X PUT http://localhost:3333/rents`