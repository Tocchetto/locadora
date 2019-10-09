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

#### Posible responses:

- **Success response**

  - **Code:** 200 _OK_

  - **Content:**

    ```json
    {
      "id": 1,
      "name": "Guilherme Zanatta Tocchetto",
      "email": "tocchettoo@gmail.com"
    }
    ```

- **Error response**

  - **Code:** 400 _BAD REQUEST_

  - **Content:** 

    ```json
    {
    	"error": "Validation failed."
    }
    ```

  OR

  - **Code:** 400 _BAD REQUEST_

  - **Content:**

    ```json
    {
    	"error": "This email is already taken."
    }
    ```

### 2. Edição das informações do usuário

##### `PUT` → /users

Edita as informações de um usuário já existente na base de dados.

- **Corpo da requisição**

  ```json
  {
  	"name": "Guilherme Zanatta Tocchetto",
  	"email": "tocchettoo2@gmail.com",
  	"oldPassword": "senhasegura",
  	"confirmPassword": "novasenhasegura",
  	"password": "novasenhasegura"
  }
  ```

#### Posible responses:

- **Success response**

  - **Code:** 200 _OK_
  - **Content:** `{"id": 1, "name": "Guilherme Zanatta Tocchetto", "email": "tocchettoo2@gmail.com"}`

- **Error response**

  - **Code:** 400 _BAD REQUEST_
  - **Content:** `{"error": "Validation failed"`

  OR

  - **Code:** 400 _BAD REQUEST_
  - **Content:** `{"error": "This email is already taken."}`

### 2. Login do usuário

Autentica o usuário no sistema e retorna um token para autenticação.

#### Requisição

| Método | URL          |
| ------ | ------------ |
| POST   | api/sessions |

| Tipo | Parâmetros   | Valores |
| ---- | ------------ | ------- |
| HEAD | bearer_token | string  |
| POST | username     | string  |
| POST | password     | string  |

O parâmetro `bearer_token` deve ser enviado em todas as requisições do cliente. Ele permite que o servidor valide a origem da solicitação.

#### Resposta

| Status | Resposta                                                     |
| :----: | :----------------------------------------------------------- |
|  200   | {<br />  "user": {<br />    "id": 1,<br />    "name": "Guilherme"<br />    "email": "email@mail.com"<br />  },<br />  "token": <bearer_token><br />} |
|  400   | {"error": "Validation failed."}                              |
|  401   | {"error": "User not found."}                                 |
|  401   | {"error": " Password does not match."}                       |

### 3. Logoff do usuário

Desconecta o usuário do sistema.

#### Requisição

| Método | URL  |
| ------ | ---- |
|        |      |

| Tipo | Parâmetros | Valores |
| ---- | ---------- | ------- |
|      |            |         |

#### Resposta

| Status | Resposta |
| :----: | -------- |
|        |          |

### 4. Listagem de filmes

Lista todos os filmes disponíveis para locação.

#### Requisição

| Método | URL        |
| ------ | ---------- |
| GET    | api/movies |

| Tipo | Parâmetros   | Valores |
| ---- | ------------ | ------- |
| HEAD | bearer_token | string  |

#### Resposta

| Status | Resposta                                                     |
| :----: | ------------------------------------------------------------ |
|  200   | {<br />{<br />"Title": "Título do filme1",<br />"Director": "Diretor do filme1"<br />},<br />{<br />"Title": "Título do filme2",<br />"Director": "Diretor do filme2"<br />}<br />} |
|  401   | {"error": "You're not authorized, please log in."}           |

### 5. Locação de filmes

Realiza o aluguel de um filme.

#### Requisição

| Método | URL  |
| ------ | ---- |
|        |      |

| Tipo | Parâmetros | Valores |
| ---- | ---------- | ------- |
|      |            |         |

#### Resposta

| Status | Resposta                                           |
| :----: | -------------------------------------------------- |
|  200   |                                                    |
|        |                                                    |
|  401   | {"error": "You're not authorized, please log in."} |

### 6. Devolução de filmes

Realiza a devolução de um filme.

#### Requisição

| Método | URL  |
| ------ | ---- |
|        |      |

| Tipo | Parâmetros | Valores |
| ---- | ---------- | ------- |
|      |            |         |

#### Resposta

| Status | Resposta                                           |
| :----: | -------------------------------------------------- |
|  200   |                                                    |
|  401   | {"error": "You're not authorized, please log in."} |

### 7. Pesquisa por filmes

Pesquisa um filme pelo seu título.

#### Requisição

| Método | URL  |
| ------ | ---- |
|        |      |

| Tipo | Parâmetros | Valores |
| ---- | ---------- | ------- |
|      |            |         |

#### Resposta

| Status | Resposta                                           |
| :----: | -------------------------------------------------- |
|  200   |                                                    |
|  401   | {"error": "You're not authorized, please log in."} |