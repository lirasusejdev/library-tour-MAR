
<h1 align="center"> 
	:heavy_check_mark: Projeto do Template de Micro Frontend (Extranet) 🚀! :heavy_check_mark:
</h1>

Repo específico para o template do boilerplate dos projetos de Micro Frontend que serão integrados na [Nova Extranet][sne].


## Você tem dúvidas sobre Micro Frontend
Se você tem dúvidas sobre Micro Frontends, assista esse [Tech Talks][techTalk] onde conseguirá entender melhor conceitos, regras e sugestões de implementação. *(O [Tech Talks][techTalk] sobre micro frontend começa aos 36:15min. aproximadamente).* 

----

### Elaboramos uma WIKI com mais detalhes
A Squad da Nova Extranet, que já está utilizando Micro Frontend com dois outros projeto, e elaborou uma [WIKI][wiki_mf] recheada de detalhes que provavelmente lhe ajudarão a esclarecer as principais dúvidas.
<br /><br />

Se seu projeto **será acoplado na Nova Extranet até final de Janeiro**, sugerimos que baixem a branch `nova-extranet-old`.

Se seu projeto **será acoplado na Nova Extranet a partir do início de Fevereiro**, sugerimos que baixam a branch `nova-extranet-new`.

<br /><br />

Essas Branchs citadas já estão com exemplos de código que com certeza deverão ser utilizados para o acoplamento de maneira satisfatória.

----

## Nova Integrações (provavelmente utilizarão o template)
Uma breve lista dos Projetos que serão integrados a Nova Extranet:

* [Central de Soluções do Franqueado] - A CSF, possuirá um micro frontend que gerenciará os Chamados dos Franqueados!
* [Sistema de Devoluções] - Projeto do sistema de Devoluções
* [Sistema de Boletos] - Projeto do sistema Boletos
* [Sistema de Pagamentos SKU] - Projeto do sistema de Pagamentos em SKU's
* [Sistema de Info Varejo] - Projeto do sistema Info Varejo
* [Sistema do MAR] - Projeto do Modelo de Abastecimento de Rede
* [Sistema de Níquel] - Níquel (Sem detalhamento ainda)
* [Sistema de Precificadores] - Projeto do sistema de Precificadores
* [Sistema Ação de Fluxo] - Projeto relacionado a Ação de Fluxo

## TODO
- [ ] Incluir estilos do Design System
- [ ] Incluir padrões de Testes

## Estrutura

### Container
A pasta container contém a lógica necessária para uma aplicação carregar os microfrontends em sua interface, sendo que a única informação necessária é a url de publicação da solução.

`<MicroFrontend>`
- Cria um ID único para cada micro frontend cadastrado.
- Faz um request para a url do micro frontend e busca as informações para rodar o micro frontend a partir de `microfrontend-manifest.json`.
- Controla o mount e unmount do micro frontend.

`event-bus.js`
- Possibilita a comunicação entre aplicações utilizando o padrão Event Bus.
- Adiciona no escopo global (`window`) os métodos `subscribe` e `publish`.

### Microfrontend
Contém a lógica básica para a implementação de um Microfrontend em React.

`<ImageWithHost>`
- Cria um wrapper de uma tag <img /> que adiciona a informação do host a url, permitindo utilizar arquivos otimizados pelo Webpack.
- Sem o host, o Webpack utilizar por padrão a url base da aplicação container.

`event-bus`
- Exporta wrappers para `subscribe` e `publish`, adicionando o ID da aplicação
- Permite a comunicação entre a aplicação container e micro frontends.

### Interface Container x Micro frontends
A interface entre o container e o micro frontend tem como base o arquivo "microfrontend-manifest.json" provido pelo micro frontend na raiz de sua aplicação.

Neste arquivo estão presentes as duas informações principais:
 - microfrontendname: Nome do micro frontend
 - index.js: Path do arquivo javascript que efetua o carregamento do micro frontend. Por padrão, este arquivo deve definir dois métodos no window, que serão executados no 'render' e no 'unmount' respectivamente:
   - render\<microfrontendname>
   - unmount\<microfrontendname>

### Comunicação
A comunicação entre o container e o micro frontend pode ser feita de duas maneiras:
- EventBus (bilateral): Utilizando o serviço `event-bus` para emitir e ouvir eventos através de toda a aplicação.
- Contexto (unilateral): O container passa seu contexto para dentro de cada micro frontend como `prop`, que pode ser acessado via hook `useContext`.

----
## Pré-requisitos

- [NodeJS](https://nodejs.org/en/download/)
- [Yarn](https://classic.yarnpkg.com/en/)


## Passos para montar ambiente local

1. Clonar o repositório:
```sh
# Clone o Projeto
git clone https://github.com/grupoboticario/template-micro-frontend-react.git
```

2. Instalar dependências (`/container`):
```sh
# No diretório /container
yarn install
```

3. Build na aplicação (`/container`):
```sh
# Opcional
yarn build
```

4. Start da aplicação (`/container`):
```sh
yarn start
```

5. Aplicação **Container** ficará disponível em **http://localhost:3010 ou http://localhost:3011**

6. Irá aparecer uma tela de Login -> **Informe um usuário/senha válidos da Nova Extranet** A aplicação já está configurada para apontar para a API de Desenvolvimento da Nova Extranet. E conforme código abaixo já estará configurado para a URL do **MicroFrontend** 

* Vide: `\container\src\environments` branch `nova-extranet-new`

```js
  api: {
    urlBase: 'https://dapi-extranet.grupoboticario.digital',
  },
  microFrontendUrl: {
    csf_chamados_frontend: 'http://localhost:3020',
  },
```

----

7. Instalar dependências (`/microfrontend`):
```sh
# No diretório /microfrontend
yarn install
```

8. Build na aplicação (`/microfrontend`):
```sh
# Opcional
yarn build
```

9. Start da aplicação (`/microfrontend`):
```sh
yarn start
```

10. Aplicação **MicroFrontend** ficará disponível em **http://localhost:3020** (Abra o navegador, para conferir)

* Vide: `\microfrontend\src\environments` branch `nova-extranet-new`

```js
  name: 'dev',
  urlExtranet: 'http://localhost:3010',
```
<br />
<br />

### Testando / Utilizando

| Environment  |  Url  |
| - | - |
|  Container |  http://localhost:3010 |
|  MicroFrontend |  http://localhost:3020 |
|  API Dev Nova Extranet |  https://dapi-extranet.grupoboticario.digital/swagger/index.html |

Após estar com ambas as aplicações rodando em portas diferentes, já conseguirá notar que ao clicar no Botão **"Suporte"** do **Container**, será carregado o **Microfrontend** dentro do **Container**.

Demais detalhes poderão ser analisando o código:

* Preste atenção no arquivo `\microfrontend\config-overrides.js` as configurações mais importantes estão nesse arquivo



[sne]: https://wiki.grupoboticario.digital/wiki/Squad_Nova_extranet
[techTalk]: https://web.microsoftstream.com/video/dec2767e-1e75-462c-b5b5-83d95432ba08?st=2115
[wiki_mf]: https://wiki.grupoboticario.digital/wiki/Micro_Frontend_-_Nova_Extranet
