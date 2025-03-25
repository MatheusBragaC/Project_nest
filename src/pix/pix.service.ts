// src/pix/pix.service.ts
import { Injectable } from '@nestjs/common';
import { createStaticPix, hasError } from 'pix-utils';

@Injectable()
export class PixService {
  async gerarQrCode(chavePix: string, valor: number, descricao: string) {
    const pix = createStaticPix({
      merchantName: 'Teste',
      merchantCity: 'Vila Velha',
      pixKey: chavePix.trim(),
      infoAdicional: descricao,
      transactionAmount: valor,
    });

    if (hasError(pix)) {
      throw new Error('Erro ao gerar o código Pix.');
    }

    const brCode = pix.toBRCode();
    const qrCodeBase64 = await pix.toImage();

    return {
      brCode,
      qrCodeBase64,
    };
  }
}
