Essa prova de conceito foi criada com o intuíto de passar conhecimento na prática sobre a tecnologia GRPC, criada pelo Google para o time de desenvolvimento da Trade Master.

Uma vez que o banco de dados é a base informacional daonde o GRPC trará seus dados, trouxe um container out-of-the-box postgres para abstrair essa complexidade com o simples comando abaixo (a ser executado a partir da raiz):

docker-compose up

A tecnologia Grpc é um framework que aproveita o Http 2 e o Protocol Buffers, tornando assim a comunicação mais rápida, segura e confiável protocolo de comunicação para micro-serviços.

Se compararmos o GRPC com a implementação REST, temos as seguintes vantagens:

1 - Velocidade:  HTTP/2 suporta streams bidirecionais e fluxo de controle, então uma vez estabelecida a conexao com o cliente ou servidor pode puxar e empurrar dados, sem necessitar do throghtput de request/response de uma api rest tradicional. Mais informações sobre o HTTP/2 consulte https://http2.github.io/faq/
2 - Mensagens (Ao invés de recursos e verbos): Com GRPC o programador não está mais restringido a um conjunto de métodos.Podendo criar seus próprios métodos, como o listEquities ou createEquity, que o desenvolvedor consegue aproveitar através de uma simples chamada de método. E da perspectiva do desenvolvedor, chamar um método GRPC é como chamar qualquer outro método nativo local, por baixo dos panos é só uma chamada de rede.
3 - Protocol Buffers - GRPC usa Protocol Buffers (Fortemente tipado e baseado em binário) ao invés de Json(Fracamente tipado e baseado em texto), o que é muito mais eficiente e introduz a segurança do tipo. A definição de serviço em si é declarativa e usada para gerar bibliotecas clientes. Além disso o Protocol Buffer se comparado com JSON pode decremetar o tamanho do payload sendo transmitido, em escala pode reduzir o custo de largura de banda. 

Dentre os 4 tipos de métodos GRPC temos

Unary ==> Aonde o cliente envia um único pedido e pega uma única resposta ==> rpc getData(req) returns(rsp)()

Server Streaming ==> Aonde o cliente envia um único pedido e pega um stream de resposta ==> rpc getData(req) returns (stream resp){}

Client Streaming ==> Aonde o cliente envia um stream e pega uma única resposta ==> rpc getData(stream req) returns(rsp){}

Bidirecional Streaming ==> Ambos o cliente e servidor enviam e recebem streams ==> rpc getData(stream req) returns (stream rsp){}

Vamos utilizar a abordagem Unary.

Vamos utilizar a seguinte estrutura de diretórios:

!---client
!    !--app.js
!    !--package.json
!---protos
!---server
    !--index.js
    !--package.json

Vamos começar definindo o serviço GRPC do servidor, que define o que será exposto e associa os parametros e tipos de mensagens de retorno.

Vamos adicionar um novo arquivo dentro do diretório protos chamado equity.proto, que cuidará da definição dos tipos de mensagem que futuramente trafegarão para o cliente.

Essa definição na nossa PoC cuidará de um CRUD que fará manutenção de dados de ações do mercado financeiro, Equities, para isso teremos 5 métodos:

CRUD            GRPC método
Read            listEquities
Create          createEquity
Read            readEquity
Update          updateEquity
Delete          deleteEquity

Essa estrutura pretende manter a tabela de banco de dados equities do Postgres, no banco ded dados grpc_equities.

O primeiro passo para instalar o protobuf no sistema operacional Linux/Windows use o comando:
sudo apt install protobuf-compiler

O segundo passo é instalar as dependências do servidor que foram injetadas pelo package.json usando o comando: npm install

Repare que o arquivo knexfile.js é utilizado para conectar com o postgres, e que nesse projeto já temos um docker-compose.yml que já contém essa abstração via container, porém caso estejam querendo expandir o uso desse GRPC para outros micro-serviços dentro da organização, alterem as variáveis database, user, password, host e port.

Para criar o arquivo de migração rode o comando abaixo:
./node_modules/.bin/knex migrate:make equities

Adicione o código stub no diretório: server/db/migrations:

exports.up = function (knex, Promise) {
    return knex.schema.createTable('equities', function (table) {
      table.increments();
      table.string('name').notNullable();
      table.string('quotation').notNullable();
      table.string('dateOfPurchase').notNullable();
    });
};
  
exports.down = function (knex, Promise) {
    return knex.schema.dropTable('equities');
};

Aplique a migração com o comando:

./node_modules/.bin/knex migrate:latest


Crie um novo arquivo seed:
 ./node_modules/.bin/knex seed:make equities

Adicione o código:

 exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('equities').del()
    .then(function () {
      // Inserts seed entries
      return knex('equities').insert([
        { name: 'ETH', quotation: '1.99' , dateofpurchase : '2023-02-03 16:31:30.945' },
        { name: 'Coca-Cola', quotation: '2.99' , dateofpurchase : '2023-02-03 16:31:30.945'},
      ]);
    });
};


O código index.js já está pronto para uso.

Geração de código estática e dinâmica:

Há duas maneiras de trabalhar com Protocol buffers in node:
1 - Dinamicamente : Com geração de código, o Protocol Buffer é carregado e convertido em tempo de execução com Protobuf.js
2 - Estaticamente : Com a abordagem estática, o Protocol Buffer é pré-processado no JavaScript.

Nós usaremos a abordagem dinâmica, sendo mais simples de implementar, o que difere do workflow de outro GRPC suportados por outras linguagens, desde que requer a geração de código estática.

Primeiramente rode a grpc-tools globalmente:

npm install -g grpc-tools

Depois gere o código dinâmico do diretório root, como o comando:

protoc -I=. ./protos/equity.proto \
  --js_out=import_style=commonjs,binary:./server \
  --grpc_out=./server \
  --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin`


o código gerado estará no diretório server/protos:
1 - equity_grpc_pb.js
2 - equity_pb.js


Esse código será utilizado para o index.js da pasta server.

Rode o GRPC do servidor como o comando:
npm start

Você verá:
gRPC server running at http://127.0.0.1:50051

A estrutura do projeto terá a seguinte cara:
├── client
│   ├── app.js
│   └── package.json
├── protos
│   └── product.proto
└── server
    ├── db
    │   ├── migrations
    │   │   └── 20190131084532_products.js
    │   └── seeds
    │       └── products.js
    ├── index.js
    ├── knexfile.js
    ├── package-lock.json
    └── package.json


A partir do diretório client, instale as dependencias injetadas a partir do package.json, usando o comando:
npm install

As rotas definidas no cliente serão Apis rest somente por facilidade de uso, poderiam ser apenas cliente de console por exemplo. As rotas estarão no diretório client/routes.

As definições de rotas estarão no arquivo equityRoutes.js, e o cliente GRPC boilerplate estará no arquivo grpcRoutes.js.

rode o comando:
$ npm start

Você verá:
Server listing on port 3000

Para consultar as equities presentes no banco chame do client que preferir:
http://127.0.0.1:3000/api/equities/

Para consultar um só equity: http://127.0.0.1:3000/api/equities/18

retornando o resultado:
{
	"id": 18,
	"name": "BTC",
	"quotation": "9999999999999.99999999999999",
	"dateofpurchase": "Fri Feb 03 2023 19:42:23 GMT-0300 (Brasilia Standard Time)"
}

Para criar uma equity:

curl -X POST -d '{"name": "BNB","quotation": "US$ 330,03"}' \
    -H "Content-Type: application/json" http://127.0.0.1:3000/api/equities
{
  "status": "success"
}

Alterar uma equity: 
curl -X PUT -d '{"name": "BNB","quotation": "US$ 330,04"}' \
    -H "Content-Type: application/json" http://127.0.0.1:3000/api/products/18

{
  "status": "success"
}

Deletar uma equity:

curl -X DELETE http://127.0.0.1:3000/api/equities/18

{
  "status": "success"
}

Se uma equity não existe:
curl -X DELETE http://127.0.0.1:3000/api/equities/1
"That equity does not exist."


Aproveitem!




