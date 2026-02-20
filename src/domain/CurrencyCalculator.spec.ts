import { describe, it, expect } from 'vitest';
import { CurrencyCalculator, ShoppingListCalculator, type ExchangeRate } from './CurrencyCalculator';

describe('CurrencyCalculator Domain', () => {
    // Definindo como um objeto literal com chaves conhecidas para satisfazer o TS
    const mockRates = {
        BRL: { currencyCode: 'BRL', officialRate: 1, customRate: null },
        USD: { currencyCode: 'USD', officialRate: 5.0, customRate: null },
        ARS: { currencyCode: 'ARS', officialRate: 0.005, customRate: null }
    } as Record<string, ExchangeRate>;

    describe('Conversão Simples', () => {
        it('deve converter Dólar para Real usando taxa oficial', () => {
            // Usamos a exclamação (!) para dizer ao TS: "eu garanto que isso existe"
            const result = CurrencyCalculator.convert(100, mockRates.USD!, mockRates.BRL!);
            expect(result).toBe(500);
        });

        it('deve priorizar a taxa customizada da loja se disponível', () => {
            const ratesWithCustom: Record<string, ExchangeRate> = {
                ...mockRates,
                USD: { currencyCode: 'USD', officialRate: 5.0, customRate: 6.0 }
            };
            
            const result = CurrencyCalculator.convert(100, ratesWithCustom.USD!, ratesWithCustom.BRL!);
            expect(result).toBe(600);
        });

        it('deve converter entre moedas estrangeiras (USD -> ARS)', () => {
            const result = CurrencyCalculator.convert(1, mockRates.USD!, mockRates.ARS!);
            expect(result).toBe(1000);
        });
    });

    describe('ShoppingListCalculator', () => {
        const items = [
            { id: '1', name: 'Item USD', price: 10, currencyCode: 'USD' },
            { id: '2', name: 'Item ARS', price: 1000, currencyCode: 'ARS' },
            { id: '3', name: 'Item BRL', price: 50, currencyCode: 'BRL' }
        ];

        it('deve calcular o total da lista convertido para BRL corretamente', () => {
            const total = ShoppingListCalculator.calculateTotalInCurrency(items, mockRates, 'BRL');
            expect(total).toBe(105);
        });
    });
});