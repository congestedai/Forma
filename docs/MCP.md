# Usar com um cliente MCP

Instale o pacote por comandos e inicie o Forma antes de conectar a ponte. Veja [Instalação](INSTALACAO.md). O cliente também precisa de Chrome ou Chromium instalado para a sessão isolada de interação.

Execute forma --projects-dir para localizar a raiz de projetos. Crie dentro dela uma pasta exclusiva para o trabalho e use seu caminho absoluto na configuração do cliente:

```json
{
  "mcpServers": {
    "forma": {
      "command": "forma",
      "args": ["mcp", "--root", "CAMINHO_ABSOLUTO_DA_PASTA_DO_PROJETO"]
    }
  }
}
```

No Windows, alguns clientes exigem forma.cmd no campo command. A raiz padrão do pacote é ~/Forma/Projetos; FORMA_PROJECTS_DIR permite configurar uma raiz absoluta externa. A ponte exige uma subpasta existente dessa raiz e recusa links e sobrescritas. Não conceda acesso a uma pasta com arquivos confidenciais de outros projetos.

A ponte disponibiliza descoberta, estado, execução e cancelamento. Comece pela descoberta das capacidades e pelo estado atual; use os identificadores e revisões retornados antes de modificar o documento. Capturas e inspeções ajudam o cliente a conferir o resultado. Essas ferramentas auxiliam a IA, mas não garantem que o modelo desenhe corretamente o objeto desejado.

O protocolo não é exclusivo de um fornecedor ou modelo. A capacidade de conexão e o tratamento das respostas dependem do cliente MCP. O cliente de IA pode transmitir dados ao seu provedor conforme a configuração escolhida; revise as permissões antes de conceder acesso aos projetos.
