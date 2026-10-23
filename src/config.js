/** Personalize a marca e os canais aqui. Null mantém os pedidos em demonstração. */
export const restaurant = {
  name: "BRASA",
  tagline: "Fogo alto. Papo reto.",
  whatsapp: null, // Ex.: '5511999999999', código do país + DDD + número.
  deliveryUrl: null, // URL HTTPS do seu canal de pedidos.
  instagramUrl: null,
  address: "Uma esquina boa. Na sua cidade.",
  hours: "Ter–dom, das 18h às 23h",
  currency: "BRL",
  locale: "pt-BR",
};
export const products = [
  {
    id: "original",
    name: "O Original",
    category: "burgers",
    label: "O começo de tudo",
    price: 32,
    image: "/assets/burger-classic.webp",
    alt: "Burger de carne com cheddar derretido e pão de gergelim",
    description:
      "Dois smash de 80g, cheddar de verdade, picles da casa e nosso molho secreto. No brioche selado na manteiga.",
    ingredients: [
      "Brioche",
      "Blend bovino",
      "Cheddar",
      "Picles",
      "Molho da casa",
    ],
    allergens: "Contém glúten, leite e ovos.",
    tag: "MAIS PEDIDO",
    accent: "orange",
    // Vitrine "Os da casa": recorte sem fundo e a cor do painel.
    cutout: "/assets/burger-classic-cut.webp",
    showcase: { bg: "#ff5a24", text: "#171714", accent: "#171714" },
  },
  {
    id: "brutal",
    name: "Brutal Bacon",
    category: "burgers",
    label: "Sem pedir desculpa",
    price: 39,
    image: "/assets/burger-bacon.webp",
    alt: "Hambúrguer com bacon crocante, cebola e cheddar",
    description:
      "Blend bovino de 180g na brasa, bacon crocante, cheddar e cebola caramelizada. Grande no nome. Maior na primeira mordida.",
    ingredients: [
      "Brioche",
      "Blend bovino 180g",
      "Bacon",
      "Cheddar",
      "Cebola caramelizada",
    ],
    allergens: "Contém glúten, leite e ovos.",
    tag: "PRA QUEM TEM FOME",
    accent: "cream",
    // Vitrine "Os da casa": recorte sem fundo e a cor do painel.
    cutout: "/assets/burger-bacon-cut.webp",
    showcase: { bg: "#1e4d52", text: "#f2e8d5", accent: "#f2b33d" },
  },
  {
    id: "chicken",
    name: "Crocante, pô.",
    category: "burgers",
    label: "Barulho na primeira mordida",
    price: 34,
    image: "/assets/burger-chicken.webp",
    alt: "Hambúrguer de frango crocante com alface e molho",
    description:
      "Frango marinado e empanado na casa, alface fresca, picles e maionese de alho. Crocância que dispensa apresentação.",
    ingredients: [
      "Brioche",
      "Frango crocante",
      "Alface",
      "Picles",
      "Maionese de alho",
    ],
    allergens: "Contém glúten, leite e ovos.",
    tag: "",
    accent: "cream",
    // Vitrine "Os da casa": recorte sem fundo e a cor do painel.
    cutout: "/assets/burger-chicken-cut.webp",
    showcase: { bg: "#f2b33d", text: "#171714", accent: "#8a2410" },
  },
  {
    id: "veggie",
    name: "Verde de fome",
    category: "veggie",
    label: "Planta. Brasa. Personalidade.",
    price: 35,
    image: "/assets/burger-veggie.webp",
    alt: "Hambúrguer de cogumelos com folhas verdes e repolho roxo",
    description:
      "Burger de cogumelos na brasa, repolho roxo, folhas e molho de ervas. Vegetariano, cheio de personalidade. Preparado em cozinha compartilhada.",
    ingredients: [
      "Brioche",
      "Burger de cogumelos",
      "Repolho roxo",
      "Folhas",
      "Molho de ervas",
    ],
    allergens: "Contém glúten, leite e ovos. Não é vegano.",
    tag: "SEM CARNE",
    accent: "green",
    // Vitrine "Os da casa": recorte sem fundo e a cor do painel.
    cutout: "/assets/burger-veggie-cut.webp",
    showcase: { bg: "#245a42", text: "#f2e8d5", accent: "#ffc2ad" },
  },
  {
    id: "fries",
    name: "Batata sem juízo",
    category: "sides",
    label: "Acompanhante nada discreta",
    price: 24,
    image: "/assets/fries.webp",
    alt: "Porção de batatas fritas com cheddar e bacon",
    description:
      "Batata dourada e sequinha, coberta de cheddar cremoso e bacon crocante. Porção de 300g para dividir. Ou não.",
    ingredients: ["Batata", "Cheddar cremoso", "Bacon", "Tempero da casa"],
    allergens: "Contém leite. Preparado em cozinha compartilhada.",
    tag: "VAI BEM COM TUDO",
    accent: "orange",
  },
  {
    id: "soda",
    name: "Um gole de calma",
    category: "drinks",
    label: "Gelada no ponto",
    price: 9,
    image: "/assets/soda.webp",
    alt: "Lata de refrigerante BRASA com gotas de condensação e cubos de gelo",
    description:
      "Refrigerante em lata de 350ml. A pausa gelada entre uma mordida e outra. Consulte os sabores disponíveis ao pedir.",
    ingredients: ["Refrigerante em lata", "350ml"],
    allergens: "Consulte os ingredientes e alergênicos da bebida escolhida.",
    tag: "",
    accent: "cream",
  },
];
export const combo = {
  id: "combo",
  name: "O bonde completo",
  price: 49,
  description:
    "O Original + batata individual de 150g + refrigerante de 350ml.",
  image: "/assets/burger-classic.webp",
  alt: "Burger Original do combo BRASA",
  ingredients: ["O Original", "Batata 150g", "Refrigerante 350ml"],
  allergens: "Contém glúten, leite e ovos. Consulte o sabor da bebida.",
};
