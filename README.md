# API de Gestão de Documentos - Secretaria

Este projeto é um CRUD completo desenvolvido em **TypeScript**, **Express**, **Multer** e **MySQL** (via Sequelize), focado no upload e gestão de documentos para auxiliar a secretaria na digitalização de arquivos.

## 🚀 Tecnologias Utilizadas

- **TypeScript**: Linguagem principal.
- **Express**: Framework web.
- **Sequelize**: ORM para integração com MySQL.
- **Multer**: Middleware para upload de arquivos.
- **Swagger**: Documentação da API.
- **Zod**: Validação de esquemas (preparado para expansão).
- **Module-Alias**: Para caminhos absolutos (`@/`).

## 📂 Estrutura do Projeto

A estrutura segue o padrão de arquitetura limpa e adaptadores, inspirada no projeto de referência:

- `src/adapters`: Adaptadores para o Express.
- `src/config`: Configurações de ambiente, banco de dados, multer e middlewares.
- `src/controllers`: Lógica de controle das rotas.
- `src/docs`: Documentação Swagger (YAML).
- `src/models`: Definição dos modelos do Sequelize.
- `src/protocols`: Interfaces para padronização de requisições e respostas.
- `src/routes`: Definição das rotas da API.

## 🛠️ Como Rodar

1. **Configurar o Banco de Dados**:
   - Certifique-se de ter um servidor MySQL rodando.
   - Crie um banco de dados chamado `secretaria_db`.
   - Configure as credenciais no arquivo `.env`.

2. **Instalar Dependências**:
   ```bash
   npm install
   ```

3. **Rodar em Desenvolvimento**:
   ```bash
   npm run dev
   ```

4. **Build e Produção**:
   ```bash
   npm run build
   npm start
   ```

## 📖 Documentação

Com o servidor rodando, acesse a documentação interativa do Swagger em:
`http://localhost:3000/api-docs`

## 📝 Funcionalidades

- **Upload de Documentos**: Envio de arquivos (CPF, RG, Comprovante de Residência, Histórico Escolar).
- **Listagem**: Visualização de todos os documentos enviados ou filtrados por usuário.
- **Armazenamento**: Arquivos salvos localmente na pasta `/uploads` e metadados no MySQL.
