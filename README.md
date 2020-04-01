Backend:
Rode yarn para instalar as dependências;

Crie um banco de dados no postgres com o nome que desejar .env;

Renomeie o arquivo .env.example para .env;

Coloque as suas credenciais dentro do .env;

Rode yarn sequelize db:migrate para executar as migrations;

Rode yarn dev para iniciar o servidor.

comandos docker:
para o postgres(BD princical) : docker run --name database -e POSTGRES_PASSWORD=password_example -p 5432:5432 -d postgres

mongo(notificações) : docker run --name mongo -p 21017:27017 -d -t mongo

redis(fila de email) : docker run --name redis -p 6379:6379 -d -t redis:alpine


Frontend:
Rode yarn para instalar as dependências;

Windows: yarn react-native run-android;
