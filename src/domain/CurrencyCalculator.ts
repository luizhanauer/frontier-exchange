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

    let text = "🛒 *Resumo de Compras*\n\n";
    items.forEach(item => {
        text += `• ${item.name}: ${item.price.toFixed(2)}\n`;
    });

    const totalBRL = this.calculateTotalInCurrency(items, rates, 'BRL');
    
    // Verificação de segurança para o TS
    const usdRateObj = rates['USD'];
    const arsRateObj = rates['ARS'];
    
    const usdRate = usdRateObj ? CurrencyCalculator.getActiveRate(usdRateObj) : 0;
    const arsRate = arsRateObj ? CurrencyCalculator.getActiveRate(arsRateObj) : 0;

    text += `\n*Total: R$ ${totalBRL.toFixed(2)}*\n`;
    text += `Dólar: R$ ${usdRate.toFixed(2)} | Peso: R$ ${arsRate.toFixed(4)}`;

    return encodeURIComponent(text);
}
}
