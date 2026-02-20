<template>
  <main
    class="min-h-screen bg-stone-950 text-stone-100 py-6 sm:py-10 px-4 font-sans selection:bg-emerald-500/30 pb-20"
  >
    <div class="max-w-md mx-auto space-y-6">
      <header
        class="bg-stone-900/40 p-6 rounded-3xl border border-stone-800 text-center space-y-4"
      >
        <div>
          <h1 class="text-3xl font-black text-white tracking-tighter">
            Câmbio<span class="text-emerald-500">Fronteira</span>
          </h1>
          <p
            class="text-[10px] text-stone-500 font-bold uppercase tracking-widest mt-1"
          >
            {{
              isFetching
                ? "Sincronizando taxas..."
                : "Offline & Pronto para Uso"
            }}
          </p>
        </div>

        <div class="grid grid-cols-2 gap-2">
          <button
            @click="shareStateUrl"
            class="bg-emerald-500 hover:bg-emerald-400 text-stone-950 px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-emerald-500/10"
          >
            {{ shareStatus }}
          </button>
          <button
            @click="resetAll"
            class="bg-stone-800 hover:bg-red-500/20 hover:text-red-500 text-stone-400 px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border border-stone-700"
          >
            Zerar Tudo
          </button>
        </div>
      </header>

      <section class="grid grid-cols-1 gap-4">
        <div
          v-if="rates.USD"
          class="bg-stone-900 border border-stone-800 rounded-3xl p-5 relative transition-all focus-within:ring-2 focus-within:ring-sky-500/30"
        >
          <div class="flex justify-between items-center mb-3">
            <span
              class="text-xs font-black text-stone-400 uppercase tracking-widest flex items-center gap-2"
            >
              <span class="w-2 h-2 rounded-full bg-sky-500"></span> Dólar
              Americano
            </span>
            <button
              @click="toggleCustomRate('USD')"
              class="text-[9px] font-black uppercase px-3 py-1.5 rounded-lg border transition-all"
              :class="
                rates.USD.customRate !== null
                  ? 'bg-sky-500 text-stone-950 border-sky-500'
                  : 'bg-stone-950 text-stone-500 border-stone-800'
              "
            >
              {{
                rates.USD.customRate !== null
                  ? "Câmbio da Loja Ativo"
                  : "Fixar Cotação da Loja"
              }}
            </button>
          </div>
          <div
            class="inline-flex items-center gap-2 bg-stone-950/50 border border-sky-500/20 rounded-full px-3 py-1 text-[10px] mb-4"
          >
            <span class="text-sky-500 font-bold uppercase">Oficial:</span>
            <span class="text-white font-black tracking-widest"
              >R$ {{ rates.USD.officialRate.toFixed(4) }}</span
            >
          </div>
          <div class="flex items-center gap-3">
            <span class="text-3xl font-black text-stone-600">US$</span>
            <input
              type="number"
              step="any"
              inputmode="decimal"
              v-model.number="values.USD"
              @input="onInput('USD')"
              placeholder="0.00"
              class="w-full bg-transparent text-5xl font-black text-white focus:outline-none placeholder-stone-800"
            />
          </div>
          <div
            v-if="showCustomInput.USD || rates.USD.customRate !== null"
            class="mt-4 pt-4 border-t border-stone-800"
          >
            <label
              class="text-[9px] text-stone-500 uppercase font-bold block mb-1"
              >Valor da Loja (R$ p/ 1 Dólar)</label
            >
            <input
              type="number"
              step="any"
              inputmode="decimal"
              v-model.number="rates.USD.customRate"
              @input="onCustomRateChange('USD')"
              class="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-sm text-sky-400 font-bold focus:outline-none focus:border-sky-500"
            />
          </div>
        </div>

        <div
          v-if="rates.ARS"
          class="bg-stone-900 border border-stone-800 rounded-3xl p-5 relative transition-all focus-within:ring-2 focus-within:ring-amber-500/30"
        >
          <div class="flex justify-between items-center mb-3">
            <span
              class="text-xs font-black text-stone-400 uppercase tracking-widest flex items-center gap-2"
            >
              <span class="w-2 h-2 rounded-full bg-amber-500"></span> Peso
              Argentino
            </span>
            <button
              @click="toggleCustomRate('ARS')"
              class="text-[9px] font-black uppercase px-3 py-1.5 rounded-lg border transition-all"
              :class="
                rates.ARS.customRate !== null
                  ? 'bg-amber-500 text-stone-950 border-amber-500'
                  : 'bg-stone-950 text-stone-500 border-stone-800'
              "
            >
              {{
                rates.ARS.customRate !== null
                  ? "Câmbio da Loja Ativo"
                  : "Fixar Cotação da Loja"
              }}
            </button>
          </div>
          <div
            class="inline-flex items-center gap-2 bg-stone-950/50 border border-amber-500/20 rounded-full px-3 py-1 text-[10px] mb-4"
          >
            <span class="text-amber-500 font-bold uppercase">Oficial:</span>
            <span class="text-white font-black tracking-widest"
              >R$ {{ rates.ARS.officialRate.toFixed(4) }}</span
            >
          </div>
          <div class="flex items-center gap-3">
            <span class="text-3xl font-black text-stone-600">$</span>
            <input
              type="number"
              step="any"
              inputmode="decimal"
              v-model.number="values.ARS"
              @input="onInput('ARS')"
              placeholder="0.00"
              class="w-full bg-transparent text-5xl font-black text-white focus:outline-none placeholder-stone-800"
            />
          </div>
          <div
            v-if="showCustomInput.ARS || rates.ARS.customRate !== null"
            class="mt-4 pt-4 border-t border-stone-800"
          >
            <label
              class="text-[9px] text-stone-500 uppercase font-bold block mb-1"
              >Valor da Loja (R$ p/ 1 Peso)</label
            >
            <input
              type="number"
              step="any"
              inputmode="decimal"
              v-model.number="rates.ARS.customRate"
              @input="onCustomRateChange('ARS')"
              class="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-sm text-amber-400 font-bold focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        <div
          class="bg-stone-900 border border-stone-800 rounded-3xl p-5 relative focus-within:ring-2 focus-within:ring-emerald-500/30"
        >
          <div
            class="text-xs font-black text-stone-400 uppercase tracking-widest flex items-center gap-2 mb-3"
          >
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span> Real
            Brasileiro
          </div>
          <div
            class="inline-flex items-center gap-2 bg-stone-950/50 border border-emerald-500/20 rounded-full px-3 py-1 text-[10px] mb-4 text-stone-500 uppercase font-bold"
          >
            Referência Base
          </div>
          <div class="flex items-center gap-3">
            <span class="text-3xl font-black text-stone-600">R$</span>
            <input
              type="number"
              step="any"
              inputmode="decimal"
              v-model.number="values.BRL"
              @input="onInput('BRL')"
              placeholder="0.00"
              class="w-full bg-transparent text-5xl font-black text-emerald-400 focus:outline-none placeholder-stone-800"
            />
          </div>
        </div>
      </section>

      <section
        class="bg-stone-900 border border-stone-800 rounded-[2rem] overflow-hidden shadow-2xl"
      >
        <div
          class="bg-stone-950/50 border-b border-stone-800 p-6 flex justify-between items-center"
        >
          <div>
            <h2 class="text-sm font-black text-white uppercase tracking-widest">
              🛒 Lista de Compras
            </h2>
          </div>
          <button
            v-if="shoppingList.length > 0"
            @click="copyToWhatsApp"
            class="bg-emerald-500/10 text-emerald-500 px-4 py-2 rounded-xl hover:bg-emerald-500 hover:text-stone-950 transition-all"
          >
            <span class="text-[10px] font-black uppercase tracking-tighter"
              >Enviar WhatsApp</span
            >
          </button>
        </div>

        <div class="p-6 space-y-6">
          <div class="space-y-3">
            <input
              v-model="newItemName"
              type="text"
              placeholder="Nome do item"
              class="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-emerald-500"
            />
            <div class="flex gap-2">
              <select
                v-model="newItemCurrency"
                class="bg-stone-950 border border-stone-800 rounded-xl px-3 text-xs font-black text-stone-400"
              >
                <option value="USD">US$</option>
                <option value="ARS">$ ARS</option>
                <option value="BRL">R$</option>
              </select>
              <input
                v-model.number="newItemPrice"
                type="number"
                step="any"
                placeholder="Preço"
                class="flex-1 bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm text-white outline-none"
              />
              <button
                @click="addItem"
                class="bg-emerald-500 text-stone-950 w-12 rounded-xl font-black"
              >
                +
              </button>
            </div>
          </div>

          <div v-if="shoppingList.length > 0" class="space-y-2">
            <div
              v-for="item in shoppingList"
              :key="item.id"
              class="flex justify-between items-center bg-stone-950 p-4 rounded-2xl border border-stone-800/50"
            >
              <div>
                <p
                  class="text-sm font-black text-stone-200 uppercase tracking-tight"
                >
                  {{ item.name }}
                </p>
                <p class="text-[10px] font-black text-stone-500">
                  {{ item.currencyCode }} {{ item.price.toFixed(2) }}
                </p>
              </div>
              <button
                @click="removeItem(item.id)"
                class="text-red-500 px-2 font-black"
              >
                X
              </button>
            </div>

            <div
              class="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-5 space-y-4 mt-4 text-center"
            >
              <p class="text-[10px] text-emerald-500 font-black uppercase mb-1">
                Total em Real
              </p>
              <p class="text-4xl font-black text-white">
                R$ {{ totalBRL.toFixed(2) }}
              </p>
              <div class="grid grid-cols-2 gap-2">
                <div
                  class="bg-stone-950 p-3 rounded-xl border border-stone-800"
                >
                  <p class="text-[9px] text-sky-500 font-bold mb-1 uppercase">
                    Dólar
                  </p>
                  <p class="text-sm font-black">
                    US$ {{ totalUSD.toFixed(2) }}
                  </p>
                </div>
                <div
                  class="bg-stone-950 p-3 rounded-xl border border-stone-800"
                >
                  <p class="text-[9px] text-amber-500 font-bold mb-1 uppercase">
                    Peso
                  </p>
                  <p class="text-sm font-black">$ {{ totalARS.toFixed(2) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import {
  CurrencyCalculator,
  ShoppingListCalculator,
  type ExchangeRate,
  type ShoppingItem,
} from "./domain/CurrencyCalculator";

// ESTADO
const rates = ref<Record<string, ExchangeRate>>({
  BRL: { currencyCode: "BRL", officialRate: 1, customRate: null },
  USD: { currencyCode: "USD", officialRate: 5.0, customRate: null },
  ARS: { currencyCode: "ARS", officialRate: 0.005, customRate: null },
});

const values = ref<Record<string, number | null>>({
  BRL: null,
  USD: null,
  ARS: null,
});
const shoppingList = ref<ShoppingItem[]>([]);
const newItemName = ref("");
const newItemPrice = ref<number | null>(null);
const newItemCurrency = ref("USD");
const isFetching = ref(false);
const shareStatus = ref("Compartilhar Loja");
const lastEdited = ref<string>("BRL");
const showCustomInput = ref<Record<string, boolean>>({
  USD: false,
  ARS: false,
});

// TOTALIZADORES
const totalBRL = computed(() =>
  ShoppingListCalculator.calculateTotalInCurrency(
    shoppingList.value,
    rates.value,
    "BRL",
  ),
);
const totalUSD = computed(() =>
  ShoppingListCalculator.calculateTotalInCurrency(
    shoppingList.value,
    rates.value,
    "USD",
  ),
);
const totalARS = computed(() =>
  ShoppingListCalculator.calculateTotalInCurrency(
    shoppingList.value,
    rates.value,
    "ARS",
  ),
);

// MÉTODOS DE CÁLCULO
function onInput(source: string) {
  lastEdited.value = source;
  const amount = values.value[source] || 0;
  const sourceRate = rates.value[source];
  if (!sourceRate) return;

  ["BRL", "USD", "ARS"].forEach((target) => {
    if (target === source) return;
    const targetRate = rates.value[target];
    if (targetRate) {
      const result = CurrencyCalculator.convert(amount, sourceRate, targetRate);
      values.value[target] = amount > 0 ? Number(result.toFixed(2)) : null;
    }
  });
}

// MÉTODOS DE TAXA CUSTOMIZADA
function toggleCustomRate(currency: string) {
  const rate = rates.value[currency];
  if (!rate) return;

  if (rate.customRate !== null) {
    rate.customRate = null;
    showCustomInput.value[currency] = false;
    onInput(lastEdited.value);
    return;
  }
  showCustomInput.value[currency] = true;
}

function onCustomRateChange(currency: string) {
  const rate = rates.value[currency];
  if (rate && ((rate.customRate as any) === "" || rate.customRate === 0)) {
    rate.customRate = null;
  }
  onInput(lastEdited.value);
}

// MÉTODOS DA LISTA
function addItem() {
  if (newItemName.value && newItemPrice.value) {
    shoppingList.value.push({
      id: Date.now().toString(),
      name: newItemName.value,
      price: newItemPrice.value,
      currencyCode: newItemCurrency.value,
    });
    newItemName.value = "";
    newItemPrice.value = null;
  }
}

function removeItem(id: string) {
  shoppingList.value = shoppingList.value.filter((i) => i.id !== id);
}

// UTILITÁRIOS
async function fetchOfficialRates() {
  isFetching.value = true;
  try {
    const res = await fetch(
      "https://economia.awesomeapi.com.br/last/USD-BRL,ARS-BRL",
    );
    const data = await res.json();

    // Uso do optional chaining para evitar o erro "possibly undefined"
    if (data.USDBRL && rates.value.USD) {
      rates.value.USD.officialRate = parseFloat(data.USDBRL.ask);
    }
    if (data.ARSBRL && rates.value.ARS) {
      rates.value.ARS.officialRate = parseFloat(data.ARSBRL.ask);
    }
  } catch (e) {
    console.error(e);
  } finally {
    isFetching.value = false;
  }
}

function resetAll() {
  if (!confirm("Zerar tudo?")) return;
  values.value = { BRL: null, USD: null, ARS: null };
  shoppingList.value = [];

  // Reset seguro
  if (rates.value.USD) rates.value.USD.customRate = null;
  if (rates.value.ARS) rates.value.ARS.customRate = null;

  showCustomInput.value = { USD: false, ARS: false };
}

function copyToWhatsApp() {
  const msg = ShoppingListCalculator.generateWhatsAppSummary(
    shoppingList.value,
    rates.value,
  );
  window.open(`https://wa.me/?text=${msg}`, "_blank");
}

async function shareStateUrl() {
  // Construção do objeto de estado com segurança
  const state = {
    overrides: {
      USD: rates.value.USD?.customRate ?? null,
      ARS: rates.value.ARS?.customRate ?? null,
    },
    items: shoppingList.value,
  };

  const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(state))));
  const url = `${window.location.origin}${window.location.pathname}?d=${encoded}`;

  if (navigator.share) {
    await navigator.share({ title: "Câmbio Fronteira", url });
  } else {
    await navigator.clipboard.writeText(url);
    shareStatus.value = "Copiado!";
    setTimeout(() => (shareStatus.value = "Compartilhar Loja"), 2000);
  }
}

onMounted(async () => {
  await fetchOfficialRates();
  const params = new URLSearchParams(window.location.search);
  const data = params.get("d");

  if (data) {
    try {
      const parsed = JSON.parse(decodeURIComponent(escape(atob(data))));

      // Atribuição segura com verificação de existência
      if (parsed.overrides?.USD && rates.value.USD) {
        rates.value.USD.customRate = parsed.overrides.USD;
      }
      if (parsed.overrides?.ARS && rates.value.ARS) {
        rates.value.ARS.customRate = parsed.overrides.ARS;
      }

      shoppingList.value = parsed.items || [];
    } catch (e) {
      console.error("Erro ao restaurar dados:", e);
    }
  }
});
</script>
