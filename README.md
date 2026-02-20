# 💸 Frontier Exchange (Câmbio Fronteira)

O **Frontier Exchange** é um assistente financeiro de bolso projetado especificamente para viajantes e compradores em regiões de fronteira (Brasil, Paraguai e Argentina). Diferente de conversores comuns, ele permite que o usuário "fixe" a cotação específica de uma loja e gerencie uma lista de compras offline.

## ✨ Diferenciais
- **🛒 Lista de Compras Inteligente:** Adicione itens em diferentes moedas e veja o total convertido em tempo real.
- **📌 Câmbio de Loja (Custom Rate):** Fixe o valor do câmbio praticado pela loja para não ter surpresas no caixa.
- **📶 PWA & Offline First:** Funciona sem internet dentro de lojas e aduanas.
- **🔗 Compartilhamento Stateless:** Envie sua configuração de taxas e lista de compras através de uma URL (Base64) ou resumo formatado para WhatsApp.
- **🌓 Design Minimalista:** Interface focada em usabilidade com uma mão e alta legibilidade.

## 🏗️ Arquitetura e Tech Stack
Este projeto foi construído seguindo princípios de **Clean Code**, **Clean Architecture** e **Object Calisthenics**.

- **Vue 3 (Composition API)** + **Vite**
- **TypeScript** (Tipagem estrita para segurança financeira)
- **Tailwind CSS** (UI moderna e responsiva)
- **Vitest** (Testes unitários no domínio)
- **Domain-Driven Design (DDD):** Lógica de conversão isolada da camada de UI.

## 🚀 Como rodar o projeto

### Pré-requisitos
- Node.js (v18+)
- npm ou pnpm

### Instalação
```bash
# Instalar dependências
npm install

# Rodar em modo desenvolvimento
npm run dev

# Executar testes unitários (Vitest)
npm run test

# Build para produção (PWA)
npm run build
```

## 🧪 Qualidade de Código

A lógica de negócio está protegida por testes automatizados. Para garantir a precisão dos cálculos de câmbio cruzado (ex: USD para ARS passando por BRL), execute:

```bash
npm run test
```

Contribuição
------------

Contribuições são bem-vindas! Se você encontrar algum problema ou tiver sugestões para melhorar a aplicação, sinta-se à vontade para abrir uma issue ou enviar um pull request.

Se você gostou do meu trabalho e quer me agradecer, você pode me pagar um café :)

<a href="https://www.paypal.com/donate/?hosted_button_id=SFR785YEYHC4E" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 40px !important;width: 150px !important;" ></a>


Licença
-------

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo LICENSE para obter mais informações.
