const ferramentas = require("./ferramentas");

describe("Suíte de Ferramentas de Conversão", () => {
  describe("1. Metro <-> Pés", () => {
    it("deve converter 1 metro para 3.28084 pés", () => {
      expect(ferramentas.metroParaPes(1)).toBeCloseTo(3.28084, 4);
    });
    it("deve converter 10 pés para aproximadamente 3.048 metros", () => {
      expect(ferramentas.pesParaMetro(10)).toBeCloseTo(3.048, 3);
    });
    it("deve retornar 0 para 0 metros", () => {
      expect(ferramentas.metroParaPes(0)).toBe(0);
    });
  });

  describe("2. Km <-> Milha", () => {
    it("deve converter 1 km para ~0.621 milhas", () => {
      expect(ferramentas.kmParaMilha(1)).toBeCloseTo(0.621371, 4);
    });
    it("deve converter 1 milha para ~1.609 km", () => {
      expect(ferramentas.milhaParaKm(1)).toBeCloseTo(1.609, 3);
    });
    it("deve converter 0 km para 0 milhas", () => {
      expect(ferramentas.kmParaMilha(0)).toBe(0);
    });
  });

  describe("3. Cm <-> Polegada", () => {
    it("deve converter 2.54 cm para 1 polegada", () => {
      expect(ferramentas.cmParaPolegada(2.54)).toBe(1);
    });
    it("deve converter 2 polegadas para 5.08 cm", () => {
      expect(ferramentas.polegadaParaCm(2)).toBe(5.08);
    });
    it("deve lidar corretamente com números quebrados altos", () => {
      expect(ferramentas.polegadaParaCm(10.5)).toBe(26.67);
    });
  });

  describe("4. Kg <-> Libra", () => {
    it("deve converter 1 kg para ~2.204 lbs", () => {
      expect(ferramentas.kgParaLibra(1)).toBeCloseTo(2.20462, 4);
    });
    it("deve converter 2.20462 lbs para 1 kg", () => {
      expect(ferramentas.libraParaKg(2.20462)).toBeCloseTo(1, 4);
    });
    it("deve converter 0 lbs para 0 kg", () => {
      expect(ferramentas.libraParaKg(0)).toBe(0);
    });
  });

  describe("5. Fahrenheit <-> Celsius", () => {
    it("deve converter 32°F para 0°C", () => {
      expect(ferramentas.fahrParaCels(32)).toBe(0);
    });
    it("deve converter 100°C para 212°F", () => {
      expect(ferramentas.celsParaFahr(100)).toBe(212);
    });
    it("deve calcular corretamente temperaturas negativas (-40 é igual em ambos)", () => {
      expect(ferramentas.fahrParaCels(-40)).toBe(-40);
    });
  });

  describe("6. Kelvin <-> Celsius", () => {
    it("deve converter 0°C para 273.15K", () => {
      expect(ferramentas.celsParaKelvin(0)).toBe(273.15);
    });
    it("deve converter 0K (zero absoluto) para -273.15°C", () => {
      expect(ferramentas.kelvinParaCels(0)).toBe(-273.15);
    });
    it("deve converter 300K para 26.85°C", () => {
      expect(ferramentas.kelvinParaCels(300)).toBeCloseTo(26.85, 2);
    });
  });

  describe("7. Real <-> Dólar (Taxa 5.0)", () => {
    it("deve converter R$ 10 para $ 2", () => {
      expect(ferramentas.realParaDolar(10)).toBe(2);
    });
    it("deve converter $ 5 para R$ 25", () => {
      expect(ferramentas.dolarParaReal(5)).toBe(25);
    });
    it("deve converter 0 reais para 0 dólares", () => {
      expect(ferramentas.realParaDolar(0)).toBe(0);
    });
  });

  describe("8. Real <-> Euro (Taxa 5.4)", () => {
    it("deve converter R$ 10.80 para € 2", () => {
      expect(ferramentas.realParaEuro(10.8).toFixed(1)).toBe("2.0");
    });
    it("deve converter € 10 para R$ 54", () => {
      expect(ferramentas.euroParaReal(10).toFixed(1)).toBe("54.0");
    });
    it("deve funcionar com frações de euro", () => {
      expect(ferramentas.euroParaReal(1.5).toFixed(1)).toBe("8.1");
    });
  });

  describe("9. Real <-> Won (Taxa 260)", () => {
    it("deve converter R$ 1 para 260 Won", () => {
      expect(ferramentas.realParaWon(1)).toBe(260);
    });
    it("deve converter 2600 Won para R$ 10", () => {
      expect(ferramentas.wonParaReal(2600)).toBe(10);
    });
    it("deve converter valores altos", () => {
      expect(ferramentas.realParaWon(100)).toBe(26000);
    });
  });

  describe("10. Horas <-> Milissegundos", () => {
    it("deve converter 1 hora para 3.600.000 ms", () => {
      expect(ferramentas.horasParaMs(1)).toBe(3600000);
    });
    it("deve converter 7.200.000 ms para 2 horas", () => {
      expect(ferramentas.msParaHoras(7200000)).toBe(2);
    });
    it("deve converter meia hora (0.5) para 1.800.000 ms", () => {
      expect(ferramentas.horasParaMs(0.5)).toBe(1800000);
    });
  });

  describe("11. Decimal <-> Binário", () => {
    it('deve converter decimal 10 para "1010"', () => {
      expect(ferramentas.decParaBin(10)).toBe("1010");
    });
    it('deve converter binário "1111" para 15', () => {
      expect(ferramentas.binParaDec("1111")).toBe(15);
    });
    it('deve converter 0 para "0"', () => {
      expect(ferramentas.decParaBin(0)).toBe("0");
    });
  });

  describe("12. Decimal <-> Hexadecimal", () => {
    it('deve converter decimal 255 para "FF"', () => {
      expect(ferramentas.decParaHex(255)).toBe("FF");
    });
    it('deve converter hexadecimal "1A" para 26', () => {
      expect(ferramentas.hexParaDec("1A")).toBe(26);
    });
    it('deve lidar com strings hex em caixa baixa "a"', () => {
      expect(ferramentas.hexParaDec("a")).toBe(10);
    });
  });

  describe("13. Timestamp para Data", () => {
    it("deve converter timestamp conhecido para string (depende do fuso local)", () => {
      const ms = new Date("2026-05-05T14:30:00").getTime();
      const output = ferramentas.tsParaData(ms);
      expect(typeof output).toBe("string");
      expect(output).toMatch(/2026/); // Apenas verificando se o ano está presente
    });
    it("deve lidar com timestamp 0", () => {
      const output = ferramentas.tsParaData(0);
      expect(typeof output).toBe("string");
      expect(output).toMatch(/1969|1970/); // Dependendo do timezone local
    });
    it("deve não lançar erro ao receber string como número", () => {
      expect(() => ferramentas.tsParaData(1682899200000)).not.toThrow();
    });
  });

  describe("14. Rachador de Contas", () => {
    it("deve dividir 100 reais por 4 pessoas dando 25", () => {
      expect(ferramentas.racharConta(100, 4)).toBe(25);
    });
    it("deve dividir 50 por 2 pessoas dando 25", () => {
      expect(ferramentas.racharConta(50, 2)).toBe(25);
    });
    it("deve retornar infinito se dividido por 0 (comportamento nativo do JS)", () => {
      expect(ferramentas.racharConta(100, 0)).toBe(Infinity);
    });
  });

  describe("15. Calculadora de Percentual", () => {
    it("deve calcular 10% de 200 como 20", () => {
      expect(ferramentas.calcularPercentual(200, 10)).toBe(20);
    });
    it("deve calcular 50% de 50 como 25", () => {
      expect(ferramentas.calcularPercentual(50, 50)).toBe(25);
    });
    it("deve calcular 150% de 100 como 150", () => {
      expect(ferramentas.calcularPercentual(100, 150)).toBe(150);
    });
  });

  describe("16. Aplicador de Desconto", () => {
    it("deve dar 10% de desconto em 100 retornando 90", () => {
      expect(ferramentas.aplicarDesconto(100, 10)).toBe(90);
    });
    it("deve dar 50% de desconto em 80 retornando 40", () => {
      expect(ferramentas.aplicarDesconto(80, 50)).toBe(40);
    });
    it("deve retornar 0 se o desconto for 100%", () => {
      expect(ferramentas.aplicarDesconto(50, 100)).toBe(0);
    });
  });

  describe("17. Arredondador", () => {
    it("deve arredondar 3.14159 para 2 casas (3.14)", () => {
      expect(ferramentas.arredondar(3.14159, 2)).toBe(3.14);
    });
    it("deve arredondar 3.14159 para 0 casas (3)", () => {
      expect(ferramentas.arredondar(3.14159, 0)).toBe(3);
    });
    it("deve arredondar 3.999 para 2 casas (4)", () => {
      expect(ferramentas.arredondar(3.999, 2)).toBe(4); // 4.00 vira 4 no number casting
    });
  });

  describe("18. Diferença entre Datas", () => {
    it("deve calcular diferença de 1 dia", () => {
      const d1 = "2026-05-05T14:30:00";
      const d2 = "2026-05-06T14:30:00";
      expect(ferramentas.diferencaDatas(d1, d2)).toBe("1 dia(s) de diferença");
    });
    it("deve calcular diferença independente da ordem (d2 antes de d1)", () => {
      const d1 = "2026-05-10T00:00:00";
      const d2 = "2026-05-05T00:00:00";
      expect(ferramentas.diferencaDatas(d1, d2)).toBe("5 dia(s) de diferença");
    });
    it("deve retornar 0 dias se forem o mesmo dia", () => {
      const d1 = "2026-05-05T10:00:00";
      const d2 = "2026-05-05T20:00:00"; // Menos de 24h
      expect(ferramentas.diferencaDatas(d1, d2)).toBe("0 dia(s) de diferença");
    });
  });
});
