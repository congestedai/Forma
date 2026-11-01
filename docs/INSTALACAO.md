# Instalar e atualizar

## Windows portátil

1. Abra a [lista de versões](https://github.com/congestedai/Forma/releases) e baixe Forma-windows-x64-portable.exe da versão escolhida.
2. Salve o executável em uma pasta sua, com permissão de escrita, e abra o Forma.
3. Ao atualizar, feche o Forma antes de trocar o executável. Preserve a pasta Forma-data, que guarda o perfil e os projetos salvos pelo portátil.

A distribuição atual não possui assinatura digital de editor. Confira que o download veio deste repositório oficial e compare o SHA-256 com SHA256SUMS.txt da mesma release:

```powershell
Get-FileHash .\Forma-windows-x64-portable.exe -Algorithm SHA256
```

## macOS e Linux por comando

Com Node.js 22.12 ou superior e npm instalados, você pode iniciar esta versão diretamente pelo terminal, sem conta npm:

```sh
npm exec --yes --package=https://github.com/congestedai/Forma/releases/download/v0.6.0-preview.20261101/Forma-cli.tgz -- forma
```

O comando baixa a distribuição compilada e abre o aplicativo no navegador padrão. Mantenha o terminal aberto enquanto usa o Forma; Ctrl+C encerra o servidor. Para uma sessão sem abrir navegador automaticamente, acrescente `--no-open` depois de `forma`.

O mesmo comando pode ser executado por um assistente de IA que tenha permissão para instalar e iniciar ferramentas locais. O MCP é a conexão para a IA operar o aplicativo; veja a [configuração](MCP.md).

Para manter o comando instalado no seu usuário, sem `sudo`:

```sh
npm install --global --prefix "$HOME/.local" https://github.com/congestedai/Forma/releases/download/v0.6.0-preview.20261101/Forma-cli.tgz
"$HOME/.local/bin/forma"
```

Se quiser chamar somente `forma`, adicione `$HOME/.local/bin` ao PATH conforme a configuração do seu shell. A publicação com o nome curto `@congestedai/forma` no registro npm ainda está pendente; os comandos acima usam o arquivo oficial do GitHub.

## Instalação pelo arquivo baixado

Requer Node.js 22.12 ou superior. Baixe Forma-cli.tgz da [release](https://github.com/congestedai/Forma/releases) e execute na pasta do download:

```sh
npm install -g ./Forma-cli.tgz
forma
```

O pacote instala o aplicativo já compilado e serve a interface em localhost. Não é necessário compilar o CAD. A publicação no registro npm é separada: baixar este arquivo não significa que o comando npx esteja disponível no registro. No PowerShell, o comando também pode ser chamado como forma.cmd.

```sh
forma --no-open
forma --no-open --port 5252
forma --projects-dir
```

Ctrl+C encerra o servidor. Uma porta ocupada é recusada para preservar a instância existente. O perfil do navegador e o perfil do portátil são distintos. Exporte a biblioteca de temas para transferi-la. Antes de atualizar, salve seus projetos e mantenha um backup fora da pasta do programa.

O pacote por comandos passou pelos testes básicos de instalação e CAD via MCP em Linux x64, macOS Intel e macOS Apple Silicon, com Node.js 22.12.0. [Resultados no GitHub Actions](https://github.com/congestedai/Forma/actions/runs/41325799758). Isso não equivale a certificação completa de todos os ambientes gráficos, distribuições Linux ou ferramentas do CAD. As notas da release continuam identificando esta versão como prévia.
