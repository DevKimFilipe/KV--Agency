# KV Agência — site futurista

Site estático em português, sem instalação, compilação, fontes externas, bibliotecas, backend ou pagamentos. Abra index.html diretamente no navegador. Os três projetos do portfólio são conceituais, com imagens ilustrativas locais. Cada um agora tem uma demonstração navegável completa na pasta conceitos. Não representam clientes reais.

## 1. Começar no Windows

Esta é a versão futurista baseada na imagem aprovada. Para evitar misturar arquivos de versões anteriores, extraia o ZIP em uma nova pasta, por exemplo Documentos > kv-agencia-futurista. Abra o index.html que está dentro dessa nova pasta. Não substitua apenas o CSS: esta revisão também altera HTML, JavaScript e recursos.

1. Baixe o ZIP e clique com o botão direito > Extrair Tudo. Escolha uma pasta, por exemplo Documentos > kv-agencia.
2. Abra a pasta extraída. index.html, style.css, script.js, motion.js, favicon.svg e as pastas assets e conceitos precisam estar juntos. A pasta assets contém fonte, licença e imagens locais. A pasta conceitos contém as três demonstrações, seus estilos e seu JavaScript. Mantenha ambas. Não abra o HTML de dentro do ZIP.
3. No VS Code, clique em Arquivo > Abrir Pasta e selecione a pasta que contém esses arquivos.
4. Clique em cada nome no painel esquerdo para ver ou editar seu conteúdo completo. Não é necessário copiar blocos da conversa: os arquivos já estão prontos.
5. Para criar manualmente: crie a pasta kv-agencia pelo Explorador de Arquivos; abra-a no VS Code; clique em Novo Arquivo e use os nomes exatos index.html, style.css, script.js, motion.js e favicon.svg. Copie TODO o conteúdo do arquivo entregue de mesmo nome para o novo arquivo correspondente. Copie também as pastas assets e conceitos completas do pacote: ela contém arquivos binários que não devem ser recriados colando texto. O README é apenas o guia.
6. Use Ctrl+S em cada arquivo alterado ou Arquivo > Salvar Tudo. Mantenha a codificação UTF-8, indicada na barra inferior do VS Code. Confira que os nomes não terminam em .txt.
7. No Explorador, dê dois cliques em index.html. Se necessário: botão direito > Abrir com > Microsoft Edge, Chrome ou Firefox. Não precisa de terminal, servidor ou extensão Live Server.
8. Após editar, salve e atualize a página. Use Ctrl+F5 se o navegador mostrar uma versão antiga.

## 2. Contato e formulário

- WhatsApp real: https://wa.me/5582991952394
- E-mail real: hello.kvstudio@gmail.com
- Instagram: https://www.instagram.com/kvagency.studio
- Nome usado: KV Agência, conforme este pedido.

O formulário tem duas etapas: primeiro serviço, descrição e campos opcionais do projeto; depois nome, e-mail e empresa opcional. Use Continuar para avançar e Voltar para revisar sem perder os dados. Ele NÃO envia dados para servidor. Após validar, ele prepara um rascunho visível e uma opção para continuar pelo Instagram. O visitante copia o texto, abre a conversa, cola e confirma o envio. Não há confirmação de entrega, caixa de entrada, armazenamento, rastreadores ou cookies próprios. Acesso normal ao provedor de hospedagem e uso de WhatsApp/e-mail estão sujeitos às práticas desses terceiros.

Sem JavaScript, o formulário fica desabilitado e orienta o contato direto. Os controles de animação e ampliação ficam ocultos; os links, a navegação e o FAQ continuam utilizáveis.

Para usar o Instagram, copie a mensagem, abra o perfil da agência, toque em Mensagem e cole o texto. Em arquivo local, a cópia automática pode ser indisponível: nesse caso o texto é selecionado e você usa Ctrl+C. Mensagens muito longas podem exceder limites de URLs do aplicativo; use a cópia manual. Os links são atualizados ao preparar a mensagem; ao editar campos, prepare novamente.

## 3. Conferir antes de publicar

1. Menu: reduza a janela, abra Menu, clique nas âncoras e confirme que o menu fecha. Teste Escape e navegação com Tab e Enter.
2. Formulário: tente preparar sem preencher; confira os erros e o foco. Use um e-mail inválido e uma descrição curta. Depois preencha corretamente e revise a mensagem.
3. Teste o link do Instagram e o botão Copiar. Você não precisa enviar uma mensagem de verdade para conferir o rascunho.
4. FAQ: abra e feche as respostas com mouse e teclado. No formulário, tente avançar com o projeto vazio; depois teste a segunda etapa sem os contatos.
5. Larguras: pressione F12 (ou Ctrl+Shift+I), ative o modo de dispositivo com Ctrl+Shift+M no Edge/Chrome e teste 320, 375, 768, 1024 e 1440 pixels. Confirme que não aparece rolagem horizontal. Isso simula larguras, não substitui teste no celular real.
6. Amplie a página para 200%, navegue com Tab e verifique legibilidade, foco e ordem. Teste também a preferência do sistema de reduzir animações.
7. Na primeira tela, teste Pausar animações e Ativar animações. Clique em Ver mais nas três soluções e confirme que o serviço correspondente abre. No portfólio, clique em Explorar conceito e teste Tab, Shift+Tab e Escape.
8. Expanda serviços diferentes e confira os textos e os links de contato. Abra as três demonstrações pelo portfólio e teste os menus. O CTA Quero um site assim leva ao formulário da KV Agência com serviço e referência do conceito preenchidos.
9. Após publicar, teste no seu celular e em outro navegador. Confira novamente os links externos e o aplicativo de e-mail.

## 4. O que personalizar

- Textos e estrutura: index.html.
- Cor, espaçamento, fontes e telas: style.css. A cor de destaque azul-claro está em --accent. Os ajustes da versão futurista estão ao final do arquivo, na seção DIREÇÃO FUTURISTA.
- Formulário e contatos: script.js. Se mudar WhatsApp/e-mail, atualize também os links diretos de index.html.
- Ícone da aba: favicon.svg.
- O ano é atualizado pelo JavaScript. Sem JavaScript, permanece o ano de criação.
- Não existem prazos prometidos, páginas de políticas fictícias, avaliações ou resultados fabricados.
- A fonte Space Grotesk está incluída em assets/space-grotesk.ttf e carrega localmente. Sua licença aberta está em assets/OFL-Space-Grotesk.txt. Arial é a alternativa automática se a fonte não carregar.
- A abertura utiliza uma imagem local criada a partir da referência visual aprovada. As imagens no portfólio são ilustrações geradas para conceitos, não fotografias de obras ou clientes da agência. Veja ASSETS.md.
- Demonstrações: conceitos/forma.html, conceitos/serena.html e conceitos/base.html. O estilo compartilhado está em conceitos/demo.css e o comportamento em conceitos/demo.js. As três identidades têm cores e composições próprias.
- O raciocínio de navegação e as decisões de interface estão em DECISOES.md.
- Movimento, expansão dos serviços e portfólio ampliado: motion.js. Não há Canvas, WebGL ou biblioteca de animação. O movimento usa CSS e pode ser pausado; o desempenho real depende do computador.
- O botão Pausar animações fica no topo. Ele pausa o desenho e as animações CSS. Quando o sistema solicita movimento reduzido, a experiência começa estática e o botão informa isso.
- Os serviços são expansíveis. O portfólio abre em uma janela acessível: Tab navega pelos controles, Escape fecha e o foco retorna ao botão de abertura.
- A barra fina no topo acompanha a rolagem. Ela não coleta dados.

## 5. Publicar gratuitamente pelo GitHub, sem terminal

Você não precisa comprar domínio. O GitHub Pages disponibiliza endereço em github.io para projetos estáticos em repositórios públicos no plano gratuito.

1. Crie sua conta gratuita em https://github.com ou entre na conta existente.
2. Clique no sinal + no alto > New repository.
3. Dê o nome kv-agencia, selecione Public e crie o repositório. O código ficará público.
4. Na página do repositório, escolha uploading an existing file (se estiver vazio) ou Add file > Upload files.
5. Arraste os arquivos index.html, style.css, script.js, motion.js, favicon.svg e as pastas assets e conceitos completas. Pode incluir README.md, REVISAO.md, ASSETS.md e DECISOES.md. Não envie o ZIP. index.html precisa estar na raiz, sem outra pasta acima dele.
6. Clique em Commit changes para confirmar o upload.
7. Abra Settings > Pages. Em Build and deployment, selecione Source: Deploy from a branch. Em Branch, escolha main e /(root), depois Save.
8. Aguarde o processamento e volte a Settings > Pages para copiar o endereço mostrado pelo GitHub. Ele normalmente segue https://SEU-USUARIO.github.io/kv-agencia/ (isso é um formato de exemplo, não um endereço já configurado).
9. Abra o endereço e confira os testes do item 3. Ative Enforce HTTPS quando disponível. Não preencha Custom domain se não tiver domínio próprio.
10. Para atualizar, envie novamente os arquivos alterados em Add file > Upload files e confirme Commit changes. Aguarde a publicação.

Se main não aparecer, confirme primeiro o upload. Se ocorrer erro 404, confira o nome exato index.html, a raiz do repositório e a execução de publicação na aba Actions. A interface do GitHub pode mudar; consulte as fontes oficiais abaixo.

Fontes oficiais consultadas em 26/10/2026:
https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site

## 6. SEO, compartilhamento e privacidade antes do lançamento

Título, descrição, idioma, viewport, tema, favicon e metadados Open Graph textuais já estão presentes. Depois de saber o endereço publicado, acrescente no head de index.html:

- link canonical com o endereço absoluto final;
- meta property="og:url" com o mesmo endereço;
- meta property="og:image" com o endereço absoluto de uma imagem de compartilhamento real que você criar e enviar ao repositório. Prefira PNG/JPG, pois o suporte a SVG em prévias sociais é limitado. Sem essa imagem, a prévia pode mostrar apenas texto.

Não foram criados robots.txt ou sitemap.xml com domínio fictício. Em site de página única, as âncoras não precisam ser URLs separadas no sitemap. Quando o endereço final existir, você pode adicionar esses arquivos com a URL correta, se necessário.

Revise a descrição dos serviços, os contatos e as condições comerciais da agência antes de divulgar. Avalie a necessidade de um aviso de privacidade de acordo com as práticas reais de atendimento, hospedagem e tratamento posterior das mensagens. Não há página jurídica pronta nem afirmação de conformidade legal auditada. Nunca coloque senhas ou chaves no repositório.

## 7. Testes e limites da entrega

Consulte REVISAO.md para os testes efetivamente executados. O site está implementado; confira em REVISAO.md o alcance exato dos testes desta edição. A confirmação de abertura nos seus aplicativos e a revisão em seu Windows/celular devem ser feitas antes de divulgar.


## KV Studio — roteiros de vídeo

No menu do site, clique em **KV Studio**. Preencha os campos e clique em **Criar estrutura de roteiro**. O resultado pode ser editado, copiado ou baixado em TXT. A ferramenta cria um modelo a partir das respostas; não utiliza inteligência artificial nem envia dados a um servidor. Os arquivos `kv-studio.html`, `studio.css` e `studio.js` devem ficar na mesma pasta do `index.html`.

Os planos de R$ 349,90, R$ 499,90 e R$ 699,90 são modelos de oferta. Revise a descrição e confirme as condições comerciais antes de publicar.
