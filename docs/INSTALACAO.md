# Instalar e atualizar

## Windows portátil

1. Abra a [lista de versões](https://github.com/congestedai/Forma/releases) e baixe Forma-windows-x64-portable.exe da versão escolhida.
2. Salve o executável em uma pasta sua, com permissão de escrita, e abra o Forma.
3. Ao atualizar, feche o Forma antes de trocar o executável. Preserve a pasta Forma-data, que guarda o perfil e os projetos salvos pelo portátil.

A distribuição atual não possui assinatura digital de editor. Confira que o download veio deste repositório oficial e compare o SHA-256 com SHA256SUMS.txt da mesma release:

```powershell
Get-FileHash .\Forma-windows-x64-portable.exe -Algorithm SHA256
```

## Instalação por comandos

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

Linux e macOS ainda exigem testes nativos. As notas de cada release informam o que foi efetivamente conferido.
