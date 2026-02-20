export interface ExchangeRate {
  currencyCode: string;
  officialRate: number;
  customRate: number | null;
}

export interface ShoppingItem {
  id: string;
  name: string;
  price: number;
  currencyCode: string; // 'BRL', 'USD', 'ARS'
}

export class CurrencyCalculator {
  public static getActiveRate(rate: ExchangeRate): number {
    return rate.customRate ?? rate.officialRate;
  }

  public static convert(
    amount: number,
    fromRate: ExchangeRate,
    toRate: ExchangeRate,
  ): number {
    if (amount <= 0) return 0;

    const activeFromRate = this.getActiveRate(fromRate);
    const activeToRate = this.getActiveRate(toRate);

    if (activeToRate === 0) return 0;

    const amountInBase = amount * activeFromRate;
    return amountInBase / activeToRate;
  }
}

export class ShoppingListCalculator {
  public static calculateTotalInBase(
    items: ShoppingItem[],
    rates: Record<string, ExchangeRate>,
  ): number {
    let totalBase = 0;

    for (const item of items) {
      const rate = rates[item.currencyCode];
      if (rate) {
        const activeRate = CurrencyCalculator.getActiveRate(rate);
        totalBase += item.price * activeRate;
      }
    }

    return totalBase;
  }

  public static calculateTotalInCurrency(
    items: ShoppingItem[],
    rates: Record<string, ExchangeRate>,
    targetCurrency: string,
  ): number {
    const totalBase = this.calculateTotalInBase(items, rates);
    const targetRate = rates[targetCurrency];

    if (!targetRate) return 0;

    const activeTargetRate = CurrencyCalculator.getActiveRate(targetRate);
    if (activeTargetRate === 0) return 0;

    return totalBase / activeTargetRate;
  }

public static generateWhatsAppSummary(items: ShoppingItem[], rates: Record<string, ExchangeRate>): string {
    if (items.length === 0) return "";

    let text = "🛒 *Resumo de Compras - Frontier Exchange*\n\n";
    
    // Mapeamento de símbolos para evitar lógica repetitiva
    const symbols: Record<string, string> = {
        'USD': 'US$',
        'ARS': '$ (ARS)',
        'BRL': 'R$'
    };

    items.forEach(item => {
        const symbol = symbols[item.currencyCode] || '';
        text += `• ${item.name}: ${symbol} ${item.price.toFixed(2)}\n`;
    });

    const totalBRL = this.calculateTotalInCurrency(items, rates, 'BRL');
    const usdRateObj = rates['USD'];
    const arsRateObj = rates['ARS'];
    
    const usdActive = usdRateObj ? CurrencyCalculator.getActiveRate(usdRateObj) : 0;
    const arsActive = arsRateObj ? CurrencyCalculator.getActiveRate(arsRateObj) : 0;

    text += "\n--- TOTAL ---\n";
    text += `🇧🇷 *Total em Real: R$ ${totalBRL.toFixed(2)}*\n\n`;
    text += `📌 *Câmbios aplicados:*\n`;
    text += `Dólar: R$ ${usdActive.toFixed(2)}\n`;
    text += `Peso: R$ ${arsActive.toFixed(4)}`;

    return encodeURIComponent(text);
}

}
