# KV AGENCY — Guia rápido em português

Este pacote contém o site completo da KV AGENCY: página principal, três páginas de portfólio conceitual, página de privacidade, SVGs originais, CSS e JavaScript. Não utiliza React, bibliotecas de interface, APIs pagas ou recursos visuais externos.

## 1. Abra e visualize

1. Extraia o arquivo ZIP.
2. Abra a pasta `kv-agency-flagship` no Visual Studio Code.
3. Abra `index.html` no navegador. Para testar de forma mais próxima ao ambiente de hospedagem, execute `python -m http.server 8000` no terminal aberto dentro da pasta e acesse `http://localhost:8000`.
4. Veja os trabalhos em `projects/` e confira a navegação no celular.

## 2. Formulário de contato — integrado

O formulário **KV AGENCY — Request a Quote** foi criado na conta Formspree associada a `hello.kvstudio@gmail.com`. O e-mail foi identificado como verificado no painel em 22/11/2026.

- **Endpoint:** `https://formspree.io/f/mgakpokg`
- **Arquivo de configuração:** `assets/js/config.js`
- **E-mail comercial:** `hello.kvstudio@gmail.com`
- A página inicial também inclui o endpoint no atributo `action` do formulário para envio sem JavaScript.

**Atenção:** a integração foi configurada, mas ainda é necessário **realizar um envio real de teste** após o site estar publicado e confirmar que a mensagem chega ao Gmail. Não considere a entrega validada antes dessa conferência. Confira os limites do plano gratuito em sua conta Formspree.

Se trocar de formulário no futuro, atualize o endpoint nos arquivos `index.html` e `assets/js/config.js`.

## 3. Publicação

**GitHub Pages:** crie um repositório, envie todas as pastas e arquivos e configure `Settings > Pages > Deploy from a branch > main > /(root)`. Em alguns planos, publicar Pages de repositório privado pode exigir uma modalidade de conta específica. Confira a documentação atual.

**Vercel:** importe o repositório do GitHub; selecione um projeto estático (Framework Preset **Other**) e deixe sem comandos de build. Faça o deploy e conecte o seu domínio.

**Após escolher o domínio:** atualize os links de Open Graph das páginas para `https://SEU-DOMINIO-REAL/assets/og-cover.png`; se desejar, adicione tags canonical e `og:url` com os endereços verdadeiros. Teste o certificado HTTPS.

## 4. O que editar no projeto

- Textos, ordem das seções e links: `index.html`
- Identidade visual, cores, espaçamentos e responsividade: `assets/css/styles.css`
- Menu, animações e funcionamento do formulário: `assets/js/main.js`
- Integração de formulário e e-mail comercial: `assets/js/config.js`
- Ilustrações e mockups originais: `assets/svg/`
- Páginas de portfólio: `projects/`
- Política de privacidade: `privacy.html` — **revise antes de divulgar o site**, em especial os serviços utilizados e dados de contato.

## 5. Transparência comercial

Os projetos **Luma Home**, **Stoneform** e **Northline** são demonstrações criadas exclusivamente para apresentar direção criativa. Não representam contratos reais, depoimentos, resultados de clientes ou marcas registradas. Troque por trabalhos verdadeiros somente quando existirem e com autorização para exibir.

O site **não foi publicado automaticamente**. A publicação depende do seu domínio, da hospedagem e da configuração real dos contatos.
