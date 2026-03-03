# Objetivo e Contexto

O projeto consiste no desenvolvimento de um aplicativo para auxiliar na prescrição de medicamentos e na adesão ao tratamento, independentemente das habilidades de leitura do paciente. O objetivo é garantir eficácia e acessibilidade, promovendo o letramento em saúde e melhorando a adesão aos tratamentos prescritos.

Além disso, o aplicativo busca contribuir para a redução do risco de resistência a microorganismos e oferecer suporte aos dentistas no monitoramento das prescrições. A proposta envolve a implementação de soluções que tornem o acompanhamento mais intuitivo e eficiente, permitindo que profissionais da saúde e pacientes tenham uma experiência mais segura e orientada no uso de medicamentos.

# Público Alvo

- Pacientes das redes públicas e privadas

# User Stories - Aplicativo do Paciente

## Autenticação
- [ ] Paciente deve conseguir fazer Login com Telefone e Data de Nascimento

## Tela Home (Início)
- [ ] Paciente deve ver a tela inicial com informações principais do dia
- [ ] Paciente deve ver saudação personalizada com seu nome
- [ ] Paciente deve ver card de "Próximo Remédio" com contagem regressiva até o horário
- [ ] Paciente deve ver seção "Remédios de Hoje" com contador de remédios restantes
- [ ] Paciente deve ver lista de medicações do dia com informações claras e visuais
- [ ] Paciente deve ver status de cada medicação (no horário, atrasado, muito atrasado, aguardando horário)
- [ ] Paciente deve ver instruções detalhadas de como tomar/usar cada medicação
- [ ] Paciente deve ver "Dica do Dia" com informações educativas sobre medicação
- [ ] Paciente deve conseguir acessar histórico de medicações tomadas
- [ ] Paciente deve conseguir acessar contato de emergência com o médico

## Medicações
- [ ] Paciente deve conseguir ver lista de remédios prescritos pelo dentista
- [ ] Paciente deve conseguir ver medicações do dia atual organizadas por horário
- [ ] Paciente deve conseguir marcar que tomou a medicação
- [ ] Paciente deve conseguir marcar medicação como "Tomar Agora" quando atrasada
- [ ] Paciente deve receber alerta quando medicação está muito atrasada (sugerir consultar médico)
- [ ] Paciente deve ver botão "Aguardar Horário" quando ainda não é o momento de tomar

## Notificações
- [ ] Paciente deve ser notificado para tomar o remédio no horário correto
- [ ] Paciente deve receber notificação com contagem regressiva antes do horário (ex: 30 minutos antes)
- [ ] Paciente deve conseguir habilitar/desabilitar notificações
- [ ] Paciente deve receber lembretes quando medicação está atrasada

## Navegação
- [ ] Paciente deve ter acesso fácil a tela inicial (Home)
- [ ] Paciente deve ter acesso fácil a lista completa de remédios
- [ ] Paciente deve ter acesso fácil a tela de progresso/estatísticas
- [ ] Paciente deve ter acesso fácil a informações do médico/dentista

# Requisitos Não Funcionais

- [ ] Notificações push para lembrar horários de medicação
- [ ] Interface simples e intuitiva para pessoas com pouco letramento
- [ ] Uso de ícones e cores para facilitar compreensão visual
- [ ] Textos claros e objetivos, evitando termos técnicos complexos
- [ ] Feedback visual imediato em todas as ações
- [ ] Contagem regressiva em tempo real para próximo remédio

# Informações do Paciente para Login

O webdiet usa o telefone e data de nascimento para fazer login.

Para o aplicativo do paciente, serão necessárias as seguintes informações:
- Nome
- Data de nascimento
- Telefone

# Prescrições Medicamentosas

## Informações da Prescrição

Quando o dentista cria uma prescrição, as seguintes informações são salvas:

- **Princípio ativo** - Exemplo: dipirona 50mg/ml
- **Dose** - Exemplo: 50mg/ml
- **Forma farmacêutica** - Selecionar entre:
  - Solução oral -> tomar
  - Suspensão oral -> tomar
  - Comprimido -> tomar
  - Cápsula -> tomar
  - Pílula -> tomar
  - Pastilha -> chupar
  - Drágea -> tomar
  - Xarope -> tomar
  - Gotas -> tomar
  - Pomada -> aplicar
  - Creme -> aplicar
  - Pasta -> aplicar
  - Spray / aerossol -> aplicar

- **Via de administração** - Selecionar entre:
  - Oral
  - Sublingual
  - Tópica

- **Quantidade a ser tomada** - Campo numérico (ex: 1)
- **Tempo de administração** - Campo numérico em horas (ex: 8)
- **Quantidade de dias** - Campo numérico (ex: 7)
- **Enquanto dor** - Campo boolean (ou vai ser preenchido esse ou quantidade de dias)

## Texto de Posologia para o Paciente

O texto de posologia é gerado seguindo o padrão:
```
tomar {quantidade a ser tomada} {via de administração}
```

Exemplo: "tomar 1 cápsula via oral a cada 8 horas por 7 dias"

O verbo varia de acordo com a forma farmacêutica:
- Formas orais (solução, suspensão, comprimido, cápsula, pílula, drágea, xarope, gotas): "tomar"
- Pastilha: "chupar"
- Formas tópicas (pomada, creme, pasta, spray/aerossol): "aplicar"

## Formato Completo da Prescrição

Para o paciente, a prescrição será exibida com:
- Princípio ativo
- Posologia (texto gerado automaticamente)
- Informações adicionais conforme necessário

## Instruções Detalhadas de Como Tomar/Usar

Cada medicação deve exibir instruções claras e específicas de como tomar ou usar:

### Medicações Orais
- Exemplo: "Engolir com água, antes do café da manhã"
- Exemplo: "Engolir com água, após o almoço"
- Exemplo: "Medir 5ml na seringa, tomar puro"

### Medicações Tópicas
- Exemplo: "Aplicar pequena quantidade no local, massagear suavemente"

### Regras para Instruções
- Usar linguagem simples e direta
- Evitar termos técnicos
- Incluir detalhes práticos (com água, antes/após refeições, etc.)
- Usar verbos de ação claros (engolir, aplicar, medir, etc.)

# Tela Home - Funcionalidades Detalhadas

## Estrutura da Tela Home

### Header
- Título: "Meus Remédios"
- Data atual formatada: "Hoje, [dia] de [mês]"
- Ícone de perfil do usuário

### Card de Saudação
- Saudação personalizada: "Olá, [Nome do Paciente]!"
- Pergunta: "Como você está se sentindo hoje?"
- Design visual com ícone de coração

### Card de Próximo Remédio
- Título: "Próximo Remédio"
- Contagem regressiva: "em X minutos" ou "em X horas"
- Horário formatado: "[HH:MM]" com período do dia (Manhã/Tarde/Noite)
- Destaque visual para chamar atenção

### Seção Remédios de Hoje
- Título: "Remédios de Hoje"
- Contador: "X restantes" (quantidade de medicações ainda não tomadas)
- Lista de cards individuais para cada medicação

### Card Individual de Medicação

Cada card deve conter:

#### Informações Principais
- Ícone visual representando o tipo de medicação (comprimido, líquido, pomada, etc.)
- Nome do medicamento (princípio ativo)
- Dosagem e forma: "[dose] - [forma farmacêutica]"
  - Exemplo: "50mg - Cápsula"
  - Exemplo: "5ml - Líquido"
  - Exemplo: "Uso tópico"

#### Instruções de Uso
- Título: "Como tomar:" ou "Como usar:" (conforme forma farmacêutica)
- Instrução detalhada e clara
  - Exemplo: "Engolir com água, antes do café da manhã"
  - Exemplo: "Medir 5ml na seringa, tomar puro"
  - Exemplo: "Aplicar pequena quantidade no local, massagear suavemente"

#### Horário e Status
- Horário formatado: "[HH:MM]"
- Status visual e textual:
  - **No horário**: Verde - "No horário"
  - **Atrasado**: Amarelo - "X min atrasado" ou "X horas atrasado"
  - **Muito atrasado**: Vermelho - "Muito atrasado"
  - **Aguardando**: Cinza - "Em X horas" ou "Em X minutos"

#### Botão de Ação
O botão varia conforme o status:
- **No horário ou próximo**: Verde - "Marcar como Tomado" (ícone de check)
- **Atrasado**: Amarelo - "Tomar Agora" (ícone de relógio)
- **Muito atrasado**: Vermelho - "Consultar Médico" (ícone de alerta)
- **Aguardando horário**: Cinza - "Aguardar Horário" (ícone de relógio)

### Dica do Dia
- Card destacado com fundo colorido/gradiente
- Ícone de lâmpada ou informação
- Texto educativo sobre medicação
- Exemplo: "Se esquecer de tomar um remédio, tome assim que lembrar. Mas se já estiver próximo do próximo horário, pule a dose esquecida e continue normalmente."
- Botão: "Ver Mais Dicas"

### Cards de Ação Rápida
Dois cards lado a lado:

#### Histórico
- Ícone de documento com relógio
- Texto: "Ver remédios tomados"
- Acesso rápido ao histórico

#### Emergência
- Ícone de telefone verde
- Texto: "Ligar para médico"
- Acesso rápido ao contato de emergência

## Navegação Inferior (Bottom Navigation)

Barra de navegação fixa na parte inferior com 4 abas:

1. **Início** (Home)
   - Ícone: Casa
   - Tela atual quando selecionado

2. **Remédios** (Medications)
   - Ícone: Pílula/comprimido
   - Lista completa de todas as medicações

3. **Progresso** (Progress)
   - Ícone: Gráfico de linha
   - Estatísticas e acompanhamento do tratamento

4. **Médico** (Doctor)
   - Ícone: Estetoscópio
   - Informações e contato com o dentista/médico

## Princípios de Design para Baixo Letramento

### Visual
- Uso de cores para indicar status (verde = ok, amarelo = atenção, vermelho = alerta)
- Ícones grandes e claros para facilitar identificação
- Cards espaçados e bem definidos
- Contraste adequado entre texto e fundo

### Textual
- Frases curtas e diretas
- Evitar termos técnicos ou médicos complexos
- Usar linguagem do dia a dia
- Instruções passo a passo quando necessário

### Interação
- Botões grandes e fáceis de tocar
- Feedback visual imediato em todas as ações
- Confirmações claras para ações importantes
- Navegação intuitiva e previsível

# Versões

# Prazos

