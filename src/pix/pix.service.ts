// src/pix/pix.service.ts
import { Injectable } from '@nestjs/common';
import { createDynamicPix, createStaticPix, hasError } from 'pix-utils';

@Injectable()
export class PixService {
  async gerarQrCode(chavePix: string, valor: number, descricao: string) {
    const pix = createStaticPix({
      merchantName: '',
      merchantCity: '',
      pixKey: chavePix.trim(),
      infoAdicional: descricao,
      transactionAmount: valor,
    });

    if (hasError(pix)) {
      throw new Error('Erro ao gerar o código Pix.');
    }

    const brCode = pix.toBRCode(); // Código para "copia e cola"
    const qrCodeBase64 = await pix.toImage(); // Imagem QR Code em base64

    return {
      brCode,
      qrCodeBase64,
    };
  }
}
