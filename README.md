<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Um framework <a href="http://nodejs.org" target="_blank">Node.js</a> progressivo para construir aplicações server-side eficientes e escaláveis.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  ---

# FrontProducts: Sistema de Produtos (Frontend Angular com SSR)

[![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)
[![Angular Material](https://img.shields.io/badge/angular%20material-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://material.angular.io/)

Este projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) versão 18.2.20.

---

## Descrição do Projeto

Este é o módulo **Front-end** do sistema de produtos, desenvolvido com **Angular e Server-Side Rendering (SSR)**, também conhecido como Angular Universal. Ele se conecta à API do backend para exibir e gerenciar produtos, focando em uma experiência de usuário otimizada e melhor performance de SEO.

As principais funcionalidades e características implementadas são:

* **Listagem de Produtos:** Exibe uma listagem completa dos produtos obtidos da API, mostrando para cada item o **nome, descrição, preço e imagem**.
* **Página de Detalhes do Produto:** Ao acessar uma rota específica de produto (ex: `/produto/mouse-gamer`), exibe os detalhes completos do item.
* **Exibição da URL Atual:** Na página de detalhes do produto, a URL atual é exibida utilizando `window.location.href`.
* **Angular Universal (SSR):** Configuração correta de `@angular/platform-server` para habilitar o Server-Side Rendering, garantindo que o conteúdo seja renderizado no servidor antes de ser enviado ao cliente.
* **Componente Reutilizável:** Utilização de um componente Angular reutilizável para a exibição padronizada dos produtos.
* **Lazy Loading:** Implementação de lazy loading nas rotas para otimizar o carregamento da aplicação, carregando módulos apenas quando são necessários.
* **SEO Básico:** Configuração de meta tags dinâmicas para um SEO básico, melhorando a visibilidade do conteúdo nos motores de busca.

---

## Servidor de Desenvolvimento

Para iniciar o servidor de desenvolvimento:

```bash
ng serve

Navegue para http://localhost:4200/. A aplicação será recarregada automaticamente se você alterar qualquer um dos arquivos fonte.

Code Scaffolding
Para gerar novos componentes, diretivas, serviços, etc.:

Bash

ng generate component component-name
Você também pode usar:

Bash

ng generate directive|pipe|service|class|guard|interface|enum|module
Build (Compilação)
Para compilar o projeto para produção, incluindo o Server-Side Rendering:

Bash

ng build --configuration production --ssr
Os artefatos de build serão armazenados no diretório dist/.

Executando o Servidor SSR
Após compilar o projeto com SSR, para iniciar o servidor Node.js que irá servir a aplicação Angular com Universal:

Bash

npm run serve:ssr
A aplicação estará acessível em http://localhost:4000/.

Executando Testes de Unidade
Para executar os testes de unidade via Karma:

Bash

ng test
Executando Testes End-to-End (E2E)
Para executar os testes end-to-end:

Bash

ng e2e
