    # API Express + TypeScript

    Este documento descreve todas as alterações e configurações necessárias para fazer a API Express com TypeScript funcionar com ES Modules.

    ## 📋 Alterações Realizadas

    ### 1. **Configuração de Módulos no `package.json`**

    Adicionada a propriedade `"type": "module"` para indicar ao Node.js que o projeto usa ES Modules (ES6):

    ```json
    {
    "name": "api-express-ts",
    "version": "1.0.0",
    "description": "",
    "type": "module",
    "main": "index.js",
    ...
    }
    ```

    **Por quê?** Sem essa configuração, o Node.js tenta carregar os arquivos como CommonJS (módulos antigos), causando conflito com a sintaxe `import/export`.

    ---

    ### 2. **Configuração do TypeScript no `tsconfig.json`**

    Foram alteradas as seguintes configurações no `compilerOptions`:

    #### a) Módulo de Saída
    ```json
    "module": "esnext"
    ```
    - **Antes:** `"module": "commonjs"`
    - **Motivo:** Necessário para gerar código compatível com ES Modules

    #### b) Resolução de Módulos
    ```json
    "moduleResolution": "bundler"
    ```
    - **Adicionado:** Nova propriedade para melhor suporte a módulos
    - **Motivo:** Funciona melhor com Node.js ES modules

    #### c) Configuração do ts-node
    ```json
    "ts-node": {
    "esm": true,
    "experimentalEsm": true
    }
    ```
    - **Adicionado:** Seção especial para `ts-node-dev`
    - **Motivo:** Permite que o ts-node execute TypeScript com ES modules

    ---

    ### 3. **Script de Desenvolvimento no `package.json`**

    Atualizado o script `dev` para usar `tsx`:

    ```json
    "scripts": {
    "dev": "tsx --watch src/index.ts",
    "start": "node dist/index.js"
    }
    ```

    - **Antes:** `"dev": "ts-node-dev src/index.ts"`
    - **Novo:** `"dev": "tsx --watch src/index.ts"`
    - **Motivo:** `tsx` é mais moderno, rápido e funciona melhor com ES modules no Windows

    ---

    ### 4. **Dependências Instaladas**

    #### Dependências de Produção
    ```json
    "dependencies": {
    "express": "^5.2.1",
    "swagger-jsdoc": "^6.2.8",
    "swagger-ui-express": "^5.0.1"
    }
    ```

    #### Dependências de Desenvolvimento
    ```json
    "devDependencies": {
    "@types/express": "^5.0.6",
    "@types/node": "^25.0.2",
    "ts-node-dev": "^2.0.0",
    "tsx": "^4.21.0",
    "typescript": "^5.9.3"
    }
    ```

    **Novo:** `tsx` foi adicionado para substituir `ts-node-dev` como executor de TypeScript com ES modules.

    ---

    ## 🚀 Como Usar

    ### Instalação
    ```powershell
    npm install
    ```

    ### Desenvolvimento (com hot reload)
    ```powershell
    npm run dev
    ```

    O servidor iniciará e recarregará automaticamente quando você fizer alterações no código.

    ### Produção
    ```powershell
    npm run start
    ```

    Executa o arquivo compilado em `dist/index.js`.

    ---

    ## 📁 Estrutura do Projeto

    ```
    api-express-ts/
    ├── src/
    │   └── index.ts          # Arquivo principal da API
    ├── dist/                 # Pasta gerada (código compilado)
    ├── package.json          # Configuração npm (com "type": "module")
    ├── tsconfig.json         # Configuração TypeScript (com ES modules)
    └── README.md             # Este arquivo
    ```

    ---

    ## ⚙️ Configurações Críticas

    ### `package.json`
    - ✅ `"type": "module"` - Obrigatório para ES modules
    - ✅ Script `dev` usa `tsx --watch` - Funciona melhor no Windows
    - ✅ Script `start` usa `node dist/index.js` - Para produção

    ### `tsconfig.json`
    - ✅ `"module": "esnext"` - Gera código ES6 moderno
    - ✅ `"moduleResolution": "bundler"` - Melhor suporte a módulos
    - ✅ `"ts-node": { "esm": true }` - Suporte para execução direta
    - ✅ `"target": "es2020"` - Compatibilidade com Node.js moderno

    ---

    ## 🔧 Erros Comuns e Soluções

    ### Erro: "Must use import to load ES Module"
    - **Causa:** `package.json` sem `"type": "module"`
    - **Solução:** Adicione `"type": "module"` ao `package.json`

    ### Erro: "Importações ECMAScript não podem ser gravadas em CommonJS"
    - **Causa:** `tsconfig.json` com `"module": "commonjs"`
    - **Solução:** Altere para `"module": "esnext"`

    ### Erro: "NODE_OPTIONS não é reconhecido" (no Windows PowerShell)
    - **Causa:** Sintaxe errada para variáveis de ambiente
    - **Solução:** Use `tsx` em vez de `ts-node-dev`

    ---

    ## 📝 Resumo das Alterações

    | Arquivo | Alteração | Motivo |
    |---------|-----------|--------|
    | `package.json` | Adicionado `"type": "module"` | Habilitar ES modules |
    | `tsconfig.json` | `"module": "commonjs"` → `"esnext"` | Gerar código ES6 |
    | `tsconfig.json` | Adicionado `"moduleResolution": "bundler"` | Melhor suporte |
    | `tsconfig.json` | Adicionada seção `"ts-node"` | Suporte para execução |
    | `package.json` | Script alterado para `tsx --watch` | Compatibilidade Windows |
    | `package.json` | Adicionado `tsx` como devDependency | Executor moderno |

    ---

    ## ✅ Status Atual

    ✅ API pronta para desenvolvimento com TypeScript e ES modules
    ✅ Hot reload funcionando com `npm run dev`
    ✅ Compilação TypeScript configurada
    ✅ Swagger e Swagger UI prontos para uso

    ---

    **Data de Configuração:** 14 de dezembro de 2025
