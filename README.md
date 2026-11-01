# Forma

CAD paramétrico da **CongestedAI**, com ferramentas locais de modelagem, pintura e texturas e integração com assistentes de IA por MCP.

**[Baixar o Forma](https://github.com/congestedai/Forma/releases) · [Instalar por comando](docs/INSTALACAO.md#macos-e-linux-por-comando) · [Como instalar](docs/INSTALACAO.md) · [Temas](docs/TEMAS.md)**

Este repositório reúne os downloads oficiais, notas de versão, documentação, relatos de problemas e scripts de validação da distribuição. O código-fonte original do aplicativo é privado; este repositório não é uma licença de código aberto do aplicativo.

## Downloads

| Opção | Para quem |
| --- | --- |
| Windows x64 portátil | Abra o executável, sem instalar Node.js. Preserve a pasta Forma-data ao atualizar. |
| Pacote por comandos (.tgz) | Instalação local com Node.js 22.12 ou superior e ponte MCP. |

Os arquivos estão anexados a cada [release](https://github.com/congestedai/Forma/releases), acompanhados de SHA256SUMS.txt. O portátil Windows foi conferido nesta máquina. O pacote por comandos passou por instalação, servidor, MCP, extrusão simples, salvamento/reabertura, 3MF e captura PNG em Linux x64, macOS Intel e macOS Apple Silicon, com Node.js 22.12.0. Veja a [execução dos testes](https://github.com/congestedai/Forma/actions/runs/41325799758). São testes básicos da prévia, sem promessa de validação de todas as ferramentas ou de desempenho.

Releases marcadas **Pre-release** são versões de teste. A versão atual é uma prévia; ainda não há uma versão estável publicada. As limitações conhecidas constam nas notas da release.

## Uso e apoio

Uso individual gratuito. **[Contribua com US$ 1 para apoiar o Forma](https://www.patreon.com/c/FormaCAD).**

As regras de uso pessoal e comercial estão nos [termos do Forma](LICENSE.txt), fornecidos também com o aplicativo.

## IA e MCP

O desenvolvimento do Forma utiliza ferramentas de IA. O MCP permite que clientes compatíveis inspecionem e modifiquem projetos usando as ferramentas disponíveis no aplicativo. A integração é destinada a clientes MCP compatíveis e não é exclusiva de um modelo. O comportamento depende das capacidades e da configuração do cliente; não há garantia de resultado para qualquer modelo. Veja a [configuração do MCP](docs/MCP.md).

## Créditos e problemas

O Forma utiliza bibliotecas de terceiros com suas próprias licenças, incluindo React, Three.js e Manifold. Os [avisos completos](THIRD_PARTY_NOTICES.txt) acompanham cada distribuição; a licença do Forma não restringe os direitos concedidos pelos autores dessas bibliotecas.

Encontrou um problema? [Abra um relato](https://github.com/congestedai/Forma/issues/new/choose) com a versão e uma reprodução pequena. As sugestões e os relatos da comunidade são recebidos por Issues; a criação de pull requests é restrita a colaboradores convidados. Não publique senhas, chaves, documentos pessoais nem projetos confidenciais.
