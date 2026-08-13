/* ============================================================
   O NORTE — ÍNDICE DA BUSCA
   ------------------------------------------------------------
   ESTE É O ÚNICO ARQUIVO A ATUALIZAR quando entrar peça nova.
   Publicou uma página ou um arquivo novo? Acrescente uma linha
   aqui — senão ele existe mas ninguém acha.

   Campos:
     titulo   texto que aparece no resultado
     tipo     'Página' | 'Arquivo' | 'Seção'
     desc     uma linha explicando o que é
     tags     palavras que a pessoa REALMENTE digita, inclusive
              erradas ou aproximadas (carta, timbre, logomarca...)
     href     destino
     download nome do arquivo, só para itens que baixam
   ============================================================ */
window.NORTE_INDICE = [
  // ---------- Fundamentos ----------
  { titulo: 'Paleta de cores', tipo: 'Seção', desc: 'Verde escuro, esmeralda, sálvia, pastel e neutros — com os códigos.', tags: 'cor cores hex paleta verde esmeralda salvia pastel cinza codigo rgb cmyk neon aposentado', href: 'Central de Marca Opp+.dc.html#paleta' },
  { titulo: 'Tipografia', tipo: 'Seção', desc: 'Comfortaa nos títulos, Montserrat no corpo — pesos e uso.', tags: 'fonte fontes tipografia letra comfortaa montserrat tamanho peso', href: 'Central de Marca Opp+.dc.html#tipografia' },
  { titulo: 'Uso do logotipo', tipo: 'Seção', desc: 'Versões, respiro, fundo claro e escuro, o que não fazer.', tags: 'logo logotipo logomarca marca simbolo icone respiro proporcao fundo escuro branco', href: 'Central de Marca Opp+.dc.html#logotipo' },
  { titulo: 'Organização de arquivos', tipo: 'Seção', desc: 'Estrutura de pastas e regra de nomenclatura.', tags: 'pasta pastas arquivo nome nomenclatura organizacao drive salvar onde guardar', href: 'Central de Marca Opp+.dc.html#organizacao' },
  { titulo: 'Códice da Marca', tipo: 'Página', desc: 'A história, o simbolismo e o significado do "+" e da gota.', tags: 'codice historia simbolismo significado oliveira prediger picinin fundadores gota asa abraco mais', href: 'Códice da Marca.dc.html' },
  { titulo: 'Logos das controladas', tipo: 'Página', desc: 'Aviação Agrícola e Gestão de Ativos: versões oficiais.', tags: 'controlada aviacao agricola gestao ativos logo logotipo versao oficial flat 3d alta resolucao png', href: 'Logos das Controladas.dc.html' },
  { titulo: 'Sistema de Design + MDC', tipo: 'Página', desc: 'O manual harmonizado: tokens, componentes e regras.', tags: 'sistema design mdc gdi manual token componente regra harmonizacao', href: 'Sistema de Design + MDC.dc.html' },

  // ---------- Documentos ----------
  { titulo: 'Documento de projeto', tipo: 'Página', desc: 'Capa, sumário, introdução, diagnóstico, proposta, riscos e conclusão.', tags: 'projeto documento formal estudo estrutura capa sumario introducao conclusao proposta interna viabilidade', href: 'Documento de Projeto.dc.html' },
  { titulo: 'Documento de projeto (.docx)', tipo: 'Arquivo', desc: 'O mesmo esqueleto para escrever no Word ou no Google Docs.', tags: 'projeto word docx esqueleto modelo baixar editar google docs', href: 'entregas/downloads/projeto-modelo.docx', download: 'Documento de Projeto (modelo).docx' },
  { titulo: 'Contrato de gestão operacional', tipo: 'Página', desc: 'Contrato padronizado de gestão de aeronave agrícola: 15 cláusulas na mesma ordem em todos os contratos.', tags: 'contrato gestao operacional aeronave agricola juridico clausula minuta instrumento proprietario operadora rab anac seguro manutencao prefixo assinatura testemunha', href: 'Contrato de Gestão Operacional.dc.html' },
  { titulo: 'Contrato de gestão operacional (.docx)', tipo: 'Arquivo', desc: 'A mesma minuta em Word, com os campos entre colchetes para preencher.', tags: 'contrato word docx minuta baixar editar juridico advogado aeronave gestao', href: 'entregas/downloads/contrato-gestao-operacional-modelo.docx', download: 'Contrato de Gestao Operacional (modelo).docx' },
  { titulo: 'Contrato PS-DKA · via Dorilino Prediger', tipo: 'Página', desc: 'A minuta recebida com conteúdo fiel, cláusulas numeradas e formatação da Central.', tags: 'contrato ps-dka dka prediger dorilino air tractor at-502b via assinatura fiel gestao operacional', href: 'Contrato PS-DKA - Dorilino Prediger.dc.html' },
  { titulo: 'Contrato PS-DKA (.docx)', tipo: 'Arquivo', desc: 'A via do PS-DKA em Word, pronta para revisão do advogado.', tags: 'contrato ps-dka prediger word docx baixar advogado revisao', href: 'entregas/downloads/contrato-ps-dka-prediger.docx', download: 'Contrato PS-DKA - Dorilino Prediger.docx' },
  { titulo: 'Análise jurídica do contrato PS-DKA', tipo: 'Página', desc: 'Pontos de atenção por grau, cláusulas ausentes e perguntas para o advogado.', tags: 'analise juridica contrato risco clausula ausente parecer leitura critica seguro reta responsabilidade regresso mora multa rateio rab averbacao advogado', href: 'Análise Jurídica - Contrato PS-DKA.dc.html' },
  { titulo: 'Nota executiva', tipo: 'Página', desc: 'Uma página que começa pela recomendação e termina na decisão pedida.', tags: 'nota executiva resumo executivo uma pagina curto recomendacao decisao memorando parecer sintese', href: 'Nota Executiva.dc.html' },
  { titulo: 'Nota executiva (.docx)', tipo: 'Arquivo', desc: 'Esqueleto de uma página para o Word.', tags: 'nota executiva resumo word docx baixar modelo', href: 'entregas/downloads/nota-executiva-modelo.docx', download: 'Nota Executiva (modelo).docx' },
  { titulo: 'Papel timbrado', tipo: 'Página', desc: 'Folha oficial para carta, ofício e comunicado.', tags: 'timbrado timbre papel carta oficio comunicado folha cabecalho rodape declaracao', href: 'Papel Timbrado.dc.html' },
  { titulo: 'Memorando (.docx)', tipo: 'Arquivo', desc: 'Comunicação interna curta, em Word.', tags: 'memorando interno comunicado word docx baixar', href: 'entregas/downloads/memorando-modelo.docx', download: 'Memorando (modelo).docx' },
  { titulo: 'Ofício (.docx)', tipo: 'Arquivo', desc: 'Documento formal para órgão ou empresa, em Word.', tags: 'oficio formal orgao prefeitura sindicato carta word docx baixar', href: 'entregas/downloads/oficio-modelo.docx', download: 'Oficio (modelo).docx' },

  // ---------- Comercial ----------
  { titulo: 'Proposta comercial — SAE', tipo: 'Página', desc: 'Serviço de aplicação aérea: proposta pronta para o cliente.', tags: 'proposta comercial sae aplicacao aerea pulverizacao cliente orcamento preco hectare', href: 'Proposta Comercial.dc.html' },
  { titulo: 'Proposta comercial — OACO', tipo: 'Página', desc: 'Gestão de aeronave de terceiro.', tags: 'proposta oaco gestao aeronave aviao terceiro ativo operacao', href: 'Proposta Comercial - OACO.dc.html' },
  { titulo: 'Proposta SAE (.docx)', tipo: 'Arquivo', desc: 'Proposta de aplicação aérea em Word.', tags: 'proposta sae word docx baixar editar', href: 'entregas/downloads/proposta-sae-modelo.docx', download: 'Proposta SAE (modelo).docx' },
  { titulo: 'Proposta OACO (.docx)', tipo: 'Arquivo', desc: 'Proposta de gestão de aeronave em Word.', tags: 'proposta oaco word docx baixar editar', href: 'entregas/downloads/proposta-oaco-modelo.docx', download: 'Proposta OACO (modelo).docx' },
  { titulo: 'Cartão de visita', tipo: 'Página', desc: 'Arte final e regras de preenchimento.', tags: 'cartao visita arte final grafica impressao contato', href: 'Cartão de Visita.dc.html' },
  { titulo: 'Cartão de visita — arte final', tipo: 'Página', desc: 'Arquivo fechado para a gráfica.', tags: 'cartao visita arte final grafica sangria corte impressao', href: 'Cartão de Visita - Arte Final.dc.html' },

  // ---------- Relatórios ----------
  { titulo: 'Relatório gerencial — resumo executivo', tipo: 'Página', desc: 'Uma visão curta do mês para a diretoria.', tags: 'relatorio gerencial resumo executivo mes diretoria fechamento indicador', href: 'Relatório Gerencial - Resumo Executivo.dc.html' },
  { titulo: 'Relatório gerencial — analítico', tipo: 'Página', desc: 'Detalhamento completo no padrão MDC.', tags: 'relatorio gerencial analitico detalhe tabela mdc mensal', href: 'Relatório Gerencial - Analítico (padrão MDC).dc.html' },
  { titulo: 'PP-CPG — resumo executivo', tipo: 'Página', desc: 'Gestão de ativos: visão curta.', tags: 'ppcpg pp cpg gestao ativos resumo executivo relatorio', href: 'Gestão de Ativos PP-CPG - Resumo Executivo.dc.html' },
  { titulo: 'PP-CPG — analítico', tipo: 'Página', desc: 'Gestão de ativos: detalhamento completo.', tags: 'ppcpg pp cpg gestao ativos analitico detalhe relatorio', href: 'Gestão de Ativos PP-CPG - Analítico (padrão MDC).dc.html' },

  // ---------- Reunião e apresentação ----------  { titulo: 'Template de apresentação', tipo: 'Página', desc: 'Modelos de slide com instrução de uso.', tags: 'apresentacao slide slides deck powerpoint reuniao palestra', href: 'Template de Apresentação.dc.html' },
  { titulo: 'Apresentação (.pptx)', tipo: 'Arquivo', desc: 'Abre no PowerPoint; no Drive vira Google Slides.', tags: 'apresentacao pptx powerpoint slide baixar google slides drive', href: 'entregas/downloads/Apresentacao Grupo Opp+ (modelo).pptx', download: 'Apresentacao Grupo Opp+ (modelo).pptx' },
  { titulo: 'MERA — especificação de emissão', tipo: 'Página', desc: 'Instruções para o sistema: campos, origem do dado, formato, validações e o que não entra.', tags: 'mera especificacao sistema automacao campo origem formato validacao emissao programar desenvolvedor', href: 'MERA - Especificacao (sistema).dc.html' },
  { titulo: 'MERA — modelo visual', tipo: 'Página', desc: 'Desenho aprovado da folha, referência de layout para a implementação.', tags: 'mera mapa execucao recomendacao aplicacao layout modelo visual anexo talhao piloto prefixo aeronave dgps meteorologia', href: 'MERA - Mapa de Execucao.dc.html' },
  { titulo: 'Ata de reunião', tipo: 'Página', desc: 'Registro de decisões e encaminhamentos com responsável e prazo.', tags: 'ata reuniao registro decisao encaminhamento pauta participante deliberacao assembleia', href: 'Ata de Reuniao.dc.html' },
  { titulo: 'Ata de reunião (.docx)', tipo: 'Arquivo', desc: 'Modelo de ata para escrever no Word.', tags: 'ata reuniao word docx baixar modelo', href: 'entregas/downloads/ata-modelo.docx', download: 'Ata de Reuniao (modelo).docx' },
  { titulo: 'Convite de reunião de diretoria', tipo: 'Página', desc: 'Peça digital para convocar a reunião.', tags: 'convite reuniao diretoria convocacao pauta data agenda', href: 'Convite - Reunião de Diretoria.dc.html' },

  // ---------- E-mail e contato ----------
  { titulo: 'Assinatura de e-mail', tipo: 'Página', desc: 'Preencha seus dados e copie a assinatura pronta.', tags: 'assinatura email e-mail rodape copiar gmail outlook contato cargo', href: 'Assinatura de E-mail.dc.html' },
  { titulo: 'Contato digital (vCard)', tipo: 'Página', desc: 'Arquivo .vcf que salva a Opp na agenda em um toque.', tags: 'vcard vcf contato agenda telefone celular salvar cartao digital', href: 'Contato Digital (vCard).dc.html' },

  // ---------- WhatsApp e presença ----------
  { titulo: 'WhatsApp Business', tipo: 'Página', desc: 'Mensagens de saudação, ausência e respostas rápidas.', tags: 'whatsapp zap wpp business mensagem saudacao ausencia resposta rapida atendimento copiar', href: 'WhatsApp Business.dc.html' },
  { titulo: 'Figuras de contato', tipo: 'Página', desc: 'PNG oficiais para foto de perfil do WhatsApp.', tags: 'figura contato foto perfil whatsapp zap avatar png imagem', href: 'Figuras de Contato.dc.html' },
  { titulo: 'Avatar de WhatsApp por setor', tipo: 'Kit', desc: 'Avatares prontos de Operações Base I e Administrativo, e a regra de linha por função.', tags: 'whatsapp wab avatar por setor foto perfil operacoes base administrativo linha funcao numero celular contato', href: 'WhatsApp Business.dc.html' },
  { titulo: 'Sinalização de ambiente', tipo: 'Página', desc: 'Fachadas, alvenaria, placas de unidade e identificação interna.', tags: 'sinalizacao ambiente predio hangar base fachada parede pintura alvenaria barra rodape placa porta sala setor mesa vidro obra reforma cor tinta branco verde cinza', href: 'Sinalização de Ambiente.dc.html' },
  { titulo: 'Padrão de publicação', tipo: 'Página', desc: 'Carimbo de versão, índice e rotina de publicação do Norte.', tags: 'versao versionamento publicacao publicar cache atualizado desatualizado carimbo indice recarregar deploy no ar online', href: 'Padrão de Publicação.dc.html' },
  { titulo: 'Adesivagem de frota', tipo: 'Página', desc: 'Padrão de adesivo para caminhões e caminhonete — medidas e faces.', tags: 'adesivo adesivagem frota veiculo caminhao caminhonete carro plotagem vinil comboio combustivel logo porta traseira', href: 'Adesivagem de Frota.dc.html' },
  { titulo: 'Figurinhas do WhatsApp', tipo: 'Página', desc: 'Stickers oficiais da marca.', tags: 'figurinha sticker whatsapp zap adesivo', href: 'Figurinhas WhatsApp.dc.html' },
  { titulo: 'Kit de presença digital', tipo: 'Página', desc: 'Perfis oficiais e como preenchê-los.', tags: 'presenca digital perfil google instagram linkedin bio cadastro', href: 'Kit de Presença Digital.dc.html' },
  { titulo: 'Protocolo de redes sociais', tipo: 'Página', desc: 'Onde estar, onde não se expor e o que nunca publicar.', tags: 'rede social redes instagram facebook linkedin postar publicar protocolo risco crise veneno', href: 'Protocolo de Redes Sociais.dc.html' },
  { titulo: 'OppOn — bot institucional', tipo: 'Página', desc: 'O bot do Telegram: menu, tom e kit de arte.', tags: 'oppon bot telegram robo atendimento automatico neon azul menu', href: 'OppOn - Bot Institucional.dc.html' },

  // ---------- Marca aplicada ----------
  { titulo: 'Kit Express de marca', tipo: 'Página', desc: 'Zip pronto para mandar a gráfica, brinde ou fornecedor.', tags: 'kit express fornecedor grafica brinde uniforme adesivo banner zip logo alta resolucao enviar', href: 'Kit Express de Marca.dc.html' },
  { titulo: 'Kit Express (.zip)', tipo: 'Arquivo', desc: 'Guia de aplicação, logos em alta e cores — 11,5 MB.', tags: 'kit zip baixar fornecedor grafica logo alta cores guia enviar', href: 'entregas/kit-express-marca-opp.zip', download: 'kit-express-marca-opp.zip' },
  { titulo: 'Guia rápido da marca', tipo: 'Página', desc: 'Duas páginas com cores, fontes, logos e regras — para terceiros.', tags: 'guia rapido marca fornecedor regra cor fonte logo cmyk prova impressao', href: 'Guia Rapido da Marca.dc.html' },
  { titulo: 'Fundos e wallpapers', tipo: 'Página', desc: 'Planos de fundo para slide, documento, celular e tablet.', tags: 'fundo fundos wallpaper papel de parede celular tablet slide capa imagem', href: 'Fundos de Marca.dc.html' },

  // ---------- Navegação e apoio ----------
  { titulo: 'O que você vai fazer?', tipo: 'Página', desc: 'Escolha a tarefa e receba o kit certo, já pronto.', tags: 'ajuda comecar tarefa nao sei por onde comecar kit guia rapido atalho', href: 'O que você vai fazer.dc.html' },
  { titulo: 'Minha Opp+', tipo: 'Página', desc: 'O portal de relacionamento e o onboarding da equipe.', tags: 'minha opp pwa portal app aplicativo onboarding equipe login', href: 'Minha Opp+.dc.html' },
  { titulo: 'Registro histórico da Central', tipo: 'Página', desc: 'O que foi decidido, quando e por quê.', tags: 'historico registro decisao mudanca versao historia central', href: 'Central de Marca - Registro Histórico.dc.html' },
];
