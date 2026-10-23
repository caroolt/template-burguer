# BRASA — Respeita a fome - CaroolDev

Landing page e cardápio de uma hamburgueria fictícia, com HTML semântico, CSS autoral, JavaScript modular e animações GSAP + ScrollTrigger + ScrollSmoother. Vite é usado apenas para desenvolvimento e build; não há framework de interface ou backend.

## Executar

Requer Node.js 20.19+ ou 22.12+ (validado com Node 24).

```sh
npm ci
npm run dev
```

```sh
npm run build       # Produção em dist/
npm run preview     # Servir o build localmente
npm test            # Regras de pedido e integridade do catálogo
npm run test:e2e    # Chromium: fluxos, layouts e auditoria axe
```

Os testes usam `/usr/bin/chromium` quando disponível. Em outras máquinas, instale o navegador com `npx playwright install chromium`.

## Personalizar o template

- `src/config.js`: catálogo, combo, preços, ingredientes, alergênicos, endereço, horário e canais de pedido.
- `index.html`: textos editoriais, marca na composição, metadados e estrutura das seções.
- `src/style.css`: cores em `:root`, tipografia, layouts e responsividade.
- `public/assets/`: imagens WebP e ícones.
- `src/main.js`: interface, filtros, diálogos, navegação e cenas de movimento.
- `src/order.js`: composição e validação dos links de pedido.

### Ativar pedidos reais

Em `src/config.js`, configure os contatos da hamburgueria:

```js
whatsapp: '5511999999999', // Exemplo: substitua pelo número real, só dígitos.
deliveryUrl: 'https://seu-canal-de-pedidos.example', // Substitua pela URL real.
```

Os valores são `null` por padrão. Nesse estado, a página explica que é uma demonstração e não envia pedidos. Com WhatsApp configurado, o botão do produto abre uma mensagem com quantidade, subtotal e observação; o atendimento confirma disponibilidade, entrega e total. O link de delivery aceita somente HTTPS. Não há cobrança ou confirmação automática de pedidos.

Antes de usar comercialmente, substitua a identidade, endereço, horários, fotografias, informações de alergênicos e avisos de marca fictícia. A imagem da bebida é demonstrativa e os sabores devem ser confirmados no atendimento. O campo `instagramUrl` está reservado para uma futura integração; atualmente não há botão de Instagram.

Os preços usam `locale` e `currency` do objeto da marca. O padrão é real brasileiro.

## Movimento e acessibilidade

- ScrollSmoother apenas em telas a partir de 1024px com mouse, com rolagem nativa no celular.
- ScrollTrigger para deslocamento sutil da imagem principal, composição do combo e entradas de títulos.
- `prefers-reduced-motion` desativa animações e rolagem suavizada; o conteúdo permanece disponível.
- Links de seção com foco e histórico, menu móvel operável por teclado, diálogos nativos com Escape e restauração de foco.
- O cardápio é renderizado por JavaScript; há uma lista textual alternativa em `noscript`.
- Fontes e imagens são locais, sem chamadas a CDNs em produção.

## Evolução

O catálogo utiliza IDs estáveis. É possível substituir o array por uma API mantendo os componentes atuais. Pedidos, disponibilidade, pagamento, autenticação e persistência exigem uma implementação de backend futura; não são simulados como operações concluídas.

## Assets e licenças

As imagens de hambúrgueres, batatas e refrigerante foram geradas para este conceito com aparência fotográfica e saída otimizada em WebP. As imagens de referência enviadas pelo usuário orientaram a direção visual; não foram incorporadas como assets do site.

Barlow Condensed e DM Sans são distribuídas via Fontsource sob SIL Open Font License. GSAP 3.15.0, ScrollTrigger e ScrollSmoother são fornecidos pelo pacote oficial `gsap`; observe a licença atual em https://gsap.com/standard-license/ ao redistribuir. As versões exatas estão em `package-lock.json`.

A skill enviada está instalada em `.agents/skills/creative-experience-director/`.

## Validação desta entrega

Build de produção e instalação pelo lockfile concluídos. Cinco testes de regras de pedido e oito testes em Chromium passaram, incluindo layouts de 320, 375, 768 e 1440px, filtros, diálogos, quantidade, navegação por teclado, histórico e movimento reduzido. A auditoria automática axe não apontou violações WCAG A/AA na página e no diálogo de produto nas condições testadas.

O build também foi exercitado em Chromium com toque emulado: navegação móvel, detalhes de produto, aviso de demonstração e controle de pausa da faixa. Fontes e imagens são servidas localmente. Esses testes não equivalem a uma certificação de acessibilidade nem a medições de Core Web Vitals em usuários reais; Safari e Firefox não foram testados nesta entrega.
