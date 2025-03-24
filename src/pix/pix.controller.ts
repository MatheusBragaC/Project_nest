// src/pix/pix.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { PixService } from './pix.service';

@Controller('pix')
export class PixController {
  constructor(private readonly pixService: PixService) {}

  @Post('gerar')
  async gerarQrCode(
    @Body('chavePix') chavePix: string,
    @Body('valor') valor: string | number,
    @Body('descricao') descricao: string,
  ) {
    try {
      const valorFloat = parseFloat(valor.toString());

      if (isNaN(valorFloat)) {
        return { error: 'Valor inválido. Deve ser um número.' };
      }

      const result = await this.pixService.gerarQrCode(
        chavePix,
        valorFloat,
        descricao,
      );

      return {
        copiaECola: result.brCode,
        qr_code_base64: result.qrCodeBase64,
      };
    } catch (error) {
      return { error: error.message };
    }
  }
}
