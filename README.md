# Locadora

###### Exercício de Seleção - Desenvolvedor Back-End NodeJS

Este repositório contém um sistema de uma locadora de filmes. O sistema possui as seguintes características: 

- O sistema deve permitir a criação de usuários (clientes), logon e logoff de um usuário, listagem de filmes disponíveis, locação de um filme, devolução de um filme, e pesquisa de filme pelo título;
- Um filme deve possuir um título e um diretor;
- A locadora pode possuir múltiplas cópias de um mesmo filme;
- Um usuário deve possuir um e-mail para se identificar no sistema, um nome (para exibição) e uma senha;
- O sistema pode ser acessado concorrentemente por múltiplos usuários, que competirão pela locação dos filmes.

## Configurações do ambiente

Neste projeto, o [docker CE](https://docs.docker.com/install/linux/docker-ce/debian/) (Community Edition) foi utilizado para fazer o gerenciamento dos serviços da aplicação (banco de dados), mas nada impede que a instalação dos mesmos sejam feitos no host.

Após a intalação do docker CE, é preciso criar uma instância do postgres como descrito no site do [docker hub](https://hub.docker.com/_/postgres), isso pode ser feito através do comando `docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres`.

###### Obs.: Durante a criação da instância do postgres pode ser que o container do docker não permaneça rodando após ter sido criado, caso isso aconteça, desabilitar o _apparmor_ deve resolver o problema. [Descrição + Solução do problema](https://stackoverflow.com/questions/57873532/unable-to-start-docker-container-docker-ps-a-status-exited-1)

O seguinte projeto foi todo desenvolvido utilizando nodejs e o gerenciador de pacotes [yarn](https://yarnpkg.com/lang/en/) foi utilizado para gerenciar as dependências do projeto.

Com yarn instalado, basta clonar o repositório localmente `git clone https://github.com/Tocchetto/locadora.git`, entrar na pasta **locadora** `cd locadora` e utilizar o comando `yarn` para instalar as dependências do projeto.

Para rodar o servidor basta executar o comando `yarn dev`.

### Sequelize

O banco de dados desse projeto foi desenvolvido utilizando o sequelize. Para montar sua estrutura, é necessário criar um banco que condiga com o nome descrito no arquivo [`.env`](./.env) (nesse caso o nome do banco é _locadora_), após isso, basta rodar o comando `yarn sequelize db:migrate` que irá criar as tabelas utilizadas nesse projeto. Esse processo é realizado a partir das definições disponíveis no arquivo que está na pasta [migrations](./src/database/migrations), que nesse caso, faz referência a uma tabela de usuário, filmes e locações.

[Script SQL para criação do banco de dados sem o sequelize](/locadora.pgsql)

### Testes

Foram feitos alguns testes de integração que podem ser encontrados [aqui](./__tests__/integration). Todos os testes realizados nesse projeto englobam apenas as rotas que não precisam do token de autenticação do usuário para serem acessadas.

Para rodar os testes basta executar o comando `yarn test` na raiz do projeto.

## Especificação da API webservice

[Modelo de requisições da aplicação no formato JSON](/Insomnia.json)

### 1. Criação de um usuário 

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

  OR

  - **Code:** 401 _UNAUTHORIZED_
  - **Content:** `{"error": "Token not provided"}`

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

- **Error response**

  - **Code:** 401 _UNAUTHORIZED_
  - **Content:** `{"error": "Invalid token."}`

  OR

  - **Code:** 401 _UNAUTHORIZED_
  - **Content:** `{"error": "Token not provided"}`

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
  - **Content:** `{"error": "Invalid token"}`

  OR

  - **Code:** 401 _UNAUTHORIZED_
  - **Content:** `{"error": "Token not provided"}`

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
  - **Content:** `{"error": "Invalid token"}`

  OR

  - **Code:** 401 _UNAUTHORIZED_
  - **Content:** `{"error": "Token not provided"}`

- **Chamada de exemplo:**

  `curl -d '{"id_movie": 1, "quantity": 2}' -H "Content-Type: application/json" -H "Authorization: Bearer <bearer_token>" -X PUT http://localhost:3333/rents`